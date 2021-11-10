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

  initPlayer(playerList: Player[]){
   for (let player of playerList) {
     player.color = '#' + Math.floor(Math.random()*16777215).toString(16);
   }
    this.players = playerList;
    console.log(this.players);
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
