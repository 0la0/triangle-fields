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

function createGaussianField(numPoints, edgePoints) {
  const centroid = getCentroid(edgePoints);
  const bounds = getBounds(edgePoints);
  const maxRadius = Math.max(
    bounds.maxX - centroid.x,
    centroid.x - bounds.minX,
    bounds.maxY - centroid.x,
    centroid.y - bounds.minY,
  );
  let points = [];
  while (points.length < numPoints) {
    const angle = 2 * Math.PI * Math.random();
    // const radius = maxRadius * Math.random();
    // const radius = maxRadius * Math.pow(Math.random(), 1.5);
    const radius = maxRadius * (1 - Math.pow(Math.random(), 1.5));
    const potentialPoint = new Point(
      radius * Math.cos(angle) + centroid.x,
      radius * Math.sin(angle) + centroid.y,
    );
    if (pointIsInsidePolygon(edgePoints, potentialPoint)) {
      points.push(potentialPoint);
    }
  }
  return { points };
}

function createSquareField(numPoints, edgePoints) {
  const bounds = getBounds(edgePoints);
  const numRows = 10;
  const numColumns = 10;
  const xStride = bounds.rangeX / numColumns;
  const yStride = bounds.rangeY / numRows;
  let points = [];
  for (let i = 0; i < numColumns; i++) {
    for (let j = 0; j < numRows; j++) {
      const potentialPoint = new Point(
        i * xStride + bounds.minX,
        j * yStride + bounds.minY,
      );
      if (pointIsInsidePolygon(edgePoints, potentialPoint)) {
        points.push(potentialPoint);
      }
    }
  }
  return { points };
}

function createRadialField(numPoints, edgePoints) {
  const centroid = getCentroid(edgePoints);
  const bounds = getBounds(edgePoints);
  const maxRadius = Math.max(
    bounds.maxX - centroid.x,
    centroid.x - bounds.minX,
    bounds.maxY - centroid.x,
    centroid.y - bounds.minY,
  );
  const TWO_PI = 2 * Math.PI;
  const numSectors = 8;
  const numSegments = 5;
  const thetaStride = TWO_PI / numSectors;
  const radiusStride = maxRadius / numSegments;
  let points = [ centroid.clone(), ];
  for (let t = 0; t < numSectors; t++) {
    for (let r = 1; r < numSegments; r++) {
      const theta = t * thetaStride;
      const radius = r * radiusStride;
      const potentialPoint = new Point(
        radius * Math.cos(theta) + centroid.x,
        radius * Math.sin(theta) + centroid.y
      );
      if (pointIsInsidePolygon(edgePoints, potentialPoint)) {
        points.push(potentialPoint);
      }
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

function lineIsInConcaveSpace(line, polygon) {
  const epsilon = 5;
  // if (!pointIsInsidePolygon(polygon, line.getPointOnLineFromStart(epsilon))) {
  //   return true;
  // }
  // if (!pointIsInsidePolygon(polygon, line.getPointOnLineFromEnd(epsilon))) {
  //   return true;
  // }
  return false;
}

export default function(context, shape, numEdgePoint, numPoints) {
  const page = context.document.currentPage();
  const edgePoints = getPointsFromShape(shape, numEdgePoint);
  // const pointField = createField(numPoints, edgePoints);
  // const pointField = createGaussianField(numPoints, edgePoints);
  // const pointField = createSquareField(numPoints, edgePoints);
  const pointField = createRadialField(numPoints, edgePoints);
  const allPoints = pointField.points.concat(edgePoints);

  const pointArray = allPoints.map(point => point.getId());
  const triangleIndices = delaunayTriangulate(pointArray);

  const trianglePoints = triangleIndices.map(([i0, i1, i2]) => ({
    p0: allPoints[i0],
    p1: allPoints[i1],
    p2: allPoints[i2],
  }));

  const uniqueLines = trianglePoints
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
    .filter(line => !lineIsInConcaveSpace(line, edgePoints));

  const lineLayers = uniqueLines.map(line => line.getShape());

  const triangleLayers = trianglePoints
    .map(({ p0, p1, p2}) => new Triangle(p0, p1, p2))
    .map(triangle => triangle.getShape());

  const pointLayers = allPoints
    .map((p, index) => new Oval(p, 7, `Point${index}`))
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
