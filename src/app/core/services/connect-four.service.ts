import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Board } from '../models/board.model';
import { Match } from '../models/match.model';

// azure link on: https://noser-connect-four.azurewebsites.net/
// local on: 'http://10.0.75.1:8080/api/connect-four/boards'

@Injectable()
export class ConnectFourService {  
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
      return this.http.post(this.azureUrl + "boards/" + boardName + '/colume', {board: boardName, colume: colume, body: discColor})
      .map(x => x.json());
    }

    getMatches() : Observable<Match[]> {
      return this.http.get(this.azureUrl + "match/")
      .map(x => x.json());
    }
}