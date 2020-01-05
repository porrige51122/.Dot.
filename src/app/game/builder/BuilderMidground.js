import { Container } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { NodeFactory } from '../../core/display/NodeFactory.js';
import { BuilderLogic } from './BuilderLogic';

export class BuilderMidground extends Container {
  constructor(GameController) {
    super();
    this.nodeFac = new NodeFactory(GameController.assets, GameController.canvas.width, GameController.canvas.height)
    this.nodes = [];
  }

  createNode(GameController, type) {
    let logic = new BuilderLogic(GameController);
    let w = GameController.canvas.width;
    let h = GameController.canvas.height;

    let node = this.nodeFac.createNode(type);
    node.x = Math.floor(w / 2);
    node.y = Math.floor(h / 2);

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
