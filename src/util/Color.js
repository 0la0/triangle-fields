// https://en.wikipedia.org/wiki/Smoothstep
function smoothstep(x) {
  return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
}

function getValueBetweenTwoPoints(y1, y2) {
  const range = y2 - y1;
  return y1 + range * smoothstep(Math.random());
}

export default class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 1;
  }

  interpolateWith(color) {
    const r = getValueBetweenTwoPoints(this.r, color.r);
    const g = getValueBetweenTwoPoints(this.g, color.g);
    const b = getValueBetweenTwoPoints(this.b, color.b);
    return new Color(r, g, b);
  }

  static fromHex(hexValue) {
    try {
      const r = parseInt(hexValue.substring(0, 2), 16);
      const g = parseInt(hexValue.substring(2, 4), 16);
      const b = parseInt(hexValue.substring(4, 6), 16);
      return new Color(
        r / 255,
        g / 255,
        b / 255
      );
    }
    catch(error) {
      console.log('error', error);
      return new Color(1, 0, 0);
    }
  }
}
