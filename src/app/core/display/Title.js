import { Container, Graphics, Text, TextStyle } from 'pixi.js';

export class Title extends Container {
  constructor(textColor, label) {
    super();
    this.style = new TextStyle({
      fontFamily: "Courier New",
      fontSize: window.innerHeight/3,
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

    let text = new Text(this.label);
    text.style = this.style;
    text.anchor.set(0.5);
    text.position.set(0, 0);
    container.addChild(text);

    this.container = container;
    this.addChild(this.container);
  }
}
