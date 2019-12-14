import * as PIXI from 'pixi.js';
import Toastify from 'toastify-js';

// Images
import StartButton from '../images/start.png';
import NextButton from '../images/next.png';
import Nodes from '../images/nodes.png';

// Functions
import * as utils from './maths/utils.js'

import { menu, menuGameTransition, menuSetup } from './states/menu.js';
import { gameMenuTransition, gameSetup } from './states/game.js';

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
let width = window.innerWidth;
let height = window.innerHeight;

export let app = new PIXI.Application({
  height: height,
  width: width
});
document.body.appendChild(app.view);

// Resize section
window.addEventListener('resize', resize);

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  app.renderer.resize(width, height);
}

// Get sprites
const loader = new PIXI.Loader();
export let buttons = [];
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

export let transRectA = new PIXI.Graphics();
transRectA.beginFill(0xFCBF49);
transRectA.drawRect(0, 0, 800, 700);
transRectA.endFill();
transRectA.visible = false;
transRectA.vy = 0.5;

function gameLoop(delta) {
  // Transition
  if (transRectA.visible === true) {
    transRectA.y += transRectA.vy;
    transRectA.vy += 0.5;
    if (transRectA.y > 700) {
      transRectA.visible = false;
      levelSetup();
    }
  } else if (transRectB.visible) {
    transRectB.y -= transRectB.vy;
    transRectB.vy += 0.5;
    if (transRectB.y < 0) {
      app.renderer.backgroundColor = 0xFCBF49;
      transRectB.vy = 0.5;
      transRectB.y = 700;
      transRectB.visible = false;
      clearChildren();
      nextLevelSetup();
    }
  }

  // Line following mouse
  if (lineStart.b) {
    let mouseData = app.renderer.plugins.interaction.mouse.global;
    app.stage.removeChildAt(app.stage.getChildIndex(line));
    line = drawLine(lineStart.x, lineStart.y, mouseData.x, mouseData.y);
    app.stage.addChild(line);
  } else {
    line.visible = false;
  }
}

let finished = false;

let style2 = new PIXI.TextStyle({
  fontFamily: "Courier New",
  fontSize: 50,
  fill: "#FCBF49"
});
let message3 = new PIXI.Text("Thanks For Playing!", style2);
message3.anchor.set(0.5, 0.5);
message3.position.set(400, 300);

export let transRectB = new PIXI.Graphics();
transRectB.beginFill(0xFCBF49);
transRectB.drawRect(0, 0, 800, 700);
transRectB.endFill();
transRectB.y = 700;
transRectB.visible = false;
transRectB.vy = 0.5;

export function clearChildren() {
  for (var i = app.stage.children.length - 1; i >= 0; i--) {
    app.stage.removeChild(app.stage.children[i]);
  };
}

export function nextLevelSetup() {
  nodes = [];
  lines = [];
  buttons = [];

  let style = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontSize: 100,
    fill: "#000034"
  });

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

export function levelSetup() {
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
      if (this.x == nodes[i].sprite.x && this.y == nodes[i].sprite.y) {
        nodeind.push(i);
      }
      if (lineStart.x == nodes[i].sprite.x && lineStart.y == nodes[i].sprite.y) {
        nodeind.push(i);
      }
    }
    if (nodeind[0] == nodeind[1]) {
      popup("Cannot connect to itself")
    } else {
      // Check for collisions
      for (let i = 0; i < lines.length; i++) {
        if (utils.sameLine(c.currentPath.points, lines[i].p)) {
          nodes[nodeind[0]].break();
          nodes[nodeind[1]].break();
          app.stage.removeChildAt(app.stage.getChildIndex(lines[i].l));
          lines.splice(i, 1);
          within = true;
          break;
        }
        if (utils.crossLine(c.currentPath.points, lines[i].p)) {
          popup("You cannot cross the connections")
          within = true;
          break;
        }
      }

      // Check for max connections
      if (!within) {
        if (nodes[nodeind[0]].connect()) {
          if (nodes[nodeind[1]].connect()) {
            lines.push({
              p: [lineStart.x, lineStart.y, this.x, this.y],
              l: c
            });
            app.stage.addChild(lines[lines.length - 1].l);
          } else {
            nodes[nodeind[0]].break();
            popup("Max connections per node reached")
          }
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
    menuGameTransition();
  }
}

function checkWin() {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].min != nodes[i].max) {
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
