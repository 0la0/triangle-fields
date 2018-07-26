var cleanPSLG = require('clean-pslg')
var cdt2d = require('cdt2d')


const points = new Array(50).fill(null).map(() => [10 * Math.random(), 10 * Math.random()]);
const edges = [
  [ 0, 0 ],
  [ 0, 10 ],
  [ 10, 10],
  [ 10, 0]
];
const allPoints = edges.concat(points);
const edgeIndices = edges.map((e, index, arr) => [ index, (index + 1) % arr.length, ]);


cleanPSLG(allPoints, edgeIndices);
console.log(cdt2d(allPoints, edgeIndices, {exterior: false}))
