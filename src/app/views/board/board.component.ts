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
  width: number = 700;
  height: number = 700;
  resolution: number = 70;

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
    let snake1 = new Snake(0, 140, "snake-small.png");
    let snake2 = new Snake(420,70, "snake-small.png");
    let snake3 = new Snake(280,420, "snake-small1.png");
    this.canvasService.snakes.push(snake1);
    this.canvasService.snakes.push(snake2);
    this.canvasService.snakes.push(snake3);
  }

  setupLadder(){
    let ladder1 = new Ladder(280, 100);
    this.canvasService.ladders.push(ladder1);

    let ladder2 = new Ladder(70, 450);
    this.canvasService.ladders.push(ladder2);
  }

  setupBoard() {
    let cols = this.width/this.resolution;
    let rows = this.height/this.resolution;
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

