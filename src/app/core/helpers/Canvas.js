import { Application } from 'pixi.js';

export class Canvas {
  constructor() {
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    this.app = new Application({
      height: this.height,
      width: this.width,
      backgroundColor : 0xFCBF49
    });
    document.body.appendChild(this.app.view)

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.app.renderer.resize(this.width, this.height);
    });
  }
}
