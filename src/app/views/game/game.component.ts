import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CanvasService } from 'src/app/canvas.service';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
    '.btn-linda { font-size: 30px; color: white; text-shadow: black 5px 3px 3px; background-color: #008080;}'
  ]
})
export class GameComponent implements OnInit {
  steps: number = 0;
  players :Player[] = [];


  constructor(private _canvasService: CanvasService, private router:Router) {
  }

  ngOnInit(): void {
    this.players = this._canvasService.players;
  }

  getSteps(steps: number){
    this.steps = steps;
  }

  goBack(){
    this.router.navigate(['custom-user']);
  }

}
