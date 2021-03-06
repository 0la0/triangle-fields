
// https://en.wikipedia.org/wiki/Smoothstep
function smoothstep(x) {
  return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
}

function getValueBetweenTwoPoints(y1, y2, percent) {
  const range = y2 - y1;
  return y1 + range * percent;
}

export default class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 1;
  }

  interpolateWith(color) {
    const percent = smoothstep(Math.random());
    const r = getValueBetweenTwoPoints(this.r, color.r, percent);
    const g = getValueBetweenTwoPoints(this.g, color.g, percent);
    const b = getValueBetweenTwoPoints(this.b, color.b, percent);
    return new Color(r, g, b);
  }

  static fromHex(hexValue) {
    try {
      const r = parseInt(hexValue.substring(0, 2), 16) / 255;
      const g = parseInt(hexValue.substring(2, 4), 16) / 255;
      const b = parseInt(hexValue.substring(4, 6), 16) / 255;
      return new Color(r, g, b);
    }
    catch(error) {
      console.log('error', error);
      return new Color(1, 0, 0);
    }
  }
}
