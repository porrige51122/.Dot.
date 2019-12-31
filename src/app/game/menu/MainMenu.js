import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Button } from '../../core/display/Button.js';
import { Title } from '../../core/display/Title.js';

/**
 * MainMenu Class
 *
 * Cpntainer of Main Menu buttons and titles
 */
export class MainMenu extends Container {
  constructor(controller) {
    super();
    let w = controller.canvas.width;
    let h = controller.canvas.height;

    this.startButton = new Button(colors.mainFG, colors.mainText, 'Start', w, h);
    this.startButton.position.set((w / 2), (h / 8 * 5));
    this.startButton.buttonMode = this.startButton.interactive = true;
    this.startButton.on('pointertap', () => {
      controller.transitions.transitionSlide(controller.menu.mainMenu, controller.menu.worldMenu);
    });

    this.buildButton = new Button(colors.mainFG, colors.mainText, 'Level Builder', w, h);
    this.buildButton.position.set((w / 2), (h / 8 * 6));
    this.buildButton.buttonMode = this.buildButton.interactive = true;
    this.buildButton.on('pointertap', () => {
      controller.builder.enable();
      controller.transitions.transitionSlide(controller.menu.mainMenu, controller.builder);
    });

    this.challengeButton = new Button(colors.mainFG, colors.mainText, 'Daily Challenge', w, h);
    this.challengeButton.position.set((w / 2), (h / 8 * 7));
    // this.challengeButton.buttonMode = this.challengeButton.interactive = true;
    this.challengeButton.alpha = 0.5;
    this.challengeButton.on('pointertap', () => {
      controller.transitions.transitionSlide(controller.menu.mainMenu, controller.menu.dailyMenu);
    });

    this.title = new Title(colors.mainFG, '.Dot.', w, h);
    this.title.position.set(w / 2, h / 4);

    this.startButton.enable();
    this.buildButton.enable();
    this.challengeButton.enable();
    this.title.enable();
    this.addChild(this.startButton, this.challengeButton, this.buildButton, this.title);
  }
}
