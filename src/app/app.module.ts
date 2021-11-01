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
import { ManageTestComponent } from './views/manage-test/manage-test.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    BoardComponent,
    GameComponent,
    ScoreComponent,
    PlayerComponent,
    DiceComponent,
    ManageTestComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [CanvasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
