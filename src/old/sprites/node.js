import * as PIXI from 'pixi.js';

import { nodeClick, nodeTypes } from '../canvas.js';
import Nodes from '../../images/nodes.png';

export class Node {
  constructor(type, x, y) {
    if (type == 'A') {
      this.setA();
    } else if (type == 'B') {
      this.setB();
    } else if (type == 'C') {
      this.setC();
    }
    this.sprite = new PIXI.Sprite(nodeTypes[this.min]);
    this.sprite.buttonMode = true;
    this.sprite.interactive = true;
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.5);
    this.sprite.position.set(x, y);
    this.sprite.tap = nodeClick;
    this.sprite.click = nodeClick;
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

  connect() {
    if (this.min < this.max) {
      this.min++;
      this.sprite.texture = nodeTypes[this.min];
      return true;
    } else {
      return false;
    }
  }

  break() {
    this.min--;
    this.sprite.texture = nodeTypes[this.min];
  }
}
