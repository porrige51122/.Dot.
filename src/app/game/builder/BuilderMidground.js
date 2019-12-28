import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Node } from '../../core/display/Node.js';
import { BuilderLogic } from './BuilderLogic';

export class BuilderMidground extends Container {
  constructor(GameController) {
    super();
    this.nodes = [];
  }

  createNode(GameController, type) {
    let logic = new BuilderLogic(GameController);
    let w = GameController.canvas.width;
    let h = GameController.canvas.height;

    let node = new Node(GameController.assets, type);
    node.x = Math.floor(w / GameController.builder.w);
    node.y = Math.floor(h / GameController.builder.h);
    node.scale.set(w/1400);

    node.buttonMode = node.interactive = true;

    node.on('pointerdown', logic.onDragStart)
        .on('pointerup', logic.onDragEnd)
        .on('pointermove', logic.onDragMove);

    node.on('pointerdown', () => {
              for (let i = 0; i < this.nodes.length; i++)
                if (this.nodes[i].selected && this.nodes[i] != node)
                  this.nodes[i].select();
              node.select();
            });

    this.nodes.push(node);
    this.addChild(node);
  }
}
