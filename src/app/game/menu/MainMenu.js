import { Container } from 'pixi.js'

import { GameController } from '../GameController.js';
import { Button } from '../../core/display/Button.js';
import { Title } from '../../core/display/Title.js'

export class MainMenu extends Container {
  constructor(controller) {
    super();
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.startButton = new Button(0x000034, 0xFCBF49, 'Level Select', w, h);
    this.startButton.x = (w/2);
    this.startButton.y = (h/8 * 5);
    this.startButton.buttonMode = true;
    this.startButton.interactive = true;
    this.startButton.on('pointertap', () => {
      controller.menu.transition(controller.menu.mainMenu, controller.menu.levelMenu);
    });

    this.challengeButton = new Button(0x000034, 0xFCBF49, 'Daily Challenge', w, h);
    this.challengeButton.x = (w/2);
    this.challengeButton.y = (h/8 * 7);
    this.challengeButton.buttonMode = true;
    this.challengeButton.interactive = true;

    this.title = new Title(0x000034, '.Dot.', w, h);
    this.title.x = w/2;
    this.title.y = h/4;
    this.startButton.enable();
    this.challengeButton.enable();
    this.title.enable();
    this.addChild(this.startButton, this.challengeButton, this.title);
  }
}
