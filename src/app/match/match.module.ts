import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatchRoutingModule } from './match-routing.module';
import { MatchComponent } from './match.component';

@NgModule({
  imports: [
    CommonModule,
    MatchRoutingModule,
    FormsModule
  ],
  declarations: [MatchComponent]
})
export class MatchModule { }
