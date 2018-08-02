import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Board } from '../models/board.model';
import { Match } from '../models/match.model';
import { IStats } from '../models/stats.model';
import { IConnectFourService } from './iconnect-four.service';

// azure link on: https://noser-connect-four.azurewebsites.net/
// local on: 'http://10.0.75.1:8080/api/connect-four/boards'

@Injectable()
export class ConnectFourService implements IConnectFourService {  
    private localUrl: string = 'http://10.0.75.1:8080/api/connect-four/';
    private azureUrl: string = 'https://noser-connect-four.azurewebsites.net/api/connect-four/';
  
    constructor(private http: Http){ }

    getBoards() : Observable<string[]> {
        return this.http.get(this.azureUrl + "boards/")
      .map(x => x.json());
    }

    getBoard(boardName: string) : Observable<Board> {
        return this.http.get(this.azureUrl + "boards/" + boardName)
      .map(x => x.json());
    }

    postColumn(boardName: string, colume: number, discColor: string) : Observable<Board> {
      return this.http.post(this.azureUrl + "boards/" + boardName + '/' + colume, discColor)
      .map(x => x.json());
    }

    getMatches() : Observable<Match[]> {
      return this.http.get(this.azureUrl + "match/")
      .map(x => x.json());
    }

    postMatch(pRound: number, team1Name: string, team2Name: string, numberOfMatches: number) : Observable<Match> {
      return this.http.post(this.azureUrl + "match/", {round: pRound, team1: team1Name, team2: team2Name, matches: numberOfMatches})
      .map(x => x.json());
    }

    getStats() : Observable<IStats> {
      return this.http.get(this.azureUrl + "stats/")
      .map(x => x.json());
    }
}