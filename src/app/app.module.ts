import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';

import { ConnectFourService } from './core/services/connect-four.service'
import { ConnectFourServiceMock } from './core/services/connect-four.service.mock'
import { GamesModule } from "./games/games.module";
import { BoardsModule } from "./boards/boards.module";
import { BoardModule } from "./board/board.module";
import { TeamsModule } from "./teams/teams.module";
import { TeamsService } from "./core/services/teams.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    BoardsModule,
    BoardModule,
    GamesModule,
    TeamsModule
  ],
  providers: [
    ConnectFourService, 
    ConnectFourServiceMock,
    TeamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
