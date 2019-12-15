import { TextStyle, Text } from 'pixi.js';
import { Node } from '../sprites/node.js';
import { app, width, height } from '../canvas.js';

import * as Level1 from './level1.js';
import * as Level2 from './level2.js';
import * as Level3 from './level3.js';
import * as Level4 from './level4.js';
import * as Level5 from './level5.js';

export class Level {
  constructor() {
    this.level = 5;
    this.font = new TextStyle({
      fontFamily: 'Courier New',
      fontSize: 20,
      fill: '#FCBF49'
    });
  }

  buildLevel() {
    this.nodes = [];
    this.title = new Text("Level " + this.level, this.font);
    if (this.level == 1) {
      this.message = new Text(Level1.message, this.font);
      this.grid = Level1.grid;
      this.stage = Level1.nodes;
    } else if (this.level == 2) {
      this.message = new Text(Level2.message, this.font);
      this.grid = Level2.grid;
      this.stage = Level2.nodes;
    } else if (this.level == 3) {
      this.message = new Text(Level3.message, this.font);
      this.grid = Level3.grid;
      this.stage = Level3.nodes;
    } else if (this.level == 4) {
      this.message = new Text(Level4.message, this.font);
      this.grid = Level4.grid;
      this.stage = Level4.nodes;
    } else if (this.level == 5) {
      this.message = new Text(Level5.message, this.font);
      this.grid = Level5.grid;
      this.stage = Level5.nodes;
    }

    this.title.position.set(20, 20);
    this.message.anchor.set(0.5, 0.5);
    this.message.position.set(width/2, height/6);
    app.stage.addChild(this.title);
    app.stage.addChild(this.message);

    for (let i = 0; i < this.stage.length; i++) {
      let type = this.stage[i].s;
      let x = this.stage[i].x * (width / (this.grid.w + 1));
      let y = this.stage[i].y * (height / (this.grid.h + 1));
      this.nodes.push(new Node(type, x, y));
    }
    this.nodes.forEach(x => app.stage.addChild(x.sprite));
  }

  checkWin() {
    for (let i = 0; i < this.nodes.length; i++)
      if (this.nodes[i].min != this.nodes[i].max)
        return false;
    return true;
  }
}
