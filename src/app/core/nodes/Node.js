import { Container, Sprite, Graphics } from 'pixi.js';

import * as Color from '../display/Colors.js';

export class Node extends Container {
  constructor(assets, w, h) {
    super();
    this.cur = 0;

    this.halo = new Graphics();
    this.halo.beginFill(0xFFFFFF);
    this.halo.drawStar(0, 0, 8, 100);
    this.halo.alpha = 0.25;
    this.halo.visible = false;
    this.addChild(this.halo);

    this.scale.set(w/1400);
  }

  select() {
    this.selected = !this.selected;
    this.halo.visible = this.selected;
  }


  increase() {
    if (this.cur < this.max) {
      this.cur++;
      this.node.tint = 0xFFFFFF;
      this.node.tint = this.colors[this.cur];
      return true;
    } else {
      return false;
    }
  }

  canConnect(node) {
    return true;
  }

  decrease() {
    this.cur--;
    this.node.tint = 0xFFFFFF;
    this.node.tint = this.colors[this.cur];
  }

  complete() {
    return this.cur === this.max;
  }
}
