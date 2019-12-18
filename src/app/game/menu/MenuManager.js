import { Container, Ticker } from 'pixi.js'

import { MainMenu } from './MainMenu.js';
import { LevelMenu } from './LevelMenu.js';
import { DailyMenu } from './DailyMenu.js';
import { GameController } from '../GameController.js';

export class MenuManager extends Container {
  constructor(gameController) {
    super();
    this.gc = gameController;

    this.mainMenu = new MainMenu(gameController);
    this.levelMenu = new LevelMenu(gameController);
    this.dailyMenu = new DailyMenu(gameController);

    this.mainMenu.visible = true;
    this.levelMenu.visible = false;
    this.dailyMenu.visible = false;

    this.a;
    this.b;
    this.slide = false;
    this.fade = false;

    Ticker.shared.add(this.ticker, this);

    this.addChild(this.mainMenu, this.levelMenu, this.dailyMenu);
  }

  ticker() {
    if (this.slide) {
      if (this.gc.canvas.height < this.a.y) {
        this.a.y = 0;
        this.b.y = 0;
        this.a.visible = false;
        this.slide = false;
      } else {
        this.a.vy += 0.3;
        this.a.y += this.a.vy;
        this.b.y += this.a.vy;
      }

    } else if (this.fade) {
      this.a.alpha -= 0.01;
      if (this.a.alpha < 0) {
        this.a.visible = false
        this.a.alpha = 1;
        this.fade = false;
      }
    }
  }

  transitionSlide(a, b) {
    let h = this.gc.canvas.height;
    a.vy = 1;
    a.y = 0;
    b.vy = 0;
    b.y = -h;
    b.visible = true;
    this.a = a;
    this.b = b;
    this.slide = true;
  }

  transitionFade(a) {
    a.vy = 0;
    a.y = 0;
    a.alpha = 1;
    this.a = a;
    this.fade = true;
  }
}
