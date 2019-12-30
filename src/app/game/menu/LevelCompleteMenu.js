import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Button } from '../../core/display/Button.js';
import { Heading } from '../../core/display/Heading.js';

/**
 * LevelCompleteMenu Class
 *
 * Container of all elements in the level complete screen
 */
export class LevelCompleteMenu extends Container {
  constructor(controller, world) {
    super();
    world = world || 0;

    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.back = new Button(colors.mainFG, colors.mainText, 'Back', w, h);
    this.back.position.set(w - (w / 10), h / 10);
    this.back.buttonMode = this.back.interactive = true;
    this.back.enable();
    this.back.on('pointertap', () => {
      controller.transitions.transitionSlide(controller.menu.levelCompleteMenu, controller.menu.levelMenu[controller.menu.currentLevel]);
    });
    this.addChild(this.back);

    if (controller.levels.level < controller.assets.levels[world].length - 1) {
      this.title = new Heading(0x000034, 'Level ' + (controller.levels.level + 1) + ' Complete!', w, h);
      this.title.position.set(w / 2, h / 8);
      this.title.enable();

      this.next = new Button(colors.mainFG, colors.mainText, 'Level ' + (controller.levels.level + 2), w, h);
      this.next.position.set(w / 2, h / 2);
      this.next.buttonMode = this.next.interactive = true;
      this.next.enable();
      this.next.on('pointertap', () => {
        this.next.buttonMode = this.next.interactive = false;
        controller.levels.level++;
        controller.levels.buildLevel();
        controller.transitions.transitionFade(controller.menu.levelCompleteMenu, controller.levels);
      });
      this.addChild(this.title, this.next);
    } else {
      this.endMessageA = new Heading(colors.mainFG, 'World Complete!', w, h);
      this.endMessageA.position.set(w / 2, h / 3);
      this.endMessageA.enable();
      this.endMessageB = new Heading(colors.mainFG, 'Thanks for Playing!', w, h);
      this.endMessageB.position.set(w / 2, h / 3 * 2);
      this.endMessageB.enable();

      this.addChild(this.endMessageA, this.endMessageB);
    }
  }
}
