import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { BuilderScreen } from './BuilderScreen.js';
import { BuilderForeground } from './BuilderForeground.js';
import { BuilderBackground } from './BuilderBackground.js';

export class BuilderManager extends Container {
  constructor(GameController) {
    super();
    this.gc = GameController;
    this.background = new BuilderBackground(GameController);
    this.foreground = new BuilderForeground(GameController);
    this.addChild(this.background, this.foreground);
    this.visible = false;
  }

  enable() {
    this.removeChild(this.screen);
    this.screen = new BuilderScreen(this.gc);
    this.addChild(this.screen);
  }
}
