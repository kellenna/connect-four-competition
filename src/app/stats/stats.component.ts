import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConnectFourService } from '../core/services/connect-four.service'
import { Stats, IStats, TeamStat } from "../core/models/stats.model";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: Stats = null;
  teamStats: { [Key: string]: BestOfCategory };

  categories(): Array<string> {
    var keys = Object.keys(StatCategory);
    return keys.slice(keys.length / 2);
  }

  teams(): Array<string> {
    return Object.keys(this.stats.teamStats);
  }

  catDesc(cat: string) {
    switch (cat) {
      case "BiggestWonRatio": return "der Spiele gewonnen";
      case "BiggestLostRatio": return "der Spiele verloren";
      case "BiggestDrawRatio": return "der Spiele unentschieden";
      case "LongestWonGame": return "Steine im langsamsten Gewinn";
      case "ShortestWonGame": return "Steine im schnellsten Gewinn";
      case "LongestLostGame": return "Steine in der langsamsten Niederlage";
      case "ShortestLostGame": return "Steine in der schnellsten Niederlage";
      case "LowestAvgDiscsInWonGames": return "Steine und damit am wenigsten Steine in gewonnen Spielen gesetzt";
      case "BiggestAvgDiscsInLostGames": return "Steine und damit am meisten Steine in verlorerenem Spielen gesetzt";
      case "LongestDiscDurationMs": return "Langsamster Zug von allen";
    }
  }

  setCharacteristics(cat: string, teamStat: TeamStat) {
    let characteristic: number = 0;
    let boardName: string = null;
    let unit: string = "";
    let shouldBeBigger:boolean = true;

    switch (cat) {
      case "BiggestWonRatio": characteristic = teamStat.wonRatio; unit = "%"; break;
      case "BiggestLostRatio": characteristic = teamStat.lostRatio; unit = "%"; break;
      case "BiggestDrawRatio": characteristic = teamStat.drawRatio; unit = "%"; break;
      case "LongestWonGame": characteristic = teamStat.wonGames.longestGame; boardName = teamStat.wonGames.longestGameBoardName; break;
      case "ShortestWonGame": characteristic = teamStat.wonGames.shortestGame; boardName = teamStat.wonGames.shortestGameBoardName; shouldBeBigger = false; break;
      case "LongestLostGame": characteristic = teamStat.lostGames.longestGame; boardName = teamStat.lostGames.longestGameBoardName; break;
      case "ShortestLostGame": characteristic = teamStat.lostGames.shortestGame; boardName = teamStat.lostGames.shortestGameBoardName; shouldBeBigger = false; break;
      case "LowestAvgDiscsInWonGames": characteristic = teamStat.avgDiscsInWon; shouldBeBigger = false; break;
      case "BiggestAvgDiscsInLostGames": characteristic = teamStat.avgDiscsInLost; break;
      case "LongestDiscDurationMs": characteristic = teamStat.longestDiscDurationMs; unit = "ms"; break;
    }

    if ((shouldBeBigger && this.teamStats[cat].characteristic < characteristic)
    || (!shouldBeBigger && (this.teamStats[cat].characteristic > characteristic || this.teamStats[cat].characteristic === 0))) {
      this.teamStats[cat].characteristic = characteristic;
      this.teamStats[cat].boardName = boardName;
      this.teamStats[cat].teamName = teamStat.name;
      this.teamStats[cat].unit = unit;
    }
  }

  constructor(private connectFourService: ConnectFourService) { }

  ngOnInit() {

    this.connectFourService.getStats().subscribe(stats => {
      this.stats = new Stats(stats);
      this.teamStats = {};

      Object.keys(stats.teamStats).forEach(key => {
        let teamStat = this.stats.teamStats[key];

        for (let cat of this.categories()) {
          if (this.teamStats[cat] == undefined) {
            this.teamStats[cat] = new BestOfCategory();
          }
          this.setCharacteristics(cat, teamStat);
        }
      });
    });
  }
}

export class BestOfCategory {
  characteristic: number = 0;
  unit: string = "";
  boardName: string = null;
  teamName: string = null;

  constructor() { }
}

export enum StatCategory {
  BiggestWonRatio,
  BiggestLostRatio,
  BiggestDrawRatio,

  LongestWonGame,
  ShortestWonGame,
  LongestLostGame,
  ShortestLostGame,

  LowestAvgDiscsInWonGames,
  BiggestAvgDiscsInLostGames,

  LongestDiscDurationMs
}
