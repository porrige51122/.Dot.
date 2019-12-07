import { getNodeA, getNodeB, getNodeC } from '../sprites/node.js';
import { nodeClick } from '../canvas.js';
import * as PIXI from 'pixi.js';

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
  let nodePos = [ { s: 'B', x: 300, y: 200 },
                  { s: 'C', x: 300, y: 300 },
                  { s: 'A', x: 400, y: 300 },
                  { s: 'B', x: 200, y: 200 },
                  { s: 'A', x: 600, y: 150 },
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
    } else if (nodePos[i].s == 'C') {
      node = getNodeC();
      max = 3;
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
