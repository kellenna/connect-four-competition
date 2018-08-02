import { Component, OnInit } from '@angular/core';

import { ConnectFourServiceFactory } from '../core/services/connect-four-service-factory'
import { IConnectFourService } from '../core/services/iconnect-four.service'
import { TeamsService } from "../core/services/teams.service";
import { Team } from "../core/models/team.model";
import { Stats, IStats } from "../core/models/stats.model";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[];
  stats: Stats;
  private connectFourService: IConnectFourService;

  constructor(private teamsService: TeamsService, private connectFourServiceFactory: ConnectFourServiceFactory) {
    this.connectFourService = this.connectFourServiceFactory.getService();
   }

  ngOnInit() {
    this.teamsService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.connectFourService.getStats().subscribe(stats => {
      this.stats = new Stats(stats);
    })
  }
}
