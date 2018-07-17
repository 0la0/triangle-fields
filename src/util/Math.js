import Point from '../geometry/Point';

function getPosNeg() {
  return Math.random() < 0.5 ? -1 : 1;
}

export function getRandomColor() {
  return {
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
    a: 1,
  };
}

export function getRandomNum(mult) {
  return mult * Math.random();
}

export function IntArray(size) {
  return new Array(size).fill(null).map((n, i) => i);
}

export function getCentroid(points) {
  if (!points || !points.length) { return new Point(0, 0); }
  const sum = points.reduce((s, p) => s.add(p), new Point(0, 0));
  return sum.multScalar(1 / points.length);
}
