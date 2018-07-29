const domIds = [
  'numEdgePoints',
  'numFieldPoints',
  'points',
  'lines',
  'triangles',
  'generate',
  'loader',
  'pointRadius',
  'pointRadiusContainer',
  'lineWidth',
  'lineWidthContainer',
  'distributionRandom',
  'distributionParabolic',
  'distributionGrid',
  'distributionRadial'
];
const dom = {};
const params = {
  numEdgePoints: 20,
  numFieldPoints: 20,
  renderPoints: false,
  renderLines: false,
  renderTriangles: true,
  distribution: 'random',
  lineWidth: 4,
  pointRadius: 5
};
const LOADER_ACTIVE = 'loader-active';
const SHAPE_PARAM_ACTIVE = 'shape-param-active';
const TIME_DELAY = 50;

function callPlugin(actionName) {
  if (!actionName) {
    throw new Error('missing action name')
  }
  try {
    const payload = JSON.stringify([].slice.call(arguments));
    console.log(payload);
    window['__skpm_sketchBridge'].callNative(payload);
  } catch(error) {
    closeLoader();
  }
}

function handleDistributionChange(event) {
  if (!event.target.checked) { return; }
  params.distribution = event.target.value;
}

// TODO: color pallet (min 2) discrete / continuous, field distribution

function init() {
  window.closeLoader = () => setTimeout(() => dom.loader.classList.remove(LOADER_ACTIVE), TIME_DELAY);
  domIds.forEach(key => dom[key] = document.getElementById(key));
  dom.numEdgePoints.addEventListener('change', event => params.numEdgePoints = parseInt(event.target.value, 10));
  dom.numFieldPoints.addEventListener('change', event => params.numFieldPoints = parseInt(event.target.value, 10));
  dom.points.addEventListener('change', event => {
    const val = event.target.checked;
    params.renderPoints = val;
    val ?
      dom.pointRadiusContainer.classList.add(SHAPE_PARAM_ACTIVE) :
      dom.pointRadiusContainer.classList.remove(SHAPE_PARAM_ACTIVE);
  });
  dom.pointRadius.addEventListener('change', event => params.pointRadius = parseInt(event.target.value, 10));
  dom.lines.addEventListener('change', event => {
    const val = event.target.checked;
    params.renderLines = val;
    val ?
      dom.lineWidthContainer.classList.add(SHAPE_PARAM_ACTIVE) :
      dom.lineWidthContainer.classList.remove(SHAPE_PARAM_ACTIVE);
  });
  dom.lineWidth.addEventListener('change', event => params.lineWidth = parseInt(event.target.value, 10));
  dom.triangles.addEventListener('change', event => params.renderTriangles = event.target.checked);

  dom.distributionRandom.addEventListener('change', handleDistributionChange);
  dom.distributionParabolic.addEventListener('change', handleDistributionChange);
  dom.distributionGrid.addEventListener('change', handleDistributionChange);
  dom.distributionRadial.addEventListener('change', handleDistributionChange);

  dom.generate.addEventListener('click', () => {
    if (!params.renderPoints && !params.renderLines && !params.renderTriangles) { return; }
    dom.loader.classList.add(LOADER_ACTIVE);
    setTimeout(() => callPlugin('GENERATE_FIELD', JSON.stringify(params)), TIME_DELAY);
  });
}
document.addEventListener('DOMContentLoaded', init);
