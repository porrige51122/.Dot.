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
      let nodes = GameController.builder.midground.nodes;
      let compact = [];
      for (let i = 0; i < nodes.length; i++) {
        let cur = nodes[i];
        let type = cur.type;
        let x = Math.floor((cur.x * (GameController.builder.w)) / w) + 1;
        let y = Math.floor((cur.y * (GameController.builder.h)) / h) + 1;
        compact.push({ type: type, x: x, y: y});
      }
      GameController.builder.lvl.nodes = compact;
      GameController.levels.buildLevel(true);
      GameController.transitions.transitionFade(GameController.builder, GameController.levels);
    });
    this.export = new Button(colors.mainText, colors.mainFG, "Export", w, h);
    this.export.x = w - (w / 10);
    this.export.y = h - (h / 16);
    this.export.buttonMode = this.export.interactive = true;
    this.export.scale.set(0.5);
    this.export.enable();
    this.addChild(this.export);
    this.export.on('pointertap', () => {
      let nodes = GameController.builder.midground.nodes;
      let compact = [];
      for (let i = 0; i < nodes.length; i++) {
        let cur = nodes[i];
        let type = cur.type;
        let x = Math.floor((cur.x * (GameController.builder.w)) / w) + 1;
        let y = Math.floor((cur.y * (GameController.builder.h)) / h) + 1;
        compact.push({ type: type, x: x, y: y});
      }
      GameController.builder.lvl.nodes = compact;
      console.log(GameController.builder.lvl);
    });

    this.nodeButtons = [];
    this.nodeButtons.push(new Button(colors.mainText, colors.mainFG, "Circle A", w, h),
                          new Button(colors.mainText, colors.mainFG, "Circle B", w, h),
                          new Button(colors.mainText, colors.mainFG, "Circle C", w, h),
                          new Button(colors.mainText, colors.mainFG, "Triangle A", w, h));

    for (let i = 0; i < this.nodeButtons.length; i++) {
      this.nodeButtons[i].x = w - (w / 10);
      this.nodeButtons[i].y = (h / 16) * (9 + i);
      this.nodeButtons[i].buttonMode = this.nodeButtons[i].interactive = true;
      this.nodeButtons[i].scale.set(0.5);
      this.nodeButtons[i].enable();
      this.addChild(this.nodeButtons[i]);
      this.nodeButtons[i].on('pointertap', () => {
        GameController.builder.midground.createNode(GameController, i);
      });
    }

    this.delete = new Button(colors.red, colors.mainFG, "Delete", w, h);
    this.delete.x = w - (w / 10);
    this.delete.y = h - (h / 16) * 11;
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
