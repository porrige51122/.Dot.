import { Container, Graphics, Text, TextStyle } from 'pixi.js';

export class Button extends Container {
  constructor(bgColor, textColor, label) {
    super();
    this.bgColor = bgColor;
    this.style = new TextStyle({
      fontFamily: "Courier New",
      fontSize: 75,
      fill: textColor
    });
    this.label = label;
    this.enabled = false;
  }

  enable() {
    if (this.enabled) {
      return;
    }
    this.enabled = true;

    if (this.container !== undefined) {
      this.removeChild(this.container);
    }
    let container = new Container();

    let box = new Graphics();
    box.beginFill(this.bgColor);
    box.drawRoundedRect(50, 50, 300, 100, 50);

    let text = new Text(this.label);
    text.style = this.style;
    text.anchor.set(0.5);
    text.x = 200;
    text.y = 100;

    container.addChild(box);
    container.addChild(text);

    this.container = container;
    this.addChild(this.container);
  }
}
