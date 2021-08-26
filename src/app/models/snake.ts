export class Snake {
  x: number = 0;
  y: number = 0;
  degree: number = 0;
  scale: number = 1;
  imgSrc: string = "../../assets/images/";

  constructor(x: number, y: number, snakeImg: string) {
    this.x = x;
    this.y = y;
    this.imgSrc = this.imgSrc + snakeImg
  }

  draw(ctx: CanvasRenderingContext2D){
    let snakeImage = new Image();
    var x = this.x;
    var y = this.y;

    snakeImage.addEventListener('load', () => {
      ctx.drawImage(snakeImage, x, y);
    });
    snakeImage.src = this.imgSrc;
  }
}
