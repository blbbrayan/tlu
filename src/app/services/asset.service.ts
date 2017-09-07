import { Injectable } from '@angular/core';

@Injectable()
export class AssetService {

  canvas: HTMLCanvasElement;
  buttons: HTMLImageElement;
  elements: HTMLImageElement;
  windows: HTMLImageElement;

  constructor() {this.init();}

  getImgSrc(img, x, y, width, height): string {
    this.canvas.style.width = width;
    this.canvas.style.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    let screen = this.canvas.getContext('2d');
    screen.clearRect(0, 0, width, height);
    screen.drawImage(img, x, y, width, height);
    return this.canvas.toDataURL();
  }

  private init(){
    const create = tag => document.createElement(tag);
    const loadImg = (src, canvas): HTMLImageElement => {
      let img = create('img');
      img.src = src;
      document.appendChild(canvas);
      return img;
    };

    this.canvas = <HTMLCanvasElement>create('canvas');
    this.buttons = loadImg('assets/ui/Buttons.png', this.canvas);
    this.elements = loadImg('assets/ui/Elements.png', this.canvas);
    this.windows = loadImg('assets/ui/Windows.png', this.canvas);

    this.canvas.style.display = 'none';
  }

}
