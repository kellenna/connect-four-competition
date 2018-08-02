import { Component, OnInit } from '@angular/core';
import { ConnectFourServiceFactory } from '../core/services/connect-four-service-factory'
import { IConnectFourService } from '../core/services/iconnect-four.service'
import { TeamsService } from "../core/services/teams.service";
import { PlayMatch } from '../core/models/playmatch.model'
import { Team } from "../core/models/team.model";
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  model: PlayMatch = { round: null, team1: '', team2: '', matches: null };
  isSuccess: boolean = false;
  teams: Team[];
  private connectFourService: IConnectFourService;

  constructor(private teamsService: TeamsService, private connectFourServiceFactory: ConnectFourServiceFactory) {
    this.connectFourService = this.connectFourServiceFactory.getService();
   }

  ngOnInit() {
    this.teamsService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
  }

  onSubmit() {
    this.isSuccess = false;
    this.connectFourService.postMatch(this.model.round, this.model.team1, this.model.team2, this.model.matches).subscribe(match => {
      this.isSuccess = true;
    });
  }

  getRound(round:number) {
    if(round == undefined) {
      return "./assets/img/gifs/round.gif"
    }

    var r = round.toString().substr(0, 1);

    switch(r) {
      case "1": return "./assets/img/gifs/round1.gif";
      case "2": return "./assets/img/gifs/round2.gif";
      case "3": return "./assets/img/gifs/round3.gif";
      case "4": return "./assets/img/gifs/round4.gif";
      default: return "./assets/img/gifs/round.gif";
    }
  }

}
