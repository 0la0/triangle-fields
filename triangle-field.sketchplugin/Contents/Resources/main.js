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

var domIds = ['numEdgePoints', 'numFieldPoints', 'points', 'lines', 'triangles', 'generate', 'loader'];
var dom = {};
var params = {
  numEdgePoints: 20,
  numFieldPoints: 20,
  points: false,
  lines: true,
  triangles: true
};
var LOADER_ACTIVE = 'loader-active';

function pluginCall(actionName) {
  if (!actionName) {
    throw new Error('missing action name');
  }

  window['__skpm_sketchBridge'].callNative(JSON.stringify([].slice.call(arguments)));
}

function init() {
  domIds.forEach(function (key) {
    return dom[key] = document.getElementById(key);
  });
  dom.numEdgePoints.addEventListener('change', function (event) {
    return params.numEdgePoints = parseInt(event.target.value, 10);
  });
  dom.numFieldPoints.addEventListener('change', function (event) {
    return params.numFieldPoints = parseInt(event.target.value, 10);
  });
  dom.points.addEventListener('change', function (event) {
    return params.points = event.target.checked;
  });
  dom.lines.addEventListener('change', function (event) {
    return params.lines = event.target.checked;
  });
  dom.triangles.addEventListener('change', function (event) {
    return params.triangles = event.target.checked;
  });
  dom.generate.addEventListener('click', function () {
    if (!params.triangles && !params.lines && !params.points) {
      return;
    } // TODO: open loader


    dom.loader.classList.add(LOADER_ACTIVE);
    pluginCall('GENERATE_FIELD', JSON.stringify(params));
  }); // OPTIONS TODO: color pallet (min 2) discrete / continuous, field distribution
} // all rendering is synchronous anyway ... :/


window.closeLoader = function () {
  dom.loader.classList.remove(LOADER_ACTIVE);
}; // TODO: change to dom loaded


setTimeout(function () {
  return init();
});

/***/ })

/******/ });
//# sourceMappingURL=main.js.map