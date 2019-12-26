import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { GameController } from '../GameController.js';
import { Heading } from '../../core/display/Heading.js';
import { Button } from '../../core/display/Button.js';

export class LevelForeground extends Container {
  constructor(GameController) {
    super();

    let w = GameController.canvas.width;
    let h = GameController.canvas.height;

    this.title = new Heading(colors.secondaryTitle, 'Level ' + (GameController.levels.level + 1), w, h);
    this.title.x = w / 2;
    this.title.y = h / 10;
    this.title.enable();
    this.addChild(this.title);

    this.back = new Button(colors.mainText, colors.mainFG, "Back", w, h);
    this.back.x = w - (w / 10);
    this.back.y = h / 8;
    this.back.buttonMode = true;
    this.back.interactive = true;
    this.back.enable();
    this.addChild(this.back);
    this.back.on('pointertap', () => {
      GameController.transitions.transitionFade(GameController.levels, GameController.menu.levelMenu[GameController.menu.currentLevel]);
    });
  }


}
