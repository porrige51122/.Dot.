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
    this.play.y = h - (h / 16) * 2;
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

    this.nodeA = new Button(colors.mainText, colors.mainFG, "Node A", w, h);
    this.nodeA.x = w - (w / 10);
    this.nodeA.y = h - (h / 16) * 6;
    this.nodeA.buttonMode = this.nodeA.interactive = true;
    this.nodeA.scale.set(0.5);
    this.nodeA.enable();
    this.addChild(this.nodeA);
    this.nodeA.on('pointertap', () => {
      GameController.builder.midground.createNode(GameController, 0);
    });

    this.nodeB = new Button(colors.mainText, colors.mainFG, "Node B", w, h);
    this.nodeB.x = w - (w / 10);
    this.nodeB.y = h - (h / 16) * 5;
    this.nodeB.buttonMode = this.nodeB.interactive = true;
    this.nodeB.scale.set(0.5);
    this.nodeB.enable();
    this.addChild(this.nodeB);
    this.nodeB.on('pointertap', () => {
      GameController.builder.midground.createNode(GameController, 1);
    });

    this.nodeC = new Button(colors.mainText, colors.mainFG, "Node C", w, h);
    this.nodeC.x = w - (w / 10);
    this.nodeC.y = h - (h / 16) * 4;
    this.nodeC.buttonMode = this.nodeC.interactive = true;
    this.nodeC.scale.set(0.5);
    this.nodeC.enable();
    this.addChild(this.nodeC);
    this.nodeC.on('pointertap', () => {
      GameController.builder.midground.createNode(GameController, 2);
    });

    this.delete = new Button(colors.red, colors.mainFG, "Delete", w, h);
    this.delete.x = w - (w / 10);
    this.delete.y = h - (h / 16) * 8;
    this.delete.buttonMode = this.delete.interactive = true;
    this.delete.scale.set(0.5);
    this.delete.enable();
    this.addChild(this.delete);
    this.delete.on('pointertap', () => {
      for (let i = 0; i < GameController.builder.midground.nodes.length; i++) {
        if (GameController.builder.midground.nodes[i].selected) {
          GameController.builder.midground.removeChild(GameController.builder.midground.nodes[i]);
          GameController.builder.midground.nodes.splice(i, 1);
          i--;
        }
      }
    });
  }
}
