import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Button } from '../../core/display/Button.js';
import { Heading } from '../../core/display/Heading.js';
import { Subtitle } from '../../core/display/Subtitle.js';
import { Icon } from '../../core/display/Icon.js';

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

    this.next = new Graphics();
    this.next.beginFill('0xFFFFFF');
    this.next.alpha = 0;
    this.next.drawRect(0, 0, w, h);
    this.next.buttonMode = this.next.interactive = true;
    this.addChild(this.next);

    if (controller.levels.level < controller.assets.levels[world].length - 1) {
      this.title = new Heading(0x000034, 'Level ' + (controller.levels.level + 1) + ' Complete!', w, h);
      this.title.position.set(w / 2, (1 * h) / 3);
      this.title.enable();

      this.subtitle = new Heading(0x000034, 'tap to continue...', w, h);
      this.subtitle.position.set(w / 2, (2 * h) / 3);
      this.subtitle.scale.set(0.5);
      this.subtitle.enable();

      this.next.on('pointertap', () => {
        this.next.buttonMode = this.next.interactive = false;
        controller.levels.level++;
        controller.levels.buildLevel();
        controller.transitions.transitionFade(controller.menu.levelCompleteMenu, controller.levels);
      });

      this.addChild(this.title, this.subtitle);
    } else {
      this.endMessageA = new Heading(colors.mainFG, 'World Complete!', w, h);
      this.endMessageA.position.set(w / 2, h / 3);
      this.endMessageA.enable();
      this.endMessageB = new Heading(colors.mainFG, 'Thanks for Playing!', w, h);
      this.endMessageB.position.set(w / 2, h / 3 * 2);
      this.endMessageB.enable();

      this.next.on('pointertap', () => {
        controller.transitions.transitionSlide(controller.menu.levelCompleteMenu, controller.menu.levelMenu[controller.menu.currentLevel]);
      });

      this.addChild(this.endMessageA, this.endMessageB);
    }
    this.home = new Icon(controller.assets.home, colors.mainFG, w, h);
    this.home.x = w - (w / 10);
    this.home.y = h / 8;
    this.home.buttonMode = this.home.interactive = true;
    this.addChild(this.home);
    this.home.on('pointertap', () => {
      controller.transitions.transitionSlide(controller.menu.levelCompleteMenu, controller.menu.levelMenu[controller.menu.currentLevel]);
    });
  }
}
