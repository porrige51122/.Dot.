import { Container } from 'pixi.js'

import { GameController } from '../GameController.js';
import { Button } from '../../core/display/Button.js';
import { Title } from '../../core/display/Title.js'

export class LevelMenu extends Container {
  constructor(controller) {
    super();
    let w = controller.canvas.width;
    let h = controller.canvas.height;

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

    this.back = new Button(0x000034, 0xFCBF49, "Back", w, h);
    this.back.x = w - (w / 10);
    this.back.y = h / 8;
    this.back.buttonMode = true;
    this.back.interactive = true;
    this.back.enable();
    this.addChild(this.back);
    this.back.on('pointertap', () => {
      controller.menu.transition(controller.menu.levelMenu, controller.menu.mainMenu);
    });
  }
}
