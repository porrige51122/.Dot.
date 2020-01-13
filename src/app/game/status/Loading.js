import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Title } from '../../core/display/Title.js';

/**
 * Loading Class
 *
 * Displays current progress of loading
 */
export class Loading extends Container {
  constructor(controller) {
    super();
    this.w = controller.canvas.width;
    this.h = controller.canvas.height;

    this.rectA = new Graphics();
    this.rectA.beginFill(colors.red);
    this.rectA.drawRect(0, this.h - this.h / 32, this.w,this. h / 32);
    this.addChild(this.rectA);

    this.rectB = new Graphics();
    this.rectB.beginFill(colors.blue);
    this.rectB.drawRect(0, this.h - this.h / 32, 0, this.h / 32);
    this.addChild(this.rectB);
  }

  update(fill) {
    this.removeChild(this.rectB);
    this.rectB = new Graphics();
    this.rectB.beginFill(colors.blue);
    this.rectB.drawRect(0, this.h - this.h / 32, this.w/100 * fill, this.h / 32);
    this.addChild(this.rectB);
  }
}
