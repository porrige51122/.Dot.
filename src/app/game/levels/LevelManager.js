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

  levelComplete(gt) {
    gt.menu.levelMenu[gt.menu.currentLevel].buttons[gt.levels.level].createBox(colors.blue);
    gt.menu.levelMenu[gt.menu.currentLevel].buttons[gt.levels.level].completed = true;
    if (gt.menu.levelMenu[gt.menu.currentLevel].buttons[gt.levels.level + 1] !== undefined) {
      gt.menu.levelMenu[gt.menu.currentLevel].buttons[gt.levels.level + 1].alpha = 1;
      gt.menu.levelMenu[gt.menu.currentLevel].buttons[gt.levels.level + 1].buttonMode = true;
      gt.menu.levelMenu[gt.menu.currentLevel].buttons[gt.levels.level + 1].interactive = true;
    }
    gt.menu.worldMenu.update(gt);

    gt.menu.removeChild(gt.menu.levelCompleteMenu);
    gt.menu.levelCompleteMenu = new LevelCompleteMenu(gt);
    gt.menu.addChild(gt.menu.levelCompleteMenu);
    gt.transitions.transitionSlide(gt.levels, gt.menu.levelCompleteMenu);
  }
}
