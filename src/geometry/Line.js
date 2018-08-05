import colorManager from '../util/ColorManager';

function createLine(p1, p2, thickness, name) {
  const path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(p1.getX(), p1.getY()));
  path.lineToPoint(NSMakePoint(p2.getX(), p2.getY()));

  const shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  const border = shape.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary(colorManager.getRandomColor());
  border.thickness = thickness;
  shape.name = name;
  return shape;
}

export default class Line {
  constructor(p1, p2, thickness, name) {
    this.p1 = p1;
    this.p2 = p2;
    this.thickness = thickness;
    this.name = name;
    this.id = [ ...this.p1.toArray(), ...this.p2.toArray() ]
      .sort((a, b) => a - b)
      .reduce((acc, num) => `${acc}${num}`, '');
  }

  setName(name) {
    this.name = name;
    return this;
  }

  getStartPoint() {
    return this.p1;
  }

  getEndPoint() {
    return this.p2;
  }

  getShape() {
    return createLine(this.p1, this.p2, this.thickness, this.name);
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

  equals(line) {
    if (!(line instanceof Line)) { return false; }
    return (this.p1.equals(line.p1) && this.p2.equals(line.p2))
        || (this.p1.equals(line.p2) && this.p2.equals(line.p1));
  }

  equalsPoints(p1, p2) {
    return (this.p1.equals(p1) && this.p2.equals(p2))
        || (this.p1.equals(p2) && this.p2.equals(p1));
  }
}
