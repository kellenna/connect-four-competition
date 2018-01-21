import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Team } from "../models/team.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TeamsService {  
    private jsonUrl: string = '../../assets/data/teams.json';
  
    constructor(private http: Http){ }

    getTeams() : Observable<Team[]> {
        return this.http.get(this.jsonUrl)
      .map(x => x.json());
    }
}