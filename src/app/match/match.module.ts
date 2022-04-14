import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match.component';
import { MatchService } from './services/match.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MatchComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [],
  providers: [
    MatchService
  ],
  schemas: []
})
export class MatchModule { }
