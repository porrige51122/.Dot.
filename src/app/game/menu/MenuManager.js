import { Container } from 'pixi.js'

import { AssetManager } from '../assets/AssetManager.js';
import { GameController } from '../GameController.js';
import { Button } from '../../core/display/button.js';

export class MenuManager extends Container {
  constructor(gameController) {
    super();

    let assets = gameController.assets;
    this.startButton = new Button(0x000034, 0xFCBF49, 'Start');
    this.startButton.buttonMode = true;
    this.startButton.interactive = true;

    this.startButton.enable();
    this.addChild(this.startButton);
  }
}
