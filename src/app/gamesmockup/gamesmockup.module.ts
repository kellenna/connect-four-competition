import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesmockupRoutingModule } from './gamesmockup-routing.module';
import { GamesmockupComponent } from './gamesmockup.component';

@NgModule({
  imports: [
    CommonModule,
    GamesmockupRoutingModule
  ],
  declarations: [GamesmockupComponent]
})
export class GamesmockupModule { }
