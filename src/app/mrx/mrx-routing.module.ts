import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MrxComponent } from './mrx.component';

const routes: Routes = [{
  path: 'mrx',
  component: MrxComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MrxRoutingModule { }
