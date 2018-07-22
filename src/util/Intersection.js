import Point from '../geometry/Point';

const ORIENTATION = {
  COLINEAR: 'COLINEAR',
  CLOCKWISE: 'CLOCKWISE',
  COUNTERCLOCKWISE: 'COUNTERCLOCKWISE'
};

function isOnSegment(p, q, r) {
  return q.x <= Math.max(p.x, r.x) &&
         q.x >= Math.min(p.x, r.x) &&
         q.y <= Math.max(p.y, r.y) &&
         q.y >= Math.min(p.y, r.y);
}

function getOrientation(p, q, r) {
  const orientation = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  if (orientation === 0) {
    return ORIENTATION.COLINEAR;
  }
  return (orientation > 0) ? ORIENTATION.CLOCKWISE : ORIENTATION.COUNTERCLOCKWISE;
}

function linesDoIntersect(p1, q1, p2, q2) {
  const o1 = getOrientation(p1, q1, p2);
  const o2 = getOrientation(p1, q1, q2);
  const o3 = getOrientation(p2, q2, p1);
  const o4 = getOrientation(p2, q2, q1);
  if (o1 !== o2 && o3 !== o4) {
    return true;
  }
  if (o1 === ORIENTATION.COLINEAR && isOnSegment(p1, p2, q1)) { return true; }
  if (o2 === ORIENTATION.COLINEAR && isOnSegment(p1, q2, q1)) { return true; }
  if (o3 === ORIENTATION.COLINEAR && isOnSegment(p2, p1, q2)) { return true; }
  if (o4 === ORIENTATION.COLINEAR && isOnSegment(p2, q1, q2)) { return true; }
  return false;
}

export function pointIsInsidePolygon(polygon, p) {
  if (polygon.length < 3) {
    throw new Error('Polygon must have at least 3 points');
  }
  const n  = polygon.length;
  const extreme = new Point(Number.MAX_VALUE, p.y);
  let count = 0;
  for (let i = 0; i < n; i++) {
    const nextIndex = (i + 1) % n;
    // p-etreme intersects with polygon[i]-polygon[nextIndex]
    if (linesDoIntersect(polygon[i], polygon[nextIndex], p, extreme)) {
      // p is colinear with i-next and it lies on segment
      if (getOrientation(polygon[i], p, polygon[nextIndex]) === ORIENTATION.COLINEAR) {
        return isOnSegment(polygon[i], p, polygon[nextIndex]);
      }
      count++;
    }
  }
  return count % 2 == 1; // odd number of intersections
}
