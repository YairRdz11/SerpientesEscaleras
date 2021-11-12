import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
import { Player } from 'src/app/models/player';
import { TestServiceService } from 'src/app/services/test-service.service';
import Swal from 'sweetalert2';

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
  constructor(private _canvasService: CanvasService, private _questionService: TestServiceService) { }

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
    canvasRendering.fillStyle = '#000000';
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

  async onThrow(){
    this.diceNumber = this.getRandomInt(this.min, this.max); // cambiar si quieres variar la velocidad
    this.diceEmitter.emit(this.diceNumber);
    var currentPlayer = this._canvasService.players[this.turn];
    let currentTile = currentPlayer.current + this.diceNumber;

    this._questionService.getList().subscribe(data => {
      let random = this.getRandomInt(0, data.length -1);
      var question = data[random];
      let answers = question.answerList.map(x=> x.answer);
      var correctAnswer = question.answerList.findIndex(x=> x.isCorrect);
      const value = Swal.fire({
        title: question.question,
        input: 'radio',
        inputOptions: answers,
      }).then((result) => {

        this._canvasService.setTurnOffPlayers();
        this.turn++;
        if(this.turn > this._canvasService.players.length - 1){
          this.turn = 0;
          this.round++;
        }
        this._canvasService.players[this.turn].turnOn();

        if(correctAnswer == result.value){
          this.refreshBoard();
            currentPlayer.setCurrent(currentTile, this._canvasService.tiles[currentTile]);
          if(currentPlayer.current < 99){

            if(currentPlayer.currentTile.snake){
              currentPlayer.setCurrent(currentPlayer.currentTile.snake.tileFinish.index, currentPlayer.currentTile.snake.tileFinish);
            }
            if(currentPlayer.currentTile.ladder){
              currentPlayer.setCurrent(currentPlayer.currentTile.ladder.tileFinish.index, currentPlayer.currentTile.ladder.tileFinish);
            }
            this.refreshPlayers();
            Swal.fire({
              icon: 'success',
              title: 'Correcto!',
              text: 'Sigue asi!'
            })
          }
          else{
            Swal.fire({
            title: 'Felicidades '+ currentPlayer.name+ ', has ganado',
            width: 600,
            padding: '3em',
            background: '#fff url(../../assets/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("../../assets/images/nyan-cat.gif")
              left top
              no-repeat
            `
            })
          }
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Ops!',
            text: 'Te haz equivocado!'
          });
        }
      });

    });
  }

  movePlayerWhenIsCorrect(currentPlayer: Player){
    if(currentPlayer.current < 99){
      this._canvasService.setTurnOffPlayers();
      this.turn++;

      this.refreshPlayers();

      if(currentPlayer.currentTile.snake){
        currentPlayer.setCurrent(currentPlayer.currentTile.snake.tileFinish.index, currentPlayer.currentTile.snake.tileFinish);
      }
      if(currentPlayer.currentTile.ladder){
        currentPlayer.setCurrent(currentPlayer.currentTile.ladder.tileFinish.index, currentPlayer.currentTile.ladder.tileFinish);
      }
      this.refreshBoard();
      this.refreshPlayers();
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

  getRandomInt(min: number, max: number) : number{
    let _min = Math.ceil(min);
    let _max = Math.floor(max);
    return Math.floor(Math.random() * (_max - _min + 1)) + _min;
  }
}
