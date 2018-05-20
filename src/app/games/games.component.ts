import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

import { ConnectFourService } from '../core/services/connect-four.service'
import { Match } from '../core/models/match.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  private interval: number = 1000;

  rounds: string[] = [];
  matches: { [Key: string]: Match[] } = {};

  constructor(private connectFourService: ConnectFourService) { }

  ngOnInit() {
    //IntervalObservable.create(this.interval).subscribe(() => {
      this.connectFourService.getMatches().subscribe(matches => {
        for(let match of matches) {
          var round = match.boards[0].substring(0, 1);
          if(this.rounds.indexOf(round) < 0) {
            this.rounds.push(round);
            this.matches[round] = [];
          }
          this.matches[round].push(match);
        }
      });
    //});
  }

}
