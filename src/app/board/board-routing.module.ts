import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from "./board.component";

const routes: Routes = [  
  { path: 'board/:name/:team', component: BoardComponent },
  { path: 'board', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
