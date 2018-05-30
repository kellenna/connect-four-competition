import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    transform(items: string[], searchBoard: string): any[] {
        if (!items) return [];
        if (!searchBoard) return items;
        searchBoard = searchBoard.toLowerCase();
        return items.filter(it => {
            return it.toLowerCase().includes(searchBoard);
        });
    }
}