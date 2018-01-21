export interface Board {
    boardInfo: BoardInfo;
    boardStatus: BoardStatus;
    grid: string[][];
}

export interface BoardInfo {
    playerX: string;
    playerO: string;
}

export interface BoardStatus {
    gameFinished: boolean;
    winner: string;
    winningPosition: number[][];
    nextTurn: string;
}