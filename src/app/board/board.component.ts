import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription"
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ConnectFourService } from '../core/services/connect-four.service'
import { Board } from '../core/models/board.model';
import { Match } from '../core/models/match.model';

@Component({
  selector: 'app-boards',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  matches: Match[];
  board: Board = null;
  searchTeam: string = '';
  searchBoard: string = '';
  selectedMatch: Match = null;
  selectedBoard: string = null;
  selectedTeam: string = null;
  isMyTurn: boolean = false;
  showFilterClass: string = "";
  private interval: number = 1000;
  private timerSubscription: Subscription;

  constructor(private connectFourService: ConnectFourService, private route: ActivatedRoute) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    if(name !== null && name !== undefined && name !== '') {
      this.selectedBoard = name;
    }
    let team = this.route.snapshot.paramMap.get('team');
    if(team !== null && team !== undefined && team !== '') {
      this.selectedTeam = team;
    }

    this.showFilterClass = "show";
    if(this.selectedBoard !== null && this.selectedTeam !== null) {
      this.showFilterClass = "";
    }

    this.timerSubscription = IntervalObservable.create(this.interval).subscribe(() => {
      this.getBoard();
    });

    this.connectFourService.getMatches().subscribe(m => { 
      this.matches = m;
      if(name !== null && name !== undefined && name !== '') {
        for(let match of this.matches) {
          if(match.boards.indexOf(name) > -1) {
            this.selectedMatch = match;
          }
        }
      }
    });
  }

  setBoard(board: Board) {
    board.grid = this.transpose(board.grid);
    this.board = board;
    this.isMyTurn = (this.selectedTeam === board.boardInfo.playerX && board.boardStatus.nextTurn === 'X')
      || (this.selectedTeam === board.boardInfo.playerO && board.boardStatus.nextTurn === 'O');
  }

  getOtherTeam() {
    return this.selectedTeam === this.board.boardInfo.playerX ? this.board.boardInfo.playerO : this.board.boardInfo.playerX;
  }

  getBoard() {
    if (this.selectedBoard !== null) {
      this.connectFourService.getBoard(this.selectedBoard).subscribe(board => {
        if(board.boardStatus.gameFinished) {
          this.timerSubscription.unsubscribe();
        }     
        this.setBoard(board);   
      });
    }
  }

  columnClicked(col: number) {
    if (!this.isMyTurn) {
      return;
    }

    this.isMyTurn = false;
    this.connectFourService.postColumn(this.selectedBoard, col, this.getDiscColor()).subscribe(board => {
      this.setBoard(board);
    })
  }

  isWinningPosition(board: Board, row: number, col: number) {
    if(board === null || board.boardStatus === null || board.boardStatus.winningPosition === null || board.boardStatus.winningPosition.length === 0) {
      return false;
    }
    for(let r of board.boardStatus.winningPosition) {
      if(r.length === 2 && r[1] === 5 - row && r[0] === col) {
        return true;
      }
    }
    return false;
  }

  getDiscColor(): string {
    return this.board.boardInfo.playerX === this.selectedTeam ? 'x' : 'o';
  }

  transpose(array) {
    return array.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), []).reverse();
  }

  selectMatch(match: Match) {
    this.selectedMatch = match;
    this.selectedBoard = null;
    this.selectedTeam = null;
  }

  selectBoard(board: string) {
    this.selectedBoard = board;
    this.getBoard();
  }

  selectTeam(team: string) {
    this.selectedTeam = team;
    this.getBoard();
  }

  isActiveMatch(match: Match) {
    if (match == null || this.selectedMatch == null) {
      return '';
    }
    return this.selectedMatch.round === match.round
      && this.selectedMatch.team1 === match.team1
      && this.selectedMatch.team2 === match.team2
      && this.selectedMatch.open === match.open ? 'active' : '';
  }

  isActiveBoard(board: string) {
    if (board == null || this.selectedBoard == null) {
      return '';
    }
    return this.selectedBoard === board ? 'active' : '';
  }

  isActiveTeam(team: string) {
    return this.selectedTeam === team ? 'active' : '';
  }
}
