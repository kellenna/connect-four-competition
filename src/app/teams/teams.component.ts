import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

import { ConnectFourService } from '../core/services/connect-four.service'
import { Match } from '../core/models/match.model';
import { TeamsService } from "../core/services/teams.service";
import { Team } from "../core/models/team.model";
import { Stats, Game } from "../core/models/stats.model";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  private interval: number = 1000;
  teams: Team[];
  stats: Stats = null;

  constructor(private teamsService: TeamsService, private connectFourService: ConnectFourService) { }

  ngOnInit() {
    this.teamsService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    IntervalObservable.create(this.interval).subscribe(() => {
      this.connectFourService.getStats().subscribe(stats => {
        this.stats = stats;
      })
    });
  }
}
