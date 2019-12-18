import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { GameController } from '../GameController.js';
import { Button } from '../../core/display/Button.js';
import { Heading } from '../../core/display/Heading.js';

export class DailyMenu extends Container {
  constructor(controller) {
    super();
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.title = new Heading(0x000034, 'Daily Challenge', w, h);
    this.title.x = w / 2;
    this.title.y = h / 8;
    this.title.enable();

    this.back = new Button(colors.mainFG, colors.mainText, "Back", w, h);
    this.back.x = w - (w / 10);
    this.back.y = h / 8;
    this.back.buttonMode = true;
    this.back.interactive = true;
    this.back.enable();
    this.back.on('pointertap', () => {
      controller.menu.transitionSlide(controller.menu.dailyMenu, controller.menu.mainMenu);
    });

    this.addChild(this.back, this.title);
  }
}
