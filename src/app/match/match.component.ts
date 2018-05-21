import { Component, OnInit } from '@angular/core';
import { ConnectFourService } from '../core/services/connect-four.service'
import { PlayMatch } from '../core/models/playmatch.model'
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  model: PlayMatch = { round: null, team1: '', team2: '', matches: null };
  isSuccess: boolean = false;

  constructor(private connectFourService: ConnectFourService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.isSuccess = false;
    this.connectFourService.postMatch(this.model.round, this.model.team1, this.model.team2, this.model.matches).subscribe(match => {
      this.isSuccess = true;
    });
  }

}
