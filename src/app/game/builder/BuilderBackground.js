import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Heading } from '../../core/display/Heading.js'

export class BuilderBackground extends Container {
  constructor(GameController) {
    super();

    let w = GameController.canvas.width;
    let h = GameController.canvas.height;

    this.background = new Graphics();
    this.background.beginFill(colors.secondaryBG);
    this.background.drawRect(0, 0, w, h);
    this.addChild(this.background);

    // Grid Area
    this.grid = [];
    let maxw = GameController.builder.w;
    let maxh = GameController.builder.h;
    for (let i = 1; i < maxw; i++) {
      let line = new Graphics();
      line.lineStyle(5, colors.connector);
      line.moveTo((w * i) / maxw, 0);
      line.lineTo((w * i) / maxw, h);
      line.alpha = 0.5;
      this.grid.push(line);
      this.addChild(line);
    }
    for (let i = 1; i < maxh; i++) {
      let line = new Graphics();
      line.lineStyle(5, colors.connector);
      line.moveTo(0, (h * i) / maxh);
      line.lineTo(w, (h * i) / maxh);
      line.alpha = 0.5;
      this.grid.push(line);
      this.addChild(line);
    }
  }
}
