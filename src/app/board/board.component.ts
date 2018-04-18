import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

import { ConnectFourService } from '../core/services/connect-four.service'
import { ConnectFourServiceMock } from '../core/services/connect-four.service.mock'
import { Board } from '../core/models/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardName: string = '';
  board: Board;
  private interval: number = 1000;
  private timerObservable: Observable<number>;

  constructor(private connectFourServiceMock: ConnectFourServiceMock) { }

  ngOnInit() {
    // IntervalObservable.create(this.interval).subscribe(() => {
    //   this.connectFourService.getBoards().subscribe(boards => {
    //     for (let boardName of boards) {
    //       if(this.boardNames.indexOf(boardName) < 0){
    //         this.boardNames.push(boardName);
    //       }          
    //       this.connectFourService.getBoard(boardName).subscribe(board => {
    //         board.grid = this.transpose(board.grid);
    //         this.boards[boardName] = board;
    //       });
    //     }
    //   });
    // });

    var theBoard = this.connectFourServiceMock.getBoard(this.boardName);
    theBoard.grid = this.transpose(theBoard.grid);
    this.board = theBoard;
  }

  columnClicked(col: number) {
    this.connectFourServiceMock.postColumn(this.boardName, col)
  }

  transpose(array) {
    return array.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), []).reverse();
  }
}
