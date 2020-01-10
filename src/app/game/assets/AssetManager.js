import { Loader, Texture, Rectangle } from 'pixi.js';

import NodeA from '../../../assets/nodeA.png';
import NodeB from '../../../assets/nodeB.png';
import NodeC from '../../../assets/nodeC.png';
import NodeD from '../../../assets/nodeD.png';
import NodeE from '../../../assets/nodeE.png';
import NodeF from '../../../assets/nodeF.png';
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

      this.loader.add(NodeA).add(NodeB).add(NodeC).add(NodeD).add(NodeE).add(NodeF);

      this.levels = [World1, World2];

      this.loader.on('progress', this.loadProgressHandler)
      this.loader.load(() => {
        this.nodeA = this.loader.resources[NodeA].texture;
        this.nodeB = this.loader.resources[NodeB].texture;
        this.nodeC = this.loader.resources[NodeC].texture;
        this.nodeD = this.loader.resources[NodeD].texture;
        this.nodeE = this.loader.resources[NodeE].texture;
        this.nodeF = this.loader.resources[NodeF].texture;
        console.log('All Assets Loaded');
        resolve();
      });
    });
  }

  /** DEPRECATED
   * Split function
   *
   * Splits tecture into an array of individual textures
   */
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
