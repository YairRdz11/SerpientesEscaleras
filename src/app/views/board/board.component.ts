import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
import { Ladder } from 'src/app/models/ladder';
import { Snake } from 'src/app/models/snake';
import { Tile } from '../../models/tile';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styles: [
  ]
})
export class BoardComponent implements OnInit {
  @ViewChild('mycanvas')
  canvasRef!: ElementRef;
  canvasRenderingContext!: CanvasRenderingContext2D;
  width: number = 0;
  resolution: number = 70;
  snake1!: Snake;
  snake2!: Snake;
  snake3!: Snake;
  ladder1!: Ladder;
  ladder2!: Ladder;
  ladder3!: Ladder;

  constructor(private canvasService: CanvasService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void{
    this.canvasRenderingContext = this.canvasRef.nativeElement.getContext('2d');
    this.canvasService.setCanvas(this.canvasRenderingContext);

    this.setupBoard();

    for(let tile of this.canvasService.tiles){
      tile.draw(this.canvasRenderingContext);
    }

    this.setupSnake();
    for (let snake of this.canvasService.snakes) {
      snake.draw(this.canvasService.getCanvasRendering());
    }

    this.setupLadder();
    for (let ladder of this.canvasService.ladders) {
      ladder.draw(this.canvasService.getCanvasRendering());
    }
  }

  setupSnake(){
    this.canvasService.snakes = [];
    switch(this.canvasService.sizeBoard){
      case 10:
        this.snake1 = new Snake(0, 140, this.canvasService.tiles[79], this.canvasService.tiles[42],"snake-small.png");
        let snake2 = new Snake(420,70, this.canvasService.tiles[86], this.canvasService.tiles[51],"snake-small.png");
        let snake3 = new Snake(280,420, this.canvasService.tiles[34], this.canvasService.tiles[5],"snake-small1.png");
        this.canvasService.snakes.push(this.snake1);
        this.canvasService.snakes.push(snake2);
        this.canvasService.snakes.push(snake3);

        this.canvasService.tiles[79].setSnake(this.snake1);
        this.canvasService.tiles[86].setSnake(snake2);
        this.canvasService.tiles[34].setSnake(snake3);
        break;
      case 7:
        this.snake1 = new Snake(0, 210, this.canvasService.tiles[27], this.canvasService.tiles[2],"snake-small.png");
        this.canvasService.snakes.push(this.snake1);
        this.canvasService.tiles[27].setSnake(this.snake1);

        this.snake2 = new Snake(210, 0, this.canvasService.tiles[45], this.canvasService.tiles[22],"snake-small.png");
        this.canvasService.snakes.push(this.snake2);
        this.canvasService.tiles[45].setSnake(this.snake2);
        break;
    }
  }

  setupLadder(){
    this.canvasService.ladders = [];
    switch(this.canvasService.sizeBoard){
      case 10:
        this.ladder1 = new Ladder(280, 100, this.canvasService.tiles[18], this.canvasService.tiles[38], "ladder.png");
        this.canvasService.ladders.push(this.ladder1);
        this.canvasService.tiles[18].setLadder(this.ladder1);

        this.ladder2 = new Ladder(70, 450, this.canvasService.tiles[64], this.canvasService.tiles[84], "ladder.png");
        this.canvasService.ladders.push(this.ladder2);
        this.canvasService.tiles[64].setLadder(this.ladder2);
        break;
      case 7:
        this.ladder1 = new Ladder(0, 30, this.canvasService.tiles[28], this.canvasService.tiles[42], "ladder.png");
        this.canvasService.ladders.push(this.ladder1);
        this.canvasService.tiles[28].setLadder(this.ladder1);

        this.ladder2 = new Ladder(350, 230, this.canvasService.tiles[8], this.canvasService.tiles[22], "ladder.png");
        this.canvasService.ladders.push(this.ladder2);
        this.canvasService.tiles[8].setLadder(this.ladder2);
        break;
    }
  }

  setupBoard() {
    let cols = this.canvasService.sizeBoard;
    let rows = this.canvasService.sizeBoard;
    this.width = this.canvasService.sizeBoard * this.resolution;
    let dir = 1;

    let x = 0;
    let y = (rows - 1) * this.resolution;

    for(let i = 0; i < cols * rows; i++){
      let tile = new Tile(x, y, this.resolution, i)
      this.canvasService.tiles.push(tile);

      x = x + (this.resolution * dir);
      if(x >= this.width || x <= -this.resolution){
        dir *= -1;
        x += this.resolution * dir;
        y -= this.resolution;
      }
    }
  }
}

