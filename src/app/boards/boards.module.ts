import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from "./boards.component";

@NgModule({
  imports: [
    CommonModule,
    BoardsRoutingModule
  ],
  declarations: [BoardsComponent]
})
export class BoardsModule { }
