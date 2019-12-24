import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { GameController } from '../GameController.js';
import { Button } from '../../core/display/Button.js';
import { Heading } from '../../core/display/Heading.js';

export class LevelMenu extends Container {
  constructor(controller) {
    super();
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.buttons = [];

    for (let i = 0; i < controller.assets.levels.length; i++) {
      let but = new Button(colors.mainFG, colors.mainText, "." + (i + 1) + ".", w, h);
      but.x = w / 7 + ((w / 7) * (i % 6));
      but.y = h / 3 + ((h / 6) * Math.floor(i / 6));
      but.enable();
      if (i < 1) {
        but.buttonMode = true;
        but.interactive = true;
      } else {
        but.alpha = 0.75;
      }
      but.on('pointertap', () => {
        controller.levels.level = i;
        controller.levels.buildLevel();
        controller.transitions.transitionFade(controller.menu.levelMenu, controller.levels);
      });
      this.buttons.push(but);
      this.addChild(but);
    }
    this.title = new Heading(0x000034, 'Select Level', w, h);
    this.title.x = w / 2;
    this.title.y = h / 8;
    this.title.enable();
    this.addChild(this.title);

    this.back = new Button(colors.mainFG, colors.mainText, "Back", w, h);
    this.back.x = w - (w / 10);
    this.back.y = h / 8;
    this.back.buttonMode = true;
    this.back.interactive = true;
    this.back.enable();
    this.addChild(this.back);
    this.back.on('pointertap', () => {
      controller.transitions.transitionSlide(controller.menu.levelMenu, controller.menu.mainMenu);
    });
  }
}
