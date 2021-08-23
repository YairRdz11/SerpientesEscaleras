import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CanvasService } from 'src/app/canvas.service';
import { Tile } from '../../models/Tile';

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

