import { app, clearChildren, transRectA } from '../canvas.js'

export function gameMenuTransition() {
  transRectA.y = 0;
  transRectA.vy = 0.5;
  transRectA.visible = true;
  app.renderer.backgroundColor = 0x000034;
}

export function gameSetup() {
  clearChildren();
  app.stage.addChild(transRectA);
  gameMenuTransition();
}
