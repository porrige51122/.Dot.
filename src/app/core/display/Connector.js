import { Container, Graphics } from 'pixi.js';

import * as Color from './Colors.js';
import * as Utils from '../utils/Utils.js';

export class Connector extends Container {
  constructor(a, b) {
    super();
    this.a = a;
    this.b = b;
    let nodeRad = 16; // TODO: Set the value related to actual node radius
    let dis = Utils.dist(a.x, a.y, b.x, b.y) - (nodeRad * 2);

    this.line = new Graphics();
    this.line.beginFill(Color.connector);
    this.line.drawRoundedRect(nodeRad, -4, dis, 8, 4);
    this.line.rotation = Utils.angle(a.x, a.y, b.x, b.y);
    this.line.position.set(a.x, a.y);
    this.line.interactive = this.line.buttonMode = true;

    this.line.on('mouseover', () => {
      this.line.tint = Color.connectorHover;
    })
    this.line.on('mouseout', () => {
      this.line.tint = 0xFFFFFF; // Clears tints
    })

    this.addChild(this.line);
  }
}
