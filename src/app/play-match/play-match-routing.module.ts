import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayMatchComponent } from "./play-match.component";

const routes: Routes = [{
  path: 'play-match',
  component: PlayMatchComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayMatchRoutingModule { }
