import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Board } from '../models/board.model';

@Injectable()
export class ConnectFourServiceMock {

  private board : Board = {
    boardInfo: {
      playerX: 'AllesNurGeCloud',
      playerO: 'The Pirates of Tensor Flow',
      round: 0
    },
    boardStatus: {
      gameFinished: false,
      winner: null,
      winningPosition: null,
      nextTurn: 'X'
    },
    grid: [
      [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      [
        null,
        null,
        null,
        null,
        null,
        null
      ]
    ]
  };

  constructor() { }

  getBoard(boardName: string): Board {
    return this.board;
  }

  postColumn(boardName: string, column: number) : Board {
    for(var i = this.board.grid.length-1; i >= 0; i--) {
      if(this.board.grid[i][column] == null) {
        this.board.grid[i][column] = this.board.boardStatus.nextTurn;
        break;
      }
    }

    if(this.board.boardStatus.nextTurn === 'O'){
      this.board.boardStatus.nextTurn = 'X'
    }
    else {
      this.board.boardStatus.nextTurn = 'O';
    }

    return this.board;
  }
}