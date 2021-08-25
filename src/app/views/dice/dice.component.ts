import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
import { Player } from 'src/app/models/player';

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
  round: number = 0;

  @Output() diceEmitter = new EventEmitter<number>();
  constructor(private canvasService: CanvasService) { }

  ngOnInit(): void {
  }

  onPlay(){
    this.isPlaying = true;
    this.round = 1;

    this.canvasService.player1.setCurrent(0);
    this.canvasService.player1.turnOn();
    this.canvasService.player1.currentTile = this.canvasService.tiles[0];
    this.movePlayer(this.canvasService.player1);

    this.canvasService.player2.setCurrent(0);
    this.canvasService.player2.turnOff();
    this.canvasService.player2.currentTile = this.canvasService.tiles[0];
    this.movePlayer(this.canvasService.player2);
  }

  movePlayer(player: Player){
    let canvasRendering: CanvasRenderingContext2D = this.canvasService.getCanvasRendering();
    let index = player.current;
    let x = this.canvasService.tiles[index].x + 25;
    let y = this.canvasService.tiles[index].y + 25;

    canvasRendering.beginPath();
    canvasRendering.arc(x, y, 13, 0, 2 * Math.PI);
    canvasRendering.fillStyle = player.color;
    canvasRendering.fill();
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
