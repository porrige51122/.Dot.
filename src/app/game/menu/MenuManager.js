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
    let visible = [false, false, false, false, -1];
    if (this.mainMenu != undefined) {
      this.removeChild(this.mainMenu,
                       this.dailyMenu,
                       this.worldMenu,
                       this.levelCompleteMenu
                    );
      visible[0] = this.mainMenu.visible;
      visible[1] = this.dailyMenu.visible;
      visible[2] = this.worldMenu.visible;
      visible[3] = this.levelCompleteMenu.visible;
      for (let i = 0; i < this.levelMenu.length; i++) {
        if (this.levelMenu[i].visible) visible[4] = i;
        this.removeChild(this.levelMenu[i]);
      }

    }
    this.mainMenu = new MainMenu(gameController);

    this.levelMenu = [];
    for (let i = 0; i < gameController.assets.levels.length; i++) {
      this.levelMenu.push(new LevelMenu(gameController, i));
      this.levelMenu[i].visible = i == visible[4];
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

    this.mainMenu.visible = visible[0];
    this.dailyMenu.visible = visible[1];
    this.worldMenu.visible = visible[2];
    this.levelCompleteMenu.visible = visible[3];
  }

}
