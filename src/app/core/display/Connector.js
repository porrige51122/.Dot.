import { Container, Graphics } from 'pixi.js';

export class Connector extends Container {
  constructor(a, b) {
    super();
    this.a = a;
    this.b = b;
    let nodeRad = 16;
    let dis = Math.pow(Math.pow(this.a.x - this.b.x, 2) + Math.pow(this.a.y - this.b.y, 2), 0.5) - (nodeRad * 2);
    let angle = Math.atan2(this.b.y - this.a.y, this.b.x - this.a.x);

    this.line = new Graphics();
    this.line.beginFill(0xFFFFFF);
    this.line.drawRoundedRect(nodeRad, -4, dis, 8, 4);
    this.line.rotation = angle;
    this.line.x = this.a.x;
    this.line.y = this.a.y;
    this.line.interactive = true;
    this.line.buttonMode = true;

    this.line.on('mouseover', () => {
      this.line.tint = 0xFF5555;
    })
    this.line.on('mouseout', () => {
      this.line.tint = 0xFFFFFF;
    })

    this.addChild(this.line);
  }
}
