import { Container, Sprite, Graphics } from 'pixi.js';

import * as Color from './Colors.js';

export class Node extends Container {
  constructor(assets, type, w, h) {
    super();
    this.type = type;
    switch (type) {
      case 0:
        this.texture = assets.nodeA;
        this.colors = Color.nodeA;
        break;
      case 1:
        this.texture = assets.nodeB;
        this.colors = Color.nodeB;
        break;
      case 2:
        this.texture = assets.nodeC;
        this.colors = Color.nodeC;
        break;
      case 3:
        this.texture = assets.nodeD;
        this.colors = Color.nodeD;
        break;
      default:
        console.log("JSON ERROR: Type " + type + " called upexpectedly!");
    }
    this.cur = 0;
    this.max = this.colors.length - 1;
    this.halo = new Graphics();
    this.halo.beginFill(0xFCBF49);
    this.halo.drawStar(0, 0, 8, 100);
    this.halo.alpha = 0.25;
    this.halo.visible = false;

    this.nodeTypes = assets.nodeTypes;
    this.node = new Sprite(this.texture);
    this.node.anchor.set(0.5);
    this.node.tint = this.colors[0];
    this.selected = false;
    this.addChild(this.halo, this.node);

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

  decrease() {
    this.cur--;
    this.node.tint = 0xFFFFFF;
    this.node.tint = this.colors[this.cur];
  }

  complete() {
    return this.cur === this.max;
  }
}
