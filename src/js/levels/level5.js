import * as PIXI from 'pixi.js';

import { createNode } from '../sprites/node.js';

export function createLevel5(app, nodes) {
  let style = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontSize: 20,
    fill: "#FCBF49"
  });
  let message = new PIXI.Text("Level 5", style);
  message.position.set(20, 20);
  app.stage.addChild(message);
  let message2 = new PIXI.Text("What has happened here?", style);
  message2.anchor.set(0.5, 0.5);
  message2.position.set(400, 50);
  app.stage.addChild(message2);

  nodes = [];
  let nodePos = [ { s: 'A', x: 100, y: 100 },
                  { s: 'B', x: 200, y: 100 },
                  { s: 'C', x: 300, y: 100 },
                  { s: 'B', x: 400, y: 100 },
                  { s: 'B', x: 500, y: 100 },
                  { s: 'B', x: 600, y: 100 },
                  { s: 'B', x: 700, y: 100 },
                  { s: 'B', x: 100, y: 200 },
                  { s: 'A', x: 200, y: 200 },
                  { s: 'B', x: 300, y: 200 },
                  { s: 'C', x: 400, y: 200 },
                  { s: 'B', x: 500, y: 200 },
                  { s: 'C', x: 600, y: 200 },
                  { s: 'B', x: 700, y: 200 },
                  { s: 'B', x: 100, y: 300 },
                  { s: 'A', x: 200, y: 300 },
                  { s: 'B', x: 300, y: 300 },
                  { s: 'C', x: 400, y: 300 },
                  { s: 'B', x: 500, y: 300 },
                  { s: 'C', x: 600, y: 300 },
                  { s: 'B', x: 700, y: 300 },
                  { s: 'B', x: 100, y: 400 },
                  { s: 'B', x: 200, y: 400 },
                  { s: 'C', x: 300, y: 400 },
                  { s: 'B', x: 400, y: 400 },
                  { s: 'B', x: 500, y: 400 },
                  { s: 'C', x: 600, y: 400 },
                  { s: 'B', x: 700, y: 400 },
                  { s: 'A', x: 100, y: 500 },
                  { s: 'B', x: 200, y: 500 },
                  { s: 'B', x: 300, y: 500 },
                  { s: 'A', x: 400, y: 500 },
                  { s: 'B', x: 500, y: 500 },
                  { s: 'B', x: 600, y: 500 },
                  { s: 'B', x: 700, y: 500 },
                ];
  for (let i = 0; i < nodePos.length; i++) {
    nodes.push(createNode(nodePos[i]));
  }
  nodes.forEach(x => app.stage.addChild(x.n));
  return nodes;
}
