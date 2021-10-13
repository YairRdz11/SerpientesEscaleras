import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { InitComponent } from './views/init/init.component';
import { BoardComponent } from './views/board/board.component';
import { GameComponent } from './views/game/game.component';
import { CanvasService } from './canvas.service';
import { ScoreComponent } from './views/score/score.component';
import { PlayerComponent } from './views/player/player.component';
import { DiceComponent } from './views/dice/dice.component';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    BoardComponent,
    GameComponent,
    ScoreComponent,
    PlayerComponent,
    DiceComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [CanvasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
