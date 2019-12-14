import * as PIXI from 'pixi.js';

import { Node } from '../sprites/node.js';

export function createLevel3(app, nodes) {
  let style = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontSize: 20,
    fill: "#FCBF49"
  });
  let message = new PIXI.Text("Level 3", style);
  message.position.set(20, 20);
  app.stage.addChild(message);
  let message2 = new PIXI.Text("But they must all have hit their max connections...", style);
  message2.anchor.set(0.5, 0.5);
  message2.position.set(400, 100);
  app.stage.addChild(message2);

  nodes = [];
  let nodePos = [ { s: 'A', x: 300, y: 200 },
                  { s: 'C', x: 300, y: 300 },
                  { s: 'B', x: 400, y: 300 },
                  { s: 'A', x: 200, y: 200 },
                  { s: 'B', x: 600, y: 150 },
                  { s: 'B', x: 500, y: 300 },
                  { s: 'A', x: 500, y: 400 }
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
