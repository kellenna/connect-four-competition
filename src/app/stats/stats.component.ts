import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConnectFourService } from '../core/services/connect-four.service'
import { TeamsService } from "../core/services/teams.service";
import { Stats, IStats, TeamStat } from "../core/models/stats.model";
import { Team } from "../core/models/team.model";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  stats: Stats = null;
  teamStats: { [Key: string]: BestOfCategory };
  staticTeams: Team[];

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
    let shouldBeBigger: boolean = true;

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
      this.teamStats[cat].teamName = this.getLink(boardName, teamStat.name);
      this.teamStats[cat].unit = unit;
    }
    if (this.teamStats[cat].characteristic === characteristic && characteristic > 0 && this.teamStats[cat].teamName.indexOf(teamStat.name) < 0) {
      this.teamStats[cat].teamName += "<br/>" + this.getLink(boardName, teamStat.name);
    }
  }

  getLink(boardName: string, teamName: string): string {
    if(boardName != null){
      return "<a href='board/" + boardName + "/" + teamName + "' title='" + boardName + "' target='_blank'>" + teamName + "</a>";
    }
    return teamName;
  }

  constructor(private teamsService: TeamsService, private connectFourService: ConnectFourService) { }

  ngOnInit() {

    this.connectFourService.getStats().subscribe(stats => {
      this.stats = new Stats(stats);
      this.teamStats = {};

      this.teamsService.getTeams().subscribe(teams => {
        this.staticTeams = teams;

        Object.keys(stats.teamStats).forEach(key => {
          let teamStat = this.stats.teamStats[key];
          const team = this.staticTeams.find(t => t.name === key);

          for (let cat of this.categories()) {
            if (this.teamStats[cat] == undefined) {
              this.teamStats[cat] = new BestOfCategory();
            }
            if (team == undefined || !team.isOnlyShownWithStats) {
              this.setCharacteristics(cat, teamStat);
            }
          }
        });
      });
    });
  }
}

export class BestOfCategory {
  characteristic: number = 0;
  unit: string = "";
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
