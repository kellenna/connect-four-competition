export interface IStats {
    teamStats: { [Key: string]: TeamStat }
}

export interface ITeamStat {
    name: string;
    gamesPlayed: number;
    wonGames: Game;
    lostGames: Game;
    drawGames: Game;
    longestDiscDurationMs: number;
}

export interface IGame {
    gamesTotal: number;
    discTotal: number;
    longestGame: number;
    longestGameBoardName: string;
    shortestGame: number;
    shortestGameBoardName: string;
}

export class Stats implements IStats {
    teamStats: { [Key: string]: TeamStat } = {}

    constructor(stats: IStats) {
        Object.keys(stats.teamStats).forEach(key => {
            this.teamStats[key] = new TeamStat(stats.teamStats[key]);
        });
    }
}

export class TeamStat implements ITeamStat {
    name: string;
    gamesPlayed: number;
    wonGames: Game;
    lostGames: Game;
    drawGames: Game;
    longestDiscDurationMs: number;

    constructor(teamStat: ITeamStat) {
        Object.assign(this, teamStat);
        this.wonGames = new Game(teamStat.wonGames);
        this.lostGames = new Game(teamStat.lostGames);
        this.drawGames = new Game(teamStat.drawGames);
    }

    get wonRatio():number {
        return Math.round(this.wonGames.gamesTotal * (100 / this.gamesPlayed))
    }
    get lostRatio():number {
        return Math.round(this.lostGames.gamesTotal * (100 / this.gamesPlayed))
    }
    get drawRatio():number {
        return Math.round(this.drawGames.gamesTotal * (100 / this.gamesPlayed))
    }

    get avgDiscsInWon():number {
        return Math.round(this.wonGames.discTotal / this.wonGames.gamesTotal)
    }
    get avgDiscsInLost():number {
        return Math.round(this.wonGames.discTotal / this.lostGames.gamesTotal)
    }
    get avgDiscsInDraw():number {
        return Math.round(this.drawGames.discTotal / this.drawGames.gamesTotal)
    }
}

export class Game implements IGame {
    gamesTotal: number;
    discTotal: number;
    longestGame: number;
    longestGameBoardName: string;
    shortestGame: number;
    shortestGameBoardName: string;

    constructor(game: IGame) {
        Object.assign(this, game);
    }
}