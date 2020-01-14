import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Heading } from '../../core/display/Heading.js';
import { Icon } from '../../core/display/Icon.js'

/**
 * LevelForeground Class
 *
 * Contains all clickable buttons and depending on wether the level is opened in builder mode
 * Displays the current Level Heading
 */
export class LevelForeground extends Container {
  constructor(GameController, builder) {
    super();

    let w = GameController.canvas.width;
    let h = GameController.canvas.height;

    this.home = new Icon(GameController.assets.home, colors.secondaryTitle, w, h);
    this.home.x = w - (w / 10);
    this.home.y = h / 8;
    this.home.buttonMode = this.home.interactive = true;
    this.addChild(this.home);

    if (!builder) {
      this.title = new Heading(colors.secondaryTitle, 'Level ' + (GameController.levels.level + 1), w, h);
      this.title.x = w / 2;
      this.title.y = h / 10;
      this.title.enable();
      this.addChild(this.title);

      this.home.on('pointertap', () => {
        GameController.transitions.transitionFade(GameController.levels, GameController.menu.levelMenu[GameController.menu.currentLevel]);
      });
    } else {
      this.home.on('pointertap', () => {
        GameController.transitions.transitionFade(GameController.levels, GameController.builder);
      });
    }

  }

}
