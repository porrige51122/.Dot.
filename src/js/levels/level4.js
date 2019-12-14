import * as PIXI from 'pixi.js';

import { Node } from '../sprites/node.js';

export function createLevel4(app, nodes) {
  let style = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontSize: 20,
    fill: "#FCBF49"
  });
  let message = new PIXI.Text("Level 4", style);
  message.position.set(20, 20);
  app.stage.addChild(message);
  let message2 = new PIXI.Text("Don't want any crossing though", style);
  message2.anchor.set(0.5, 0.5);
  message2.position.set(400, 100);
  app.stage.addChild(message2);

  nodes = [];
  let nodePos = [ { s: 'A', x: 50 , y: 100 },
                  { s: 'B', x: 50 , y: 200 },
                  { s: 'C', x: 50 , y: 300 },
                  { s: 'A', x: 150, y: 300 },
                  { s: 'C', x: 250, y: 300 },
                  { s: 'A', x: 50 , y: 400 },
                  { s: 'A', x: 150, y: 100 },
                  { s: 'B', x: 150, y: 400 },
                  { s: 'C', x: 50 , y: 500 },
                  { s: 'A', x: 150, y: 200 },
                  { s: 'C', x: 350, y: 500 },
                  { s: 'B', x: 650, y: 300 },
                  { s: 'B', x: 650, y: 500 },
                  { s: 'A', x: 650, y: 100 }
                ];

  for (let i = 0; i < nodePos.length; i++) {
    let type = nodePos[i].s;
    let x = nodePos[i].x;
    let y = nodePos[i].y;
    nodes.push(new Node(type, x, y));
  }
  nodes.forEach(x => app.stage.addChild(x.sprite));
  return nodes;
}
