import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitButtonModule } from 'primeng/splitbutton';
import {HeloComponent} from "../helo/helo.component";


@NgModule({
  declarations: [HeloComponent],
  exports: [
    HeloComponent
  ],
  imports: [
    SplitButtonModule,
    CommonModule,

  ]
})
export class HelloModuleModule { }
