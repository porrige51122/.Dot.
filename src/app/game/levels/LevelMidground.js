import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { Subtitle } from '../../core/display/Subtitle.js';
import { NodeFactory } from '../../core/display/NodeFactory.js';

/**
 * LevelMidground Class
 *
 * Contains all node information generated from information from the level manager
 */
export class LevelMidground extends Container {
  constructor(GameController, builder) {
    super();
    let world = GameController.levels.world || 0;
    this.gt = GameController;
    let w = this.gt.canvas.width;
    let h = this.gt.canvas.height;
    this.sortableChildren = true;

    let lvl;
    if (builder) {
      lvl = GameController.builder.lvl;
    } else {
      lvl = this.gt.assets.levels[world][this.gt.levels.level]
    }

    this.message = new Subtitle(colors.secondaryTitle, lvl.message, w, h);
    this.message.x = w / 2;
    this.message.y = h / 10 * 2;
    this.message.enable();
    this.addChild(this.message);

    this.nodes = [];
    this.lines = [];
    let nodeFac = new NodeFactory(this.gt.assets, w, h);

    for (let i = 0; i < lvl.nodes.length; i++) {
      let node = nodeFac.createNode(lvl.nodes[i].type);
      node.x = Math.floor(w / (lvl.x + 1) * lvl.nodes[i].x);
      node.y = Math.floor(h / (lvl.y + 2) * (lvl.nodes[i].y + 1));

      node.buttonMode = true;
      node.interactive = true;
      node.zIndex = 2;
      node.on('pointerdown', () => {
        node.select();
      });
      node.on('pointerup', () => {
        if (node.selected)
          node.select();
        GameController.levels.game.nodeSelect(this, node);
      });

      this.addChild(node);
      this.nodes.push(node);
    }
  }

}
