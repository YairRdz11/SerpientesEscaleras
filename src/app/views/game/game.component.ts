import { Component, OnInit } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit {
  steps: number = 0;
  players :Player[] = [];


  constructor(private _canvasService: CanvasService) {
  }

  ngOnInit(): void {
    this._canvasService.initPlayer();
    this.players = this._canvasService.players;
  }

  getSteps(steps: number){
    this.steps = steps;
  }

}
