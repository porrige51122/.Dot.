import { Loader, Texture, Rectangle } from 'pixi.js';

import Nodes from '../../../assets/nodes.png';
import Levels from '../../../assets/levels.json';
import '../../../app.css';

/**
 * Asset Manager class
 * Used to store assets
 */
export class AssetManager {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.loader = new Loader();

      this.loader.add(Nodes);

      this.levels = Levels;
      this.nodeTypes = [];

      this.loader.on('progress', this.loadProgressHandler)
      this.loader.load(() => {

        let nodeSheet = this.loader.resources[Nodes].texture;
        for (let x = 0; x < 900; x += 100) {
          let sprite = new Texture(nodeSheet);
          sprite.frame = new Rectangle(x, 0, 100, 100);
          this.nodeTypes.push(sprite);
        }

        console.log('All Assets Loaded');
        resolve();
      });
    });
  }

  loadProgressHandler(loader, resource) {
    console.log("progress: " + loader.progress + "%");
  }
}
