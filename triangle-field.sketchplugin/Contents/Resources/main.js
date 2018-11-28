/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/ui/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/ui/main.js":
/*!***************************!*\
  !*** ./assets/ui/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

var domIds = ['numEdgePoints', 'numFieldPoints', 'points', 'lines', 'triangles', 'generate', 'loader', 'pointRadius', 'pointRadiusContainer', 'lineWidth', 'lineWidthContainer', 'distributionRandom', 'distributionParabolic', 'distributionGrid', 'distributionRadial', 'colorContainer', 'addColor', 'colorDistributionDiscrete', 'colorDistributionContinuous'];
var dom = {};
var params = {
  numEdgePoints: 20,
  numFieldPoints: 20,
  renderPoints: false,
  renderLines: false,
  renderTriangles: true,
  distribution: 'random',
  lineWidth: 4,
  pointRadius: 5,
  colors: [],
  colorDistribution: 'continuous'
};
var LOADER_ACTIVE = 'loader-active';
var SHAPE_PARAM_ACTIVE = 'shape-param-active';
var TIME_DELAY = 50;
var HEX_REGEX = /[0-9A-F]{6}$/;
var colorPickerCount = 0;

function callPlugin(actionName) {
  if (!actionName) {
    throw new Error('missing action name');
  }

  try {
    var payload = JSON.stringify([].slice.call(arguments));
    console.log(payload);
    window['__skpm_sketchBridge'].callNative(payload);
  } catch (error) {
    closeLoader();
  }
}

function isValidHexColor(hexValue) {
  if (!hexValue || typeof hexValue !== 'string') {
    return false;
  }

  return HEX_REGEX.test(hexValue.toUpperCase());
}

function getRandomColorComponent() {
  var str = Number(Math.floor(256 * Math.random())).toString(16).toUpperCase();
  var leftPad = str.length > 1 ? '' : '0';
  return "".concat(leftPad).concat(str);
}

function getRandomColor() {
  return "".concat(getRandomColorComponent()).concat(getRandomColorComponent()).concat(getRandomColorComponent());
}

function addColorPicker(suppressDelete) {
  var id = "input".concat(++colorPickerCount);
  var colorString = getRandomColor();
  var inputElement = document.createElement('input');
  var preview = document.createElement('div');
  var label = document.createElement('label');
  var container = document.createElement('div');
  var closeButton = document.createElement('button');
  var colorRow = document.createElement('div');
  inputElement.addEventListener('change', function (event) {
    var hexString = event.target.value;
    var isValid = isValidHexColor(hexString);

    if (isValid) {
      preview.style.setProperty('background-color', "#".concat(hexString));
      inputElement.classList.remove('color-input-invalid');
    } else {
      inputElement.classList.add('color-input-invalid');
    }
  });
  closeButton.addEventListener('click', function () {
    return dom.colorContainer.removeChild(colorRow);
  });
  preview.classList.add('color-preview');
  preview.style.setProperty('background-color', "#".concat(colorString));
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('value', colorString);
  inputElement.setAttribute('id', id);
  inputElement.classList.add('color-input');
  label.setAttribute('for', id);
  closeButton.classList.add('fab');
  closeButton.classList.add('remove-color-button');
  container.classList.add('color-container');
  colorRow.classList.add('color-row');
  container.appendChild(preview);
  container.appendChild(inputElement);
  container.appendChild(label);
  colorRow.appendChild(container);

  if (!suppressDelete) {
    container.appendChild(closeButton);
  }

  dom.colorContainer.appendChild(colorRow);
}

function getAllColors() {
  var elements = dom.colorContainer.getElementsByClassName('color-input');
  return Array.prototype.slice.call(elements).map(function (ele) {
    return ele.value;
  });
}

function handleDistributionChange(event) {
  if (!event.target.checked) {
    return;
  }

  params.distribution = event.target.value;
}

function handleColorDistributionChange(event) {
  if (!event.target.checked) {
    return;
  }

  params.colorDistribution = event.target.value;
}

function init() {
  window.closeLoader = function () {
    return setTimeout(function () {
      return dom.loader.classList.remove(LOADER_ACTIVE);
    }, TIME_DELAY);
  };

  domIds.forEach(function (key) {
    return dom[key] = document.getElementById(key);
  });
  dom.numEdgePoints.addEventListener('change', function (event) {
    return params.numEdgePoints = parseInt(event.target.value, 10);
  });
  dom.numFieldPoints.addEventListener('change', function (event) {
    return params.numFieldPoints = parseInt(event.target.value, 10);
  }); // TODO: reimplement when we know about ovals in Sketch 52
  // dom.points.addEventListener('change', event => {
  //   const val = event.target.checked;
  //   params.renderPoints = val;
  //   val ?
  //     dom.pointRadiusContainer.classList.add(SHAPE_PARAM_ACTIVE) :
  //     dom.pointRadiusContainer.classList.remove(SHAPE_PARAM_ACTIVE);
  // });
  // dom.pointRadius.addEventListener('change', event => params.pointRadius = parseInt(event.target.value, 10));

  dom.lines.addEventListener('change', function (event) {
    var val = event.target.checked;
    params.renderLines = val;
    val ? dom.lineWidthContainer.classList.add(SHAPE_PARAM_ACTIVE) : dom.lineWidthContainer.classList.remove(SHAPE_PARAM_ACTIVE);
  });
  dom.lineWidth.addEventListener('change', function (event) {
    return params.lineWidth = parseInt(event.target.value, 10);
  });
  dom.triangles.addEventListener('change', function (event) {
    return params.renderTriangles = event.target.checked;
  });
  dom.distributionRandom.addEventListener('change', handleDistributionChange);
  dom.distributionParabolic.addEventListener('change', handleDistributionChange);
  dom.distributionGrid.addEventListener('change', handleDistributionChange);
  dom.distributionRadial.addEventListener('change', handleDistributionChange);
  dom.colorDistributionDiscrete.addEventListener('change', handleColorDistributionChange);
  dom.colorDistributionContinuous.addEventListener('change', handleColorDistributionChange);
  dom.generate.addEventListener('click', function () {
    if (!params.renderPoints && !params.renderLines && !params.renderTriangles) {
      return;
    }

    var colors = getAllColors();
    var colorsAreValid = colors.every(isValidHexColor);

    if (!colorsAreValid) {
      return;
    }

    params.colors = colors;
    dom.loader.classList.add(LOADER_ACTIVE);
    setTimeout(function () {
      return callPlugin('GENERATE_FIELD', JSON.stringify(params));
    }, TIME_DELAY);
  });
  dom.addColor.addEventListener('click', function () {
    return addColorPicker();
  });
  addColorPicker(true);
  addColorPicker(true);
}

document.addEventListener('DOMContentLoaded', init);

/***/ })

/******/ });
//# sourceMappingURL=main.js.map