import { NodeA } from '../nodes/NodeA.js';
import { NodeB } from '../nodes/NodeB.js'
import { NodeC } from '../nodes/NodeC.js'
import { NodeD } from '../nodes/NodeD.js'

export class NodeFactory {
  constructor(assets, w, h) {
    this.assets = assets;
    this.w = w;
    this.h = h;
  }

  createNode(type) {
    switch (type) {
      case 0:
        return new NodeA(this.assets, this.w, this.h);
      case 1:
        return new NodeB(this.assets, this.w, this.h);
      case 2:
        return new NodeC(this.assets, this.w, this.h);
      case 3:
        return new NodeD(this.assets, this.w, this.h);
      default:
        console.log('JSON ERROR: Type ' + type + ' entered but it does not exist!');
    }
  }
}
