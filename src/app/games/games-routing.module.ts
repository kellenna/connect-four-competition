import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from "./games.component";

const routes: Routes = [{
    path: 'games',
    component: GamesComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
