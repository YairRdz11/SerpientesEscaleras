import { Injectable } from '@angular/core';
import { Tile } from './models/Tile';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  
  player1!: string;
  player2!: string;
  canvasRenderingContext!: CanvasRenderingContext2D;
  tiles :Tile[] = [];
  
  constructor() { }

  initPlayer(){
    this.player1 = "player1";
    this.player2 = "player2";
  }

  setCanvas(canvasRenderingContext: CanvasRenderingContext2D) {
    this.canvasRenderingContext = canvasRenderingContext;
  }
}
