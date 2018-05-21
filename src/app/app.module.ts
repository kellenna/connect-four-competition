import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardsComponent } from './boards/boards.component';

import { ConnectFourService } from './core/services/connect-four.service'
import { ConnectFourServiceMock } from './core/services/connect-four.service.mock'
import { GamesModule } from "./games/games.module";
import { GamesmockupModule } from "./gamesmockup/gamesmockup.module";
import { BoardsModule } from "./boards/boards.module";
import { BoardModule } from "./board/board.module";
import { TeamsModule } from "./teams/teams.module";
import { PlayMatchModule } from "./play-match/play-match.module";
import { TeamsService } from "./core/services/teams.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    BoardsModule,
    BoardModule,
    GamesModule,
    GamesmockupModule,
    TeamsModule,
    PlayMatchModule
  ],
  providers: [
    ConnectFourService, 
    ConnectFourServiceMock,
    TeamsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
