import Point from '../geometry/Point';

export default function getPointsFromShape(shape, numFieldPoints) {
  const absoluteRect = shape.absoluteRect();
  const frame = shape.frame();
  const deltaX = absoluteRect.x() - frame.x();
  const deltaY = absoluteRect.y() - frame.y();
  const path = shape.pathInFrameWithTransforms();
  const bezierPath = NSBezierPath.bezierPathWithPath(path);

  const length = Math.floor(bezierPath.length());
  const stride = length / numFieldPoints;
  const indices = new Array(numFieldPoints).fill(null).map((n, i) => Math.floor(i * stride));

  // TODO: use control points:
  // console.log(length, bezierPath)
  // for (let i = 0; i < 20; i++) {
  //   console.log(bezierPath.pointAtIndex(i));
  // }

  const points = indices.map(index => {
    const { x, y } = bezierPath.pointOnPathAtLength(index);
    return new Point(deltaX + x, deltaY + y);
  });
  return points;
}
