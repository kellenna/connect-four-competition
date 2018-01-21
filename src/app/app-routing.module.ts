import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from "./games/games.component";
import { BoardsComponent } from "./boards/boards.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
