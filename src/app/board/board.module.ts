import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { MatchFilterPipe } from '../core/pipes/matchfilter.pipe';

@NgModule({
  imports: [
    CommonModule,
    BoardRoutingModule,
    FormsModule
  ],
  declarations: [BoardComponent, MatchFilterPipe]
})
export class BoardModule { }
