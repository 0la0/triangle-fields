import colorManager from '../util/ColorManager';

function createOval(centerPoint, radius, name) {
  const ovalShape = MSOvalShape.alloc().init();
  ovalShape.frame = MSRect.rectWithRect(NSMakeRect(centerPoint.getX(), centerPoint.getY(), radius, radius));
  const shapeGroup = MSShapeGroup.shapeWithPath(ovalShape);
  const fill = shapeGroup.style().addStylePartOfType(0);
  fill.color = MSColor.colorWithRGBADictionary(colorManager.getRandomColor());
  shapeGroup.name = name || 'Point';
  return shapeGroup;
}

export default class Oval {
  constructor(center, radius, name) {
    this.center = center.clone().addScalar(-radius / 2);
    this.radius = radius;
    this.name = name;
  }

  getShape() {
    return createOval(this.center, this.radius, this.name);
  }
}
