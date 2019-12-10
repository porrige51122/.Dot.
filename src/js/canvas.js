import * as PIXI from 'pixi.js';
import Toastify from 'toastify-js';

// Images
import StartButton from '../images/start.png';
import NextButton from '../images/next.png';
import Nodes from '../images/nodes.png';

// Functions
import { gameEnd } from './states/gameEnd.js';
import { menu } from './states/menu.js';
import { nextLevel } from './states/nextLevel.js';
import { createLevel1 } from './levels/level1.js';
import { createLevel2 } from './levels/level2.js';
import { createLevel3 } from './levels/level3.js';
import { createLevel4 } from './levels/level4.js';
import { createLevel5 } from './levels/level5.js';

// Check to see all has imported
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported())
  type = "canvas";
PIXI.utils.sayHello(type);

// Render application
let app = new PIXI.Application({
  height: 700
});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x000034;

// Begin States
let state = menu;

// Get sprites
const loader = new PIXI.Loader();
let buttons = [];
export let nodeTypes = [];

loader.add(NextButton)
      .add(StartButton)
      .add(Nodes)
      .on("progress", loadProgressHandler)
      .load(setup);

// Levels
let level = 1;

// Load Textures
function loadProgressHandler(loader, resource) {
  console.log("progress: " + loader.progress + "%");
}

function setup() {
  console.log("All files loaded");
  let nodeSheet = loader.resources[Nodes].texture;
  for (let x = 0; x < 900; x += 100) {
    let sprite = new PIXI.Texture(nodeSheet);
    sprite.frame = new PIXI.Rectangle(x, 0, 100, 100);
    nodeTypes.push(sprite);
  }
  console.log(nodeTypes);
  let button = new PIXI.Sprite(loader.resources[StartButton].texture);
  button.buttonMode = true;
  button.interactive = true;
  button.anchor.set(0.5);
  button.position.x = 400;
  button.position.y = 300;
  button.tap = gameSetup;
  button.click = gameSetup;
  app.stage.addChild(button)
  buttons.push(button);

  menuSetup();
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  state(delta);
}

let style = new PIXI.TextStyle({
  fontFamily: "Courier New",
  fontSize: 100,
  fill: "#000034"
});
let message = new PIXI.Text(".Dot.", style);
message.anchor.set(0.5, 0.5);
message.position.set(400, 200);
message.visible = false;
app.stage.addChild(message);

function menuSetup() {
  state = menu;
  buttons[0].visible = true;
  message.visible = true;
  app.renderer.render(app.stage);
  app.renderer.backgroundColor = 0xFCBF49;
}

let finished = false;
let transRectA = new PIXI.Graphics();
transRectA.beginFill(0xFCBF49);
transRectA.drawRect(0, 0, 800, 700);
transRectA.endFill();
transRectA.visible = false;
transRectA.vy = 0.5;

function gameMenuTransition() {
  transRectA.visible = true;
  app.renderer.backgroundColor = 0x000034;
  transRectA.y += transRectA.vy;
  transRectA.vy += 0.5;
  if (transRectA.y > 700) {
    transRectA.y = 0;
    transRectA.vy = 0.5;
    transRectA.visible = false;
    gameSetup();
    state = game;
    levelSetup();
  }
}
let style2 = new PIXI.TextStyle({
  fontFamily: "Courier New",
  fontSize: 50,
  fill: "#FCBF49"
});
let message3 = new PIXI.Text("Thanks For Playing!", style2);
message3.anchor.set(0.5, 0.5);
message3.position.set(400, 300);


let transRectB = new PIXI.Graphics();
transRectB.beginFill(0xFCBF49);
transRectB.drawRect(0, 0, 800, 700);
transRectB.endFill();
transRectB.y = 700;
transRectB.visible = false;
transRectB.vy = 0.5;

function menuGameTransition() {
  transRectB.visible = true;
  app.renderer.backgroundColor = 0x000034;
  transRectB.y -= transRectB.vy;
  transRectB.vy += 0.5;
  if (transRectB.y < 0) {
    app.renderer.backgroundColor = 0xFCBF49;
    transRectB.vy = 0.5;
    transRectB.y = 700;
    transRectB.visible = false;
    clearChildren();
    nextLevelSetup();
    state = nextLevel;
  }
}

function gameSetup() {
  clearChildren();
  app.stage.addChild(transRectA);
  state = gameMenuTransition;
}

function clearChildren() {
  for (var i = app.stage.children.length - 1; i >= 0; i--) {
    app.stage.removeChild(app.stage.children[i]);
  };
}

function nextLevelSetup() {
  nodes = [];
  lines = [];
  buttons = [];
  let message = new PIXI.Text("Level " + level + "\nComplete!", style);
  message.anchor.set(0.5, 0.5);
  message.position.set(400, 200);
  app.stage.addChild(message);
  app.renderer.render(app.stage);

  let button = new PIXI.Sprite(loader.resources[NextButton].texture);
  button.buttonMode = true;
  button.interactive = true;
  button.anchor.set(0.5);
  button.position.x = 400;
  button.position.y = 500;
  button.tap = gameSetup;
  button.click = gameSetup;
  app.stage.addChild(button);
  buttons.push(button);

  level++;
}

