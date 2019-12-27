import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Heading } from '../../core/display/Heading.js';
import { Button } from '../../core/display/Button.js';

export class BuilderForeground extends Container {
  constructor(GameController) {
    super();

    let w = GameController.canvas.width;
    let h = GameController.canvas.height;

    this.back = new Button(colors.mainText, colors.mainFG, "Back", w, h);
    this.back.x = w - (w / 10);
    this.back.y = h / 8;
    this.back.buttonMode = true;
    this.back.interactive = true;
    this.back.enable();
    this.addChild(this.back);
    this.back.on('pointertap', () => {
      if (confirm("Are you sure? All unsaved progress will be lost"))
        GameController.transitions.transitionSlide(GameController.builder, GameController.menu.mainMenu);
    });
    this.play = new Button(colors.mainText, colors.mainFG, "Play", w, h);
    this.play.x = w - (w / 10);
    this.play.y = h - (h / 8);
    this.play.buttonMode = this.play.interactive = true;
    this.play.scale.set(0.5);
    this.play.enable();
    this.addChild(this.play);
    this.play.on('pointertap', () => {
      alert('PLAY LEVEL!!');
    });
    this.export = new Button(colors.mainText, colors.mainFG, "Export", w, h);
    this.export.x = w - (w / 10);
    this.export.y = h - (h / 16);
    this.export.buttonMode = this.export.interactive = true;
    this.export.scale.set(0.5);
    this.export.enable();
    this.addChild(this.export);
    this.export.on('pointertap', () => {
      alert('SAVE FILE!!');
    });
  }


}
