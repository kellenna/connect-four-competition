import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs/observable/forkJoin';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver/FileSaver';
import { ConnectFourService } from './connect-four.service'
import { Board } from '../models/board.model';
import { Match } from '../models/match.model';
import { IStats } from '../models/stats.model';
import { IConnectFourService } from './iconnect-four.service';
import { StorageService } from './storage.service';

@Injectable()
export class StaticDataConnectFourService implements IConnectFourService {

    private boardNames: string = "boardNames";
    private matches: string = "matches";
    private stats: string = "stats";

    constructor(private connectFourService: ConnectFourService, private datePipe: DatePipe, private storageService: StorageService) { }

    export(): Observable<boolean> {
        let that = this;

        var obs: Observable<boolean> = new Observable((observer) => {

            forkJoin([this.connectFourService.getBoards(), this.connectFourService.getMatches(), this.connectFourService.getStats()]).subscribe(([boardNames, matches, stats]) => {
                let boardCalls: Observable<Board>[] = [];
                for (let boardName of boardNames) {
                    boardCalls.push(this.connectFourService.getBoard(boardName))
                }

                forkJoin(boardCalls).subscribe(boards => {
                    let zip: JSZip = new JSZip();
                    zip.file(this.boardNames + ".json", JSON.stringify(boardNames));
                    zip.file(this.matches + ".json", JSON.stringify(matches));
                    zip.file(this.stats + ".json", JSON.stringify(stats));

                    for (let board of boards) {
                        zip.file(board.boardId + ".json", JSON.stringify(board));
                    }

                    zip.generateAsync({ type: "blob" }).then(function (content) {
                        saveAs(content, that.datePipe.transform(Date(), 'yyyy-MM-dd_HH-mm-ss') + ".zip");
                    });

                    observer.next(true);
                    observer.complete();
                });
            });
        });

        return obs;
    }

    uploadZip(zipFile) {
        let zip: JSZip = new JSZip();
        let that = this;

        zip.loadAsync(zipFile).then(function (zipContent) {

            zipContent.file(that.boardNames + ".json").async("string").then(function(boardNames) {
                that.storageService.setItem(that.boardNames, boardNames);

                for (let boardName of JSON.parse(boardNames)) {
                    zipContent.file(boardName + ".json").async("string").then(function(board) {
                        that.storageService.setItem(boardName, board);
                    });
                }
            });

            zipContent.file(that.matches + ".json").async("string").then(function(matches) {
                that.storageService.setItem(that.matches, matches);
            });

            zipContent.file(that.stats + ".json").async("string").then(function(stats) {
                that.storageService.setItem(that.stats, stats);
            });
        });
    }

    reset() {
        this.storageService.clear();
    }

    getBoards(): Observable<string[]> {
        return Observable.of(JSON.parse(localStorage.getItem(this.boardNames)));
    }

    getBoard(boardName: string): Observable<Board> {
        return Observable.of(JSON.parse(localStorage.getItem(boardName)));
    }

    postColumn(boardName: string, colume: number, discColor: string): Observable<Board> {
        return Observable.of(null);
    }

    getMatches(): Observable<Match[]> {
        JSON.parse(localStorage.getItem(this.matches))
        return Observable.of(JSON.parse(localStorage.getItem(this.matches)));
    }

    postMatch(pRound: number, team1Name: string, team2Name: string, numberOfMatches: number): Observable<Match> {
        return Observable.of(null);
    }

    getStats(): Observable<IStats> {
        return Observable.of(JSON.parse(localStorage.getItem(this.stats)));
    }
}
