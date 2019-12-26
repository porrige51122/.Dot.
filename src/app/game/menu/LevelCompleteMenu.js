import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { GameController } from '../GameController.js';
import { Button } from '../../core/display/Button.js';
import { Heading } from '../../core/display/Heading.js';

export class LevelCompleteMenu extends Container {
  constructor(controller, world) {
    super();
    if (world == undefined) {
      world = 0;
    }
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.back = new Button(colors.mainFG, colors.mainText, 'Back', w, h);
    this.back.x = w - (w / 10);
    this.back.y = h / 8;
    this.back.buttonMode = this.back.interactive = true;
    this.back.enable();
    this.back.on('pointertap', () => {
      controller.transitions.transitionSlide(controller.menu.levelCompleteMenu, controller.menu.levelMenu[controller.menu.currentLevel]);
    });
    this.addChild(this.back);

    if (controller.levels.level < controller.assets.levels[world].length - 1) {
      this.title = new Heading(0x000034, 'Level ' + (controller.levels.level + 1) + ' Complete!', w, h);
      this.title.x = w / 2;
      this.title.y = h / 8;
      this.title.enable();

      this.next = new Button(colors.mainFG, colors.mainText, 'Level ' + (controller.levels.level + 2), w, h);
      this.next.x = w / 2;
      this.next.y = h / 2;
      this.next.buttonMode = this.next.interactive = true;
      this.next.enable();
      this.next.on('pointertap', () => {
        controller.levels.level++;
        this.next.buttonMode = this.next.interactive = false;
        controller.levels.buildLevel();
        controller.transitions.transitionFade(controller.menu.levelCompleteMenu, controller.levels);
      });
      this.addChild(this.title, this.next);
    } else {
      this.endMessageA = new Heading(0x000034, 'All Levels Complete!', w, h);
      this.endMessageA.x = w / 2;
      this.endMessageA.y = h / 3;
      this.endMessageA.enable();
      this.endMessageB = new Heading(0x000034, 'Thanks for Playing!', w, h);
      this.endMessageB.x = w / 2;
      this.endMessageB.y = h / 3 * 2;
      this.endMessageB.enable();

      this.addChild(this.endMessageA, this.endMessageB);
    }
  }
}
