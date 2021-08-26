export class Ladder {
  x: number = 0;
  y: number = 0;
  degree: number = 0;
  scale: number = 1;
  imgSrc: string = "../../assets/images/ladder.png";

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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
