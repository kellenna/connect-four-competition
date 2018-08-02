export interface Board {
    boardId: string;
    boardInfo: BoardInfo;
    boardStatus: BoardStatus;
    grid: string[][];
    boardAsString: string;
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