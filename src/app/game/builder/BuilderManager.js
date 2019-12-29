import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { BuilderMidground } from './BuilderMidground.js';
import { BuilderForeground } from './BuilderForeground.js';
import { BuilderBackground } from './BuilderBackground.js';

export class BuilderManager extends Container {
  constructor(GameController) {
    super();
    this.w = 7;
    this.h = 5;
    this.gc = GameController;
    this.visible = false;
    this.lvl = { x: this.w, y: this.h, nodes: [] };
  }

  enable() {
    this.removeChild(this.background, this.midground, this.foreground);
    this.background = new BuilderBackground(this.gc);
    this.midground = new BuilderMidground(this.gc);
    this.foreground = new BuilderForeground(this.gc);
    this.addChild(this.background, this.midground, this.foreground);
  }
}
