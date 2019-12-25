import { Container, Ticker } from 'pixi.js';

import { MainMenu } from './MainMenu.js';
import { LevelMenu } from './LevelMenu.js';
import { WorldMenu } from './WorldMenu.js';
import { DailyMenu } from './DailyMenu.js';
import { LevelCompleteMenu } from './LevelCompleteMenu.js';
import { GameController } from '../GameController.js';

export class MenuManager extends Container {
  constructor(gameController) {
    super();
    this.gc = gameController;

    this.mainMenu = new MainMenu(gameController);
    this.levelMenu = new LevelMenu(gameController);
    this.dailyMenu = new DailyMenu(gameController);
    this.worldMenu = new WorldMenu(gameController);
    this.levelCompleteMenu = new LevelCompleteMenu(gameController);

    // this.mainMenu.visible = false;
    this.levelMenu.visible = false;
    this.dailyMenu.visible = false;
    this.worldMenu.visible = false;
    this.levelCompleteMenu.visible = false;

    this.addChild(this.mainMenu,
                   this.levelMenu,
                   this.dailyMenu,
                   this.worldMenu,
                   this.levelCompleteMenu
                  );
  }

}
