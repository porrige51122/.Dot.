import { Container, Ticker } from 'pixi.js'

import { MainMenu } from './MainMenu.js';
import { LevelMenu } from './LevelMenu.js';
import { GameController } from '../GameController.js';

export class MenuManager extends Container {
  constructor(gameController) {
    super();
    this.gc = gameController;

    this.mainMenu = new MainMenu(gameController);
    this.levelMenu = new LevelMenu(gameController);
    this.mainMenu.visible = true;
    this.levelMenu.visible = false;


    this.addChild(this.mainMenu, this.levelMenu);
  }

  transition(a, b) {
    let h = this.gc.canvas.height
    a.vy = 0.5;
    a.y = 0;
    b.vy = 0;
    b.y = -h;
    b.visible = true;
    let end = true;
    Ticker.shared.add(tr);
    function tr() {
      if (end) {
        a.vy += 0.2;
        a.y += a.vy;
        b.y += a.vy;
        if (h < a.y) {
          a.visible = false;
          end = false;
        }
      }
    }
  }
}
