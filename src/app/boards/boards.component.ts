import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

import { ConnectFourService } from '../core/services/connect-four.service'
import { Board } from '../core/models/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  boardNames: string[] = [];
  boards: { [Key: string]: Board } = {};
  private interval: number = 1000;
  private timerObservable: Observable<number>;

  constructor(private connectFourService: ConnectFourService) { }

  ngOnInit() {
    IntervalObservable.create(this.interval).subscribe(() => {
      this.connectFourService.getBoards().subscribe(boards => {
        for (let boardName of boards) {
          if(this.boardNames.indexOf(boardName) < 0){
            this.boardNames.push(boardName);
          }          
          this.connectFourService.getBoard(boardName).subscribe(board => {
            board.grid = this.transpose(board.grid);
            this.boards[boardName] = board;
          });
        }
      });
    });
  }

  transpose(array) {
    return array.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), []).reverse();
  }
}
