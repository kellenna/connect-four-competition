export interface Board {
    boardInfo: BoardInfo;
    boardStatus: BoardStatus;
    grid: string[][];
}

export interface BoardInfo {
    playerX: string;
    playerO: string;
    round: number;
}

export interface BoardStatus {
    gameFinished: boolean;
    winner: string;
    winningPosition: number[][];
    nextTurn: string;
}