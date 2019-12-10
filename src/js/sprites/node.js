import * as PIXI from 'pixi.js';

import { nodeClick, nodeTypes } from '../canvas.js';
import Nodes from '../../images/nodes.png';

export function createNode(data) {
  let a, max, min;
  if (data.s == 'A') {
    a = new PIXI.Sprite(setAShape());
    max = 1;
    min = 0;
  } else if (data.s == 'B') {
    a = new PIXI.Sprite(setBShape());
    max = 4;
    min = 2;
  } else if (data.s == 'C') {
    a = new PIXI.Sprite(setCShape());
    max = 8;
    min = 5;
  }
  a.buttonMode = true;
  a.interactive = true;
  a.anchor.set(0.5);
  a.scale.set(0.5);
  a.position.set(data.x, data.y);
  a.tap = nodeClick;
  a.click = nodeClick;
  return { n: a, m: max, c: min };
}

function setAShape() {
  return nodeTypes[0];
}

function setBShape() {
  return nodeTypes[2];
}

function setCShape() {
  return nodeTypes[5];
}
