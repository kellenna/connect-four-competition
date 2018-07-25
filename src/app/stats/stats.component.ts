import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConnectFourService } from '../core/services/connect-four.service'
import { Stats, Game } from "../core/models/stats.model";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: Stats = null;
  teamStats: { [Key: string]: { team: string, characteristic: number, board: string } };
  teamStats2: {team: string, gamesTotal: number, wonGames: number, lostGames: number, drawGames: number, wonRatio: number, lostRatio: number, drawRatio: number}[];

  biggestWonRatio: number;
  biggestLostRatio: number;
  biggestDrawRatio: number;

  longestWonGame: number;
  shortestWonGame: number;
  longestLostGame: number;
  shortestLostGame: number;
  longestDrawGame: number;
  shortestDrawGame: number;

  biggestAvgDiscsInWonGames: number;
  biggestAvgDiscsInLostGames: number;
  biggestAvgDiscsInDrawGames: number;

  longestDiscDurationMs: number;

  constructor(private connectFourService: ConnectFourService) { }

  ngOnInit() {
    this.teamStats2 = [];

    this.connectFourService.getStats().subscribe(stats => {
      this.stats = stats;

      Object.keys(stats.teamStats).forEach(key => {
        let teamStat = stats.teamStats[key];

        this.teamStats2.push({ 
          team: teamStat.name, 
          gamesTotal: teamStat.gamesPlayed, 
          wonGames: teamStat.wonGames.gamesTotal, 
          lostGames: teamStat.lostGames.gamesTotal, 
          drawGames: teamStat.drawGames.gamesTotal,
          wonRatio: teamStat.wonGames.gamesTotal * (100 / teamStat.gamesPlayed), 
          lostRatio: teamStat.lostGames.gamesTotal * (100 / teamStat.gamesPlayed),
          drawRatio: teamStat.drawGames.gamesTotal * (100 / teamStat.gamesPlayed)});
      });
    });
  }

}
