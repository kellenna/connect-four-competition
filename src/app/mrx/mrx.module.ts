import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MrxRoutingModule } from './mrx-routing.module';
import { MrxComponent } from './mrx.component';

@NgModule({
  imports: [
    CommonModule,
    MrxRoutingModule
  ],
  declarations: [MrxComponent]
})
export class MrxModule { }
