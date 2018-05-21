import { Component, OnInit } from '@angular/core';
import { ConnectFourService } from '../core/services/connect-four.service'
import { PlayMatch } from '../core/models/playmatch.model'
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-play-match',
  templateUrl: './play-match.component.html',
  styleUrls: ['./play-match.component.css']
})
export class PlayMatchComponent implements OnInit {

  numberOfGamesPlayed: number = 0;
  model: PlayMatch = { round: 0, team1: '', team2: '', matches: 0 };

  constructor(private connectFourService: ConnectFourService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.numberOfGamesPlayed = 0;
    this.connectFourService.postMatch(this.model.round, this.model.team1, this.model.team2, this.model.matches).subscribe(match => {
      this.play(match.boards, 0);
    });
  }

  play(boards: string[], index: number) {
    if(index >= boards.length) {
      return;
    }
    this.sleep(10).then(() => {
      this.playBoard(boards[index], 1, [6, 6, 6, 6, 6, 6, 6]);
      this.play(boards, index+1);
    });
  }

  playBoard(boardName: string, index: number, columns: number[]) {
    var column = Math.floor(Math.random() * 7);
    if(columns[column] === 0) {
      var isColumnFound = false;
      for(var i = 0; i < columns.length; i++) {
        if(columns[i] > 0) {
          column = i;
          isColumnFound = true;
          break;
        }
      }
      if(!isColumnFound) {
        return;
      }
    }
    columns[column] = columns[column] - 1;

    var discColor = 'x';
    if (index % 2 === 0) {
      discColor = 'o';
    }

    this.connectFourService.postColumn(boardName, column, discColor).subscribe(board => {
      if (board.boardStatus.winner !== null) {
        this.numberOfGamesPlayed++;
        return;
      }

      this.playBoard(boardName, index + 1, columns);
    });
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
