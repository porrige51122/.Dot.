import { Application } from 'pixi.js';

export class Canvas {
  constructor() {
    this.r = { w: 16, h: 9 };
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.resize();

    this.app = new Application({
      height: this.height,
      width: this.width,
      backgroundColor : 0xFCBF49
    });
    document.body.appendChild(this.app.view)

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.resize();
      this.app.renderer.resize(this.width, this.height);
    });
  }

  resize() {
    if (this.height * this.r.w > this.width * this.r.h) {
      this.height = this.width * (this.r.h / this.r.w);
    } else {
      this.width = this.height * (this.r.w / this.r.h);
    }
  }
}
