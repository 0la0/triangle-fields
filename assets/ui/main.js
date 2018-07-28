
const domIds = [
  'numEdgePoints',
  'numFieldPoints',
  'points',
  'lines',
  'triangles',
  'generate',
  'loader'
];
const dom = {};
const params = {
  numEdgePoints: 20,
  numFieldPoints: 20,
  points: false,
  lines: true,
  triangles: true
};
const LOADER_ACTIVE = 'loader-active';

function pluginCall(actionName) {
  if (!actionName) {
    throw new Error('missing action name')
  }
  window['__skpm_sketchBridge'].callNative(
    JSON.stringify([].slice.call(arguments))
  )
}

function init() {
  domIds.forEach(key => dom[key] = document.getElementById(key));
  dom.numEdgePoints.addEventListener('change', event => params.numEdgePoints = parseInt(event.target.value, 10));
  dom.numFieldPoints.addEventListener('change', event => params.numFieldPoints = parseInt(event.target.value, 10));
  dom.points.addEventListener('change', event => params.points = event.target.checked);
  dom.lines.addEventListener('change', event => params.lines = event.target.checked);
  dom.triangles.addEventListener('change', event => params.triangles = event.target.checked);

  dom.generate.addEventListener('click', () => {
    if (!params.triangles && !params.lines && !params.points) { return; }
    // TODO: open loader
    dom.loader.classList.add(LOADER_ACTIVE);
    pluginCall('GENERATE_FIELD', JSON.stringify(params));
  });

  // OPTIONS TODO: color pallet (min 2) discrete / continuous, field distribution
}

// all rendering is synchronous anyway ... :/
window.closeLoader = () => {
  dom.loader.classList.remove(LOADER_ACTIVE);
};

// TODO: change to dom loaded
setTimeout(() => init());
