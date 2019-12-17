import { Container } from 'pixi.js'

import { MainMenu } from './MainMenu.js';
import { GameController } from '../GameController.js';

export class MenuManager extends Container {
  constructor(gameController) {
    super();

    this.mainMenu = new MainMenu(gameController);
    this.addChild(this.mainMenu);
  }
}
