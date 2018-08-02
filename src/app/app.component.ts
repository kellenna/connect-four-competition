import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs/observable/forkJoin';
import * as JSZip from 'jszip';
import { ConnectFourService } from './core/services/connect-four.service'
import { saveAs } from 'file-saver/FileSaver';
import { Board } from '../app/core/models/board.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '4 Gewinnt Wettkampf';
  isExportFinished = true;

  constructor(private router: Router, private connectFourService: ConnectFourService, private datePipe: DatePipe) {
  }

  isActive(menu: string): string {
    return menu === this.router.url ? 'active' : '';
  }

  export() {
    this.isExportFinished = false;
    let that = this;

    forkJoin([this.connectFourService.getBoards(), this.connectFourService.getMatches(), this.connectFourService.getStats()]).subscribe(([boardNames, matches, stats]) => {
      let boardCalls: Observable<Board>[] = [];
      for (let boardName of boardNames) {
        boardCalls.push(this.connectFourService.getBoard(boardName))
      }

      forkJoin(boardCalls).subscribe(boards => {
        let zip: JSZip = new JSZip();
        zip.file("boards.json", JSON.stringify(boardNames));
        zip.file("matches.json", JSON.stringify(matches));
        zip.file("stats.json", JSON.stringify(stats));

        for(let board of boards) {
          zip.file(board.boardId + ".json", JSON.stringify(board));
        }

        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, that.datePipe.transform(Date(), 'yyyy-MM-dd_HH-mm-ss') + ".zip");
        });

        this.isExportFinished = true;
      });
    });
  }
}
