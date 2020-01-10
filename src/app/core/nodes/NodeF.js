import { Container, Sprite, Graphics } from 'pixi.js';

import { Node } from './Node.js';
import * as Color from '../display/Colors.js';

export class NodeF extends Node {
  constructor(assets, w, h) {
    super(assets, w, h);
    this.type = 5;
    this.node = new Sprite(assets.nodeF);
    this.colors = Color.nodeC;
    this.node.anchor.set(0.5);
    this.node.tint = this.colors[0];
    this.max = this.colors.length - 1;
    this.addChild(this.node);
  }

  canConnect(node) {
    return node.type >= 3;
  }
}
