import { Container } from 'pixi.js';

import { MainMenu } from './MainMenu.js';
import { LevelMenu } from './LevelMenu.js';
import { WorldMenu } from './WorldMenu.js';
import { DailyMenu } from './DailyMenu.js';
import { LevelCompleteMenu } from './LevelCompleteMenu.js';
import { GameController } from '../GameController.js';

/**
 * MenuManager Class
 *
 * Container of all different menus to switch between them.
 */
export class MenuManager extends Container {
  constructor(gameController) {
    super();
    this.gc = gameController;

    this.resize(gameController);
    this.mainMenu.visible = true;
  }

  resize(gameController) {
    let visible = false;
    if (this.mainMenu != undefined) {
      this.removeChild(this.mainMenu,
                       this.dailyMenu,
                       this.worldMenu,
                       this.levelCompleteMenu
                    );
      if (this.mainMenu.visible ||
          this.dailyMenu.visible ||
          this.worldMenu.visible ||
          this.levelCompleteMenu.visible)
          visible = true;
      for (let i = 0; i < this.levelMenu.length; i++) {
        if (this.levelMenu[i].visible) visible = true;
        this.removeChild(this.levelMenu[i]);
      }
    }
    this.mainMenu = new MainMenu(gameController);

    this.levelMenu = [];
    for (let i = 0; i < gameController.assets.levels.length; i++) {
      this.levelMenu.push(new LevelMenu(gameController, i));
      this.levelMenu[i].visible = false;
      this.addChild(this.levelMenu[i]);
    }
    this.dailyMenu = new DailyMenu(gameController);
    this.worldMenu = new WorldMenu(gameController);
    this.levelCompleteMenu = new LevelCompleteMenu(gameController);
    this.addChild(this.mainMenu,
                   this.dailyMenu,
                   this.worldMenu,
                   this.levelCompleteMenu
                  );
    this.mainMenu.visible = visible;
    this.dailyMenu.visible = false;
    this.worldMenu.visible = false;
    this.levelCompleteMenu.visible = false;
  }

}
