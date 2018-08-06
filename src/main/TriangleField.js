import { Types } from 'sketch'; // TODO: needed?
import { Group } from 'sketch/dom';
import cdt2d from 'cdt2d';
import cleanPSLG from 'clean-pslg';
import distributionStrategy from './FieldGenerator';
import getPointsFromShape from './ShapeExtractor';
import Triangle from '../geometry/Triangle';
import Oval from '../geometry/Oval';
import Line from '../geometry/Line';
import colorManager from './ColorManager';

export default function createTriangleField(context, shape, params) {
  const {
    numEdgePoints,
    numFieldPoints,
    renderPoints,
    renderLines,
    renderTriangles,
    distribution,
    lineWidth,
    pointRadius,
    colors,
    colorDistribution,
  } = params;

  const page = context.document.currentPage(); // TODO: pass in page instead of context
  const edgePoints = getPointsFromShape(shape, numEdgePoints);
  const distributionFn = distributionStrategy(distribution);
  const pointField = distributionFn(numFieldPoints, edgePoints);
  const allPoints = edgePoints.concat(pointField.points);
  const pointArray = allPoints.map(point => point.toArray());
  const edgeIndices = edgePoints.map((point, index, arr) => [ index, (index + 1) % arr.length ]);
  cleanPSLG(pointArray, edgeIndices)
  const triangleIndices = cdt2d(pointArray, edgeIndices, { exterior: false });

  const trianglePoints = triangleIndices.map(([i0, i1, i2]) => ({
    p0: allPoints[i0],
    p1: allPoints[i1],
    p2: allPoints[i2],
  }));

  const parentGroup = new Group({
    parent: page,
    name: 'triangle field'
  });

  colorManager.setFromHexList(colors);
  colorManager.setGenerationMethod(colorDistribution);

  if (renderTriangles) {
    const triangleLayers = trianglePoints
      .map(({ p0, p1, p2}, index) => new Triangle(p0, p1, p2, `Triangle-${index}`))
      .map(triangle => triangle.getShape());
    const triangleGroup = new Group({
      parent: parentGroup,
      name: 'triangles',
      layers: triangleLayers,
    });
    triangleGroup.adjustToFit();
  }

  if (renderLines) {
    const lineLayers = trianglePoints
      .map(({ p0, p1, p2 }) => {
        const line0 = new Line(p0, p1, lineWidth, '');
        const line1 = new Line(p1, p2, lineWidth, '');
        const line2 = new Line(p2, p0, lineWidth, '');
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
      .map((line, index) => line.setName(`Line-${index}`).getShape());
    const lineGroup = new Group({
      parent: parentGroup,
      name: 'lines',
      layers: lineLayers,
    });
    lineGroup.adjustToFit();
  }

  if (renderPoints) {
    const pointLayers = allPoints
      .map((p, index) => new Oval(p, pointRadius, `Point-${index}`))
      .map(oval => oval.getShape());
    const pointGroup = new Group({
      parent: parentGroup,
      name: 'points',
      layers: pointLayers,
    });
    pointGroup.adjustToFit();
  }

  parentGroup.adjustToFit();
}
