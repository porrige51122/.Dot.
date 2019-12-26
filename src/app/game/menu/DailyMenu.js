import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { GameController } from '../GameController.js';
import { Button } from '../../core/display/Button.js';
import { Heading } from '../../core/display/Heading.js';

/**
 * DailyMenu Class
 *
 * Container of all elements in the Daily Menu screen
 */
export class DailyMenu extends Container {
  constructor(controller) {
    super();
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.title = new Heading(colors.mainFG, 'Daily Challenge', w, h);
    this.title.position.set(w / 2, h / 8);
    this.title.enable();

    this.back = new Button(colors.mainFG, colors.mainText, "Back", w, h);
    this.back.position.set(w - (w / 10), h / 8);
    this.back.buttonMode = this.back.interactive = true;
    this.back.enable();
    this.back.on('pointertap', () => {
      controller.transitions.transitionSlide(controller.menu.dailyMenu, controller.menu.mainMenu);
    });

    this.addChild(this.back, this.title);
  }
}
