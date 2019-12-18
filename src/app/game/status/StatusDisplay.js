import { Container, Text, TextStyle } from 'pixi.js';

import { GameController } from '../GameController.js';

export class StatusDisplay extends Container {
  constructor(GameController) {
    super();
  }

  setLabel(message) {
    if (this.textSprite === undefined) {
      let style = new TextStyle({
        fontFamily: "Courier New",
        fontSize: 15,
        fill: "#000034"
      });

      this.textSprite = new Text();
      this.textSprite.x = 20;
      this.textSprite.y = 20;
      this.textSprite.style = style;
      this.addChild(this.textSprite);
    }

    this.textSprite.text = message;
    this.textSprite.x = 10;
    this.textSprite.y = 10;
  }
}
