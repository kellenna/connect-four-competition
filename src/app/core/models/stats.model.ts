export interface Stats {
    teamStats: { [Key: string]: TeamStat }
}

export interface TeamStat {
    name: string;
    gamesPlayed: number;
    wonGames: Game;
    lostGames: Game;
    drawGames: Game;
    longestDiscDurationMs: number;
}

export interface Game {
    gamesTotal: number;
    discTotal: number;
    longestGame: number;
    longestGameBoardName: string;
    shortestGame: number;
    shortestGameBoardName: number;
}