import * as PIXI from 'pixi.js';

export function getNodeB() {
  let circle = new PIXI.Graphics();
  circle.buttonMode = true;
  circle.interactive = true;
  circle.lineStyle(5, 0xFCBF49, 1);
  circle.beginFill(0x000034);
  circle.drawCircle(0, 0, 17);
  circle.x = Math.random() * 800;
  circle.y = Math.random() * 600;
  circle.endFill();
  return circle;
}

export function getNodeA() {
  let circle = new PIXI.Graphics();
  circle.buttonMode = true;
  circle.interactive = true;
  circle.lineStyle(15, 0xFCBF49, 1);
  circle.beginFill(0x000034);
  circle.drawCircle(0, 0, 13);
  circle.x = Math.random() * 800;
  circle.y = Math.random() * 600;
  circle.endFill();
  return circle;
}

export function getNodeC() {
  let circle = new PIXI.Graphics();
  circle.buttonMode = true;
  circle.interactive = true;
  circle.beginFill(0xFCBF49);
  circle.drawCircle(0, 0, 20);
  circle.x = Math.random() * 800;
  circle.y = Math.random() * 600;
  circle.endFill();
  return circle;
}
