import { utils } from 'pixi.js';

import { GameController } from './js/GameController.js';

/**
 * AppInit Class
 *
 * Initialises controller than initialises game
 */
class AppInit {
  constructor() {
    let gameController = new GameController();

    gameController.init().then(() => {
      console.log('Game Ready');
    })
  }

}

let type = "WebGL";
if (!utils.isWebGLSupported())
  type = "canvas";
utils.sayHello(type);

new AppInit();
