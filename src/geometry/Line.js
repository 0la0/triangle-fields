import colorManager from '../main/ColorManager';

function createLine(p1, p2, thickness, name) {
  const path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(p1.getX(), p1.getY()));
  path.lineToPoint(NSMakePoint(p2.getX(), p2.getY()));

  const shape = MSShapeGroup.layerWithPath(MSPath.pathWithBezierPath(path));
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

  getId() {
    return this.id;
  }

  getShape() {
    return createLine(this.p1, this.p2, this.thickness, this.name);
  }
}
