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
  turn: number = 0;

  @Output() diceEmitter = new EventEmitter<number>();
  constructor(private _canvasService: CanvasService) { }

  ngOnInit(): void {
  }

  onPlay(){
    this.isPlaying = true;
    this.round = 1;
    this.turn = 0;

    for (let index = 0; index < this._canvasService.players.length; index++) {
      this._canvasService.players[index].setCurrent(0, this._canvasService.tiles[0]);
      this._canvasService.players[index].turnOff();
      this.movePlayer(this._canvasService.players[index]);
    }

    this._canvasService.players[0].turnOn();
  }

  movePlayer(player: Player){
    let canvasRendering: CanvasRenderingContext2D = this._canvasService.getCanvasRendering();
    let index = player.current;
    let x = this._canvasService.tiles[index].x + 25;
    let y = this._canvasService.tiles[index].y + 25;

    canvasRendering.beginPath();
    canvasRendering.arc(x, y, 13, 0, 2 * Math.PI);
    canvasRendering.fillStyle = player.color;
    canvasRendering.fill();
    canvasRendering.fillText(player.name,x, y);
  }

  refreshBoard(){
    this._canvasService.getCanvasRendering().clearRect(0, 0, 700, 700);

    for(let tile of this._canvasService.tiles){
      tile.draw(this._canvasService.getCanvasRendering());
    }

    for(let snake of this._canvasService.snakes){
      snake.draw(this._canvasService.getCanvasRendering());
    }

    for(let ladder of this._canvasService.ladders){
      ladder.draw(this._canvasService.getCanvasRendering());
    }
  }

  refreshPlayers(){
    for (const player of this._canvasService.players) {
      this.movePlayer(player);
    }
  }

  onThrow(){
    this.diceNumber = this.getRandomInt();
    this.diceEmitter.emit(this.diceNumber);

    this.refreshBoard();

    let currentPlayer = this._canvasService.players[this.turn];

    let currentTile = currentPlayer.current + this.diceNumber;
    currentPlayer.setCurrent(currentTile, this._canvasService.tiles[currentTile]);

    if(currentPlayer.current < 99){
      this._canvasService.setTurnOffPlayers();
      this.turn++;

      this.refreshPlayers();
      console.log(currentPlayer);
      if(currentPlayer.currentTile.snake){
        currentPlayer.setCurrent(currentPlayer.currentTile.snake.tileFinish.index, currentPlayer.currentTile.snake.tileFinish);
      }
      if(currentPlayer.currentTile.ladder){
        currentPlayer.setCurrent(currentPlayer.currentTile.ladder.tileFinish.index, currentPlayer.currentTile.ladder.tileFinish);
      }
      this.refreshBoard();
      this.refreshPlayers();
      console.log(currentPlayer);
      if(this.turn > this._canvasService.players.length - 1){
        this.turn = 0;
        this.round++;
      }
      this._canvasService.players[this.turn].turnOn();
    }
    else{
      alert(currentPlayer.name + " ha ganado");
      this.onRestart();
    }
  }

  onRestart(){
    this.diceNumber = 0;
    this.isPlaying = false;
    this.turn = 0;
    this.round = 0;
    for (const player of this._canvasService.players) {
      player.reset();
    }
    this._canvasService.players[this.turn].turnOn();
    this.refreshBoard();
  }

  getRandomInt() : number{
    this.min = Math.ceil(this.min);
    this.max = Math.floor(this.max);
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }
}
