import { Container, Ticker } from 'pixi.js';
import * as colors from '../../core/display/Colors.js'

import { GameController } from '../GameController.js';
import { LevelBackend } from './LevelBackend.js';
import { LevelBackground } from './LevelBackground.js';
import { LevelMidground } from './LevelMidground.js';
import { LevelForeground } from './LevelForeground.js';
import { LevelCompleteMenu } from '../menu/LevelCompleteMenu.js';

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

  buildLevel(builder) {
    this.custom = builder || false;
    this.bg.visible = true;

    this.removeChild(this.mg);
    this.mg = new LevelMidground(this.gt, this.custom);
    this.mg.visible = true;
    this.addChild(this.mg);

    this.removeChild(this.fg);
    this.fg = new LevelForeground(this.gt, this.custom);
    this.fg.visible = true;
    this.addChild(this.fg);

    this.game.nodes = this.gt.levels.mg.nodes;

  }

  resize(gt) {
    let visible = this.bg.visible;
    this.removeChild(this.bg);
    this.bg = new LevelBackground(gt);
    this.addChild(this.bg);
    this.buildLevel(false);
    this.bg.visible = visible;
    this.mg.visible = visible;
    this.fg.visible = visible;
  }

  levelComplete(gt) {
    gt.menu.levelsCompleted[this.world].push(this.level);
    gt.menu.resize(gt);
    gt.menu.worldMenu.update(gt);

    gt.menu.removeChild(gt.menu.levelCompleteMenu);
    gt.menu.levelCompleteMenu = new LevelCompleteMenu(gt, this.world);
    gt.menu.addChild(gt.menu.levelCompleteMenu);
    gt.transitions.transitionSlide(gt.levels, gt.menu.levelCompleteMenu);
  }
}
