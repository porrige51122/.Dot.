import { Ticker } from 'pixi.js';

import { Canvas } from '../core/helpers/Canvas.js';
import { StatusDisplay } from './status/StatusDisplay.js';
import { Loading } from './status/Loading.js'
import { Transitions } from '../core/helpers/Transitions.js'
import { AssetManager } from './assets/AssetManager.js';
import { LevelManager } from './levels/LevelManager.js';
import { BuilderManager } from './builder/BuilderManager.js';
import { MenuManager } from './menu/MenuManager.js';

/**
 * GameController Class
 *
 * Contains all states and objects containted in the game
 */
export class GameController {
  constructor() {
    this.canvas = new Canvas();
    window.addEventListener('resize', () => {this.resize()});
    this.statusDisplay = new StatusDisplay(this);
    this.canvas.app.stage.addChild(this.statusDisplay);
    this.statusDisplay.setLabel("Loading...");
  }

  resize() {
    this.menu.resize(this);
    this.transitions.resize(this);
    this.levels.resize(this);
  }

  load() {
    return new Promise((resolve, reject) => {
      let loading = new Loading(this);
      this.canvas.app.stage.addChild(loading);
      this.assets = new AssetManager(loading);
      this.assets.promise.then(() => {
        window.setTimeout(() => {
          loading.update(100);
          this.canvas.app.stage.removeChild(loading);
          resolve();
        }, 1000);
      })
    })
  }

  init() {
    return new Promise((resolve, reject) => {
      this.transitions = new Transitions(this);

      this.levels = new LevelManager(this);
      this.canvas.app.stage.addChild(this.levels);

      this.builder = new BuilderManager(this);
      this.canvas.app.stage.addChild(this.builder);

      this.menu = new MenuManager(this);
      this.canvas.app.stage.addChild(this.menu);

      this.canvas.app.stage.setChildIndex(this.statusDisplay, this.canvas.app.stage.children.length - 1);
      Ticker.shared.add(() => {
        let str = Ticker.shared.FPS.toFixed(0).toString() + "FPS";
        this.statusDisplay.setLabel(str);
      });

      resolve();
    })
  }
}
