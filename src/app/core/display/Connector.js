import { Container, Graphics } from 'pixi.js';

import * as Color from './Colors.js';
import * as Utils from '../utils/Utils.js';

export class Connector extends Container {
  constructor(a, b, w, h) {
    super();
    this.a = a;
    this.b = b;
    let nodeRad = w/40;
    let thickness = w/80;
    let dis = Utils.dist(a.x, a.y, b.x, b.y) - (nodeRad * 2);

    this.line = new Graphics();
    this.line.beginFill(Color.connector);
    this.line.drawRoundedRect(nodeRad , - thickness/2, dis, thickness, 4);
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
