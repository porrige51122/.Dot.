import { Container } from 'pixi.js'

import { MainMenu } from './MainMenu.js';
import { LevelMenu } from './LevelMenu.js';
import { GameController } from '../GameController.js';

export class MenuManager extends Container {
  constructor(gameController) {
    super();

    this.mainMenu = new MainMenu(gameController);
    this.levelMenu = new LevelMenu(gameController);
    this.mainMenu.visible = true;
    this.levelMenu.visible = false;

    this.addChild(this.mainMenu, this.levelMenu);
  }

  transition(a, b) {
    a.visible = false;
    b.visible = true;
  }
}
