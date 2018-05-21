import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PlayMatchRoutingModule } from './play-match-routing.module';
import { PlayMatchComponent } from './play-match.component';

@NgModule({
  imports: [
    CommonModule,
    PlayMatchRoutingModule,
    FormsModule
  ],
  declarations: [PlayMatchComponent]
})
export class PlayMatchModule { }
