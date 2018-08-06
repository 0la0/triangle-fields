import Point from '../geometry/Point';
import { getRandomNum, getCentroid } from '../util/Math';
import { pointIsInsidePolygon } from '../util/Intersection';

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

function createRandomField(numFieldPoints, edgePoints) {
  const centroid = getCentroid(edgePoints);
  const bounds = getBounds(edgePoints);
  let points = [];
  while (points.length < numFieldPoints) {
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

function createGaussianField(numFieldPoints, edgePoints) {
  const centroid = getCentroid(edgePoints);
  const bounds = getBounds(edgePoints);
  const maxRadius = Math.max(
    bounds.maxX - centroid.x,
    centroid.x - bounds.minX,
    bounds.maxY - centroid.x,
    centroid.y - bounds.minY,
  );
  let points = [];
  while (points.length < numFieldPoints) {
    const angle = 2 * Math.PI * Math.random();
    const radius = maxRadius * Math.pow(Math.random(), 1.5);
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

function createSquareField(numFieldPoints, edgePoints) {
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

function createRadialField(numFieldPoints, edgePoints) {
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

const strategy = {
  random: createRandomField,
  parabolic: createGaussianField,
  grid: createSquareField,
  radial: createRadialField,
};

function distributionStrategy(key) {
  return strategy[key] || createRandomField;
}

export default distributionStrategy;
