import colorManager from '../util/ColorManager';

function createTriangle(p1, p2, p3, name) {
  const path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(p1.getX(), p1.getY()));
  path.lineToPoint(NSMakePoint(p2.getX(), p2.getY()));
  path.lineToPoint(NSMakePoint(p3.getX(), p3.getY()));
  path.closePath();
  const shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  shape.name = name;
  // const border = shape.style().addStylePartOfType(1);
  // border.color = MSColor.colorWithRGBADictionary(getRandomColor());
  // border.thickness = 1;
  const fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created
  fill.color = MSColor.colorWithRGBADictionary(colorManager.getRandomColor());
  return shape;
}

export default class Triangle {
  constructor(p1, p2, p3, name) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.name = name;
  }

  getShape() {
    return createTriangle(this.p1, this.p2, this.p3, this.name);
  }
}
