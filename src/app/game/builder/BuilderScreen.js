import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Node } from '../../core/display/Node.js';

export class BuilderScreen extends Container {
  constructor(GameController) {
    super();

    let w = GameController.canvas.width;
    let h = GameController.canvas.height;
    let nodes = [];
    for (let i = 0; i < 5; i++) {
      let node = new Node(GameController.assets, i % 3);
      node.x = Math.floor(w / 2);
      node.y = Math.floor(h / 2);
      node.scale.set(w/1400);

      node.buttonMode = node.interactive = true;

      node.on('pointerdown', this.onDragStart)
          .on('pointerup', this.onDragEnd)
          .on('pointermove', this.onDragMove);

      nodes.push(node);
      this.addChild(node);
    }
  }

  onDragStart(event) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }

  onDragMove() {
    if (this.dragging) {
      let newPosition = this.data.getLocalPosition(this.parent);
      this.position.x = newPosition.x;
      this.position.y = newPosition.y;
    }
  }
}
