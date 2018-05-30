import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { MatchFilterPipe } from '../core/pipes/matchfilter.pipe';
import { FilterPipe } from '../core/pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    BoardRoutingModule,
    FormsModule
  ],
  declarations: [BoardComponent, MatchFilterPipe, FilterPipe]
})
export class BoardModule { }
