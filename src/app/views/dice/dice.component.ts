import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.css']
})
export class DiceComponent implements OnInit {
  min = 1;
  max = 6;
  isPlaying: boolean = false;
  diceNumber: number = 0;
  @Output() diceEmitter = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  
  onPlay(){
    this.isPlaying = true;
  }
  
  onThrow(){
    this.diceNumber = this.getRandomInt();
    this.diceEmitter.emit(this.diceNumber);
  }

  onRestart(){
    this.diceNumber = 0;
    this.isPlaying = false;
  }

  getRandomInt() : number{
    this.min = Math.ceil(this.min);
    this.max = Math.floor(this.max);
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min; 
  }
}
