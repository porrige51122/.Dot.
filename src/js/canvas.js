import * as PIXI from 'pixi.js';

// Check to see all has imported
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported())
  type = "canvas";
PIXI.utils.sayHello(type);

// Render application
let app = new PIXI.Application({});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x000034;
