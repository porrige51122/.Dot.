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

import { Level } from './levels/level.js';

// Check to see all has imported
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported())
  type = "canvas";
PIXI.utils.sayHello(type);

// Render application
export let width = window.innerWidth;
export let height = window.innerHeight;

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

  transRectA.beginFill(0xFCBF49);
  transRectA.drawRect(0, 0, width, height);
  transRectA.endFill();

  transRectB.beginFill(0xFCBF49);
  transRectB.drawRect(0, 0, width, height);
  transRectB.endFill();
}

// Get sprites
const loader = new PIXI.Loader();
export let buttons = [];
export let nodeTypes = [];

// Build Transitions
export let transRectA = new PIXI.Graphics();
transRectA.beginFill(0xFCBF49);
transRectA.drawRect(0, 0, width, height);
transRectA.endFill();
transRectA.visible = false;
transRectA.vy = 0.5;

export let transRectB = new PIXI.Graphics();
transRectB.beginFill(0xFCBF49);
transRectB.drawRect(0, 0, width, height);
transRectB.endFill();
transRectB.y = 700;
transRectB.visible = false;
transRectB.vy = 0.5;

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


let level = new Level();
let finished = false;

let style2 = new PIXI.TextStyle({
  fontFamily: "Courier New",
  fontSize: 50,
  fill: "#FCBF49"
});
let message3 = new PIXI.Text("Thanks For Playing!", style2);
message3.anchor.set(0.5, 0.5);
message3.position.set(400, 300);


loader.add(NextButton)
      .add(StartButton)
      .add(Nodes)
      .on("progress", loadProgressHandler)
      .load(setup);

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
  button.position.x = width/2;
  button.position.y = height/3 * 2;
  button.tap = gameSetup;
  button.click = gameSetup;
  app.stage.addChild(button)
  buttons.push(button);

  menuSetup();
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  // Transition
  if (transRectA.visible === true) {
    transRectA.y += transRectA.vy;
    transRectA.vy += 0.5;
    if (transRectA.y > height) {
      transRectA.visible = false;
      levelSetup();
    }
  } else if (transRectB.visible) {
    transRectB.y -= transRectB.vy;
    transRectB.vy += 0.5;
    if (transRectB.y < 0) {
      app.renderer.backgroundColor = 0xFCBF49;
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

export function clearChildren() {
  for (var i = app.stage.children.length - 1; i >= 0; i--) {
    app.stage.removeChild(app.stage.children[i]);
  };
}

export function nextLevelSetup() {
  lines = [];
  buttons = [];

  let style = new PIXI.TextStyle({
    fontFamily: "Courier New",
    fontSize: 100,
    fill: "#000034"
  });
  let message = new PIXI.Text("Level " + level.level + "\nComplete!", style);
  message.anchor.set(0.5, 0.5);
  message.position.set(width/2, height/4);
  app.stage.addChild(message);
  app.renderer.render(app.stage);

  let button = new PIXI.Sprite(loader.resources[NextButton].texture);
  button.buttonMode = true;
  button.interactive = true;
  button.anchor.set(0.5);
  button.position.x = width/2;
  button.position.y = height/4 * 3;
  button.tap = gameSetup;
  button.click = gameSetup;
  app.stage.addChild(button);
  buttons.push(button);

  level.level++;
}

export function levelSetup() {
  level.buildLevel();
  app.stage.addChild(line);
}

let lines = [];

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
    for (let i = 0; i < level.nodes.length; i++) {
      if (this.x == level.nodes[i].sprite.x && this.y == level.nodes[i].sprite.y) {
        nodeind.push(i);
      }
      if (lineStart.x == level.nodes[i].sprite.x && lineStart.y == level.nodes[i].sprite.y) {
        nodeind.push(i);
      }
    }
    if (nodeind[0] == nodeind[1]) {
      popup("Cannot connect to itself")
    } else {
      // Check for collisions
      for (let i = 0; i < lines.length; i++) {
        if (utils.sameLine(c.currentPath.points, lines[i].p)) {
          level.nodes[nodeind[0]].break();
          level.nodes[nodeind[1]].break();
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
        if (level.nodes[nodeind[0]].connect()) {
          if (level.nodes[nodeind[1]].connect()) {
            lines.push({
              p: [lineStart.x, lineStart.y, this.x, this.y],
              l: c
            });
            app.stage.addChild(lines[lines.length - 1].l);
          } else {
            level.nodes[nodeind[0]].break();
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
  if (level.checkWin()) {
    app.stage.addChild(transRectB);
    menuGameTransition();
  }
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
