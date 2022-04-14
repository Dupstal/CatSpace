import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [],
  providers: [],
  schemas: []
})
export class HomeModule { }
