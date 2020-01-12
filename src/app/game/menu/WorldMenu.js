import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { LevelMenu } from './LevelMenu.js';
import { LargeButton } from '../../core/display/LargeButton.js';
import { Button } from '../../core/display/Button.js';
import { Heading } from '../../core/display/Heading.js';
import { Icon } from '../../core/display/Icon.js';

/**
 * WorldMenu Class
 *
 * Container of all buttons and titles needed to be displayed on the
 * world selection screen.
 */
export class WorldMenu extends Container {
  constructor(controller) {
    super();
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.buttons = [];
    this.update(controller);

    this.title = new Heading(colors.mainFG, 'Select World', w, h);
    this.title.position.set(w / 2, h / 8);
    this.title.enable();

    this.back = new Icon(controller.assets.home, colors.mainFG, w, h);
    this.back.x = w - (w / 10);
    this.back.y = h / 8;
    this.back.buttonMode = this.back.interactive = true;
    this.addChild(this.back);
    this.back.on('pointertap', () => {
      controller.transitions.transitionSlide(controller.menu.worldMenu, controller.menu.mainMenu);
    });
    this.addChild(this.back, this.title);
  }

  /**
   * Update - Updates buttons to show completion
   *
   * @param c Game Controller object
   */
  update(c) {
    let dim = { w: c.canvas.width, h: c.canvas.height};

    this.buttons.forEach((but) => { this.removeChild(but) });
    for (let i = 0; i < c.assets.levels.length; i++) {
      let completed = 0;
      if (c.menu !== undefined) {
        for (let j = 0; j < c.menu.levelMenu[i].buttons.length; j++) {
          if (c.menu.levelMenu[i].buttons[j].completed) {
            completed++;
          }
        }
      }
      let but = new LargeButton(colors.mainFG, colors.mainText, "." + (i + 1) + ".", completed + " / " + c.assets.levels[i].length, dim.w, dim.h);
      but.x = dim.w / 4 + ((dim.w / 4) * (i % 3));
      but.y = dim.h / 3 + ((dim.h / 6) * Math.floor(i / 3));
      but.enable();
      if (completed == c.assets.levels[i].length)
        but.createBox(colors.blue);

      if (i < 2) {
        but.buttonMode = but.interactive = true;
      } else {
        but.alpha = 0.75;
      }
      but.on('pointertap', () => {
        c.menu.currentLevel = i;
        c.transitions.transitionSlide(c.menu.worldMenu, c.menu.levelMenu[i]);
      });
      this.buttons.push(but);
      this.addChild(but);
    }
  }
}
