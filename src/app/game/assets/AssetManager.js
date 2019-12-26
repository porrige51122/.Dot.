import { Loader, Texture, Rectangle } from 'pixi.js';

import NodeA from '../../../assets/nodeA.png';
import NodeB from '../../../assets/nodeB.png';
import NodeC from '../../../assets/nodeC.png';
import World1 from '../../../assets/world1.json';
import World2 from '../../../assets/world2.json';
import '../../../app.css';

/**
 * Asset Manager class
 * Used to store assets
 */
export class AssetManager {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.loader = new Loader();

      this.loader.add(NodeA).add(NodeB).add(NodeC);

      this.levels = [World1, World2];
      this.nodeA = [];
      this.nodeB = [];
      this.nodeC = [];

      this.loader.on('progress', this.loadProgressHandler)
      this.loader.load(() => {
        this.nodeA = this.split(NodeA, 100);
        this.nodeB = this.split(NodeB, 100);
        this.nodeC = this.split(NodeC, 100);
        console.log('All Assets Loaded');
        resolve();
      });
    });
  }

  split(id, width) {
    let output = []
    let sheet = this.loader.resources[id].texture
    for (let x = 0; x < sheet.width; x += width) {
      let sprite = new Texture(sheet);
      sprite.frame = new Rectangle(x, 0, 100, 100);
      output.push(sprite);
    }
    return output;
  }

  loadProgressHandler(loader, resource) {
    console.log("progress: " + loader.progress + "%");
  }
}
