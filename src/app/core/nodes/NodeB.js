import { Container, Sprite, Graphics } from 'pixi.js';

import { Node } from './Node.js';
import * as Color from '../display/Colors.js';

export class NodeB extends Node {
  constructor(assets, w, h) {
    super(assets, w, h);
    this.type = 1;
    this.node = new Sprite(assets.nodeB);
    this.colors = Color.nodeB;
    this.node.anchor.set(0.5);
    this.node.tint = this.colors[0];
    this.max = this.colors.length - 1;
    this.addChild(this.node);
  }
}
