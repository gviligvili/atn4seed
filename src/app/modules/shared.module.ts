import {MyScrollbar} from './../directives/myScrollbar';
import {NgModule}            from '@angular/core';
import {CommonModule}        from '@angular/common';
import {FormsModule, ReactiveFormsModule}         from '@angular/forms';
import {LoadingSpinner} from "../directives/LoadingSpinner/loading-spinner.component";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MyScrollbar,
    LoadingSpinner
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyScrollbar,
    LoadingSpinner
  ]
})
export class SharedModule {
}
