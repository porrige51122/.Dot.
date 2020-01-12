import { Container, Sprite } from 'pixi.js';
import { ColorReplaceFilter } from '@pixi/filter-color-replace';

export class Icon extends Container {
  constructor(icon, color, w, h) {
    super();

    this.ico = new Sprite(icon);
    this.ico.anchor.set(0.5);
    this.ico.width = (w / 16) * 1;
    this.ico.height = (h / 9) * 1;
    let filter = new ColorReplaceFilter(0x000000, color);
    this.ico.filters = [filter];
    this.addChild(this.ico);
  }
}
