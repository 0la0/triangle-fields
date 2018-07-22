import { getRandomColor } from '../util/Math';

function createLine(p1, p2) {
  const path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(p1.getX(), p1.getY()));
  path.lineToPoint(NSMakePoint(p2.getX(), p2.getY()));

  const shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  const border = shape.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary(getRandomColor());
  border.thickness = 2;
  shape.name = 'name test'
  return shape;
}

export default class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.id = [ ...this.p1.getId(), ...this.p2.getId() ]
      .sort((a, b) => a - b)
      .reduce((acc, num) => `${acc}${num}`, '');
  }

  getStartPoint() {
    return this.p1;
  }

  getEndPoint() {
    return this.p2;
  }

  getShape() {
    return createLine(this.p1, this.p2);
  }

  getId() {
    return this.id;
  }

  multScalar(scalar) {
    this.p1.multScalar(scalar);
    this.p2.multScalar(scalar);
    return this;
  }

  getPointOnLineFromStart(distance) {
    const p1 = this.p1.clone();
    const p2 = this.p2.clone().sub(p1);
    const length = Math.sqrt(p2.getMagnitudeSquared());
    return p2.multScalar(1 / length).multScalar(distance).add(p1);
  }

  getPointOnLineFromEnd(distance) {
    const p2 = this.p2.clone();
    const p1 = this.p1.clone().sub(p2);
    const length = Math.sqrt(p1.getMagnitudeSquared());
    return p1.multScalar(1 / length).multScalar(distance).add(p2);
  }

  reverseClone() {
    return new Line(this.p2.clone(), this.p1.clone());
  }

  clone() {
    return new Line(this.p1.clone(), this.p2.clone());
  }
}
