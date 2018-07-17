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

  getShape() {
    return createLine(this.p1, this.p2);
  }

  getId() {
    return this.id;
  }
}
