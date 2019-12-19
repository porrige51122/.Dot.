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
  }

  enable() {
    if (this.enabled) {
      return;
    }
    this.enabled = true;

    if (this.container !== undefined) {
      this.removeChild(this.container);
    }

    this.style = new TextStyle({
      fontFamily: 'Text Me One',
      fontSize: this.h/14,
      fill: this.textColor
    });

    this.boxX = this.style.fontSize * this.label.length * 0.8;
    this.boxY = this.style.fontSize * 1.5;

    let container = new Container();

    let box = new Graphics();
    box.beginFill(this.bgColor);
    box.drawRoundedRect(-this.boxX/2, -this.boxY/2, this.boxX, this.boxY, this.boxY/4);

    let text = new Text(this.label);
    text.style = this.style;
    text.anchor.set(0.5);

    container.addChild(box);
    container.addChild(text);

    this.container = container;
    this.addChild(this.container);
  }
}
