import { Ladder } from "./ladder";
import { Snake } from "./snake";

export class Tile {
    x!:number;
    y!:number;
    resolution!:number;//resolution
    next!:number;//next tile in line.
    color:any;
    index! : number;
    readonly blueColor = '#0091EA';
    readonly whiteColor = '#FFFFFF';
    snake!: Snake;
    ladder!: Ladder;

    constructor(x:number,y: number,resolution:number,index:number){
        this.x = x;
        this.y = y;
        this.resolution = resolution;
        this.index = index;
        if(this.index %2 == 0){
            this.color = this.blueColor;
        }else{
            this.color = this.whiteColor;
        }
    }

    draw(canvasRenderingContext: CanvasRenderingContext2D) {
        canvasRenderingContext.fillStyle = this.color;
        canvasRenderingContext.fillRect(this.x, this.y, this.resolution, this.resolution);
        canvasRenderingContext.fillStyle='#000000';
        canvasRenderingContext.font="bold 13px Arial";
        canvasRenderingContext.fillText((this.index+1).toString(),(this.x),(this.y+20));
    }

    setSnake(snake: Snake){
      this.snake = snake;
    }

    setLadder(ladder: Ladder){
      this.ladder = ladder;
    }
}
