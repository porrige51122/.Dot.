import { Container, Ticker } from 'pixi.js';

import { GameController } from '../GameController.js';
import { LevelBackground } from './LevelBackground.js';
import { LevelMidground } from './LevelMidground.js';
import { LevelForeground } from './LevelForeground.js';

export class LevelManager extends Container {
  constructor(GameController) {
    super();
    this.level = 0;
    this.gt = GameController;
    this.background = new LevelBackground(GameController);
    this.background.visible = false;
    this.addChild(this.background);
  }

  buildLevel() {
    this.background.visible = true;

    this.removeChild(this.mg);
    this.mg = new LevelMidground(this.gt);
    this.mg.visible = true;
    this.addChild(this.mg);

    this.removeChild(this.fg);
    this.fg = new LevelForeground(this.gt);
    this.fg.visible = true;
    this.addChild(this.fg);
  }
}
