import { Types } from 'sketch';
import { Group } from 'sketch/dom';
import delaunayTriangulate from 'delaunay-triangulate';
import { getRandomNum, getCentroid } from '../util/Math';
import { pointIsInsidePolygon } from '../util/Intersection';
import Point from '../geometry/Point';
import Triangle from '../geometry/Triangle';
import Oval from '../geometry/Oval';
import Line from '../geometry/Line';

const FIELD_SIZE = 100;

function getBounds(points) {
  const dimensions = {
    minX: Number.MAX_VALUE,
    maxX: Number.MIN_VALUE,
    minY: Number.MAX_VALUE,
    maxY: Number.MIN_VALUE,
  };
  const fieldDimensions = points.reduce((dims, point) => {
    const x = point.getX();
    const y = point.getY();
    if (x < dims.minX) { dims.minX = x; }
    if (x > dims.maxX) { dims.maxX = x; }
    if (y < dims.minY) { dims.minY = y; }
    if (y > dims.maxY) { dims.maxY = y; }
    return dims;
  }, dimensions);
  fieldDimensions.rangeX = fieldDimensions.maxX - fieldDimensions.minX;
  fieldDimensions.rangeY = fieldDimensions.maxY - fieldDimensions.minY;
  return fieldDimensions;
}

function createField(numPoints, edgePoints) {
  const centroid = getCentroid(edgePoints);
  const bounds = getBounds(edgePoints);
  let points = [];
  while (points.length < numPoints) {
    const potentialPoint = new Point(
      getRandomNum(bounds.rangeX) + bounds.minX,
      getRandomNum(bounds.rangeY) + bounds.minY,
    );
    if (pointIsInsidePolygon(edgePoints, potentialPoint)) {
      points.push(potentialPoint);
    }
  }
  return { points };
}

function getPointsFromShape(shape, numPoints) {
  const path = shape.pathInFrameWithTransforms();
  const bezierPath = NSBezierPath.bezierPathWithPath(path);

  const length = Math.floor(bezierPath.length());
  const stride = length / numPoints;
  const indices = new Array(numPoints).fill(null).map((n, i) => Math.floor(i * stride));

  // TODO: use control points:
  // console.log(length, bezierPath)
  // for (let i = 0; i < 20; i++) {
  //   console.log(bezierPath.pointAtIndex(i));
  // }

  const points = indices.map(index => {
    const { x, y } = bezierPath.pointOnPathAtLength(index);
    return new Point(x, y);
  });
  return points;
}

export default function(context, shape, numEdgePoint, numPoints) {
  const page = context.document.currentPage();
  const edgePoints = getPointsFromShape(shape, numEdgePoint);
  const pointField = createField(numPoints, edgePoints);
  const allPoints = pointField.points.concat(edgePoints);

  const pointArray = allPoints.map(point => point.getId());
  const triangleIndices = delaunayTriangulate(pointArray);

  const trianglePoints = triangleIndices.map(([i0, i1, i2]) => ({
    p0: allPoints[i0],
    p1: allPoints[i1],
    p2: allPoints[i2],
  }));

  // TODO: remove lines for lines in concave space - generate point on line and do intersection test\

  const lineLayers = trianglePoints
    .map(({ p0, p1, p2 }) => {
      const line0 = new Line(p0, p1);
      const line1 = new Line(p1, p2);
      const line2 = new Line(p2, p0);
      return [ line0, line1, line2 ];
    })
    .reduce((uniqueList, triangleLines) => {
      triangleLines.forEach(line => {
        if (!uniqueList.some(_line => _line.getId() === line.getId())) {
          uniqueList.push(line);
        }
      });
      return uniqueList;
    }, [])
    .map(line => line.getShape());

  const triangleLayers = trianglePoints
    .map(({ p0, p1, p2}) => new Triangle(p0, p1, p2))
    .map(triangle => triangle.getShape());

  const pointLayers = allPoints
    .map((p, index) => new Oval(p, 2, `Point${index}`))
    .map(oval => oval.getShape());

  const parentGroup = new Group({
    parent: page,
    name: 'triangle field'
  });

  const triangleGroup = new Group({
    parent: parentGroup,
    name: 'triangles',
    layers: triangleLayers,
  });

  const lineGroup = new Group({
    parent: parentGroup,
    name: 'lines',
    layers: lineLayers,
  });

  const pointGroup = new Group({
    parent: parentGroup,
    name: 'points',
    layers: pointLayers,
  });

  triangleGroup.adjustToFit();
  lineGroup.adjustToFit();
  pointGroup.adjustToFit();
  parentGroup.adjustToFit();
}
