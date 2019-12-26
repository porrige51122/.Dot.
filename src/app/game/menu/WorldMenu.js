import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { GameController } from '../GameController.js';
import { LevelMenu } from './LevelMenu.js';
import { LargeButton } from '../../core/display/LargeButton.js';
import { Button } from '../../core/display/Button.js';
import { Heading } from '../../core/display/Heading.js';

export class WorldMenu extends Container {
  constructor(controller) {
    super();
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.buttons = [];
    this.update(controller);

    this.title = new Heading(colors.mainFG, 'Select World', w, h);
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
      controller.transitions.transitionSlide(controller.menu.worldMenu, controller.menu.mainMenu);
    });
  }

  update(controller) {
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.buttons.forEach((but) => { this.removeChild(but) });
    for (let i = 0; i < controller.assets.levels.length; i++) {
      let completed = 0;
      if (controller.menu !== undefined) {
        for (let j = 0; j < controller.menu.levelMenu[i].buttons.length; j++) {
          if (controller.menu.levelMenu[i].buttons[j].completed) {
            completed++;
          }
        }
      }
      let but = new LargeButton(colors.mainFG, colors.mainText, "." + (i + 1) + ".", completed + " / " + controller.assets.levels[i].length, w, h);
      but.x = w / 4 + ((w / 4) * (i % 3));
      but.y = h / 3 + ((h / 6) * Math.floor(i / 3));
      but.enable();
      if (completed == controller.assets.levels[i].length) {
        but.createBox(colors.blue);
      }
      if (i < 2) {
        but.buttonMode = but.interactive = true;
      } else {
        but.alpha = 0.75;
      }
      but.on('pointertap', () => {
        controller.menu.currentLevel = i;
        controller.transitions.transitionSlide(controller.menu.worldMenu, controller.menu.levelMenu[i]);
      });
      this.buttons.push(but);
      this.addChild(but);
    }
  }
}
