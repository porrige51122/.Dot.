import { Container } from 'pixi.js'

import { GameController } from '../GameController.js';
import { Button } from '../../core/display/Button.js';
import { Title } from '../../core/display/Title.js'

export class LevelMenu extends Container {
  constructor(gameController) {
    super();
    let w = gameController.canvas.width;
    let h = gameController.canvas.height;

    this.buttons = [];

    for (let i = 0; i < 24; i++) {
      let but = new Button(0x000034, 0xFCBF49, "." + (i + 1) + ".", w, h);
      but.x = w / 7 + ((w / 7) * (i % 6));
      but.y = h / 3 + ((h / 6) * Math.floor(i / 6));
      but.buttonMode = true;
      but.interactive = true;
      but.enable();
      this.buttons.push(but);
      this.addChild(but);
    }
  }
}
