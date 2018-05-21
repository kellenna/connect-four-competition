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
    if(index > boards.length) {
      return;
    }
    this.sleep(100).then(() => {
      this.playBoard(boards[index], 1);
      this.play(boards, index+1);
    });
  }

  playBoard(boardName: string, index: number) {
    var column = 3;
    var discColor = 'x';
    if (index % 2 === 0) {
      column = 4;
      discColor = 'o';
    }

    this.connectFourService.postColumn(boardName, column, discColor).subscribe(board => {
      if (board.boardStatus.winner !== null) {
        this.numberOfGamesPlayed++;
        return;
      }

      this.playBoard(boardName, index + 1);
    });
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
