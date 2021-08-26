import { Injectable } from '@angular/core';
import { Ladder } from './models/ladder';
import { Player, } from './models/player';
import { Snake } from './models/snake';
import { Tile } from './models/tile';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  player1!: Player;
  player2!: Player;
  players: Player[] = [];
  canvasRenderingContext!: CanvasRenderingContext2D;
  tiles: Tile[] = [];
  snakes: Snake[] = [];
  ladders: Ladder[] = [];

  constructor() { }

  initPlayer(){
    this.player1 = new Player("Player 1","#B71C1C");
    this.player2 = new Player("Player 2" , '#4A148C');
    this.players.push(this.player1);
    this.players.push(this.player2);
  }

  setCanvas(canvasRenderingContext: CanvasRenderingContext2D) {
    this.canvasRenderingContext = canvasRenderingContext;
  }

  getCanvasRendering(): CanvasRenderingContext2D {
    return this.canvasRenderingContext;
  }

  setTurnOffPlayers(){
    for (const player of this.players) {
      player.turnOff();
    }
  }
}
