import { Connector } from '../../core/display/Connector.js';

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
              console.log('WIN');
            }
          } else {
            console.log('Max connections');
          }
          break;
        case -2:
          console.log('ERROR');
        default:
          console.log('remove Line')
          this.removeLine(ctx, node, prevNode, result);
          break;
      }
      prevNode = undefined;
    }
  }

  checkLines(ctx, a, b) {
    for (let i = 0; i < ctx.lines.length; i++) {
      if ((ctx.lines[i].a === a && ctx.lines[i].b === b)
       || (ctx.lines[i].b === a && ctx.lines[i].a === b)) {
        return i;
      }
    }
    return -1;
  }

  removeLine(ctx, a, b, index, value) {
    if (value !== undefined)
      index = ctx.lines.indexOf(value);
    console.log(index);
    a.decrease();
    b.decrease();
    ctx.removeChild(ctx.lines[index]);
    ctx.lines.splice(index, 1);
  }

  addLine(ctx, a, b) {
    let line = new Connector(a, b);
    line.buttonMode = true;
    line.interactive = true;
    line.on('pointertap', () => {
      this.removeLine(ctx, a, b, undefined, line);
    });
    ctx.lines.push(line);
    ctx.addChild(line);
    a.increase();
    b.increase();
  }
}