function levelSetup() {
  if (level == 1) {
    nodes = createLevel1(app, nodes);
    app.stage.addChild(line);
  } else if (level == 2) {
    nodes = createLevel2(app, nodes);
    app.stage.addChild(line);
  } else if (level == 3) {
    nodes = createLevel3(app, nodes);
    app.stage.addChild(line);
  } else if (level == 4) {
    nodes = createLevel4(app, nodes);
    app.stage.addChild(line);
  } else if (level == 5) {
    nodes = createLevel5(app, nodes);
    app.stage.addChild(line);
  } else {
    app.stage.addChild(message3);
    app.renderer.render(app.stage);
    state = gameEnd;
  }
}

let nodes = [];
let lines = [];
let line = new PIXI.Graphics();
line.lineStyle(4, 0xFFFFFF, 1);
line.moveTo(0, 0);
line.lineTo(80, 50);
line.x = 30;
line.y = 32;
line.visible = false;
let lineStart = {
  b: false,
  x: 0,
  y: 0
};

export function nodeClick() {
  if (!lineStart.b) {
    lineStart = {
      b: true,
      x: this.x,
      y: this.y
    };
  } else {
    let c = drawLine(lineStart.x, lineStart.y, this.x, this.y);
    let within = false;
    let nodeind = [];
    for (let i = 0; i < nodes.length; i++) {
      if (this.x == nodes[i].n.x && this.y == nodes[i].n.y) {
        nodeind.push(i);
      }
      if (lineStart.x == nodes[i].n.x && lineStart.y == nodes[i].n.y) {
        nodeind.push(i);
      }
    }
    if (nodeind[0] == nodeind[1]) {
      popup("Cannot connect to itself")
    } else {
      // Check for collisions
      for (let i = 0; i < lines.length; i++) {
        if (sameLine(c.currentPath.points, lines[i].p)) {
          nodes[nodeind[0]].c--;
          nodes[nodeind[0]].n.texture = nodeTypes[nodes[nodeind[0]].c];
          nodes[nodeind[1]].c--;
          nodes[nodeind[1]].n.texture = nodeTypes[nodes[nodeind[1]].c];
          app.stage.removeChildAt(app.stage.getChildIndex(lines[i].l));
          lines.splice(i, 1);
          within = true;
          break;
        }
        if (crossLine(c.currentPath.points, lines[i].p)) {
          popup("You cannot cross the connections")
          within = true;
          break;
        }
      }

      // Check for max connections
      if (!within) {
        if (nodes[nodeind[0]].m > nodes[nodeind[0]].c && nodes[nodeind[1]].m > nodes[nodeind[1]].c) {
          nodes[nodeind[0]].c++;
          nodes[nodeind[0]].n.texture = nodeTypes[nodes[nodeind[0]].c];
          nodes[nodeind[1]].c++;
          nodes[nodeind[1]].n.texture = nodeTypes[nodes[nodeind[1]].c];

          lines.push({
            p: [lineStart.x, lineStart.y, this.x, this.y],
            l: c
          });
          app.stage.addChild(lines[lines.length - 1].l);
        } else {
          popup("Max connections per node reached")
        }
      }
    }

    line.visible = false;
    lineStart.b = false;
  }
  if (checkWin()) {
    app.stage.addChild(transRectB);
    state = menuGameTransition;
  }
}

function checkWin() {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].c != nodes[i].m) {
      return false;
    }
  }
  return true;
}

function popup(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: 'left', // `left`, `center` or `right`
    backgroundColor: "#FCBF49"
  }).showToast();
}

function drawLine(sx, sy, ex, ey) {
  let a = new PIXI.Graphics();
  a.lineStyle(4, 0xFFFFFF, 1);
  a.moveTo(sx, sy);
  a.lineTo(ex, ey);
  a.visible = true;
  return a;
}

function game(delta) {
  if (lineStart.b) {
    let mouseData = app.renderer.plugins.interaction.mouse.global;
    app.stage.removeChildAt(app.stage.getChildIndex(line));
    line = drawLine(lineStart.x, lineStart.y, mouseData.x, mouseData.y);
    app.stage.addChild(line);
  } else {
    line.visible = false;
  }

}

function sameLine(r1, r2) {
  let a = r1[0],
    b = r1[1],
    c = r1[2],
    d = r1[3],
    p = r2[0],
    q = r2[1],
    r = r2[2],
    s = r2[3];
  // check if same line
  if (a == p && b == q && c == r & d == s) {
    return true;
  } else if (a == r && b == s && c == p & d == q) {
    return true;
  }
  return false;

}

function crossLine(r1, r2) {
  let a = r1[0],
    b = r1[1],
    c = r1[2],
    d = r1[3];
  let p = r2[0],
    q = r2[1],
    r = r2[2],
    s = r2[3];
  // check if cross
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};
