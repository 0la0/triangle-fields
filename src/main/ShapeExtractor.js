import Point from '../geometry/Point';

// TODO: figure out how to sequence all "pointAtIndex" into this
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
  return new Array(numFieldPoints).fill(null)
    .map((n, i) => {
      const length = Math.floor(i * stride);
      const { x, y } = bezierPath.pointOnPathAtLength(length);
      return new Point(deltaX + x, deltaY + y);
    });
}
