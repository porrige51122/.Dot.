import { Container, Ticker } from 'pixi.js';

import { GameController } from '../GameController.js';
import { LevelBackend } from './LevelBackend.js';
import { LevelBackground } from './LevelBackground.js';
import { LevelMidground } from './LevelMidground.js';
import { LevelForeground } from './LevelForeground.js';

export class LevelManager extends Container {
  constructor(GameController) {
    super();
    this.level = 0;
    this.gt = GameController;
    this.bg = new LevelBackground(GameController);
    this.bg.visible = false;
    this.addChild(this.bg);

    this.game = new LevelBackend();
  }

  buildLevel() {
    this.bg.visible = true;

    this.removeChild(this.mg);
    this.mg = new LevelMidground(this.gt);
    this.mg.visible = true;
    this.addChild(this.mg);

    this.removeChild(this.fg);
    this.fg = new LevelForeground(this.gt);
    this.fg.visible = true;
    this.addChild(this.fg);

    this.game.nodes = this.gt.levels.mg.nodes;

  }
}
