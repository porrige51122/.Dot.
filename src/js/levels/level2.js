import { getNodeA, getNodeB } from '../sprites/node.js';
import { nodeClick } from '../canvas.js';
import * as PIXI from 'pixi.js';

export function createLevel2(app, nodes) {
  let style = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontSize: 20,
    fill: "#FCBF49"
  });
  let message = new PIXI.Text("Level 2", style);
  message.position.set(20, 20);
  app.stage.addChild(message);
  let message2 = new PIXI.Text("Different nodes have different max connections", style);
  message2.anchor.set(0.5, 0.5);
  message2.position.set(400, 100);
  app.stage.addChild(message2);

  nodes = [];
  let nodePos = [ { s: 'B', x: 300, y: 200 },
                  { s: 'A', x: 300, y: 300 },
                  { s: 'A', x: 400, y: 300 },
                  { s: 'A', x: 200, y: 200 },
                  { s: 'A', x: 600, y: 140 },
                  { s: 'A', x: 500, y: 300 },
                  { s: 'B', x: 500, y: 400 }
                ];
  for (let i = 0; i < nodePos.length; i++) {
    let node, max;
    if (nodePos[i].s == 'A') {
      node = getNodeA();
      max = 2;
    } else if (nodePos[i].s == 'B') {
      node = getNodeB();
      max = 1;
    }
    node.x = nodePos[i].x;
    node.y = nodePos[i].y;
    node.tap = nodeClick;
    node.click = nodeClick;
    nodes.push({ n: node, m: max, c: 0});
  }
  nodes.forEach(x => app.stage.addChild(x.n));
  return nodes;
}
