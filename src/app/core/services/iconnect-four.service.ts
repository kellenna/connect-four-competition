
import { Observable } from 'rxjs/Observable';

import { Board } from '../models/board.model';
import { Match } from '../models/match.model';
import { IStats } from '../models/stats.model';

export interface IConnectFourService {
    getBoards() : Observable<string[]>;
    getBoard(boardName: string) : Observable<Board>;
    postColumn(boardName: string, colume: number, discColor: string) : Observable<Board>;
    getMatches() : Observable<Match[]>;
    postMatch(pRound: number, team1Name: string, team2Name: string, numberOfMatches: number) : Observable<Match>;
    getStats() : Observable<IStats>;
}