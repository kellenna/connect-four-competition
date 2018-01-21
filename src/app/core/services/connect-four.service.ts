import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Board } from '../models/board.model';

// azure link on: https://noser-connect-four.azurewebsites.net/
// local on: 'http://10.0.75.1:8080/api/connect-four/boards'

@Injectable()
export class ConnectFourService {  
    private localUrl: string = 'http://10.0.75.1:8080/api/connect-four/boards/';
    private azureUrl: string = 'https://noser-connect-four.azurewebsites.net/api/connect-four/boards/';
  
    constructor(private http: Http){ }

    getBoards() : Observable<string[]> {
        return this.http.get(this.localUrl)
      .map(x => x.json());
    }

    getBoard(boardName: string) : Observable<Board> {
        return this.http.get(this.localUrl + boardName)
      .map(x => x.json());
    }
}