import { Component, OnInit } from '@angular/core';
import { TeamsService } from "../core/services/teams.service";
import { Team } from "../core/models/team.model";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[];
  
  constructor(private teamsService: TeamsService) { }

  ngOnInit() {
    this.teamsService.getTeams().subscribe(teams => {
        this.teams = teams;
      });
  }

}
