import { ComplementBase } from "./complementBase";
import { Tile } from "./tile";

export class Ladder extends ComplementBase {

  constructor(x: number, y: number, tileStart: Tile, tileFinish: Tile, imgName: string) {
    super(x, y, tileStart, tileFinish, imgName);
  }

  draw(ctx: CanvasRenderingContext2D){
    let snakeImage = new Image();
    var x = this.x;
    var y = this.y;

    snakeImage.addEventListener('load', () =>{
      ctx.drawImage(snakeImage, x, y);
    });
    snakeImage.src = this.imgSrc;
  }
}
