import { Container } from 'pixi.js';

import { GameController } from '../GameController.js';

export class LevelManager extends Container {
  constructor(GameController) {
    super();
    this.level = 0;
  }

  startLevel(level) {
    this.level = level;
    console.log(this.level);
  }
}
