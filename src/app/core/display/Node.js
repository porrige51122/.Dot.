import { Container, Sprite, Graphics } from 'pixi.js';

export class Node extends Container {
  constructor(assets, type) {
    super();
    switch (type) {
      case 0:
        this.setA();
        break;
      case 1:
        this.setB();
        break;
      case 2:
        this.setC();
        break;
      default:
        console.log("JSON ERROR");
    }
    this.halo = new Graphics();
    this.halo.beginFill(0xFCBF49);
    this.halo.drawStar(0, 0, 8, 100);
    this.halo.alpha = 0.25;
    this.halo.visible = false;

    this.nodeTypes = assets.nodeTypes;
    this.node = new Sprite(this.nodeTypes[this.min]);
    this.node.anchor.set(0.5);
    this.selected = false;
    this.addChild(this.halo, this.node);
  }

  setA() {
    this.min = 0;
    this.max = 1;
  }

  setB() {
    this.min = 2;
    this.max = 4;
  }

  setC() {
    this.min = 5;
    this.max = 8;
  }

  select() {
    this.selected = !this.selected;
    this.halo.visible = this.selected;
  }


  increase() {
    if (this.min < this.max) {
      this.min++;
      this.node.texture = this.nodeTypes[this.min];
      return true;
    } else {
      return false;
    }
  }

  decrease() {
    this.min--;
    this.node.texture = this.nodeTypes[this.min];
  }

  complete() {
    return this.min == this.max;
  }
}
