import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesmockupComponent } from "./gamesmockup.component";

const routes: Routes = [{
    path: 'gamesmockup',
    component: GamesmockupComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GamesmockupRoutingModule { }
