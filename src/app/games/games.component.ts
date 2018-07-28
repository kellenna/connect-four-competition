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
  matchesById: { [Key: string]: Match } = {};

  constructor(private connectFourService: ConnectFourService) { }

  ngOnInit() {
    IntervalObservable.create(this.interval).subscribe(() => {
      this.connectFourService.getMatches().subscribe(matches => {
        for (let match of matches) {
          var roundMatch = match.boards[0].match(/(\d+)-[\d\D]*/);
          if (roundMatch !== null && roundMatch.length > 1) {
            var round = roundMatch[1];
            if (this.rounds.indexOf(round) < 0) {
              this.rounds.push(round);
              this.matches[round] = [];
            }
            var indexOfMatch = this.matches[round].findIndex(m => m.team1 === match.team1 && m.team2 === match.team2);
            if (indexOfMatch === -1) {
              this.matches[round].push(match);
            }
            else {
              this.matches[round][indexOfMatch] = match;
            }
          }
        }
        this.rounds.sort((a, b): number => b > a ? 1 : -1);
      });
    });
  }

  getPerc(match: Match): string {
    var max = match.draw + match.open + match.team1Won + match.team2Won;
    var current = match.team1Won + match.team2Won + match.draw;
    var perc = Math.floor(current * 100 / max / 10) * 10;
    return perc.toString();
  }

  getColor(match: Match, isTeam1: boolean): string {
    if (isTeam1) {
      return match.team1Won > match.team2Won ? 'white' : 'yellow';
    }
    return match.team2Won > match.team1Won ? 'white' : 'yellow';
  }

  getLooserClass(match: Match, isTeam1) {
    if (match.open === 0) {
      if (isTeam1) {
        if (match.team1Won < match.team2Won) {
          return 'strikethrough';
        }
      }
      else {
        if (match.team2Won < match.team1Won) {
          return 'strikethrough';
        }
      }
    }
    return '';
  }
}
