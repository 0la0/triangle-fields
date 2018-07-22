
export default class Point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  add(p) {
    return new Point(
      this.x + p.x,
      this.y + p.y
    );
  }

  sub(p) {
    return new Point(
      this.x - p.x,
      this.y - p.y
    );
  }

  multScalar(scalar) {
    return new Point(
      this.x * scalar,
      this.y * scalar
    );
  }

  addScalar(scalar) {
    return new Point(
      this.x + scalar,
      this.y + scalar
    );
  }

  getMagnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }

  // TODO: change to getArrayFromElements
  getId() {
    return [ this.x, this.y ];
  }

  clone() {
    return new Point(this.x, this.y);
  }
}
