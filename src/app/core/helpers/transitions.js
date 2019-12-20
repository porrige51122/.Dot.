import { Ticker } from 'pixi.js';

export class Transitions {
  constructor(GameController) {
    this.width = GameController.canvas.width;
    this.height = GameController.canvas.height;

    this.a;
    this.b;
    this.slide = false;
    this.fadein = false;
    this.fadeout = false;

    Ticker.shared.add(this.slideloop, this);
    Ticker.shared.add(this.fadeloop, this);
  }

  slideloop() {
    if (this.slide) {
      if (this.height < this.a.y) {
        this.a.y = 0;
        this.b.y = 0;
        this.a.visible = false;
        this.slide = false;
      } else {
        this.a.vy += 0.3;
        this.a.y += this.a.vy;
        this.b.y += this.a.vy;
      }
    }
  }
  
  fadeloop() {
    if (this.fadeout) {
      this.a.alpha -= 0.01;
      if (!this.fadein && this.a.alpha < 0.25) {
        this.fadein = true;
      }
      if (this.a.alpha < 0) {
        this.a.visible = false;
        this.a.alpha = 1;
        this.fadeout = false;
      }
    }
    if (this.fadein) {
      this.b.alpha += 0.01;
      if (this.b.alpha > 1) {
        this.b.alpha = 1;
        this.fadein = false;
      }
    }
  }

  transitionSlide(a, b) {
    let h = this.height;
    a.vy = 1;
    a.y = 0;
    a.alpha = 1;
    b.alpha = 1;
    b.vy = 0;
    b.y = -h;
    b.visible = true;
    this.a = a;
    this.b = b;
    this.slide = true;
  }

  transitionFade(a, b) {
    a.vy = 0;
    a.y = 0;
    a.alpha = 1;
    b.vy = 0;
    b.y = 0
    b.alpha = 0;
    b.visible = true;
    this.a = a;
    this.b = b;
    this.fadeout = true;
  }
}
