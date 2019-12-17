import { Container } from 'pixi.js'

import { AssetManager } from '../assets/AssetManager.js';
import { GameController } from '../GameController.js';
import { Button } from '../../core/display/Button.js';
import { Title } from '../../core/display/Title.js'

export class MainMenu extends Container {
  constructor(gameController) {
    super();

    this.startButton = new Button(0x000034, 0xFCBF49, 'Level Select');
    this.startButton.x = (window.innerWidth/2);
    this.startButton.y = (window.innerHeight/8 * 5);
    this.startButton.buttonMode = true;
    this.startButton.interactive = true;

    this.challengeButton = new Button(0x000034, 0xFCBF49, 'Daily Challenge');
    this.challengeButton.x = (window.innerWidth/2);
    this.challengeButton.y = (window.innerHeight/8 * 7);
    this.challengeButton.buttonMode = true;
    this.challengeButton.interactive = true;

    this.title = new Title(0x000034, '.Dot.');
    this.title.x = window.innerWidth/2;
    this.title.y = window.innerHeight/4;

    this.startButton.enable();
    this.challengeButton.enable();
    this.title.enable();
    this.addChild(this.startButton, this.challengeButton, this.title);
  }
}
