import { Container, Sprite, Graphics } from 'pixi.js';

export class Node extends Container {
  constructor(assets, type) {
    super();
    this.type = type;
    switch (type) {
      case 0:
        this.textures = assets.nodeA;
        break;
      case 1:
        this.textures = assets.nodeB;
        break;
      case 2:
        this.textures = assets.nodeC;
        break;
      default:
        console.log("JSON ERROR");
    }
    this.cur = 0;
    this.max = this.textures.length - 1;

    this.halo = new Graphics();
    this.halo.beginFill(0xFCBF49);
    this.halo.drawStar(0, 0, 8, 100);
    this.halo.alpha = 0.25;
    this.halo.visible = false;

    this.nodeTypes = assets.nodeTypes;
    this.node = new Sprite(this.textures[this.cur]);
    this.node.anchor.set(0.5);
    this.selected = false;
    this.addChild(this.halo, this.node);
  }

  select() {
    this.selected = !this.selected;
    this.halo.visible = this.selected;
  }


  increase() {
    if (this.cur < this.max) {
      this.cur++;
      this.node.texture = this.textures[this.cur];
      return true;
    } else {
      return false;
    }
  }

  decrease() {
    this.cur--;
    this.node.texture = this.textures[this.cur];
  }

  complete() {
    return this.cur === this.max;
  }
}
