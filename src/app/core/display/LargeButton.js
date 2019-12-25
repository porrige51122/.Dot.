import { Container, Graphics, Text, TextStyle } from 'pixi.js';

import { Button } from './Button.js';

export class LargeButton extends Button {
  constructor(bgColor, textColor, label, sublabel, w, h) {
    super(bgColor, textColor, label, w, h);
    this.sublabel = sublabel;
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

    this.boxX = this.style.fontSize * this.sublabel.length * 0.5;
    this.boxY = this.style.fontSize * 4;

    this.createBox(this.bgColor);

    this.text = new Text(this.label);
    this.text.style = this.style;
    this.text.anchor.set(0.5, 1);
    this.text.zIndex = 2;
    this.text2 = new Text(this.sublabel);
    this.text2.style = this.style;
    this.text2.anchor.set(0.5, 0);
    this.text2.zIndex = 2;

    this.addChild(this.text, this.text2);
  }
}
