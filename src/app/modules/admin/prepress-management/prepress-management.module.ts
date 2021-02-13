import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatemakingComponent } from './platemaking/platemaking.component';
import { MaterialUiModule } from '../../material-ui/material-ui.module';
import { SharedModule } from '../../shared/shared.module';
import { PrepressManagementRoutingModule } from './prepress-management-routing.module';



@NgModule({
  declarations: [PlatemakingComponent],
  imports: [
    CommonModule,
    MaterialUiModule,
    SharedModule,
    PrepressManagementRoutingModule,
  ]
})
export class PrepressManagementModule { }
