import * as PIXI from 'pixi.js';
import { app, buttons, clearChildren, nextLevel, nextLevelSetup, transRectB, width, height } from '../canvas.js';

export function menuSetup() {
  buttons[0].visible = true;

  let style = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontSize: 100,
    fill: "#000034"
  });

  let message = new PIXI.Text(".Dot.", style);
  message.anchor.set(0.5, 0.5);
  message.position.set(width/2, height/3);
  app.stage.addChild(message);
  app.renderer.render(app.stage);
  app.renderer.backgroundColor = 0xFCBF49;
}

export function menuGameTransition() {
  transRectB.visible = true;
  transRectB.y = height;
  transRectB.vy = 0;
  app.renderer.backgroundColor = 0x000034;
}
