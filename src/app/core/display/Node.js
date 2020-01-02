import { NodeA } from '../nodes/NodeA.js';
import { NodeB } from '../nodes/NodeB.js'
import { NodeC } from '../nodes/NodeC.js'
import { NodeD } from '../nodes/NodeD.js'


export function Node(assets, type, w, h) {
  switch (type) {
    case 0:
      return new NodeA(assets, w, h);
    case 1:
      return new NodeB(assets, w, h);
    case 2:
      return new NodeC(assets, w, h);
    case 3:
      return new NodeD(assets, w, h);
    default:
      console.log('JSON ERROR: Type ' + type + ' entered but it does not exist!');
  }
}
