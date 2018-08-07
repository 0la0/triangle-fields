import Point from '../geometry/Point';

export default function getPointsFromShape(shape, numFieldPoints) {
  const absoluteRect = shape.absoluteRect();
  const frame = shape.frame();
  const deltaX = absoluteRect.x() - frame.x();
  const deltaY = absoluteRect.y() - frame.y();
  const path = shape.pathInFrameWithTransforms();
  const numPoints = path.elementCount();
  const bezierPath = NSBezierPath.bezierPathWithPath(path);
  const length = Math.floor(bezierPath.length());
  const stride = length / numFieldPoints;
  const indices = new Array(numFieldPoints).fill(null).map((n, i) => Math.floor(i * stride));

  const pathPoints = new Array(numPoints).fill(null).map((n, index) => {
    const { x, y } = bezierPath.pointAtIndex(index);
    return new Point(deltaX + x, deltaY + y);
  });
  // TODO: sort original path points into generated points

  const generatedPoints = indices.map(index => {
    const { x, y } = bezierPath.pointOnPathAtLength(index);
    return new Point(deltaX + x, deltaY + y);
  });
  return generatedPoints;
}
