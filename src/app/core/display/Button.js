import { Container, Graphics, Text, TextStyle } from 'pixi.js';

export class Button extends Container {
  constructor(bgColor, textColor, label, w, h) {
    super();
    this.bgColor = bgColor;
    this.textColor = textColor
    this.label = label;
    this.enabled = false;
    this.w = w;
    this.h = h;

    this.sortableChildren = true;
  }

  enable() {
    if (this.enabled)
      return;

    this.enabled = true;

    if (this.container !== undefined)
      this.removeChild(this.container);

    this.style = new TextStyle({
      fontFamily: 'Text Me One',
      fontSize: this.h / 14,
      fill: this.textColor
    });

    this.boxX = this.style.fontSize * this.label.length * 0.8;
    this.boxY = this.style.fontSize * 1.5;

    this.createBox(this.bgColor);

    this.text = new Text(this.label);
    this.text.style = this.style;
    this.text.anchor.set(0.5);
    this.text.zIndex = 2;

    this.addChild(this.text);
  }

  createBox(color) {
    this.removeChild(this.box);
    this.box = new Graphics();
    this.box.beginFill(color);
    this.box.drawRoundedRect(-this.boxX / 2, -this.boxY / 2, this.boxX, this.boxY, this.boxY / 4);
    this.box.zIndex = 1;
    this.addChild(this.box);
  }
}
