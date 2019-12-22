import { Container, Graphics } from 'pixi.js';
import * as colors from '../../core/display/Colors.js';

import { GameController } from '../GameController.js';
import { Subtitle } from '../../core/display/Subtitle.js';
import { Node } from '../../core/display/Node.js';

export class LevelMidground extends Container {
  constructor(GameController) {
    super();
    this.gt = GameController;
    let w = this.gt.canvas.width;
    let h = this.gt.canvas.height;
    this.sortableChildren = true;

    let lvl = this.gt.assets.levels[this.gt.levels.level];

    this.message = new Subtitle(colors.secondaryTitle, lvl.message, w, h);
    this.message.x = w / 2;
    this.message.y = h / 10 * 2;
    this.message.enable();
    this.addChild(this.message);

    this.nodes = [];
    this.lines = [];

    for (let i = 0; i < lvl.nodes.length; i++) {
      let node = new Node(this.gt.assets, lvl.nodes[i].type);
      node.x = w / (lvl.x + 1) * lvl.nodes[i].x;
      node.y = h / (lvl.y + 2) * (lvl.nodes[i].y + 1);
      node.scale.set(1/(lvl.y + 1) * 2);

      node.buttonMode = true;
      node.interactive = true;
      node.zIndex = 2;
      node.on('pointertap', () => {
        GameController.levels.game.nodeSelect(this, node);
      });

      this.addChild(node);
      this.nodes.push(node);
    }

  }


}
