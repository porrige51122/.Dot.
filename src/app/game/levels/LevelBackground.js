import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Heading } from '../../core/display/Heading.js'

/**
 * LevelBackground Class
 *
 * Container of blank rectangle to cover the app background
 */
export class LevelBackground extends Container {
  constructor(GameController) {
    super();

    let w = GameController.canvas.width;
    let h = GameController.canvas.height;

    this.background = new Graphics();
    this.background.beginFill(colors.secondaryBG);
    this.background.drawRect(0, 0, w, h);
    this.addChild(this.background);
  }
}
