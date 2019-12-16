import { Loader } from 'pixi.js';

import StartButton from '../../../assets/start.png';
import NextButton from '../../../assets/next.png';
import Nodes from '../../../assets/nodes.png';

/**
 * Asset Manager class
 * Used to store assets
 */
export class AssetManager {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.loader = new Loader();

      this.loader.add(NextButton)
                 .add(StartButton)
                 .add(Nodes);

      this.loader.on('progress', this.loadProgressHandler)
      this.loader.load(() => {
        console.log('All Assets Loaded');
        resolve();
      });
    });
  }

  loadProgressHandler(loader, resource) {
    console.log("progress: " + loader.progress + "%");
  }
}
