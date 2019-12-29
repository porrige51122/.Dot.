import Toastify from 'toastify-js';

import { Connector } from '../../core/display/Connector.js';
import * as Utils from '../../core/utils/Utils.js';

export class LevelBackend {
  checkWin() {
    let check = true;
    for (let i = 0; i < this.nodes.length; i++) {
      if (!this.nodes[i].complete()) {
        check = false;
      }
    }
    return check;
  }

  nodeSelect(ctx, node) {
    let prevNode;
    for (let i = 0; i < this.nodes.length; i++)
      if (this.nodes[i].selected)
        prevNode = this.nodes[i];

    if (prevNode === undefined || prevNode === node) {
      node.select();
    } else {
      prevNode.select();
      let result = this.checkLines(ctx, node, prevNode);

      switch (result) {
        case -1:
          if (!node.complete() && !prevNode.complete()) {
            this.addLine(ctx, node, prevNode);
            if (this.checkWin()) {
              ctx.gt.levels.levelComplete(ctx.gt);
            }
          } else {
            Toastify({
              text: "Max connections reached...",
              position: 'left'
            }).showToast();
          }
          break;

        case -2:
          Toastify({
            text: "Lines are crossing...",
            position: 'left'
          }).showToast();
          break;
        default:
          this.removeLine(ctx, node, prevNode, result);
          break;

      }
      prevNode = undefined;
    }
  }

  checkLines(ctx, a, b) {
    let output = Utils.checkDuplicate(ctx.lines, {a: a, b: b});
    if (output !== -1) return output;
    output = Utils.checkCross(ctx.lines, {a: a, b: b});
    return output ? -2 : -1;
  }

  removeLine(ctx, a, b, index, value) {
    if (value !== undefined)
      index = ctx.lines.indexOf(value);
    a.decrease();
    b.decrease();
    ctx.removeChild(ctx.lines[index]);
    ctx.lines.splice(index, 1);
  }

  addLine(ctx, a, b) {
    let line = new Connector(a, b, ctx.gt.canvas.width, ctx.gt.canvas.height);
    line.buttonMode = true;
    line.interactive = true;
    line.on('pointertap', () => {
      this.removeLine(ctx, a, b, undefined, line);
    });
    line.zIndex = 1;
    ctx.lines.push(line);
    ctx.addChild(line);
    a.increase();
    b.increase();
  }
}
