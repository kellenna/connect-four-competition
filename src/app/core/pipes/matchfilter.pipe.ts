import { Pipe, PipeTransform } from '@angular/core';
import { Match } from '../models/match.model';

@Pipe({
    name: 'matchfilter'
})
export class MatchFilterPipe implements PipeTransform {
    transform(items: Match[], searchTeam: string): any[] {
        if (!items) return [];
        if (!searchTeam) return items;
        searchTeam = searchTeam.toLowerCase();
        return items.filter(it => {
            return it.team1.toLowerCase().includes(searchTeam) || it.team2.toLowerCase().includes(searchTeam);
        });
    }
}