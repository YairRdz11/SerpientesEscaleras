import { Tile } from "./tile";

export abstract class ComplementBase {
  x: number = 0;
  y: number = 0;
  tileStart!: Tile;
  tileFinish!: Tile;
  imgSrc: string = "../../assets/images/";

  constructor(x: number, y: number, tileStart: Tile, tileFinish: Tile, imgName: string) {
    this.x = x;
    this.y = y;
    this.tileFinish = tileFinish;
    this.tileStart = tileStart;
    this.imgSrc = this.imgSrc + imgName
  }
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
