import { Injectable } from '@angular/core';
import { Ladder } from './models/ladder';
import { Player, } from './models/player';
import { Snake } from './models/snake';
import { Tile } from './models/tile';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  players: Player[] = [];
  canvasRenderingContext!: CanvasRenderingContext2D;
  tiles: Tile[] = [];
  snakes: Snake[] = [];
  ladders: Ladder[] = [];
  sizeBoard: number = 10;
  endTile: number = 99;

  constructor() { }

  initPlayer(playerList: Player[]){
   for (let player of playerList) {
     player.color = this.getRandomColor();
   }
    this.players = playerList;
  }

  setSizeBoard(size: number){
    this.sizeBoard = +size;
    this.tiles = [];
    this.endTile = (this.sizeBoard * this.sizeBoard) - 1;
  }

  getRandomColor() : string{
    return '#' + Math.floor(Math.random()*16777215).toString(16);
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
