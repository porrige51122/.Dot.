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
      if (!node.canConnect(prevNode) || !prevNode.canConnect(node)) {
        Toastify({
          text: "These cannot connect...",
          position: 'left'
        }).showToast();
        prevNode = undefined;
        return;
      }

      switch (result) {
        case -1:
          if (!node.complete() && !prevNode.complete()) {
            this.addLine(ctx, node, prevNode);
            if (this.checkWin()) {
              if (ctx.gt.levels.custom) {
                ctx.gt.transitions.transitionFade(ctx.gt.levels, ctx.gt.builder);
              } else {
                ctx.gt.levels.levelComplete(ctx.gt);
              }
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
        case -3:
          Toastify({
            text: "Cannot pass through another node...",
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
    if (output >= 0) return output;

    output = Utils.checkCross(ctx.lines, {a: a, b: b});
    if (output) return -2;

    for (let i = 0; i < ctx.nodes.length; i++) {
      let cur = ctx.nodes[i];
      if (cur === a || cur === b) continue;
      if (Utils.lineThroughCircle(a.x, a.y, b.x, b.y, cur.x, cur.y, a.width/4)) {
        return -3;
      }
    }
    return -1;
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
