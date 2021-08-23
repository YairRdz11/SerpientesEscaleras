import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  player1!: string;
  player2!: string;
  constructor() { }

  initPlayer(){
    this.player1 = "player1";
    this.player2 = "player2";
  }
}
