import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardsComponent } from "./boards.component";

const routes: Routes = [{
    path: 'boards',
    component: BoardsComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BoardsRoutingModule { }
