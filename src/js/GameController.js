import { Canvas } from './Canvas.js';
import { StatusDisplay } from './StatusDisplay.js'
import { AssetManager } from './AssetManager.js';

export class GameController {
  constructor() {
    console.log('Controller Constructor');
    this.canvas = new Canvas();
    this.statusDisplay = new StatusDisplay(this);
    this.canvas.app.stage.addChild(this.statusDisplay);

    this.statusDisplay.setLabel("Loading...");
  }

  init() {
    return new Promise((resolve, reject) => {
      this.assets = new AssetManager();
      this.assets.promise.then(() => {


        resolve();
      })
    })
  }
}
