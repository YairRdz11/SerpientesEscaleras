import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styles: [
  ]
})
export class GameComponent implements OnInit {
  steps: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  getSteps(steps: number){
    this.steps = steps;
  }

}
