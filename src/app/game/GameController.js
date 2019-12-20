import { Ticker } from 'pixi.js';

import { Canvas } from '../core/helpers/Canvas.js';
import { StatusDisplay } from './status/StatusDisplay.js'
import { Transitions } from '../core/helpers/transitions.js'
import { AssetManager } from './assets/AssetManager.js';
import { LevelManager } from './levels/LevelManager.js';
import { MenuManager } from './menu/MenuManager.js';

export class GameController {
  constructor() {
    this.canvas = new Canvas();
    this.statusDisplay = new StatusDisplay(this);
    this.canvas.app.stage.addChild(this.statusDisplay);
    this.statusDisplay.setLabel("Loading...");
  }

  init() {
    return new Promise((resolve, reject) => {
      this.assets = new AssetManager();
      this.assets.promise.then(() => {

        this.transitions = new Transitions(this);

        this.levels = new LevelManager(this);
        this.canvas.app.stage.addChild(this.levels);

        this.menu = new MenuManager(this);
        this.canvas.app.stage.addChild(this.menu);

        this.canvas.app.stage.setChildIndex(this.statusDisplay, this.canvas.app.stage.children.length - 1);
        Ticker.shared.add(() => {
          let str = Ticker.shared.FPS.toFixed(0).toString() + "FPS";
          this.statusDisplay.setLabel(str);
        });
        resolve();
      })
    })
  }
}
