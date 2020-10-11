import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ErrorsRoutingModule} from './errors-routing.module';
import {ErrorsComponent} from './errors.component';
import {Error4Component} from './error4/error4.component';


@NgModule({
  declarations: [ ErrorsComponent, Error4Component],
  imports: [
    CommonModule,
    ErrorsRoutingModule
  ]
})
export class ErrorsModule {}
