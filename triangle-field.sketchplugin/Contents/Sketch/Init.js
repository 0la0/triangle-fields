var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main/Init.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/events/index.js":
/*!********************************************!*\
  !*** ./node_modules/@skpm/events/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function EventEmitter () {}

// By default, a maximum of 10 listeners can be registered for any single event.
EventEmitter.defaultMaxListeners = 10

// Shortcuts to improve speed and size
var proto = EventEmitter.prototype

proto._maxListeners = EventEmitter.defaultMaxListeners

function indexOfListener (listeners, listener) {
  var i = listeners.length
  while (i--) {
    if (listeners[i].listener === listener) {
      return i
    }
  }

  return -1
}

function alias (name) {
  return function aliasClosure () {
    return this[name].apply(this, arguments)
  }
}

function isValidListener (listener) {
  if (typeof listener === 'function') {
    return true
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener)
  } else {
    return false
  }
}

proto._getListeners = function _getListeners (evt) {
  var events = this._getEvents()

  return events[evt] || (events[evt] = [])
}

proto._getEvents = function _getEvents () {
  return this._events || (this._events = {})
}

/*
  Alias for emitter.on(eventName, listener).
*/
proto.addListener = alias('on')

/*
  Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered, passing the supplied arguments to each.

  Returns true if the event had listeners, false otherwise.
*/
proto.emit = function emit (evt) {
  var args = Array.prototype.slice.call(arguments, 1)
  var listeners = this._getListeners(evt) || []
  var listener
  var i
  var key
  var response

  for (i = 0; i < listeners.length; i++) {
    listener = listeners[i]

    if (listener.once === true) {
      this.removeListener(evt, listener.listener)
    }

    response = listener.listener.apply(this, args || [])
  }

  return listeners.length > 0
}

/*
  Returns an array listing the events for which the emitter has registered listeners.
  The values in the array will be strings or Symbols.
*/
proto.eventNames = function eventNames () {
  var events = this._getEvents()
  return Object.keys(events)
}

/*
  Returns the current max listener value for the EventEmitter which is either set by emitter.setMaxListeners(n) or defaults to EventEmitter.defaultMaxListeners.
*/
proto.getMaxListeners = function getMaxListeners() {
  return this._maxListeners
}

/*
  Returns the number of listeners listening to the event named eventName.
*/
proto.listenerCount = function listenerCount(eventName) {
  return this._getListeners(eventName).length
}

/*
  Returns a copy of the array of listeners for the event named eventName.
*/
proto.listeners = function listeners(eventName) {
  return this._getListeners(eventName).map(function (wrappedListener) {
    return wrappedListener.listener
  })
}

/*
  Adds the listener function to the end of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.on = function on (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.push(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName. The next time eventName is triggered, this listener is removed and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.

  By default, event listeners are invoked in the order they are added. The emitter.prependOnceListener() method can be used as an alternative to add the event listener to the beginning of the listeners array.
*/
proto.once = function once (evt, listener) {
  return this.on(evt, {
    listener: listener,
    once: true
  })
}

/*
  Adds the listener function to the beginning of the listeners array for the event named eventName. No checks are made to see if the listener has already been added. Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependListener = function prependListener (evt, listener) {
  if (!isValidListener(listener)) {
    throw new Error('listener must be a function')
  }

  var listeners = this._getListeners(evt)
  var listenerIsWrapped = typeof listener === 'object'

  this.emit('newListener', evt, listenerIsWrapped ? listener.listener : listener)

  listeners.unshift(
    listenerIsWrapped
    ? listener
    : {
      listener: listener,
      once: false
    }
  )

  return this
}

/*
  Adds a one-time listener function for the event named eventName to the beginning of the listeners array. The next time eventName is triggered, this listener is removed, and then invoked.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.prependOnceListener = function prependOnceListener (evt, listener) {
  return this.prependListener(evt, {
    listener: listener,
    once: true
  })
}

/*
  Removes all listeners, or those of the specified eventName.

  Note that it is bad practice to remove listeners added elsewhere in the code, particularly when the EventEmitter instance was created by some other component or module (e.g. sockets or file streams).

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeAllListeners = function removeAllListeners (evt) {
  var events = this._getEvents()

  if (typeof evt === 'string') {
    // Remove all listeners for the specified event
    delete events[evt]
  } else {
    // Remove all listeners in all events
    delete this._events
  }

  return this
}

/*
  Removes the specified listener from the listener array for the event named eventName.

  removeListener will remove, at most, one instance of a listener from the listener array. If any single listener has been added multiple times to the listener array for the specified eventName, then removeListener must be called multiple times to remove each instance.

  Note that once an event has been emitted, all listeners attached to it at the time of emitting will be called in order. This implies that any removeListener() or removeAllListeners() calls after emitting and before the last listener finishes execution will not remove them from emit() in progress. Subsequent events will behave as expected.

  Because listeners are managed using an internal array, calling this will change the position indices of any listener registered after the listener being removed. This will not impact the order in which listeners are called, but it means that any copies of the listener array as returned by the emitter.listeners() method will need to be recreated.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.removeListener = function removeListener (evt, listener) {
  var listeners = this._getListeners(evt)

  var index = indexOfListener(listeners, listener)

  if (index !== -1) {
    listeners.splice(index, 1)

    this.emit('removeListener', evt, listener)
  }

  return this
}

/*
  By default EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default that helps finding memory leaks. Obviously, not all events should be limited to just 10 listeners. The emitter.setMaxListeners() method allows the limit to be modified for this specific EventEmitter instance. The value can be set to Infinity (or 0) to indicate an unlimited number of listeners.

  Returns a reference to the EventEmitter, so that calls can be chained.
*/
proto.setMaxListeners = function setMaxListeners (n) {
  this._maxListeners = n
  return this
}

/*
  Returns a copy of the array of listeners for the event named eventName, including any wrappers (such as those created by .once).
*/
proto.rawListeners = function rawListeners (evt) {
  return this._getListeners(evt).slice()
}

module.exports = EventEmitter


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/big-rat/add.js":
/*!*************************************!*\
  !*** ./node_modules/big-rat/add.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rationalize = __webpack_require__(/*! ./lib/rationalize */ "./node_modules/big-rat/lib/rationalize.js")

module.exports = add

function add(a, b) {
  return rationalize(
    a[0].mul(b[1]).add(b[0].mul(a[1])),
    a[1].mul(b[1]))
}


/***/ }),

/***/ "./node_modules/big-rat/cmp.js":
/*!*************************************!*\
  !*** ./node_modules/big-rat/cmp.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = cmp

function cmp(a, b) {
    return a[0].mul(b[1]).cmp(b[0].mul(a[1]))
}


/***/ }),

/***/ "./node_modules/big-rat/div.js":
/*!*************************************!*\
  !*** ./node_modules/big-rat/div.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rationalize = __webpack_require__(/*! ./lib/rationalize */ "./node_modules/big-rat/lib/rationalize.js")

module.exports = div

function div(a, b) {
  return rationalize(a[0].mul(b[1]), a[1].mul(b[0]))
}


/***/ }),

/***/ "./node_modules/big-rat/index.js":
/*!***************************************!*\
  !*** ./node_modules/big-rat/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isRat = __webpack_require__(/*! ./is-rat */ "./node_modules/big-rat/is-rat.js")
var isBN = __webpack_require__(/*! ./lib/is-bn */ "./node_modules/big-rat/lib/is-bn.js")
var num2bn = __webpack_require__(/*! ./lib/num-to-bn */ "./node_modules/big-rat/lib/num-to-bn.js")
var str2bn = __webpack_require__(/*! ./lib/str-to-bn */ "./node_modules/big-rat/lib/str-to-bn.js")
var rationalize = __webpack_require__(/*! ./lib/rationalize */ "./node_modules/big-rat/lib/rationalize.js")
var div = __webpack_require__(/*! ./div */ "./node_modules/big-rat/div.js")

module.exports = makeRational

function makeRational(numer, denom) {
  if(isRat(numer)) {
    if(denom) {
      return div(numer, makeRational(denom))
    }
    return [numer[0].clone(), numer[1].clone()]
  }
  var shift = 0
  var a, b
  if(isBN(numer)) {
    a = numer.clone()
  } else if(typeof numer === 'string') {
    a = str2bn(numer)
  } else if(numer === 0) {
    return [num2bn(0), num2bn(1)]
  } else if(numer === Math.floor(numer)) {
    a = num2bn(numer)
  } else {
    while(numer !== Math.floor(numer)) {
      numer = numer * Math.pow(2, 256)
      shift -= 256
    }
    a = num2bn(numer)
  }
  if(isRat(denom)) {
    a.mul(denom[1])
    b = denom[0].clone()
  } else if(isBN(denom)) {
    b = denom.clone()
  } else if(typeof denom === 'string') {
    b = str2bn(denom)
  } else if(!denom) {
    b = num2bn(1)
  } else if(denom === Math.floor(denom)) {
    b = num2bn(denom)
  } else {
    while(denom !== Math.floor(denom)) {
      denom = denom * Math.pow(2, 256)
      shift += 256
    }
    b = num2bn(denom)
  }
  if(shift > 0) {
    a = a.ushln(shift)
  } else if(shift < 0) {
    b = b.ushln(-shift)
  }
  return rationalize(a, b)
}


/***/ }),

/***/ "./node_modules/big-rat/is-rat.js":
/*!****************************************!*\
  !*** ./node_modules/big-rat/is-rat.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isBN = __webpack_require__(/*! ./lib/is-bn */ "./node_modules/big-rat/lib/is-bn.js")

module.exports = isRat

function isRat(x) {
  return Array.isArray(x) && x.length === 2 && isBN(x[0]) && isBN(x[1])
}


/***/ }),

/***/ "./node_modules/big-rat/lib/bn-sign.js":
/*!*********************************************!*\
  !*** ./node_modules/big-rat/lib/bn-sign.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js")

module.exports = sign

function sign (x) {
  return x.cmp(new BN(0))
}


/***/ }),

/***/ "./node_modules/big-rat/lib/bn-to-num.js":
/*!***********************************************!*\
  !*** ./node_modules/big-rat/lib/bn-to-num.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sign = __webpack_require__(/*! ./bn-sign */ "./node_modules/big-rat/lib/bn-sign.js")

module.exports = bn2num

//TODO: Make this better
function bn2num(b) {
  var l = b.length
  var words = b.words
  var out = 0
  if (l === 1) {
    out = words[0]
  } else if (l === 2) {
    out = words[0] + (words[1] * 0x4000000)
  } else {
    for (var i = 0; i < l; i++) {
      var w = words[i]
      out += w * Math.pow(0x4000000, i)
    }
  }
  return sign(b) * out
}


/***/ }),

/***/ "./node_modules/big-rat/lib/ctz.js":
/*!*****************************************!*\
  !*** ./node_modules/big-rat/lib/ctz.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var db = __webpack_require__(/*! double-bits */ "./node_modules/double-bits/double.js")
var ctz = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js").countTrailingZeros

module.exports = ctzNumber

//Counts the number of trailing zeros
function ctzNumber(x) {
  var l = ctz(db.lo(x))
  if(l < 32) {
    return l
  }
  var h = ctz(db.hi(x))
  if(h > 20) {
    return 52
  }
  return h + 32
}


/***/ }),

/***/ "./node_modules/big-rat/lib/is-bn.js":
/*!*******************************************!*\
  !*** ./node_modules/big-rat/lib/is-bn.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js")

module.exports = isBN

//Test if x is a bignumber
//FIXME: obviously this is the wrong way to do it
function isBN(x) {
  return x && typeof x === 'object' && Boolean(x.words)
}


/***/ }),

/***/ "./node_modules/big-rat/lib/num-to-bn.js":
/*!***********************************************!*\
  !*** ./node_modules/big-rat/lib/num-to-bn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js")
var db = __webpack_require__(/*! double-bits */ "./node_modules/double-bits/double.js")

module.exports = num2bn

function num2bn(x) {
  var e = db.exponent(x)
  if(e < 52) {
    return new BN(x)
  } else {
    return (new BN(x * Math.pow(2, 52-e))).ushln(e-52)
  }
}


/***/ }),

/***/ "./node_modules/big-rat/lib/rationalize.js":
/*!*************************************************!*\
  !*** ./node_modules/big-rat/lib/rationalize.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var num2bn = __webpack_require__(/*! ./num-to-bn */ "./node_modules/big-rat/lib/num-to-bn.js")
var sign = __webpack_require__(/*! ./bn-sign */ "./node_modules/big-rat/lib/bn-sign.js")

module.exports = rationalize

function rationalize(numer, denom) {
  var snumer = sign(numer)
  var sdenom = sign(denom)
  if(snumer === 0) {
    return [num2bn(0), num2bn(1)]
  }
  if(sdenom === 0) {
    return [num2bn(0), num2bn(0)]
  }
  if(sdenom < 0) {
    numer = numer.neg()
    denom = denom.neg()
  }
  var d = numer.gcd(denom)
  if(d.cmpn(1)) {
    return [ numer.div(d), denom.div(d) ]
  }
  return [ numer, denom ]
}


/***/ }),

/***/ "./node_modules/big-rat/lib/str-to-bn.js":
/*!***********************************************!*\
  !*** ./node_modules/big-rat/lib/str-to-bn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(/*! bn.js */ "./node_modules/bn.js/lib/bn.js")

module.exports = str2BN

function str2BN(x) {
  return new BN(x)
}


/***/ }),

/***/ "./node_modules/big-rat/mul.js":
/*!*************************************!*\
  !*** ./node_modules/big-rat/mul.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rationalize = __webpack_require__(/*! ./lib/rationalize */ "./node_modules/big-rat/lib/rationalize.js")

module.exports = mul

function mul(a, b) {
  return rationalize(a[0].mul(b[0]), a[1].mul(b[1]))
}


/***/ }),

/***/ "./node_modules/big-rat/sign.js":
/*!**************************************!*\
  !*** ./node_modules/big-rat/sign.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bnsign = __webpack_require__(/*! ./lib/bn-sign */ "./node_modules/big-rat/lib/bn-sign.js")

module.exports = sign

function sign(x) {
  return bnsign(x[0]) * bnsign(x[1])
}


/***/ }),

/***/ "./node_modules/big-rat/sub.js":
/*!*************************************!*\
  !*** ./node_modules/big-rat/sub.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rationalize = __webpack_require__(/*! ./lib/rationalize */ "./node_modules/big-rat/lib/rationalize.js")

module.exports = sub

function sub(a, b) {
  return rationalize(a[0].mul(b[1]).sub(a[1].mul(b[0])), a[1].mul(b[1]))
}


/***/ }),

/***/ "./node_modules/big-rat/to-float.js":
/*!******************************************!*\
  !*** ./node_modules/big-rat/to-float.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bn2num = __webpack_require__(/*! ./lib/bn-to-num */ "./node_modules/big-rat/lib/bn-to-num.js")
var ctz = __webpack_require__(/*! ./lib/ctz */ "./node_modules/big-rat/lib/ctz.js")

module.exports = roundRat

// Round a rational to the closest float
function roundRat (f) {
  var a = f[0]
  var b = f[1]
  if (a.cmpn(0) === 0) {
    return 0
  }
  var h = a.abs().divmod(b.abs())
  var iv = h.div
  var x = bn2num(iv)
  var ir = h.mod
  var sgn = (a.negative !== b.negative) ? -1 : 1
  if (ir.cmpn(0) === 0) {
    return sgn * x
  }
  if (x) {
    var s = ctz(x) + 4
    var y = bn2num(ir.ushln(s).divRound(b))
    return sgn * (x + y * Math.pow(2, -s))
  } else {
    var ybits = b.bitLength() - ir.bitLength() + 53
    var y = bn2num(ir.ushln(ybits).divRound(b))
    if (ybits < 1023) {
      return sgn * y * Math.pow(2, -ybits)
    }
    y *= Math.pow(2, -1023)
    return sgn * y * Math.pow(2, 1023 - ybits)
  }
}


/***/ }),

/***/ "./node_modules/binary-search-bounds/search-bounds.js":
/*!************************************************************!*\
  !*** ./node_modules/binary-search-bounds/search-bounds.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function compileSearch(funcName, predicate, reversed, extraArgs, earlyOut) {
  var code = [
    "function ", funcName, "(a,l,h,", extraArgs.join(","),  "){",
    earlyOut ? "" : "var i=", (reversed ? "l-1" : "h+1"),
    ";while(l<=h){var m=(l+h)>>>1,x=a[m]"]
  if(earlyOut) {
    if(predicate.indexOf("c") < 0) {
      code.push(";if(x===y){return m}else if(x<=y){")
    } else {
      code.push(";var p=c(x,y);if(p===0){return m}else if(p<=0){")
    }
  } else {
    code.push(";if(", predicate, "){i=m;")
  }
  if(reversed) {
    code.push("l=m+1}else{h=m-1}")
  } else {
    code.push("h=m-1}else{l=m+1}")
  }
  code.push("}")
  if(earlyOut) {
    code.push("return -1};")
  } else {
    code.push("return i};")
  }
  return code.join("")
}

function compileBoundsSearch(predicate, reversed, suffix, earlyOut) {
  var result = new Function([
  compileSearch("A", "x" + predicate + "y", reversed, ["y"], earlyOut),
  compileSearch("P", "c(x,y)" + predicate + "0", reversed, ["y", "c"], earlyOut),
"function dispatchBsearch", suffix, "(a,y,c,l,h){\
if(typeof(c)==='function'){\
return P(a,(l===void 0)?0:l|0,(h===void 0)?a.length-1:h|0,y,c)\
}else{\
return A(a,(c===void 0)?0:c|0,(l===void 0)?a.length-1:l|0,y)\
}}\
return dispatchBsearch", suffix].join(""))
  return result()
}

module.exports = {
  ge: compileBoundsSearch(">=", false,  "GE"),
  gt: compileBoundsSearch(">",  false,  "GT"),
  lt: compileBoundsSearch("<",  true,   "LT"),
  le: compileBoundsSearch("<=", true,   "LE"),
  eq: compileBoundsSearch("-",  true,   "EQ", true)
}


/***/ }),

/***/ "./node_modules/bit-twiddle/twiddle.js":
/*!*********************************************!*\
  !*** ./node_modules/bit-twiddle/twiddle.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Bit twiddling hacks for JavaScript.
 *
 * Author: Mikola Lysenko
 *
 * Ported from Stanford bit twiddling hack library:
 *    http://graphics.stanford.edu/~seander/bithacks.html
 */

 "use restrict";

//Number of bits in an integer
var INT_BITS = 32;

//Constants
exports.INT_BITS  = INT_BITS;
exports.INT_MAX   =  0x7fffffff;
exports.INT_MIN   = -1<<(INT_BITS-1);

//Returns -1, 0, +1 depending on sign of x
exports.sign = function(v) {
  return (v > 0) - (v < 0);
}

//Computes absolute value of integer
exports.abs = function(v) {
  var mask = v >> (INT_BITS-1);
  return (v ^ mask) - mask;
}

//Computes minimum of integers x and y
exports.min = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
}

//Computes maximum of integers x and y
exports.max = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
}

//Checks if a number is a power of two
exports.isPow2 = function(v) {
  return !(v & (v-1)) && (!!v);
}

//Computes log base 2 of v
exports.log2 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
}

//Computes log base 10 of v
exports.log10 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
}

//Counts number of bits
exports.popCount = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
}

//Counts number of trailing zeros
function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
exports.countTrailingZeros = countTrailingZeros;

//Rounds to next power of 2
exports.nextPow2 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}

//Rounds down to previous power of 2
exports.prevPow2 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
}

//Computes parity of word
exports.parity = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
}

var REVERSE_TABLE = new Array(256);

(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE);

//Reverse bits in a 32 bit word
exports.reverse = function(v) {
  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE[(v >>> 24) & 0xff];
}

//Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
exports.interleave2 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;

  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;

  return x | (y << 1);
}

//Extracts the nth interleaved component
exports.deinterleave2 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
}


//Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
exports.interleave3 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;

  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  
  return x | (z << 2);
}

//Extracts nth interleaved component of a 3-tuple
exports.deinterleave3 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
}

//Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
exports.nextCombination = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
}



/***/ }),

/***/ "./node_modules/bn.js/lib/bn.js":
/*!**************************************!*\
  !*** ./node_modules/bn.js/lib/bn.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})(typeof module === 'undefined' || module, this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/box-intersect/index.js":
/*!*********************************************!*\
  !*** ./node_modules/box-intersect/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = boxIntersectWrapper

var pool = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var sweep = __webpack_require__(/*! ./lib/sweep */ "./node_modules/box-intersect/lib/sweep.js")
var boxIntersectIter = __webpack_require__(/*! ./lib/intersect */ "./node_modules/box-intersect/lib/intersect.js")

function boxEmpty(d, box) {
  for(var j=0; j<d; ++j) {
    if(!(box[j] <= box[j+d])) {
      return true
    }
  }
  return false
}

//Unpack boxes into a flat typed array, remove empty boxes
function convertBoxes(boxes, d, data, ids) {
  var ptr = 0
  var count = 0
  for(var i=0, n=boxes.length; i<n; ++i) {
    var b = boxes[i]
    if(boxEmpty(d, b)) {
      continue
    }
    for(var j=0; j<2*d; ++j) {
      data[ptr++] = b[j]
    }
    ids[count++] = i
  }
  return count
}

//Perform type conversions, check bounds
function boxIntersect(red, blue, visit, full) {
  var n = red.length
  var m = blue.length

  //If either array is empty, then we can skip this whole thing
  if(n <= 0 || m <= 0) {
    return
  }

  //Compute dimension, if it is 0 then we skip
  var d = (red[0].length)>>>1
  if(d <= 0) {
    return
  }

  var retval

  //Convert red boxes
  var redList  = pool.mallocDouble(2*d*n)
  var redIds   = pool.mallocInt32(n)
  n = convertBoxes(red, d, redList, redIds)

  if(n > 0) {
    if(d === 1 && full) {
      //Special case: 1d complete
      sweep.init(n)
      retval = sweep.sweepComplete(
        d, visit, 
        0, n, redList, redIds,
        0, n, redList, redIds)
    } else {

      //Convert blue boxes
      var blueList = pool.mallocDouble(2*d*m)
      var blueIds  = pool.mallocInt32(m)
      m = convertBoxes(blue, d, blueList, blueIds)

      if(m > 0) {
        sweep.init(n+m)

        if(d === 1) {
          //Special case: 1d bipartite
          retval = sweep.sweepBipartite(
            d, visit, 
            0, n, redList,  redIds,
            0, m, blueList, blueIds)
        } else {
          //General case:  d>1
          retval = boxIntersectIter(
            d, visit,    full,
            n, redList,  redIds,
            m, blueList, blueIds)
        }

        pool.free(blueList)
        pool.free(blueIds)
      }
    }

    pool.free(redList)
    pool.free(redIds)
  }

  return retval
}


var RESULT

function appendItem(i,j) {
  RESULT.push([i,j])
}

function intersectFullArray(x) {
  RESULT = []
  boxIntersect(x, x, appendItem, true)
  return RESULT
}

function intersectBipartiteArray(x, y) {
  RESULT = []
  boxIntersect(x, y, appendItem, false)
  return RESULT
}

//User-friendly wrapper, handle full input and no-visitor cases
function boxIntersectWrapper(arg0, arg1, arg2) {
  var result
  switch(arguments.length) {
    case 1:
      return intersectFullArray(arg0)
    case 2:
      if(typeof arg1 === 'function') {
        return boxIntersect(arg0, arg0, arg1, true)
      } else {
        return intersectBipartiteArray(arg0, arg1)
      }
    case 3:
      return boxIntersect(arg0, arg1, arg2, false)
    default:
      throw new Error('box-intersect: Invalid arguments')
  }
}

/***/ }),

/***/ "./node_modules/box-intersect/lib/brute.js":
/*!*************************************************!*\
  !*** ./node_modules/box-intersect/lib/brute.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DIMENSION   = 'd'
var AXIS        = 'ax'
var VISIT       = 'vv'
var FLIP        = 'fp'

var ELEM_SIZE   = 'es'

var RED_START   = 'rs'
var RED_END     = 're'
var RED_BOXES   = 'rb'
var RED_INDEX   = 'ri'
var RED_PTR     = 'rp'

var BLUE_START  = 'bs'
var BLUE_END    = 'be'
var BLUE_BOXES  = 'bb'
var BLUE_INDEX  = 'bi'
var BLUE_PTR    = 'bp'

var RETVAL      = 'rv'

var INNER_LABEL = 'Q'

var ARGS = [
  DIMENSION,
  AXIS,
  VISIT,
  RED_START,
  RED_END,
  RED_BOXES,
  RED_INDEX,
  BLUE_START,
  BLUE_END,
  BLUE_BOXES,
  BLUE_INDEX
]

function generateBruteForce(redMajor, flip, full) {
  var funcName = 'bruteForce' + 
    (redMajor ? 'Red' : 'Blue') + 
    (flip ? 'Flip' : '') +
    (full ? 'Full' : '')

  var code = ['function ', funcName, '(', ARGS.join(), '){',
    'var ', ELEM_SIZE, '=2*', DIMENSION, ';']

  var redLoop = 
    'for(var i=' + RED_START + ',' + RED_PTR + '=' + ELEM_SIZE + '*' + RED_START + ';' +
        'i<' + RED_END +';' +
        '++i,' + RED_PTR + '+=' + ELEM_SIZE + '){' +
        'var x0=' + RED_BOXES + '[' + AXIS + '+' + RED_PTR + '],' +
            'x1=' + RED_BOXES + '[' + AXIS + '+' + RED_PTR + '+' + DIMENSION + '],' +
            'xi=' + RED_INDEX + '[i];'

  var blueLoop = 
    'for(var j=' + BLUE_START + ',' + BLUE_PTR + '=' + ELEM_SIZE + '*' + BLUE_START + ';' +
        'j<' + BLUE_END + ';' +
        '++j,' + BLUE_PTR + '+=' + ELEM_SIZE + '){' +
        'var y0=' + BLUE_BOXES + '[' + AXIS + '+' + BLUE_PTR + '],' +
            (full ? 'y1=' + BLUE_BOXES + '[' + AXIS + '+' + BLUE_PTR + '+' + DIMENSION + '],' : '') +
            'yi=' + BLUE_INDEX + '[j];'

  if(redMajor) {
    code.push(redLoop, INNER_LABEL, ':', blueLoop)
  } else {
    code.push(blueLoop, INNER_LABEL, ':', redLoop)
  }

  if(full) {
    code.push('if(y1<x0||x1<y0)continue;')
  } else if(flip) {
    code.push('if(y0<=x0||x1<y0)continue;')
  } else {
    code.push('if(y0<x0||x1<y0)continue;')
  }

  code.push('for(var k='+AXIS+'+1;k<'+DIMENSION+';++k){'+
    'var r0='+RED_BOXES+'[k+'+RED_PTR+'],'+
        'r1='+RED_BOXES+'[k+'+DIMENSION+'+'+RED_PTR+'],'+
        'b0='+BLUE_BOXES+'[k+'+BLUE_PTR+'],'+
        'b1='+BLUE_BOXES+'[k+'+DIMENSION+'+'+BLUE_PTR+'];'+
      'if(r1<b0||b1<r0)continue ' + INNER_LABEL + ';}' +
      'var ' + RETVAL + '=' + VISIT + '(')

  if(flip) {
    code.push('yi,xi')
  } else {
    code.push('xi,yi')
  }

  code.push(');if(' + RETVAL + '!==void 0)return ' + RETVAL + ';}}}')

  return {
    name: funcName, 
    code: code.join('')
  }
}

function bruteForcePlanner(full) {
  var funcName = 'bruteForce' + (full ? 'Full' : 'Partial')
  var prefix = []
  var fargs = ARGS.slice()
  if(!full) {
    fargs.splice(3, 0, FLIP)
  }

  var code = ['function ' + funcName + '(' + fargs.join() + '){']

  function invoke(redMajor, flip) {
    var res = generateBruteForce(redMajor, flip, full)
    prefix.push(res.code)
    code.push('return ' + res.name + '(' + ARGS.join() + ');')
  }

  code.push('if(' + RED_END + '-' + RED_START + '>' +
                    BLUE_END + '-' + BLUE_START + '){')

  if(full) {
    invoke(true, false)
    code.push('}else{')
    invoke(false, false)
  } else {
    code.push('if(' + FLIP + '){')
    invoke(true, true)
    code.push('}else{')
    invoke(true, false)
    code.push('}}else{if(' + FLIP + '){')
    invoke(false, true)
    code.push('}else{')
    invoke(false, false)
    code.push('}')
  }
  code.push('}}return ' + funcName)

  var codeStr = prefix.join('') + code.join('')
  var proc = new Function(codeStr)
  return proc()
}


exports.partial = bruteForcePlanner(false)
exports.full    = bruteForcePlanner(true)

/***/ }),

/***/ "./node_modules/box-intersect/lib/intersect.js":
/*!*****************************************************!*\
  !*** ./node_modules/box-intersect/lib/intersect.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = boxIntersectIter

var pool = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var bits = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js")
var bruteForce = __webpack_require__(/*! ./brute */ "./node_modules/box-intersect/lib/brute.js")
var bruteForcePartial = bruteForce.partial
var bruteForceFull = bruteForce.full
var sweep = __webpack_require__(/*! ./sweep */ "./node_modules/box-intersect/lib/sweep.js")
var findMedian = __webpack_require__(/*! ./median */ "./node_modules/box-intersect/lib/median.js")
var genPartition = __webpack_require__(/*! ./partition */ "./node_modules/box-intersect/lib/partition.js")

//Twiddle parameters
var BRUTE_FORCE_CUTOFF    = 128       //Cut off for brute force search
var SCAN_CUTOFF           = (1<<22)   //Cut off for two way scan
var SCAN_COMPLETE_CUTOFF  = (1<<22)  

//Partition functions
var partitionInteriorContainsInterval = genPartition(
  '!(lo>=p0)&&!(p1>=hi)', 
  ['p0', 'p1'])

var partitionStartEqual = genPartition(
  'lo===p0',
  ['p0'])

var partitionStartLessThan = genPartition(
  'lo<p0',
  ['p0'])

var partitionEndLessThanEqual = genPartition(
  'hi<=p0',
  ['p0'])

var partitionContainsPoint = genPartition(
  'lo<=p0&&p0<=hi',
  ['p0'])

var partitionContainsPointProper = genPartition(
  'lo<p0&&p0<=hi',
  ['p0'])

//Frame size for iterative loop
var IFRAME_SIZE = 6
var DFRAME_SIZE = 2

//Data for box statck
var INIT_CAPACITY = 1024
var BOX_ISTACK  = pool.mallocInt32(INIT_CAPACITY)
var BOX_DSTACK  = pool.mallocDouble(INIT_CAPACITY)

//Initialize iterative loop queue
function iterInit(d, count) {
  var levels = (8 * bits.log2(count+1) * (d+1))|0
  var maxInts = bits.nextPow2(IFRAME_SIZE*levels)
  if(BOX_ISTACK.length < maxInts) {
    pool.free(BOX_ISTACK)
    BOX_ISTACK = pool.mallocInt32(maxInts)
  }
  var maxDoubles = bits.nextPow2(DFRAME_SIZE*levels)
  if(BOX_DSTACK < maxDoubles) {
    pool.free(BOX_DSTACK)
    BOX_DSTACK = pool.mallocDouble(maxDoubles)
  }
}

//Append item to queue
function iterPush(ptr,
  axis, 
  redStart, redEnd, 
  blueStart, blueEnd, 
  state, 
  lo, hi) {

  var iptr = IFRAME_SIZE * ptr
  BOX_ISTACK[iptr]   = axis
  BOX_ISTACK[iptr+1] = redStart
  BOX_ISTACK[iptr+2] = redEnd
  BOX_ISTACK[iptr+3] = blueStart
  BOX_ISTACK[iptr+4] = blueEnd
  BOX_ISTACK[iptr+5] = state

  var dptr = DFRAME_SIZE * ptr
  BOX_DSTACK[dptr]   = lo
  BOX_DSTACK[dptr+1] = hi
}

//Special case:  Intersect single point with list of intervals
function onePointPartial(
  d, axis, visit, flip,
  redStart, redEnd, red, redIndex,
  blueOffset, blue, blueId) {

  var elemSize = 2 * d
  var bluePtr  = blueOffset * elemSize
  var blueX    = blue[bluePtr + axis]

red_loop:
  for(var i=redStart, redPtr=redStart*elemSize; i<redEnd; ++i, redPtr+=elemSize) {
    var r0 = red[redPtr+axis]
    var r1 = red[redPtr+axis+d]
    if(blueX < r0 || r1 < blueX) {
      continue
    }
    if(flip && blueX === r0) {
      continue
    }
    var redId = redIndex[i]
    for(var j=axis+1; j<d; ++j) {
      var r0 = red[redPtr+j]
      var r1 = red[redPtr+j+d]
      var b0 = blue[bluePtr+j]
      var b1 = blue[bluePtr+j+d]
      if(r1 < b0 || b1 < r0) {
        continue red_loop
      }
    }
    var retval
    if(flip) {
      retval = visit(blueId, redId)
    } else {
      retval = visit(redId, blueId)
    }
    if(retval !== void 0) {
      return retval
    }
  }
}

//Special case:  Intersect one point with list of intervals
function onePointFull(
  d, axis, visit,
  redStart, redEnd, red, redIndex,
  blueOffset, blue, blueId) {

  var elemSize = 2 * d
  var bluePtr  = blueOffset * elemSize
  var blueX    = blue[bluePtr + axis]

red_loop:
  for(var i=redStart, redPtr=redStart*elemSize; i<redEnd; ++i, redPtr+=elemSize) {
    var redId = redIndex[i]
    if(redId === blueId) {
      continue
    }
    var r0 = red[redPtr+axis]
    var r1 = red[redPtr+axis+d]
    if(blueX < r0 || r1 < blueX) {
      continue
    }
    for(var j=axis+1; j<d; ++j) {
      var r0 = red[redPtr+j]
      var r1 = red[redPtr+j+d]
      var b0 = blue[bluePtr+j]
      var b1 = blue[bluePtr+j+d]
      if(r1 < b0 || b1 < r0) {
        continue red_loop
      }
    }
    var retval = visit(redId, blueId)
    if(retval !== void 0) {
      return retval
    }
  }
}

//The main box intersection routine
function boxIntersectIter(
  d, visit, initFull,
  xSize, xBoxes, xIndex,
  ySize, yBoxes, yIndex) {

  //Reserve memory for stack
  iterInit(d, xSize + ySize)

  var top  = 0
  var elemSize = 2 * d
  var retval

  iterPush(top++,
      0,
      0, xSize,
      0, ySize,
      initFull ? 16 : 0, 
      -Infinity, Infinity)
  if(!initFull) {
    iterPush(top++,
      0,
      0, ySize,
      0, xSize,
      1, 
      -Infinity, Infinity)
  }

  while(top > 0) {
    top  -= 1

    var iptr = top * IFRAME_SIZE
    var axis      = BOX_ISTACK[iptr]
    var redStart  = BOX_ISTACK[iptr+1]
    var redEnd    = BOX_ISTACK[iptr+2]
    var blueStart = BOX_ISTACK[iptr+3]
    var blueEnd   = BOX_ISTACK[iptr+4]
    var state     = BOX_ISTACK[iptr+5]

    var dptr = top * DFRAME_SIZE
    var lo        = BOX_DSTACK[dptr]
    var hi        = BOX_DSTACK[dptr+1]

    //Unpack state info
    var flip      = (state & 1)
    var full      = !!(state & 16)

    //Unpack indices
    var red       = xBoxes
    var redIndex  = xIndex
    var blue      = yBoxes
    var blueIndex = yIndex
    if(flip) {
      red         = yBoxes
      redIndex    = yIndex
      blue        = xBoxes
      blueIndex   = xIndex
    }

    if(state & 2) {
      redEnd = partitionStartLessThan(
        d, axis,
        redStart, redEnd, red, redIndex,
        hi)
      if(redStart >= redEnd) {
        continue
      }
    }
    if(state & 4) {
      redStart = partitionEndLessThanEqual(
        d, axis,
        redStart, redEnd, red, redIndex,
        lo)
      if(redStart >= redEnd) {
        continue
      }
    }
    
    var redCount  = redEnd  - redStart
    var blueCount = blueEnd - blueStart

    if(full) {
      if(d * redCount * (redCount + blueCount) < SCAN_COMPLETE_CUTOFF) {
        retval = sweep.scanComplete(
          d, axis, visit, 
          redStart, redEnd, red, redIndex,
          blueStart, blueEnd, blue, blueIndex)
        if(retval !== void 0) {
          return retval
        }
        continue
      }
    } else {
      if(d * Math.min(redCount, blueCount) < BRUTE_FORCE_CUTOFF) {
        //If input small, then use brute force
        retval = bruteForcePartial(
            d, axis, visit, flip,
            redStart,  redEnd,  red,  redIndex,
            blueStart, blueEnd, blue, blueIndex)
        if(retval !== void 0) {
          return retval
        }
        continue
      } else if(d * redCount * blueCount < SCAN_CUTOFF) {
        //If input medium sized, then use sweep and prune
        retval = sweep.scanBipartite(
          d, axis, visit, flip, 
          redStart, redEnd, red, redIndex,
          blueStart, blueEnd, blue, blueIndex)
        if(retval !== void 0) {
          return retval
        }
        continue
      }
    }
    
    //First, find all red intervals whose interior contains (lo,hi)
    var red0 = partitionInteriorContainsInterval(
      d, axis, 
      redStart, redEnd, red, redIndex,
      lo, hi)

    //Lower dimensional case
    if(redStart < red0) {

      if(d * (red0 - redStart) < BRUTE_FORCE_CUTOFF) {
        //Special case for small inputs: use brute force
        retval = bruteForceFull(
          d, axis+1, visit,
          redStart, red0, red, redIndex,
          blueStart, blueEnd, blue, blueIndex)
        if(retval !== void 0) {
          return retval
        }
      } else if(axis === d-2) {
        if(flip) {
          retval = sweep.sweepBipartite(
            d, visit,
            blueStart, blueEnd, blue, blueIndex,
            redStart, red0, red, redIndex)
        } else {
          retval = sweep.sweepBipartite(
            d, visit,
            redStart, red0, red, redIndex,
            blueStart, blueEnd, blue, blueIndex)
        }
        if(retval !== void 0) {
          return retval
        }
      } else {
        iterPush(top++,
          axis+1,
          redStart, red0,
          blueStart, blueEnd,
          flip,
          -Infinity, Infinity)
        iterPush(top++,
          axis+1,
          blueStart, blueEnd,
          redStart, red0,
          flip^1,
          -Infinity, Infinity)
      }
    }

    //Divide and conquer phase
    if(red0 < redEnd) {

      //Cut blue into 3 parts:
      //
      //  Points < mid point
      //  Points = mid point
      //  Points > mid point
      //
      var blue0 = findMedian(
        d, axis, 
        blueStart, blueEnd, blue, blueIndex)
      var mid = blue[elemSize * blue0 + axis]
      var blue1 = partitionStartEqual(
        d, axis,
        blue0, blueEnd, blue, blueIndex,
        mid)

      //Right case
      if(blue1 < blueEnd) {
        iterPush(top++,
          axis,
          red0, redEnd,
          blue1, blueEnd,
          (flip|4) + (full ? 16 : 0),
          mid, hi)
      }

      //Left case
      if(blueStart < blue0) {
        iterPush(top++,
          axis,
          red0, redEnd,
          blueStart, blue0,
          (flip|2) + (full ? 16 : 0),
          lo, mid)
      }

      //Center case (the hard part)
      if(blue0 + 1 === blue1) {
        //Optimization: Range with exactly 1 point, use a brute force scan
        if(full) {
          retval = onePointFull(
            d, axis, visit,
            red0, redEnd, red, redIndex,
            blue0, blue, blueIndex[blue0])
        } else {
          retval = onePointPartial(
            d, axis, visit, flip,
            red0, redEnd, red, redIndex,
            blue0, blue, blueIndex[blue0])
        }
        if(retval !== void 0) {
          return retval
        }
      } else if(blue0 < blue1) {
        var red1
        if(full) {
          //If full intersection, need to handle special case
          red1 = partitionContainsPoint(
            d, axis,
            red0, redEnd, red, redIndex,
            mid)
          if(red0 < red1) {
            var redX = partitionStartEqual(
              d, axis,
              red0, red1, red, redIndex,
              mid)
            if(axis === d-2) {
              //Degenerate sweep intersection:
              //  [red0, redX] with [blue0, blue1]
              if(red0 < redX) {
                retval = sweep.sweepComplete(
                  d, visit,
                  red0, redX, red, redIndex,
                  blue0, blue1, blue, blueIndex)
                if(retval !== void 0) {
                  return retval
                }
              }

              //Normal sweep intersection:
              //  [redX, red1] with [blue0, blue1]
              if(redX < red1) {
                retval = sweep.sweepBipartite(
                  d, visit,
                  redX, red1, red, redIndex,
                  blue0, blue1, blue, blueIndex)
                if(retval !== void 0) {
                  return retval
                }
              }
            } else {
              if(red0 < redX) {
                iterPush(top++,
                  axis+1,
                  red0, redX,
                  blue0, blue1,
                  16,
                  -Infinity, Infinity)
              }
              if(redX < red1) {
                iterPush(top++,
                  axis+1,
                  redX, red1,
                  blue0, blue1,
                  0,
                  -Infinity, Infinity)
                iterPush(top++,
                  axis+1,
                  blue0, blue1,
                  redX, red1,
                  1,
                  -Infinity, Infinity)
              }
            }
          }
        } else {
          if(flip) {
            red1 = partitionContainsPointProper(
              d, axis,
              red0, redEnd, red, redIndex,
              mid)
          } else {
            red1 = partitionContainsPoint(
              d, axis,
              red0, redEnd, red, redIndex,
              mid)
          }
          if(red0 < red1) {
            if(axis === d-2) {
              if(flip) {
                retval = sweep.sweepBipartite(
                  d, visit,
                  blue0, blue1, blue, blueIndex,
                  red0, red1, red, redIndex)
              } else {
                retval = sweep.sweepBipartite(
                  d, visit,
                  red0, red1, red, redIndex,
                  blue0, blue1, blue, blueIndex)
              }
            } else {
              iterPush(top++,
                axis+1,
                red0, red1,
                blue0, blue1,
                flip,
                -Infinity, Infinity)
              iterPush(top++,
                axis+1,
                blue0, blue1,
                red0, red1,
                flip^1,
                -Infinity, Infinity)
            }
          }
        }
      }
    }
  }
}

/***/ }),

/***/ "./node_modules/box-intersect/lib/median.js":
/*!**************************************************!*\
  !*** ./node_modules/box-intersect/lib/median.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = findMedian

var genPartition = __webpack_require__(/*! ./partition */ "./node_modules/box-intersect/lib/partition.js")

var partitionStartLessThan = genPartition('lo<p0', ['p0'])

var PARTITION_THRESHOLD = 8   //Cut off for using insertion sort in findMedian

//Base case for median finding:  Use insertion sort
function insertionSort(d, axis, start, end, boxes, ids) {
  var elemSize = 2 * d
  var boxPtr = elemSize * (start+1) + axis
  for(var i=start+1; i<end; ++i, boxPtr+=elemSize) {
    var x = boxes[boxPtr]
    for(var j=i, ptr=elemSize*(i-1); 
        j>start && boxes[ptr+axis] > x; 
        --j, ptr-=elemSize) {
      //Swap
      var aPtr = ptr
      var bPtr = ptr+elemSize
      for(var k=0; k<elemSize; ++k, ++aPtr, ++bPtr) {
        var y = boxes[aPtr]
        boxes[aPtr] = boxes[bPtr]
        boxes[bPtr] = y
      }
      var tmp = ids[j]
      ids[j] = ids[j-1]
      ids[j-1] = tmp
    }
  }
}

//Find median using quick select algorithm
//  takes O(n) time with high probability
function findMedian(d, axis, start, end, boxes, ids) {
  if(end <= start+1) {
    return start
  }

  var lo       = start
  var hi       = end
  var mid      = ((end + start) >>> 1)
  var elemSize = 2*d
  var pivot    = mid
  var value    = boxes[elemSize*mid+axis]
  
  while(lo < hi) {
    if(hi - lo < PARTITION_THRESHOLD) {
      insertionSort(d, axis, lo, hi, boxes, ids)
      value = boxes[elemSize*mid+axis]
      break
    }
    
    //Select pivot using median-of-3
    var count  = hi - lo
    var pivot0 = (Math.random()*count+lo)|0
    var value0 = boxes[elemSize*pivot0 + axis]
    var pivot1 = (Math.random()*count+lo)|0
    var value1 = boxes[elemSize*pivot1 + axis]
    var pivot2 = (Math.random()*count+lo)|0
    var value2 = boxes[elemSize*pivot2 + axis]
    if(value0 <= value1) {
      if(value2 >= value1) {
        pivot = pivot1
        value = value1
      } else if(value0 >= value2) {
        pivot = pivot0
        value = value0
      } else {
        pivot = pivot2
        value = value2
      }
    } else {
      if(value1 >= value2) {
        pivot = pivot1
        value = value1
      } else if(value2 >= value0) {
        pivot = pivot0
        value = value0
      } else {
        pivot = pivot2
        value = value2
      }
    }

    //Swap pivot to end of array
    var aPtr = elemSize * (hi-1)
    var bPtr = elemSize * pivot
    for(var i=0; i<elemSize; ++i, ++aPtr, ++bPtr) {
      var x = boxes[aPtr]
      boxes[aPtr] = boxes[bPtr]
      boxes[bPtr] = x
    }
    var y = ids[hi-1]
    ids[hi-1] = ids[pivot]
    ids[pivot] = y

    //Partition using pivot
    pivot = partitionStartLessThan(
      d, axis, 
      lo, hi-1, boxes, ids,
      value)

    //Swap pivot back
    var aPtr = elemSize * (hi-1)
    var bPtr = elemSize * pivot
    for(var i=0; i<elemSize; ++i, ++aPtr, ++bPtr) {
      var x = boxes[aPtr]
      boxes[aPtr] = boxes[bPtr]
      boxes[bPtr] = x
    }
    var y = ids[hi-1]
    ids[hi-1] = ids[pivot]
    ids[pivot] = y

    //Swap pivot to last pivot
    if(mid < pivot) {
      hi = pivot-1
      while(lo < hi && 
        boxes[elemSize*(hi-1)+axis] === value) {
        hi -= 1
      }
      hi += 1
    } else if(pivot < mid) {
      lo = pivot + 1
      while(lo < hi &&
        boxes[elemSize*lo+axis] === value) {
        lo += 1
      }
    } else {
      break
    }
  }

  //Make sure pivot is at start
  return partitionStartLessThan(
    d, axis, 
    start, mid, boxes, ids,
    boxes[elemSize*mid+axis])
}

/***/ }),

/***/ "./node_modules/box-intersect/lib/partition.js":
/*!*****************************************************!*\
  !*** ./node_modules/box-intersect/lib/partition.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = genPartition

var code = 'for(var j=2*a,k=j*c,l=k,m=c,n=b,o=a+b,p=c;d>p;++p,k+=j){var _;if($)if(m===p)m+=1,l+=j;else{for(var s=0;j>s;++s){var t=e[k+s];e[k+s]=e[l],e[l++]=t}var u=f[p];f[p]=f[m],f[m++]=u}}return m'

function genPartition(predicate, args) {
  var fargs ='abcdef'.split('').concat(args)
  var reads = []
  if(predicate.indexOf('lo') >= 0) {
    reads.push('lo=e[k+n]')
  }
  if(predicate.indexOf('hi') >= 0) {
    reads.push('hi=e[k+o]')
  }
  fargs.push(
    code.replace('_', reads.join())
        .replace('$', predicate))
  return Function.apply(void 0, fargs)
}

/***/ }),

/***/ "./node_modules/box-intersect/lib/sort.js":
/*!************************************************!*\
  !*** ./node_modules/box-intersect/lib/sort.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//This code is extracted from ndarray-sort
//It is inlined here as a temporary workaround

module.exports = wrapper;

var INSERT_SORT_CUTOFF = 32

function wrapper(data, n0) {
  if (n0 <= 4*INSERT_SORT_CUTOFF) {
    insertionSort(0, n0 - 1, data);
  } else {
    quickSort(0, n0 - 1, data);
  }
}

function insertionSort(left, right, data) {
  var ptr = 2*(left+1)
  for(var i=left+1; i<=right; ++i) {
    var a = data[ptr++]
    var b = data[ptr++]
    var j = i
    var jptr = ptr-2
    while(j-- > left) {
      var x = data[jptr-2]
      var y = data[jptr-1]
      if(x < a) {
        break
      } else if(x === a && y < b) {
        break
      }
      data[jptr]   = x
      data[jptr+1] = y
      jptr -= 2
    }
    data[jptr]   = a
    data[jptr+1] = b
  }
}

function swap(i, j, data) {
  i *= 2
  j *= 2
  var x = data[i]
  var y = data[i+1]
  data[i] = data[j]
  data[i+1] = data[j+1]
  data[j] = x
  data[j+1] = y
}

function move(i, j, data) {
  i *= 2
  j *= 2
  data[i] = data[j]
  data[i+1] = data[j+1]
}

function rotate(i, j, k, data) {
  i *= 2
  j *= 2
  k *= 2
  var x = data[i]
  var y = data[i+1]
  data[i] = data[j]
  data[i+1] = data[j+1]
  data[j] = data[k]
  data[j+1] = data[k+1]
  data[k] = x
  data[k+1] = y
}

function shufflePivot(i, j, px, py, data) {
  i *= 2
  j *= 2
  data[i] = data[j]
  data[j] = px
  data[i+1] = data[j+1]
  data[j+1] = py
}

function compare(i, j, data) {
  i *= 2
  j *= 2
  var x = data[i],
      y = data[j]
  if(x < y) {
    return false
  } else if(x === y) {
    return data[i+1] > data[j+1]
  }
  return true
}

function comparePivot(i, y, b, data) {
  i *= 2
  var x = data[i]
  if(x < y) {
    return true
  } else if(x === y) {
    return data[i+1] < b
  }
  return false
}

function quickSort(left, right, data) {
  var sixth = (right - left + 1) / 6 | 0, 
      index1 = left + sixth, 
      index5 = right - sixth, 
      index3 = left + right >> 1, 
      index2 = index3 - sixth, 
      index4 = index3 + sixth, 
      el1 = index1, 
      el2 = index2, 
      el3 = index3, 
      el4 = index4, 
      el5 = index5, 
      less = left + 1, 
      great = right - 1, 
      tmp = 0
  if(compare(el1, el2, data)) {
    tmp = el1
    el1 = el2
    el2 = tmp
  }
  if(compare(el4, el5, data)) {
    tmp = el4
    el4 = el5
    el5 = tmp
  }
  if(compare(el1, el3, data)) {
    tmp = el1
    el1 = el3
    el3 = tmp
  }
  if(compare(el2, el3, data)) {
    tmp = el2
    el2 = el3
    el3 = tmp
  }
  if(compare(el1, el4, data)) {
    tmp = el1
    el1 = el4
    el4 = tmp
  }
  if(compare(el3, el4, data)) {
    tmp = el3
    el3 = el4
    el4 = tmp
  }
  if(compare(el2, el5, data)) {
    tmp = el2
    el2 = el5
    el5 = tmp
  }
  if(compare(el2, el3, data)) {
    tmp = el2
    el2 = el3
    el3 = tmp
  }
  if(compare(el4, el5, data)) {
    tmp = el4
    el4 = el5
    el5 = tmp
  }

  var pivot1X = data[2*el2]
  var pivot1Y = data[2*el2+1]
  var pivot2X = data[2*el4]
  var pivot2Y = data[2*el4+1]

  var ptr0 = 2 * el1;
  var ptr2 = 2 * el3;
  var ptr4 = 2 * el5;
  var ptr5 = 2 * index1;
  var ptr6 = 2 * index3;
  var ptr7 = 2 * index5;
  for (var i1 = 0; i1 < 2; ++i1) {
    var x = data[ptr0+i1];
    var y = data[ptr2+i1];
    var z = data[ptr4+i1];
    data[ptr5+i1] = x;
    data[ptr6+i1] = y;
    data[ptr7+i1] = z;
  }

  move(index2, left, data)
  move(index4, right, data)
  for (var k = less; k <= great; ++k) {
    if (comparePivot(k, pivot1X, pivot1Y, data)) {
      if (k !== less) {
        swap(k, less, data)
      }
      ++less;
    } else {
      if (!comparePivot(k, pivot2X, pivot2Y, data)) {
        while (true) {
          if (!comparePivot(great, pivot2X, pivot2Y, data)) {
            if (--great < k) {
              break;
            }
            continue;
          } else {
            if (comparePivot(great, pivot1X, pivot1Y, data)) {
              rotate(k, less, great, data)
              ++less;
              --great;
            } else {
              swap(k, great, data)
              --great;
            }
            break;
          }
        }
      }
    }
  }
  shufflePivot(left, less-1, pivot1X, pivot1Y, data)
  shufflePivot(right, great+1, pivot2X, pivot2Y, data)
  if (less - 2 - left <= INSERT_SORT_CUTOFF) {
    insertionSort(left, less - 2, data);
  } else {
    quickSort(left, less - 2, data);
  }
  if (right - (great + 2) <= INSERT_SORT_CUTOFF) {
    insertionSort(great + 2, right, data);
  } else {
    quickSort(great + 2, right, data);
  }
  if (great - less <= INSERT_SORT_CUTOFF) {
    insertionSort(less, great, data);
  } else {
    quickSort(less, great, data);
  }
}

/***/ }),

/***/ "./node_modules/box-intersect/lib/sweep.js":
/*!*************************************************!*\
  !*** ./node_modules/box-intersect/lib/sweep.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  init:           sqInit,
  sweepBipartite: sweepBipartite,
  sweepComplete:  sweepComplete,
  scanBipartite:  scanBipartite,
  scanComplete:   scanComplete
}

var pool  = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")
var bits  = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js")
var isort = __webpack_require__(/*! ./sort */ "./node_modules/box-intersect/lib/sort.js")

//Flag for blue
var BLUE_FLAG = (1<<28)

//1D sweep event queue stuff (use pool to save space)
var INIT_CAPACITY      = 1024
var RED_SWEEP_QUEUE    = pool.mallocInt32(INIT_CAPACITY)
var RED_SWEEP_INDEX    = pool.mallocInt32(INIT_CAPACITY)
var BLUE_SWEEP_QUEUE   = pool.mallocInt32(INIT_CAPACITY)
var BLUE_SWEEP_INDEX   = pool.mallocInt32(INIT_CAPACITY)
var COMMON_SWEEP_QUEUE = pool.mallocInt32(INIT_CAPACITY)
var COMMON_SWEEP_INDEX = pool.mallocInt32(INIT_CAPACITY)
var SWEEP_EVENTS       = pool.mallocDouble(INIT_CAPACITY * 8)

//Reserves memory for the 1D sweep data structures
function sqInit(count) {
  var rcount = bits.nextPow2(count)
  if(RED_SWEEP_QUEUE.length < rcount) {
    pool.free(RED_SWEEP_QUEUE)
    RED_SWEEP_QUEUE = pool.mallocInt32(rcount)
  }
  if(RED_SWEEP_INDEX.length < rcount) {
    pool.free(RED_SWEEP_INDEX)
    RED_SWEEP_INDEX = pool.mallocInt32(rcount)
  }
  if(BLUE_SWEEP_QUEUE.length < rcount) {
    pool.free(BLUE_SWEEP_QUEUE)
    BLUE_SWEEP_QUEUE = pool.mallocInt32(rcount)
  }
  if(BLUE_SWEEP_INDEX.length < rcount) {
    pool.free(BLUE_SWEEP_INDEX)
    BLUE_SWEEP_INDEX = pool.mallocInt32(rcount)
  }
  if(COMMON_SWEEP_QUEUE.length < rcount) {
    pool.free(COMMON_SWEEP_QUEUE)
    COMMON_SWEEP_QUEUE = pool.mallocInt32(rcount)
  }
  if(COMMON_SWEEP_INDEX.length < rcount) {
    pool.free(COMMON_SWEEP_INDEX)
    COMMON_SWEEP_INDEX = pool.mallocInt32(rcount)
  }
  var eventLength = 8 * rcount
  if(SWEEP_EVENTS.length < eventLength) {
    pool.free(SWEEP_EVENTS)
    SWEEP_EVENTS = pool.mallocDouble(eventLength)
  }
}

//Remove an item from the active queue in O(1)
function sqPop(queue, index, count, item) {
  var idx = index[item]
  var top = queue[count-1]
  queue[idx] = top
  index[top] = idx
}

//Insert an item into the active queue in O(1)
function sqPush(queue, index, count, item) {
  queue[count] = item
  index[item]  = count
}

//Recursion base case: use 1D sweep algorithm
function sweepBipartite(
    d, visit,
    redStart,  redEnd, red, redIndex,
    blueStart, blueEnd, blue, blueIndex) {

  //store events as pairs [coordinate, idx]
  //
  //  red create:  -(idx+1)
  //  red destroy: idx
  //  blue create: -(idx+BLUE_FLAG)
  //  blue destroy: idx+BLUE_FLAG
  //
  var ptr      = 0
  var elemSize = 2*d
  var istart   = d-1
  var iend     = elemSize-1

  for(var i=redStart; i<redEnd; ++i) {
    var idx = redIndex[i]
    var redOffset = elemSize*i
    SWEEP_EVENTS[ptr++] = red[redOffset+istart]
    SWEEP_EVENTS[ptr++] = -(idx+1)
    SWEEP_EVENTS[ptr++] = red[redOffset+iend]
    SWEEP_EVENTS[ptr++] = idx
  }

  for(var i=blueStart; i<blueEnd; ++i) {
    var idx = blueIndex[i]+BLUE_FLAG
    var blueOffset = elemSize*i
    SWEEP_EVENTS[ptr++] = blue[blueOffset+istart]
    SWEEP_EVENTS[ptr++] = -idx
    SWEEP_EVENTS[ptr++] = blue[blueOffset+iend]
    SWEEP_EVENTS[ptr++] = idx
  }

  //process events from left->right
  var n = ptr >>> 1
  isort(SWEEP_EVENTS, n)
  
  var redActive  = 0
  var blueActive = 0
  for(var i=0; i<n; ++i) {
    var e = SWEEP_EVENTS[2*i+1]|0
    if(e >= BLUE_FLAG) {
      //blue destroy event
      e = (e-BLUE_FLAG)|0
      sqPop(BLUE_SWEEP_QUEUE, BLUE_SWEEP_INDEX, blueActive--, e)
    } else if(e >= 0) {
      //red destroy event
      sqPop(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive--, e)
    } else if(e <= -BLUE_FLAG) {
      //blue create event
      e = (-e-BLUE_FLAG)|0
      for(var j=0; j<redActive; ++j) {
        var retval = visit(RED_SWEEP_QUEUE[j], e)
        if(retval !== void 0) {
          return retval
        }
      }
      sqPush(BLUE_SWEEP_QUEUE, BLUE_SWEEP_INDEX, blueActive++, e)
    } else {
      //red create event
      e = (-e-1)|0
      for(var j=0; j<blueActive; ++j) {
        var retval = visit(e, BLUE_SWEEP_QUEUE[j])
        if(retval !== void 0) {
          return retval
        }
      }
      sqPush(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive++, e)
    }
  }
}

//Complete sweep
function sweepComplete(d, visit, 
  redStart, redEnd, red, redIndex,
  blueStart, blueEnd, blue, blueIndex) {

  var ptr      = 0
  var elemSize = 2*d
  var istart   = d-1
  var iend     = elemSize-1

  for(var i=redStart; i<redEnd; ++i) {
    var idx = (redIndex[i]+1)<<1
    var redOffset = elemSize*i
    SWEEP_EVENTS[ptr++] = red[redOffset+istart]
    SWEEP_EVENTS[ptr++] = -idx
    SWEEP_EVENTS[ptr++] = red[redOffset+iend]
    SWEEP_EVENTS[ptr++] = idx
  }

  for(var i=blueStart; i<blueEnd; ++i) {
    var idx = (blueIndex[i]+1)<<1
    var blueOffset = elemSize*i
    SWEEP_EVENTS[ptr++] = blue[blueOffset+istart]
    SWEEP_EVENTS[ptr++] = (-idx)|1
    SWEEP_EVENTS[ptr++] = blue[blueOffset+iend]
    SWEEP_EVENTS[ptr++] = idx|1
  }

  //process events from left->right
  var n = ptr >>> 1
  isort(SWEEP_EVENTS, n)
  
  var redActive    = 0
  var blueActive   = 0
  var commonActive = 0
  for(var i=0; i<n; ++i) {
    var e     = SWEEP_EVENTS[2*i+1]|0
    var color = e&1
    if(i < n-1 && (e>>1) === (SWEEP_EVENTS[2*i+3]>>1)) {
      color = 2
      i += 1
    }
    
    if(e < 0) {
      //Create event
      var id = -(e>>1) - 1

      //Intersect with common
      for(var j=0; j<commonActive; ++j) {
        var retval = visit(COMMON_SWEEP_QUEUE[j], id)
        if(retval !== void 0) {
          return retval
        }
      }

      if(color !== 0) {
        //Intersect with red
        for(var j=0; j<redActive; ++j) {
          var retval = visit(RED_SWEEP_QUEUE[j], id)
          if(retval !== void 0) {
            return retval
          }
        }
      }

      if(color !== 1) {
        //Intersect with blue
        for(var j=0; j<blueActive; ++j) {
          var retval = visit(BLUE_SWEEP_QUEUE[j], id)
          if(retval !== void 0) {
            return retval
          }
        }
      }

      if(color === 0) {
        //Red
        sqPush(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive++, id)
      } else if(color === 1) {
        //Blue
        sqPush(BLUE_SWEEP_QUEUE, BLUE_SWEEP_INDEX, blueActive++, id)
      } else if(color === 2) {
        //Both
        sqPush(COMMON_SWEEP_QUEUE, COMMON_SWEEP_INDEX, commonActive++, id)
      }
    } else {
      //Destroy event
      var id = (e>>1) - 1
      if(color === 0) {
        //Red
        sqPop(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive--, id)
      } else if(color === 1) {
        //Blue
        sqPop(BLUE_SWEEP_QUEUE, BLUE_SWEEP_INDEX, blueActive--, id)
      } else if(color === 2) {
        //Both
        sqPop(COMMON_SWEEP_QUEUE, COMMON_SWEEP_INDEX, commonActive--, id)
      }
    }
  }
}

//Sweep and prune/scanline algorithm:
//  Scan along axis, detect intersections
//  Brute force all boxes along axis
function scanBipartite(
  d, axis, visit, flip,
  redStart,  redEnd, red, redIndex,
  blueStart, blueEnd, blue, blueIndex) {
  
  var ptr      = 0
  var elemSize = 2*d
  var istart   = axis
  var iend     = axis+d

  var redShift  = 1
  var blueShift = 1
  if(flip) {
    blueShift = BLUE_FLAG
  } else {
    redShift  = BLUE_FLAG
  }

  for(var i=redStart; i<redEnd; ++i) {
    var idx = i + redShift
    var redOffset = elemSize*i
    SWEEP_EVENTS[ptr++] = red[redOffset+istart]
    SWEEP_EVENTS[ptr++] = -idx
    SWEEP_EVENTS[ptr++] = red[redOffset+iend]
    SWEEP_EVENTS[ptr++] = idx
  }
  for(var i=blueStart; i<blueEnd; ++i) {
    var idx = i + blueShift
    var blueOffset = elemSize*i
    SWEEP_EVENTS[ptr++] = blue[blueOffset+istart]
    SWEEP_EVENTS[ptr++] = -idx
  }

  //process events from left->right
  var n = ptr >>> 1
  isort(SWEEP_EVENTS, n)
  
  var redActive    = 0
  for(var i=0; i<n; ++i) {
    var e = SWEEP_EVENTS[2*i+1]|0
    if(e < 0) {
      var idx   = -e
      var isRed = false
      if(idx >= BLUE_FLAG) {
        isRed = !flip
        idx -= BLUE_FLAG 
      } else {
        isRed = !!flip
        idx -= 1
      }
      if(isRed) {
        sqPush(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive++, idx)
      } else {
        var blueId  = blueIndex[idx]
        var bluePtr = elemSize * idx
        
        var b0 = blue[bluePtr+axis+1]
        var b1 = blue[bluePtr+axis+1+d]

red_loop:
        for(var j=0; j<redActive; ++j) {
          var oidx   = RED_SWEEP_QUEUE[j]
          var redPtr = elemSize * oidx

          if(b1 < red[redPtr+axis+1] || 
             red[redPtr+axis+1+d] < b0) {
            continue
          }

          for(var k=axis+2; k<d; ++k) {
            if(blue[bluePtr + k + d] < red[redPtr + k] || 
               red[redPtr + k + d] < blue[bluePtr + k]) {
              continue red_loop
            }
          }

          var redId  = redIndex[oidx]
          var retval
          if(flip) {
            retval = visit(blueId, redId)
          } else {
            retval = visit(redId, blueId)
          }
          if(retval !== void 0) {
            return retval 
          }
        }
      }
    } else {
      sqPop(RED_SWEEP_QUEUE, RED_SWEEP_INDEX, redActive--, e - redShift)
    }
  }
}

function scanComplete(
  d, axis, visit,
  redStart,  redEnd, red, redIndex,
  blueStart, blueEnd, blue, blueIndex) {

  var ptr      = 0
  var elemSize = 2*d
  var istart   = axis
  var iend     = axis+d

  for(var i=redStart; i<redEnd; ++i) {
    var idx = i + BLUE_FLAG
    var redOffset = elemSize*i
    SWEEP_EVENTS[ptr++] = red[redOffset+istart]
    SWEEP_EVENTS[ptr++] = -idx
    SWEEP_EVENTS[ptr++] = red[redOffset+iend]
    SWEEP_EVENTS[ptr++] = idx
  }
  for(var i=blueStart; i<blueEnd; ++i) {
    var idx = i + 1
    var blueOffset = elemSize*i
    SWEEP_EVENTS[ptr++] = blue[blueOffset+istart]
    SWEEP_EVENTS[ptr++] = -idx
  }

  //process events from left->right
  var n = ptr >>> 1
  isort(SWEEP_EVENTS, n)
  
  var redActive    = 0
  for(var i=0; i<n; ++i) {
    var e = SWEEP_EVENTS[2*i+1]|0
    if(e < 0) {
      var idx   = -e
      if(idx >= BLUE_FLAG) {
        RED_SWEEP_QUEUE[redActive++] = idx - BLUE_FLAG
      } else {
        idx -= 1
        var blueId  = blueIndex[idx]
        var bluePtr = elemSize * idx

        var b0 = blue[bluePtr+axis+1]
        var b1 = blue[bluePtr+axis+1+d]

red_loop:
        for(var j=0; j<redActive; ++j) {
          var oidx   = RED_SWEEP_QUEUE[j]
          var redId  = redIndex[oidx]

          if(redId === blueId) {
            break
          }

          var redPtr = elemSize * oidx
          if(b1 < red[redPtr+axis+1] || 
            red[redPtr+axis+1+d] < b0) {
            continue
          }
          for(var k=axis+2; k<d; ++k) {
            if(blue[bluePtr + k + d] < red[redPtr + k] || 
               red[redPtr + k + d]   < blue[bluePtr + k]) {
              continue red_loop
            }
          }

          var retval = visit(redId, blueId)
          if(retval !== void 0) {
            return retval 
          }
        }
      }
    } else {
      var idx = e - BLUE_FLAG
      for(var j=redActive-1; j>=0; --j) {
        if(RED_SWEEP_QUEUE[j] === idx) {
          for(var k=j+1; k<redActive; ++k) {
            RED_SWEEP_QUEUE[k-1] = RED_SWEEP_QUEUE[k]
          }
          break
        }
      }
      --redActive
    }
  }
}

/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/cdt2d/cdt2d.js":
/*!*************************************!*\
  !*** ./node_modules/cdt2d/cdt2d.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var monotoneTriangulate = __webpack_require__(/*! ./lib/monotone */ "./node_modules/cdt2d/lib/monotone.js")
var makeIndex = __webpack_require__(/*! ./lib/triangulation */ "./node_modules/cdt2d/lib/triangulation.js")
var delaunayFlip = __webpack_require__(/*! ./lib/delaunay */ "./node_modules/cdt2d/lib/delaunay.js")
var filterTriangulation = __webpack_require__(/*! ./lib/filter */ "./node_modules/cdt2d/lib/filter.js")

module.exports = cdt2d

function canonicalizeEdge(e) {
  return [Math.min(e[0], e[1]), Math.max(e[0], e[1])]
}

function compareEdge(a, b) {
  return a[0]-b[0] || a[1]-b[1]
}

function canonicalizeEdges(edges) {
  return edges.map(canonicalizeEdge).sort(compareEdge)
}

function getDefault(options, property, dflt) {
  if(property in options) {
    return options[property]
  }
  return dflt
}

function cdt2d(points, edges, options) {

  if(!Array.isArray(edges)) {
    options = edges || {}
    edges = []
  } else {
    options = options || {}
    edges = edges || []
  }

  //Parse out options
  var delaunay = !!getDefault(options, 'delaunay', true)
  var interior = !!getDefault(options, 'interior', true)
  var exterior = !!getDefault(options, 'exterior', true)
  var infinity = !!getDefault(options, 'infinity', false)

  //Handle trivial case
  if((!interior && !exterior) || points.length === 0) {
    return []
  }

  //Construct initial triangulation
  var cells = monotoneTriangulate(points, edges)

  //If delaunay refinement needed, then improve quality by edge flipping
  if(delaunay || interior !== exterior || infinity) {

    //Index all of the cells to support fast neighborhood queries
    var triangulation = makeIndex(points.length, canonicalizeEdges(edges))
    for(var i=0; i<cells.length; ++i) {
      var f = cells[i]
      triangulation.addTriangle(f[0], f[1], f[2])
    }

    //Run edge flipping
    if(delaunay) {
      delaunayFlip(points, triangulation)
    }

    //Filter points
    if(!exterior) {
      return filterTriangulation(triangulation, -1)
    } else if(!interior) {
      return filterTriangulation(triangulation,  1, infinity)
    } else if(infinity) {
      return filterTriangulation(triangulation, 0, infinity)
    } else {
      return triangulation.cells()
    }
    
  } else {
    return cells
  }
}


/***/ }),

/***/ "./node_modules/cdt2d/lib/delaunay.js":
/*!********************************************!*\
  !*** ./node_modules/cdt2d/lib/delaunay.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inCircle = __webpack_require__(/*! robust-in-sphere */ "./node_modules/robust-in-sphere/in-sphere.js")[4]
var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")

module.exports = delaunayRefine

function testFlip(points, triangulation, stack, a, b, x) {
  var y = triangulation.opposite(a, b)

  //Test boundary edge
  if(y < 0) {
    return
  }

  //Swap edge if order flipped
  if(b < a) {
    var tmp = a
    a = b
    b = tmp
    tmp = x
    x = y
    y = tmp
  }

  //Test if edge is constrained
  if(triangulation.isConstraint(a, b)) {
    return
  }

  //Test if edge is delaunay
  if(inCircle(points[a], points[b], points[x], points[y]) < 0) {
    stack.push(a, b)
  }
}

//Assume edges are sorted lexicographically
function delaunayRefine(points, triangulation) {
  var stack = []

  var numPoints = points.length
  var stars = triangulation.stars
  for(var a=0; a<numPoints; ++a) {
    var star = stars[a]
    for(var j=1; j<star.length; j+=2) {
      var b = star[j]

      //If order is not consistent, then skip edge
      if(b < a) {
        continue
      }

      //Check if edge is constrained
      if(triangulation.isConstraint(a, b)) {
        continue
      }

      //Find opposite edge
      var x = star[j-1], y = -1
      for(var k=1; k<star.length; k+=2) {
        if(star[k-1] === b) {
          y = star[k]
          break
        }
      }

      //If this is a boundary edge, don't flip it
      if(y < 0) {
        continue
      }

      //If edge is in circle, flip it
      if(inCircle(points[a], points[b], points[x], points[y]) < 0) {
        stack.push(a, b)
      }
    }
  }

  while(stack.length > 0) {
    var b = stack.pop()
    var a = stack.pop()

    //Find opposite pairs
    var x = -1, y = -1
    var star = stars[a]
    for(var i=1; i<star.length; i+=2) {
      var s = star[i-1]
      var t = star[i]
      if(s === b) {
        y = t
      } else if(t === b) {
        x = s
      }
    }

    //If x/y are both valid then skip edge
    if(x < 0 || y < 0) {
      continue
    }

    //If edge is now delaunay, then don't flip it
    if(inCircle(points[a], points[b], points[x], points[y]) >= 0) {
      continue
    }

    //Flip the edge
    triangulation.flip(a, b)

    //Test flipping neighboring edges
    testFlip(points, triangulation, stack, x, a, y)
    testFlip(points, triangulation, stack, a, y, x)
    testFlip(points, triangulation, stack, y, b, x)
    testFlip(points, triangulation, stack, b, x, y)
  }
}


/***/ }),

/***/ "./node_modules/cdt2d/lib/filter.js":
/*!******************************************!*\
  !*** ./node_modules/cdt2d/lib/filter.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")

module.exports = classifyFaces

function FaceIndex(cells, neighbor, constraint, flags, active, next, boundary) {
  this.cells       = cells
  this.neighbor    = neighbor
  this.flags       = flags
  this.constraint  = constraint
  this.active      = active
  this.next        = next
  this.boundary    = boundary
}

var proto = FaceIndex.prototype

function compareCell(a, b) {
  return a[0] - b[0] ||
         a[1] - b[1] ||
         a[2] - b[2]
}

proto.locate = (function() {
  var key = [0,0,0]
  return function(a, b, c) {
    var x = a, y = b, z = c
    if(b < c) {
      if(b < a) {
        x = b
        y = c
        z = a
      }
    } else if(c < a) {
      x = c
      y = a
      z = b
    }
    if(x < 0) {
      return -1
    }
    key[0] = x
    key[1] = y
    key[2] = z
    return bsearch.eq(this.cells, key, compareCell)
  }
})()

function indexCells(triangulation, infinity) {
  //First get cells and canonicalize
  var cells = triangulation.cells()
  var nc = cells.length
  for(var i=0; i<nc; ++i) {
    var c = cells[i]
    var x = c[0], y = c[1], z = c[2]
    if(y < z) {
      if(y < x) {
        c[0] = y
        c[1] = z
        c[2] = x
      }
    } else if(z < x) {
      c[0] = z
      c[1] = x
      c[2] = y
    }
  }
  cells.sort(compareCell)

  //Initialize flag array
  var flags = new Array(nc)
  for(var i=0; i<flags.length; ++i) {
    flags[i] = 0
  }

  //Build neighbor index, initialize queues
  var active = []
  var next   = []
  var neighbor = new Array(3*nc)
  var constraint = new Array(3*nc)
  var boundary = null
  if(infinity) {
    boundary = []
  }
  var index = new FaceIndex(
    cells,
    neighbor,
    constraint,
    flags,
    active,
    next,
    boundary)
  for(var i=0; i<nc; ++i) {
    var c = cells[i]
    for(var j=0; j<3; ++j) {
      var x = c[j], y = c[(j+1)%3]
      var a = neighbor[3*i+j] = index.locate(y, x, triangulation.opposite(y, x))
      var b = constraint[3*i+j] = triangulation.isConstraint(x, y)
      if(a < 0) {
        if(b) {
          next.push(i)
        } else {
          active.push(i)
          flags[i] = 1
        }
        if(infinity) {
          boundary.push([y, x, -1])
        }
      }
    }
  }
  return index
}

function filterCells(cells, flags, target) {
  var ptr = 0
  for(var i=0; i<cells.length; ++i) {
    if(flags[i] === target) {
      cells[ptr++] = cells[i]
    }
  }
  cells.length = ptr
  return cells
}

function classifyFaces(triangulation, target, infinity) {
  var index = indexCells(triangulation, infinity)

  if(target === 0) {
    if(infinity) {
      return index.cells.concat(index.boundary)
    } else {
      return index.cells
    }
  }

  var side = 1
  var active = index.active
  var next = index.next
  var flags = index.flags
  var cells = index.cells
  var constraint = index.constraint
  var neighbor = index.neighbor

  while(active.length > 0 || next.length > 0) {
    while(active.length > 0) {
      var t = active.pop()
      if(flags[t] === -side) {
        continue
      }
      flags[t] = side
      var c = cells[t]
      for(var j=0; j<3; ++j) {
        var f = neighbor[3*t+j]
        if(f >= 0 && flags[f] === 0) {
          if(constraint[3*t+j]) {
            next.push(f)
          } else {
            active.push(f)
            flags[f] = side
          }
        }
      }
    }

    //Swap arrays and loop
    var tmp = next
    next = active
    active = tmp
    next.length = 0
    side = -side
  }

  var result = filterCells(cells, flags, target)
  if(infinity) {
    return result.concat(index.boundary)
  }
  return result
}


/***/ }),

/***/ "./node_modules/cdt2d/lib/monotone.js":
/*!********************************************!*\
  !*** ./node_modules/cdt2d/lib/monotone.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")
var orient = __webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")[3]

var EVENT_POINT = 0
var EVENT_END   = 1
var EVENT_START = 2

module.exports = monotoneTriangulate

//A partial convex hull fragment, made of two unimonotone polygons
function PartialHull(a, b, idx, lowerIds, upperIds) {
  this.a = a
  this.b = b
  this.idx = idx
  this.lowerIds = lowerIds
  this.upperIds = upperIds
}

//An event in the sweep line procedure
function Event(a, b, type, idx) {
  this.a    = a
  this.b    = b
  this.type = type
  this.idx  = idx
}

//This is used to compare events for the sweep line procedure
// Points are:
//  1. sorted lexicographically
//  2. sorted by type  (point < end < start)
//  3. segments sorted by winding order
//  4. sorted by index
function compareEvent(a, b) {
  var d =
    (a.a[0] - b.a[0]) ||
    (a.a[1] - b.a[1]) ||
    (a.type - b.type)
  if(d) { return d }
  if(a.type !== EVENT_POINT) {
    d = orient(a.a, a.b, b.b)
    if(d) { return d }
  }
  return a.idx - b.idx
}

function testPoint(hull, p) {
  return orient(hull.a, hull.b, p)
}

function addPoint(cells, hulls, points, p, idx) {
  var lo = bsearch.lt(hulls, p, testPoint)
  var hi = bsearch.gt(hulls, p, testPoint)
  for(var i=lo; i<hi; ++i) {
    var hull = hulls[i]

    //Insert p into lower hull
    var lowerIds = hull.lowerIds
    var m = lowerIds.length
    while(m > 1 && orient(
        points[lowerIds[m-2]],
        points[lowerIds[m-1]],
        p) > 0) {
      cells.push(
        [lowerIds[m-1],
         lowerIds[m-2],
         idx])
      m -= 1
    }
    lowerIds.length = m
    lowerIds.push(idx)

    //Insert p into upper hull
    var upperIds = hull.upperIds
    var m = upperIds.length
    while(m > 1 && orient(
        points[upperIds[m-2]],
        points[upperIds[m-1]],
        p) < 0) {
      cells.push(
        [upperIds[m-2],
         upperIds[m-1],
         idx])
      m -= 1
    }
    upperIds.length = m
    upperIds.push(idx)
  }
}

function findSplit(hull, edge) {
  var d
  if(hull.a[0] < edge.a[0]) {
    d = orient(hull.a, hull.b, edge.a)
  } else {
    d = orient(edge.b, edge.a, hull.a)
  }
  if(d) { return d }
  if(edge.b[0] < hull.b[0]) {
    d = orient(hull.a, hull.b, edge.b)
  } else {
    d = orient(edge.b, edge.a, hull.b)
  }
  return d || hull.idx - edge.idx
}

function splitHulls(hulls, points, event) {
  var splitIdx = bsearch.le(hulls, event, findSplit)
  var hull = hulls[splitIdx]
  var upperIds = hull.upperIds
  var x = upperIds[upperIds.length-1]
  hull.upperIds = [x]
  hulls.splice(splitIdx+1, 0,
    new PartialHull(event.a, event.b, event.idx, [x], upperIds))
}


function mergeHulls(hulls, points, event) {
  //Swap pointers for merge search
  var tmp = event.a
  event.a = event.b
  event.b = tmp
  var mergeIdx = bsearch.eq(hulls, event, findSplit)
  var upper = hulls[mergeIdx]
  var lower = hulls[mergeIdx-1]
  lower.upperIds = upper.upperIds
  hulls.splice(mergeIdx, 1)
}


function monotoneTriangulate(points, edges) {

  var numPoints = points.length
  var numEdges = edges.length

  var events = []

  //Create point events
  for(var i=0; i<numPoints; ++i) {
    events.push(new Event(
      points[i],
      null,
      EVENT_POINT,
      i))
  }

  //Create edge events
  for(var i=0; i<numEdges; ++i) {
    var e = edges[i]
    var a = points[e[0]]
    var b = points[e[1]]
    if(a[0] < b[0]) {
      events.push(
        new Event(a, b, EVENT_START, i),
        new Event(b, a, EVENT_END, i))
    } else if(a[0] > b[0]) {
      events.push(
        new Event(b, a, EVENT_START, i),
        new Event(a, b, EVENT_END, i))
    }
  }

  //Sort events
  events.sort(compareEvent)

  //Initialize hull
  var minX = events[0].a[0] - (1 + Math.abs(events[0].a[0])) * Math.pow(2, -52)
  var hull = [ new PartialHull([minX, 1], [minX, 0], -1, [], [], [], []) ]

  //Process events in order
  var cells = []
  for(var i=0, numEvents=events.length; i<numEvents; ++i) {
    var event = events[i]
    var type = event.type
    if(type === EVENT_POINT) {
      addPoint(cells, hull, points, event.a, event.idx)
    } else if(type === EVENT_START) {
      splitHulls(hull, points, event)
    } else {
      mergeHulls(hull, points, event)
    }
  }

  //Return triangulation
  return cells
}


/***/ }),

/***/ "./node_modules/cdt2d/lib/triangulation.js":
/*!*************************************************!*\
  !*** ./node_modules/cdt2d/lib/triangulation.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bsearch = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")

module.exports = createTriangulation

function Triangulation(stars, edges) {
  this.stars = stars
  this.edges = edges
}

var proto = Triangulation.prototype

function removePair(list, j, k) {
  for(var i=1, n=list.length; i<n; i+=2) {
    if(list[i-1] === j && list[i] === k) {
      list[i-1] = list[n-2]
      list[i] = list[n-1]
      list.length = n - 2
      return
    }
  }
}

proto.isConstraint = (function() {
  var e = [0,0]
  function compareLex(a, b) {
    return a[0] - b[0] || a[1] - b[1]
  }
  return function(i, j) {
    e[0] = Math.min(i,j)
    e[1] = Math.max(i,j)
    return bsearch.eq(this.edges, e, compareLex) >= 0
  }
})()

proto.removeTriangle = function(i, j, k) {
  var stars = this.stars
  removePair(stars[i], j, k)
  removePair(stars[j], k, i)
  removePair(stars[k], i, j)
}

proto.addTriangle = function(i, j, k) {
  var stars = this.stars
  stars[i].push(j, k)
  stars[j].push(k, i)
  stars[k].push(i, j)
}

proto.opposite = function(j, i) {
  var list = this.stars[i]
  for(var k=1, n=list.length; k<n; k+=2) {
    if(list[k] === j) {
      return list[k-1]
    }
  }
  return -1
}

proto.flip = function(i, j) {
  var a = this.opposite(i, j)
  var b = this.opposite(j, i)
  this.removeTriangle(i, j, a)
  this.removeTriangle(j, i, b)
  this.addTriangle(i, b, a)
  this.addTriangle(j, a, b)
}

proto.edges = function() {
  var stars = this.stars
  var result = []
  for(var i=0, n=stars.length; i<n; ++i) {
    var list = stars[i]
    for(var j=0, m=list.length; j<m; j+=2) {
      result.push([list[j], list[j+1]])
    }
  }
  return result
}

proto.cells = function() {
  var stars = this.stars
  var result = []
  for(var i=0, n=stars.length; i<n; ++i) {
    var list = stars[i]
    for(var j=0, m=list.length; j<m; j+=2) {
      var s = list[j]
      var t = list[j+1]
      if(i < Math.min(s, t)) {
        result.push([i, s, t])
      }
    }
  }
  return result
}

function createTriangulation(numVerts, edges) {
  var stars = new Array(numVerts)
  for(var i=0; i<numVerts; ++i) {
    stars[i] = []
  }
  return new Triangulation(stars, edges)
}


/***/ }),

/***/ "./node_modules/clean-pslg/clean-pslg.js":
/*!***********************************************!*\
  !*** ./node_modules/clean-pslg/clean-pslg.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = cleanPSLG

var UnionFind = __webpack_require__(/*! union-find */ "./node_modules/union-find/index.js")
var boxIntersect = __webpack_require__(/*! box-intersect */ "./node_modules/box-intersect/index.js")
var segseg = __webpack_require__(/*! robust-segment-intersect */ "./node_modules/robust-segment-intersect/segseg.js")
var rat = __webpack_require__(/*! big-rat */ "./node_modules/big-rat/index.js")
var ratCmp = __webpack_require__(/*! big-rat/cmp */ "./node_modules/big-rat/cmp.js")
var ratToFloat = __webpack_require__(/*! big-rat/to-float */ "./node_modules/big-rat/to-float.js")
var ratVec = __webpack_require__(/*! rat-vec */ "./node_modules/rat-vec/index.js")
var nextafter = __webpack_require__(/*! nextafter */ "./node_modules/nextafter/nextafter.js")

var solveIntersection = __webpack_require__(/*! ./lib/rat-seg-intersect */ "./node_modules/clean-pslg/lib/rat-seg-intersect.js")

// Bounds on a rational number when rounded to a float
function boundRat (r) {
  var f = ratToFloat(r)
  return [
    nextafter(f, -Infinity),
    nextafter(f, Infinity)
  ]
}

// Convert a list of edges in a pslg to bounding boxes
function boundEdges (points, edges) {
  var bounds = new Array(edges.length)
  for (var i = 0; i < edges.length; ++i) {
    var e = edges[i]
    var a = points[e[0]]
    var b = points[e[1]]
    bounds[i] = [
      nextafter(Math.min(a[0], b[0]), -Infinity),
      nextafter(Math.min(a[1], b[1]), -Infinity),
      nextafter(Math.max(a[0], b[0]), Infinity),
      nextafter(Math.max(a[1], b[1]), Infinity)
    ]
  }
  return bounds
}

// Convert a list of points into bounding boxes by duplicating coords
function boundPoints (points) {
  var bounds = new Array(points.length)
  for (var i = 0; i < points.length; ++i) {
    var p = points[i]
    bounds[i] = [
      nextafter(p[0], -Infinity),
      nextafter(p[1], -Infinity),
      nextafter(p[0], Infinity),
      nextafter(p[1], Infinity)
    ]
  }
  return bounds
}

// Find all pairs of crossing edges in a pslg (given edge bounds)
function getCrossings (points, edges, edgeBounds) {
  var result = []
  boxIntersect(edgeBounds, function (i, j) {
    var e = edges[i]
    var f = edges[j]
    if (e[0] === f[0] || e[0] === f[1] ||
      e[1] === f[0] || e[1] === f[1]) {
      return
    }
    var a = points[e[0]]
    var b = points[e[1]]
    var c = points[f[0]]
    var d = points[f[1]]
    if (segseg(a, b, c, d)) {
      result.push([i, j])
    }
  })
  return result
}

// Find all pairs of crossing vertices in a pslg (given edge/vert bounds)
function getTJunctions (points, edges, edgeBounds, vertBounds) {
  var result = []
  boxIntersect(edgeBounds, vertBounds, function (i, v) {
    var e = edges[i]
    if (e[0] === v || e[1] === v) {
      return
    }
    var p = points[v]
    var a = points[e[0]]
    var b = points[e[1]]
    if (segseg(a, b, p, p)) {
      result.push([i, v])
    }
  })
  return result
}

// Cut edges along crossings/tjunctions
function cutEdges (floatPoints, edges, crossings, junctions, useColor) {
  var i, e

  // Convert crossings into tjunctions by constructing rational points
  var ratPoints = floatPoints.map(function(p) {
      return [
          rat(p[0]),
          rat(p[1])
      ]
  })
  for (i = 0; i < crossings.length; ++i) {
    var crossing = crossings[i]
    e = crossing[0]
    var f = crossing[1]
    var ee = edges[e]
    var ef = edges[f]
    var x = solveIntersection(
      ratVec(floatPoints[ee[0]]),
      ratVec(floatPoints[ee[1]]),
      ratVec(floatPoints[ef[0]]),
      ratVec(floatPoints[ef[1]]))
    if (!x) {
      // Segments are parallel, should already be handled by t-junctions
      continue
    }
    var idx = floatPoints.length
    floatPoints.push([ratToFloat(x[0]), ratToFloat(x[1])])
    ratPoints.push(x)
    junctions.push([e, idx], [f, idx])
  }

  // Sort tjunctions
  junctions.sort(function (a, b) {
    if (a[0] !== b[0]) {
      return a[0] - b[0]
    }
    var u = ratPoints[a[1]]
    var v = ratPoints[b[1]]
    return ratCmp(u[0], v[0]) || ratCmp(u[1], v[1])
  })

  // Split edges along junctions
  for (i = junctions.length - 1; i >= 0; --i) {
    var junction = junctions[i]
    e = junction[0]

    var edge = edges[e]
    var s = edge[0]
    var t = edge[1]

    // Check if edge is not lexicographically sorted
    var a = floatPoints[s]
    var b = floatPoints[t]
    if (((a[0] - b[0]) || (a[1] - b[1])) < 0) {
      var tmp = s
      s = t
      t = tmp
    }

    // Split leading edge
    edge[0] = s
    var last = edge[1] = junction[1]

    // If we are grouping edges by color, remember to track data
    var color
    if (useColor) {
      color = edge[2]
    }

    // Split other edges
    while (i > 0 && junctions[i - 1][0] === e) {
      var junction = junctions[--i]
      var next = junction[1]
      if (useColor) {
        edges.push([last, next, color])
      } else {
        edges.push([last, next])
      }
      last = next
    }

    // Add final edge
    if (useColor) {
      edges.push([last, t, color])
    } else {
      edges.push([last, t])
    }
  }

  // Return constructed rational points
  return ratPoints
}

// Merge overlapping points
function dedupPoints (floatPoints, ratPoints, floatBounds) {
  var numPoints = ratPoints.length
  var uf = new UnionFind(numPoints)

  // Compute rational bounds
  var bounds = []
  for (var i = 0; i < ratPoints.length; ++i) {
    var p = ratPoints[i]
    var xb = boundRat(p[0])
    var yb = boundRat(p[1])
    bounds.push([
      nextafter(xb[0], -Infinity),
      nextafter(yb[0], -Infinity),
      nextafter(xb[1], Infinity),
      nextafter(yb[1], Infinity)
    ])
  }

  // Link all points with over lapping boxes
  boxIntersect(bounds, function (i, j) {
    uf.link(i, j)
  })

  // Do 1 pass over points to combine points in label sets
  var noDupes = true
  var labels = new Array(numPoints)
  for (var i = 0; i < numPoints; ++i) {
    var j = uf.find(i)
    if (j !== i) {
      // Clear no-dupes flag, zero out label
      noDupes = false
      // Make each point the top-left point from its cell
      floatPoints[j] = [
        Math.min(floatPoints[i][0], floatPoints[j][0]),
        Math.min(floatPoints[i][1], floatPoints[j][1])
      ]
    }
  }

  // If no duplicates, return null to signal termination
  if (noDupes) {
    return null
  }

  var ptr = 0
  for (var i = 0; i < numPoints; ++i) {
    var j = uf.find(i)
    if (j === i) {
      labels[i] = ptr
      floatPoints[ptr++] = floatPoints[i]
    } else {
      labels[i] = -1
    }
  }

  floatPoints.length = ptr

  // Do a second pass to fix up missing labels
  for (var i = 0; i < numPoints; ++i) {
    if (labels[i] < 0) {
      labels[i] = labels[uf.find(i)]
    }
  }

  // Return resulting union-find data structure
  return labels
}

function compareLex2 (a, b) { return (a[0] - b[0]) || (a[1] - b[1]) }
function compareLex3 (a, b) {
  var d = (a[0] - b[0]) || (a[1] - b[1])
  if (d) {
    return d
  }
  if (a[2] < b[2]) {
    return -1
  } else if (a[2] > b[2]) {
    return 1
  }
  return 0
}

// Remove duplicate edge labels
function dedupEdges (edges, labels, useColor) {
  if (edges.length === 0) {
    return
  }
  if (labels) {
    for (var i = 0; i < edges.length; ++i) {
      var e = edges[i]
      var a = labels[e[0]]
      var b = labels[e[1]]
      e[0] = Math.min(a, b)
      e[1] = Math.max(a, b)
    }
  } else {
    for (var i = 0; i < edges.length; ++i) {
      var e = edges[i]
      var a = e[0]
      var b = e[1]
      e[0] = Math.min(a, b)
      e[1] = Math.max(a, b)
    }
  }
  if (useColor) {
    edges.sort(compareLex3)
  } else {
    edges.sort(compareLex2)
  }
  var ptr = 1
  for (var i = 1; i < edges.length; ++i) {
    var prev = edges[i - 1]
    var next = edges[i]
    if (next[0] === prev[0] && next[1] === prev[1] &&
      (!useColor || next[2] === prev[2])) {
      continue
    }
    edges[ptr++] = next
  }
  edges.length = ptr
}

function preRound (points, edges, useColor) {
  var labels = dedupPoints(points, [], boundPoints(points))
  dedupEdges(edges, labels, useColor)
  return !!labels
}

// Repeat until convergence
function snapRound (points, edges, useColor) {
  // 1. find edge crossings
  var edgeBounds = boundEdges(points, edges)
  var crossings = getCrossings(points, edges, edgeBounds)

  // 2. find t-junctions
  var vertBounds = boundPoints(points)
  var tjunctions = getTJunctions(points, edges, edgeBounds, vertBounds)

  // 3. cut edges, construct rational points
  var ratPoints = cutEdges(points, edges, crossings, tjunctions, useColor)

  // 4. dedupe verts
  var labels = dedupPoints(points, ratPoints, vertBounds)

  // 5. dedupe edges
  dedupEdges(edges, labels, useColor)

  // 6. check termination
  if (!labels) {
    return (crossings.length > 0 || tjunctions.length > 0)
  }

  // More iterations necessary
  return true
}

// Main loop, runs PSLG clean up until completion
function cleanPSLG (points, edges, colors) {
  // If using colors, augment edges with color data
  var prevEdges
  if (colors) {
    prevEdges = edges
    var augEdges = new Array(edges.length)
    for (var i = 0; i < edges.length; ++i) {
      var e = edges[i]
      augEdges[i] = [e[0], e[1], colors[i]]
    }
    edges = augEdges
  }

  // First round: remove duplicate edges and points
  var modified = preRound(points, edges, !!colors)

  // Run snap rounding until convergence
  while (snapRound(points, edges, !!colors)) {
    modified = true
  }

  // Strip color tags
  if (!!colors && modified) {
    prevEdges.length = 0
    colors.length = 0
    for (var i = 0; i < edges.length; ++i) {
      var e = edges[i]
      prevEdges.push([e[0], e[1]])
      colors.push(e[2])
    }
  }

  return modified
}


/***/ }),

/***/ "./node_modules/clean-pslg/lib/rat-seg-intersect.js":
/*!**********************************************************!*\
  !*** ./node_modules/clean-pslg/lib/rat-seg-intersect.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = solveIntersection

var ratMul = __webpack_require__(/*! big-rat/mul */ "./node_modules/big-rat/mul.js")
var ratDiv = __webpack_require__(/*! big-rat/div */ "./node_modules/big-rat/div.js")
var ratSub = __webpack_require__(/*! big-rat/sub */ "./node_modules/big-rat/sub.js")
var ratSign = __webpack_require__(/*! big-rat/sign */ "./node_modules/big-rat/sign.js")
var rvSub = __webpack_require__(/*! rat-vec/sub */ "./node_modules/rat-vec/sub.js")
var rvAdd = __webpack_require__(/*! rat-vec/add */ "./node_modules/rat-vec/add.js")
var rvMuls = __webpack_require__(/*! rat-vec/muls */ "./node_modules/rat-vec/muls.js")

function ratPerp (a, b) {
  return ratSub(ratMul(a[0], b[1]), ratMul(a[1], b[0]))
}

// Solve for intersection
//  x = a + t (b-a)
//  (x - c) ^ (d-c) = 0
//  (t * (b-a) + (a-c) ) ^ (d-c) = 0
//  t * (b-a)^(d-c) = (d-c)^(a-c)
//  t = (d-c)^(a-c) / (b-a)^(d-c)

function solveIntersection (a, b, c, d) {
  var ba = rvSub(b, a)
  var dc = rvSub(d, c)

  var baXdc = ratPerp(ba, dc)

  if (ratSign(baXdc) === 0) {
    return null
  }

  var ac = rvSub(a, c)
  var dcXac = ratPerp(dc, ac)

  var t = ratDiv(dcXac, baXdc)
  var s = rvMuls(ba, t)
  var r = rvAdd(a, s)

  return r
}


/***/ }),

/***/ "./node_modules/cocoascript-class/lib/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = undefined;
exports.default = ObjCClass;

var _runtime = __webpack_require__(/*! ./runtime.js */ "./node_modules/cocoascript-class/lib/runtime.js");

exports.SuperCall = _runtime.SuperCall;

// super when returnType is id and args are void
// id objc_msgSendSuper(struct objc_super *super, SEL op, void)

const SuperInit = (0, _runtime.SuperCall)(NSStringFromSelector("init"), [], { type: "@" });

// Returns a real ObjC class. No need to use new.
function ObjCClass(defn) {
  const superclass = defn.superclass || NSObject;
  const className = (defn.className || defn.classname || "ObjCClass") + NSUUID.UUID().UUIDString();
  const reserved = new Set(['className', 'classname', 'superclass']);
  var cls = MOClassDescription.allocateDescriptionForClassWithName_superclass_(className, superclass);
  // Add each handler to the class description
  const ivars = [];
  for (var key in defn) {
    const v = defn[key];
    if (typeof v == 'function' && key !== 'init') {
      var selector = NSSelectorFromString(key);
      cls.addInstanceMethodWithSelector_function_(selector, v);
    } else if (!reserved.has(key)) {
      ivars.push(key);
      cls.addInstanceVariableWithName_typeEncoding(key, "@");
    }
  }

  cls.addInstanceMethodWithSelector_function_(NSSelectorFromString('init'), function () {
    const self = SuperInit.call(this);
    ivars.map(name => {
      Object.defineProperty(self, name, {
        get() {
          return getIvar(self, name);
        },
        set(v) {
          (0, _runtime.object_setInstanceVariable)(self, name, v);
        }
      });
      self[name] = defn[name];
    });
    // If there is a passsed-in init funciton, call it now.
    if (typeof defn.init == 'function') defn.init.call(this);
    return self;
  });

  return cls.registerClass();
};

function getIvar(obj, name) {
  const retPtr = MOPointer.new();
  (0, _runtime.object_getInstanceVariable)(obj, name, retPtr);
  return retPtr.value().retain().autorelease();
}

/***/ }),

/***/ "./node_modules/cocoascript-class/lib/runtime.js":
/*!*******************************************************!*\
  !*** ./node_modules/cocoascript-class/lib/runtime.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuperCall = SuperCall;
exports.CFunc = CFunc;
const objc_super_typeEncoding = '{objc_super="receiver"@"super_class"#}';

// You can store this to call your function. this must be bound to the current instance.
function SuperCall(selector, argTypes, returnType) {
  const func = CFunc("objc_msgSendSuper", [{ type: '^' + objc_super_typeEncoding }, { type: ":" }, ...argTypes], returnType);
  return function (...args) {
    const struct = make_objc_super(this, this.superclass());
    const structPtr = MOPointer.alloc().initWithValue_(struct);
    return func(structPtr, selector, ...args);
  };
}

// Recursively create a MOStruct
function makeStruct(def) {
  if (typeof def !== 'object' || Object.keys(def).length == 0) {
    return def;
  }
  const name = Object.keys(def)[0];
  const values = def[name];

  const structure = MOStruct.structureWithName_memberNames_runtime(name, Object.keys(values), Mocha.sharedRuntime());

  Object.keys(values).map(member => {
    structure[member] = makeStruct(values[member]);
  });

  return structure;
}

function make_objc_super(self, cls) {
  return makeStruct({
    objc_super: {
      receiver: self,
      super_class: cls
    }
  });
}

// Due to particularities of the JS bridge, we can't call into MOBridgeSupport objects directly
// But, we can ask key value coding to do the dirty work for us ;)
function setKeys(o, d) {
  const funcDict = NSMutableDictionary.dictionary();
  funcDict.o = o;
  Object.keys(d).map(k => funcDict.setValue_forKeyPath(d[k], "o." + k));
}

// Use any C function, not just ones with BridgeSupport
function CFunc(name, args, retVal) {
  function makeArgument(a) {
    if (!a) return null;
    const arg = MOBridgeSupportArgument.alloc().init();
    setKeys(arg, {
      type64: a.type
    });
    return arg;
  }
  const func = MOBridgeSupportFunction.alloc().init();
  setKeys(func, {
    name: name,
    arguments: args.map(makeArgument),
    returnValue: makeArgument(retVal)
  });
  return func;
}

/*
@encode(char*) = "*"
@encode(id) = "@"
@encode(Class) = "#"
@encode(void*) = "^v"
@encode(CGRect) = "{CGRect={CGPoint=dd}{CGSize=dd}}"
@encode(SEL) = ":"
*/

function addStructToBridgeSupport(key, structDef) {
  // OK, so this is probably the nastiest hack in this file.
  // We go modify MOBridgeSupportController behind its back and use kvc to add our own definition
  // There isn't another API for this though. So the only other way would be to make a real bridgesupport file.
  const symbols = MOBridgeSupportController.sharedController().valueForKey('symbols');
  if (!symbols) throw Error("Something has changed within bridge support so we can't add our definitions");
  // If someone already added this definition, don't re-register it.
  if (symbols[key] !== null) return;
  const def = MOBridgeSupportStruct.alloc().init();
  setKeys(def, {
    name: key,
    type: structDef.type
  });
  symbols[key] = def;
};

// This assumes the ivar is an object type. Return value is pretty useless.
const object_getInstanceVariable = exports.object_getInstanceVariable = CFunc("object_getInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "^@" }], { type: "^{objc_ivar=}" });
// Again, ivar is of object type
const object_setInstanceVariable = exports.object_setInstanceVariable = CFunc("object_setInstanceVariable", [{ type: "@" }, { type: '*' }, { type: "@" }], { type: "^{objc_ivar=}" });

// We need Mocha to understand what an objc_super is so we can use it as a function argument
addStructToBridgeSupport('objc_super', { type: objc_super_typeEncoding });

/***/ }),

/***/ "./node_modules/double-bits/double.js":
/*!********************************************!*\
  !*** ./node_modules/double-bits/double.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var hasTypedArrays = false
if(typeof Float64Array !== "undefined") {
  var DOUBLE_VIEW = new Float64Array(1)
    , UINT_VIEW   = new Uint32Array(DOUBLE_VIEW.buffer)
  DOUBLE_VIEW[0] = 1.0
  hasTypedArrays = true
  if(UINT_VIEW[1] === 0x3ff00000) {
    //Use little endian
    module.exports = function doubleBitsLE(n) {
      DOUBLE_VIEW[0] = n
      return [ UINT_VIEW[0], UINT_VIEW[1] ]
    }
    function toDoubleLE(lo, hi) {
      UINT_VIEW[0] = lo
      UINT_VIEW[1] = hi
      return DOUBLE_VIEW[0]
    }
    module.exports.pack = toDoubleLE
    function lowUintLE(n) {
      DOUBLE_VIEW[0] = n
      return UINT_VIEW[0]
    }
    module.exports.lo = lowUintLE
    function highUintLE(n) {
      DOUBLE_VIEW[0] = n
      return UINT_VIEW[1]
    }
    module.exports.hi = highUintLE
  } else if(UINT_VIEW[0] === 0x3ff00000) {
    //Use big endian
    module.exports = function doubleBitsBE(n) {
      DOUBLE_VIEW[0] = n
      return [ UINT_VIEW[1], UINT_VIEW[0] ]
    }
    function toDoubleBE(lo, hi) {
      UINT_VIEW[1] = lo
      UINT_VIEW[0] = hi
      return DOUBLE_VIEW[0]
    }
    module.exports.pack = toDoubleBE
    function lowUintBE(n) {
      DOUBLE_VIEW[0] = n
      return UINT_VIEW[1]
    }
    module.exports.lo = lowUintBE
    function highUintBE(n) {
      DOUBLE_VIEW[0] = n
      return UINT_VIEW[0]
    }
    module.exports.hi = highUintBE
  } else {
    hasTypedArrays = false
  }
}
if(!hasTypedArrays) {
  var buffer = new Buffer(8)
  module.exports = function doubleBits(n) {
    buffer.writeDoubleLE(n, 0, true)
    return [ buffer.readUInt32LE(0, true), buffer.readUInt32LE(4, true) ]
  }
  function toDouble(lo, hi) {
    buffer.writeUInt32LE(lo, 0, true)
    buffer.writeUInt32LE(hi, 4, true)
    return buffer.readDoubleLE(0, true)
  }
  module.exports.pack = toDouble  
  function lowUint(n) {
    buffer.writeDoubleLE(n, 0, true)
    return buffer.readUInt32LE(0, true)
  }
  module.exports.lo = lowUint
  function highUint(n) {
    buffer.writeDoubleLE(n, 0, true)
    return buffer.readUInt32LE(4, true)
  }
  module.exports.hi = highUint
}

module.exports.sign = function(n) {
  return module.exports.hi(n) >>> 31
}

module.exports.exponent = function(n) {
  var b = module.exports.hi(n)
  return ((b<<1) >>> 21) - 1023
}

module.exports.fraction = function(n) {
  var lo = module.exports.lo(n)
  var hi = module.exports.hi(n)
  var b = hi & ((1<<20) - 1)
  if(hi & 0x7ff00000) {
    b += (1<<20)
  }
  return [lo, b]
}

module.exports.denormalized = function(n) {
  var hi = module.exports.hi(n)
  return !(hi & 0x7ff00000)
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/dup/dup.js":
/*!*********************************!*\
  !*** ./node_modules/dup/dup.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dupe_array(count, value, i) {
  var c = count[i]|0
  if(c <= 0) {
    return []
  }
  var result = new Array(c), j
  if(i === count.length-1) {
    for(j=0; j<c; ++j) {
      result[j] = value
    }
  } else {
    for(j=0; j<c; ++j) {
      result[j] = dupe_array(count, value, i+1)
    }
  }
  return result
}

function dupe_number(count, value) {
  var result, i
  result = new Array(count)
  for(i=0; i<count; ++i) {
    result[i] = value
  }
  return result
}

function dupe(count, value) {
  if(typeof value === "undefined") {
    value = 0
  }
  switch(typeof count) {
    case "number":
      if(count > 0) {
        return dupe_number(count|0, value)
      }
    break
    case "object":
      if(typeof (count.length) === "number") {
        return dupe_array(count, value, 0)
      }
    break
  }
  return []
}

module.exports = dupe

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/nextafter/nextafter.js":
/*!*********************************************!*\
  !*** ./node_modules/nextafter/nextafter.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var doubleBits = __webpack_require__(/*! double-bits */ "./node_modules/double-bits/double.js")

var SMALLEST_DENORM = Math.pow(2, -1074)
var UINT_MAX = (-1)>>>0

module.exports = nextafter

function nextafter(x, y) {
  if(isNaN(x) || isNaN(y)) {
    return NaN
  }
  if(x === y) {
    return x
  }
  if(x === 0) {
    if(y < 0) {
      return -SMALLEST_DENORM
    } else {
      return SMALLEST_DENORM
    }
  }
  var hi = doubleBits.hi(x)
  var lo = doubleBits.lo(x)
  if((y > x) === (x > 0)) {
    if(lo === UINT_MAX) {
      hi += 1
      lo = 0
    } else {
      lo += 1
    }
  } else {
    if(lo === 0) {
      lo = UINT_MAX
      hi -= 1
    } else {
      lo -= 1
    }
  }
  return doubleBits.pack(lo, hi)
}

/***/ }),

/***/ "./node_modules/rat-vec/add.js":
/*!*************************************!*\
  !*** ./node_modules/rat-vec/add.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bnadd = __webpack_require__(/*! big-rat/add */ "./node_modules/big-rat/add.js")

module.exports = add

function add (a, b) {
  var n = a.length
  var r = new Array(n)
  for (var i=0; i<n; ++i) {
    r[i] = bnadd(a[i], b[i])
  }
  return r
}


/***/ }),

/***/ "./node_modules/rat-vec/index.js":
/*!***************************************!*\
  !*** ./node_modules/rat-vec/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = float2rat

var rat = __webpack_require__(/*! big-rat */ "./node_modules/big-rat/index.js")

function float2rat(v) {
  var result = new Array(v.length)
  for(var i=0; i<v.length; ++i) {
    result[i] = rat(v[i])
  }
  return result
}


/***/ }),

/***/ "./node_modules/rat-vec/muls.js":
/*!**************************************!*\
  !*** ./node_modules/rat-vec/muls.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rat = __webpack_require__(/*! big-rat */ "./node_modules/big-rat/index.js")
var mul = __webpack_require__(/*! big-rat/mul */ "./node_modules/big-rat/mul.js")

module.exports = muls

function muls(a, x) {
  var s = rat(x)
  var n = a.length
  var r = new Array(n)
  for(var i=0; i<n; ++i) {
    r[i] = mul(a[i], s)
  }
  return r
}


/***/ }),

/***/ "./node_modules/rat-vec/sub.js":
/*!*************************************!*\
  !*** ./node_modules/rat-vec/sub.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bnsub = __webpack_require__(/*! big-rat/sub */ "./node_modules/big-rat/sub.js")

module.exports = sub

function sub(a, b) {
  var n = a.length
  var r = new Array(n)
    for(var i=0; i<n; ++i) {
    r[i] = bnsub(a[i], b[i])
  }
  return r
}


/***/ }),

/***/ "./node_modules/robust-in-sphere/in-sphere.js":
/*!****************************************************!*\
  !*** ./node_modules/robust-in-sphere/in-sphere.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var twoProduct = __webpack_require__(/*! two-product */ "./node_modules/two-product/two-product.js")
var robustSum = __webpack_require__(/*! robust-sum */ "./node_modules/robust-sum/robust-sum.js")
var robustDiff = __webpack_require__(/*! robust-subtract */ "./node_modules/robust-subtract/robust-diff.js")
var robustScale = __webpack_require__(/*! robust-scale */ "./node_modules/robust-scale/robust-scale.js")

var NUM_EXPAND = 6

function cofactor(m, c) {
  var result = new Array(m.length-1)
  for(var i=1; i<m.length; ++i) {
    var r = result[i-1] = new Array(m.length-1)
    for(var j=0,k=0; j<m.length; ++j) {
      if(j === c) {
        continue
      }
      r[k++] = m[i][j]
    }
  }
  return result
}

function matrix(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = new Array(n)
    for(var j=0; j<n; ++j) {
      result[i][j] = ["m", j, "[", (n-i-2), "]"].join("")
    }
  }
  return result
}

function generateSum(expr) {
  if(expr.length === 1) {
    return expr[0]
  } else if(expr.length === 2) {
    return ["sum(", expr[0], ",", expr[1], ")"].join("")
  } else {
    var m = expr.length>>1
    return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("")
  }
}

function makeProduct(a, b) {
  if(a.charAt(0) === "m") {
    if(b.charAt(0) === "w") {
      var toks = a.split("[")
      return ["w", b.substr(1), "m", toks[0].substr(1)].join("")
    } else {
      return ["prod(", a, ",", b, ")"].join("")
    }
  } else {
    return makeProduct(b, a)
  }
}

function sign(s) {
  if(s & 1 !== 0) {
    return "-"
  }
  return ""
}

function determinant(m) {
  if(m.length === 2) {
    return [["diff(", makeProduct(m[0][0], m[1][1]), ",", makeProduct(m[1][0], m[0][1]), ")"].join("")]
  } else {
    var expr = []
    for(var i=0; i<m.length; ++i) {
      expr.push(["scale(", generateSum(determinant(cofactor(m, i))), ",", sign(i), m[0][i], ")"].join(""))
    }
    return expr
  }
}

function makeSquare(d, n) {
  var terms = []
  for(var i=0; i<n-2; ++i) {
    terms.push(["prod(m", d, "[", i, "],m", d, "[", i, "])"].join(""))
  }
  return generateSum(terms)
}

function orientation(n) {
  var pos = []
  var neg = []
  var m = matrix(n)
  for(var i=0; i<n; ++i) {
    m[0][i] = "1"
    m[n-1][i] = "w"+i
  } 
  for(var i=0; i<n; ++i) {
    if((i&1)===0) {
      pos.push.apply(pos,determinant(cofactor(m, i)))
    } else {
      neg.push.apply(neg,determinant(cofactor(m, i)))
    }
  }
  var posExpr = generateSum(pos)
  var negExpr = generateSum(neg)
  var funcName = "exactInSphere" + n
  var funcArgs = []
  for(var i=0; i<n; ++i) {
    funcArgs.push("m" + i)
  }
  var code = ["function ", funcName, "(", funcArgs.join(), "){"]
  for(var i=0; i<n; ++i) {
    code.push("var w",i,"=",makeSquare(i,n),";")
    for(var j=0; j<n; ++j) {
      if(j !== i) {
        code.push("var w",i,"m",j,"=scale(w",i,",m",j,"[0]);")
      }
    }
  }
  code.push("var p=", posExpr, ",n=", negExpr, ",d=diff(p,n);return d[d.length-1];}return ", funcName)
  var proc = new Function("sum", "diff", "prod", "scale", code.join(""))
  return proc(robustSum, robustDiff, twoProduct, robustScale)
}

function inSphere0() { return 0 }
function inSphere1() { return 0 }
function inSphere2() { return 0 }

var CACHED = [
  inSphere0,
  inSphere1,
  inSphere2
]

function slowInSphere(args) {
  var proc = CACHED[args.length]
  if(!proc) {
    proc = CACHED[args.length] = orientation(args.length)
  }
  return proc.apply(undefined, args)
}

function generateInSphereTest() {
  while(CACHED.length <= NUM_EXPAND) {
    CACHED.push(orientation(CACHED.length))
  }
  var args = []
  var procArgs = ["slow"]
  for(var i=0; i<=NUM_EXPAND; ++i) {
    args.push("a" + i)
    procArgs.push("o" + i)
  }
  var code = [
    "function testInSphere(", args.join(), "){switch(arguments.length){case 0:case 1:return 0;"
  ]
  for(var i=2; i<=NUM_EXPAND; ++i) {
    code.push("case ", i, ":return o", i, "(", args.slice(0, i).join(), ");")
  }
  code.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return testInSphere")
  procArgs.push(code.join(""))

  var proc = Function.apply(undefined, procArgs)

  module.exports = proc.apply(undefined, [slowInSphere].concat(CACHED))
  for(var i=0; i<=NUM_EXPAND; ++i) {
    module.exports[i] = CACHED[i]
  }
}

generateInSphereTest()

/***/ }),

/***/ "./node_modules/robust-orientation/orientation.js":
/*!********************************************************!*\
  !*** ./node_modules/robust-orientation/orientation.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var twoProduct = __webpack_require__(/*! two-product */ "./node_modules/two-product/two-product.js")
var robustSum = __webpack_require__(/*! robust-sum */ "./node_modules/robust-sum/robust-sum.js")
var robustScale = __webpack_require__(/*! robust-scale */ "./node_modules/robust-scale/robust-scale.js")
var robustSubtract = __webpack_require__(/*! robust-subtract */ "./node_modules/robust-subtract/robust-diff.js")

var NUM_EXPAND = 5

var EPSILON     = 1.1102230246251565e-16
var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON
var ERRBOUND4   = (7.0 + 56.0 * EPSILON) * EPSILON

function cofactor(m, c) {
  var result = new Array(m.length-1)
  for(var i=1; i<m.length; ++i) {
    var r = result[i-1] = new Array(m.length-1)
    for(var j=0,k=0; j<m.length; ++j) {
      if(j === c) {
        continue
      }
      r[k++] = m[i][j]
    }
  }
  return result
}

function matrix(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = new Array(n)
    for(var j=0; j<n; ++j) {
      result[i][j] = ["m", j, "[", (n-i-1), "]"].join("")
    }
  }
  return result
}

function sign(n) {
  if(n & 1) {
    return "-"
  }
  return ""
}

function generateSum(expr) {
  if(expr.length === 1) {
    return expr[0]
  } else if(expr.length === 2) {
    return ["sum(", expr[0], ",", expr[1], ")"].join("")
  } else {
    var m = expr.length>>1
    return ["sum(", generateSum(expr.slice(0, m)), ",", generateSum(expr.slice(m)), ")"].join("")
  }
}

function determinant(m) {
  if(m.length === 2) {
    return [["sum(prod(", m[0][0], ",", m[1][1], "),prod(-", m[0][1], ",", m[1][0], "))"].join("")]
  } else {
    var expr = []
    for(var i=0; i<m.length; ++i) {
      expr.push(["scale(", generateSum(determinant(cofactor(m, i))), ",", sign(i), m[0][i], ")"].join(""))
    }
    return expr
  }
}

function orientation(n) {
  var pos = []
  var neg = []
  var m = matrix(n)
  var args = []
  for(var i=0; i<n; ++i) {
    if((i&1)===0) {
      pos.push.apply(pos, determinant(cofactor(m, i)))
    } else {
      neg.push.apply(neg, determinant(cofactor(m, i)))
    }
    args.push("m" + i)
  }
  var posExpr = generateSum(pos)
  var negExpr = generateSum(neg)
  var funcName = "orientation" + n + "Exact"
  var code = ["function ", funcName, "(", args.join(), "){var p=", posExpr, ",n=", negExpr, ",d=sub(p,n);\
return d[d.length-1];};return ", funcName].join("")
  var proc = new Function("sum", "prod", "scale", "sub", code)
  return proc(robustSum, twoProduct, robustScale, robustSubtract)
}

var orientation3Exact = orientation(3)
var orientation4Exact = orientation(4)

var CACHED = [
  function orientation0() { return 0 },
  function orientation1() { return 0 },
  function orientation2(a, b) { 
    return b[0] - a[0]
  },
  function orientation3(a, b, c) {
    var l = (a[1] - c[1]) * (b[0] - c[0])
    var r = (a[0] - c[0]) * (b[1] - c[1])
    var det = l - r
    var s
    if(l > 0) {
      if(r <= 0) {
        return det
      } else {
        s = l + r
      }
    } else if(l < 0) {
      if(r >= 0) {
        return det
      } else {
        s = -(l + r)
      }
    } else {
      return det
    }
    var tol = ERRBOUND3 * s
    if(det >= tol || det <= -tol) {
      return det
    }
    return orientation3Exact(a, b, c)
  },
  function orientation4(a,b,c,d) {
    var adx = a[0] - d[0]
    var bdx = b[0] - d[0]
    var cdx = c[0] - d[0]
    var ady = a[1] - d[1]
    var bdy = b[1] - d[1]
    var cdy = c[1] - d[1]
    var adz = a[2] - d[2]
    var bdz = b[2] - d[2]
    var cdz = c[2] - d[2]
    var bdxcdy = bdx * cdy
    var cdxbdy = cdx * bdy
    var cdxady = cdx * ady
    var adxcdy = adx * cdy
    var adxbdy = adx * bdy
    var bdxady = bdx * ady
    var det = adz * (bdxcdy - cdxbdy) 
            + bdz * (cdxady - adxcdy)
            + cdz * (adxbdy - bdxady)
    var permanent = (Math.abs(bdxcdy) + Math.abs(cdxbdy)) * Math.abs(adz)
                  + (Math.abs(cdxady) + Math.abs(adxcdy)) * Math.abs(bdz)
                  + (Math.abs(adxbdy) + Math.abs(bdxady)) * Math.abs(cdz)
    var tol = ERRBOUND4 * permanent
    if ((det > tol) || (-det > tol)) {
      return det
    }
    return orientation4Exact(a,b,c,d)
  }
]

function slowOrient(args) {
  var proc = CACHED[args.length]
  if(!proc) {
    proc = CACHED[args.length] = orientation(args.length)
  }
  return proc.apply(undefined, args)
}

function generateOrientationProc() {
  while(CACHED.length <= NUM_EXPAND) {
    CACHED.push(orientation(CACHED.length))
  }
  var args = []
  var procArgs = ["slow"]
  for(var i=0; i<=NUM_EXPAND; ++i) {
    args.push("a" + i)
    procArgs.push("o" + i)
  }
  var code = [
    "function getOrientation(", args.join(), "){switch(arguments.length){case 0:case 1:return 0;"
  ]
  for(var i=2; i<=NUM_EXPAND; ++i) {
    code.push("case ", i, ":return o", i, "(", args.slice(0, i).join(), ");")
  }
  code.push("}var s=new Array(arguments.length);for(var i=0;i<arguments.length;++i){s[i]=arguments[i]};return slow(s);}return getOrientation")
  procArgs.push(code.join(""))

  var proc = Function.apply(undefined, procArgs)
  module.exports = proc.apply(undefined, [slowOrient].concat(CACHED))
  for(var i=0; i<=NUM_EXPAND; ++i) {
    module.exports[i] = CACHED[i]
  }
}

generateOrientationProc()

/***/ }),

/***/ "./node_modules/robust-scale/robust-scale.js":
/*!***************************************************!*\
  !*** ./node_modules/robust-scale/robust-scale.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var twoProduct = __webpack_require__(/*! two-product */ "./node_modules/two-product/two-product.js")
var twoSum = __webpack_require__(/*! two-sum */ "./node_modules/two-sum/two-sum.js")

module.exports = scaleLinearExpansion

function scaleLinearExpansion(e, scale) {
  var n = e.length
  if(n === 1) {
    var ts = twoProduct(e[0], scale)
    if(ts[0]) {
      return ts
    }
    return [ ts[1] ]
  }
  var g = new Array(2 * n)
  var q = [0.1, 0.1]
  var t = [0.1, 0.1]
  var count = 0
  twoProduct(e[0], scale, q)
  if(q[0]) {
    g[count++] = q[0]
  }
  for(var i=1; i<n; ++i) {
    twoProduct(e[i], scale, t)
    var pq = q[1]
    twoSum(pq, t[0], q)
    if(q[0]) {
      g[count++] = q[0]
    }
    var a = t[1]
    var b = q[1]
    var x = a + b
    var bv = x - a
    var y = b - bv
    q[1] = x
    if(y) {
      g[count++] = y
    }
  }
  if(q[1]) {
    g[count++] = q[1]
  }
  if(count === 0) {
    g[count++] = 0.0
  }
  g.length = count
  return g
}

/***/ }),

/***/ "./node_modules/robust-segment-intersect/segseg.js":
/*!*********************************************************!*\
  !*** ./node_modules/robust-segment-intersect/segseg.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = segmentsIntersect

var orient = __webpack_require__(/*! robust-orientation */ "./node_modules/robust-orientation/orientation.js")[3]

function checkCollinear(a0, a1, b0, b1) {

  for(var d=0; d<2; ++d) {
    var x0 = a0[d]
    var y0 = a1[d]
    var l0 = Math.min(x0, y0)
    var h0 = Math.max(x0, y0)    

    var x1 = b0[d]
    var y1 = b1[d]
    var l1 = Math.min(x1, y1)
    var h1 = Math.max(x1, y1)    

    if(h1 < l0 || h0 < l1) {
      return false
    }
  }

  return true
}

function segmentsIntersect(a0, a1, b0, b1) {
  var x0 = orient(a0, b0, b1)
  var y0 = orient(a1, b0, b1)
  if((x0 > 0 && y0 > 0) || (x0 < 0 && y0 < 0)) {
    return false
  }

  var x1 = orient(b0, a0, a1)
  var y1 = orient(b1, a0, a1)
  if((x1 > 0 && y1 > 0) || (x1 < 0 && y1 < 0)) {
    return false
  }

  //Check for degenerate collinear case
  if(x0 === 0 && y0 === 0 && x1 === 0 && y1 === 0) {
    return checkCollinear(a0, a1, b0, b1)
  }

  return true
}

/***/ }),

/***/ "./node_modules/robust-subtract/robust-diff.js":
/*!*****************************************************!*\
  !*** ./node_modules/robust-subtract/robust-diff.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = robustSubtract

//Easy case: Add two scalars
function scalarScalar(a, b) {
  var x = a + b
  var bv = x - a
  var av = x - bv
  var br = b - bv
  var ar = a - av
  var y = ar + br
  if(y) {
    return [y, x]
  }
  return [x]
}

function robustSubtract(e, f) {
  var ne = e.length|0
  var nf = f.length|0
  if(ne === 1 && nf === 1) {
    return scalarScalar(e[0], -f[0])
  }
  var n = ne + nf
  var g = new Array(n)
  var count = 0
  var eptr = 0
  var fptr = 0
  var abs = Math.abs
  var ei = e[eptr]
  var ea = abs(ei)
  var fi = -f[fptr]
  var fa = abs(fi)
  var a, b
  if(ea < fa) {
    b = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    b = fi
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
      fa = abs(fi)
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    a = fi
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
      fa = abs(fi)
    }
  }
  var x = a + b
  var bv = x - a
  var y = b - bv
  var q0 = y
  var q1 = x
  var _x, _bv, _av, _br, _ar
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei
      eptr += 1
      if(eptr < ne) {
        ei = e[eptr]
        ea = abs(ei)
      }
    } else {
      a = fi
      fptr += 1
      if(fptr < nf) {
        fi = -f[fptr]
        fa = abs(fi)
      }
    }
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
  }
  while(eptr < ne) {
    a = ei
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
    }
  }
  while(fptr < nf) {
    a = fi
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    } 
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    fptr += 1
    if(fptr < nf) {
      fi = -f[fptr]
    }
  }
  if(q0) {
    g[count++] = q0
  }
  if(q1) {
    g[count++] = q1
  }
  if(!count) {
    g[count++] = 0.0  
  }
  g.length = count
  return g
}

/***/ }),

/***/ "./node_modules/robust-sum/robust-sum.js":
/*!***********************************************!*\
  !*** ./node_modules/robust-sum/robust-sum.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = linearExpansionSum

//Easy case: Add two scalars
function scalarScalar(a, b) {
  var x = a + b
  var bv = x - a
  var av = x - bv
  var br = b - bv
  var ar = a - av
  var y = ar + br
  if(y) {
    return [y, x]
  }
  return [x]
}

function linearExpansionSum(e, f) {
  var ne = e.length|0
  var nf = f.length|0
  if(ne === 1 && nf === 1) {
    return scalarScalar(e[0], f[0])
  }
  var n = ne + nf
  var g = new Array(n)
  var count = 0
  var eptr = 0
  var fptr = 0
  var abs = Math.abs
  var ei = e[eptr]
  var ea = abs(ei)
  var fi = f[fptr]
  var fa = abs(fi)
  var a, b
  if(ea < fa) {
    b = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    b = fi
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
      fa = abs(fi)
    }
  }
  if((eptr < ne && ea < fa) || (fptr >= nf)) {
    a = ei
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
      ea = abs(ei)
    }
  } else {
    a = fi
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
      fa = abs(fi)
    }
  }
  var x = a + b
  var bv = x - a
  var y = b - bv
  var q0 = y
  var q1 = x
  var _x, _bv, _av, _br, _ar
  while(eptr < ne && fptr < nf) {
    if(ea < fa) {
      a = ei
      eptr += 1
      if(eptr < ne) {
        ei = e[eptr]
        ea = abs(ei)
      }
    } else {
      a = fi
      fptr += 1
      if(fptr < nf) {
        fi = f[fptr]
        fa = abs(fi)
      }
    }
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
  }
  while(eptr < ne) {
    a = ei
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    }
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    eptr += 1
    if(eptr < ne) {
      ei = e[eptr]
    }
  }
  while(fptr < nf) {
    a = fi
    b = q0
    x = a + b
    bv = x - a
    y = b - bv
    if(y) {
      g[count++] = y
    } 
    _x = q1 + x
    _bv = _x - q1
    _av = _x - _bv
    _br = x - _bv
    _ar = q1 - _av
    q0 = _ar + _br
    q1 = _x
    fptr += 1
    if(fptr < nf) {
      fi = f[fptr]
    }
  }
  if(q0) {
    g[count++] = q0
  }
  if(q1) {
    g[count++] = q1
  }
  if(!count) {
    g[count++] = 0.0  
  }
  g.length = count
  return g
}

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/browser-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var COLOR_CLASSES = [
  'NSColor',
  'NSCachedWhiteColor',
  'NSColorSpaceColor',
  'NSDynamicSystemColor',
  'NSCachedColorSpaceColor',
]
function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      color.class &&
      COLOR_CLASSES.indexOf(String(color.class())) !== -1
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    // TODO: Check size constraints since setFrame does not check it.
    var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(bounds.origin.x, 0, size.width, size.height)
    // Flip coordinates based on the primary screen.
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y =
      NSHeight(screen.frame()) - size.height - bounds.origin.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    return panel.frame()
  }

  browserWindow.setContentBounds = function(/* bounds, animate */) {
    // TODO:
  }

  browserWindow.getContentBounds = function() {
    // TODO:
  }

  browserWindow.setSize = function(width, height, animate) {
    var bounds = browserWindow.getBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    var bounds = browserWindow.getContentBounds()
    bounds.size.height = height
    bounds.size.width = width

    // TODO: handle resizing around center

    return browserWindow.setContentBounds(bounds, animate)
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.size.width, bounds.size.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const minSize = { width: width, height: height }
    panel.setContentMaxSize(minSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    bounds.origin.x = x
    bounds.origin.y = Math.round(NSHeight(mainScreenRect) - y)

    return browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return [
      bounds.origin.x,
      Math.round(NSHeight(mainScreenRect) - bounds.origin.y),
    ]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!http|localhost|www|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url = __command
          .pluginBundle()
          .urlForResourceNamed(url)
          .path()
      }
    }
    webview.setMainFrameURL(url)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.setDrawsBackground(false)
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  var x = point.x
  var y = webView.frame().size.height - point.y // the coord start from the bottom instead of the top
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    x +
    ', ' +
    y +
    '); ' +
    'if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/fitSubview.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(/*! @skpm/events */ "./node_modules/@skpm/events/index.js")
var buildBrowserAPI = __webpack_require__(/*! ./browser-api */ "./node_modules/sketch-module-web-view/lib/browser-api.js")
var buildWebAPI = __webpack_require__(/*! ./webview-api */ "./node_modules/sketch-module-web-view/lib/webview-api.js")
var fitSubviewToView = __webpack_require__(/*! ./fitSubview */ "./node_modules/sketch-module-web-view/lib/fitSubview.js")
var dispatchFirstClick = __webpack_require__(/*! ./dispatch-first-click */ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js")
var setDelegates = __webpack_require__(/*! ./set-delegates */ "./node_modules/sketch-module-web-view/lib/set-delegates.js")

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  // Long-running script
  var fiber
  try {
    fiber = coscript.createFiber()
  } catch (err) {
    coscript.shouldKeepAround = true
  }

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  // TODO: handle modal mode

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var webView = WebView.alloc().initWithFrame(
    NSMakeRect(0, 0, options.width || 800, options.height || 600)
  )
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)
  setDelegates(browserWindow, panel, webView)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  const title =
    options.title ||
    (typeof __command !== 'undefined' && __command.pluginBundle()
      ? __command.pluginBundle().name()
      : undefined)
  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  if (options.webPreferences) {
    // TODO:
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents.executeJavaScript(
          dispatchFirstClick(webView, event)
        )
      }
    })
  }

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    if (fiber) {
      fiber.cleanup()
    } else {
      coscript.shouldKeepAround = false
    }
  })

  threadDictionary[identifier] = panel

  if (fiber) {
    fiber.onCleanup(function() {
      if (!browserWindow._destroyed) {
        browserWindow.destroy()
      }
    })
  }

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    return BrowserWindow.fromPanel(threadDictionary[identifier], identifier)
  }

  return undefined
}

BrowserWindow.fromPanel = function(panel, identifier) {
  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (!panel || !panel.contentView) {
    throw new Error('needs to pass an NSPanel')
  }

  var webView = panel.contentView().subviews()[0]

  if (!webView) {
    throw new Error('The NSPanel needs to have a webview')
  }

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  return browserWindow
}

module.exports = BrowserWindow


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments[0])
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/set-delegates.js":
/*!******************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/set-delegates.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(/*! cocoascript-class */ "./node_modules/cocoascript-class/lib/index.js").default
var parseWebArguments = __webpack_require__(/*! ./parseWebArguments */ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js")
var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

// We create one ObjC class for ourselves here
var WindowDelegateClass
var FrameLoadDelegateClass

module.exports = function(browserWindow, panel, webview) {
  if (!WindowDelegateClass) {
    WindowDelegateClass = ObjCClass({
      classname: 'WindowDelegateClass',
      utils: null,

      // Tells the delegate that the window has been resized.
      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      // Tells the delegate that the window has been resized.
      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      // Tells the delegate that the window has been resized.
      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      // Tells the delegate that the window has been resized.
      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      // Tells the delegate that the window has been resized.
      'windowShouldClose:': function() {
        var shouldClose = true
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = false
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  if (!FrameLoadDelegateClass) {
    FrameLoadDelegateClass = ObjCClass({
      classname: 'FrameLoadDelegateClass',
      state: NSMutableDictionary.dictionaryWithDictionary({
        lastQueryId: null,
        wasReady: 0,
      }),
      utils: null,

      // // Called when a client redirect is cancelled.
      // 'webView:didCancelClientRedirectForFrame:': function (
      //   webView,
      //   webFrame
      // ) {},

      // Called when the scroll position within a frame changes.
      'webView:didChangeLocationWithinPageForFrame:': function(webView) {
        this.utils.emit('did-navigate-in-page', [
          {},
          String(
            webView.stringByEvaluatingJavaScriptFromString(
              'window.location.href'
            )
          ),
        ])
      },

      // // Called when the JavaScript window object in a frame is ready for loading.
      // 'webView:didClearWindowObject:forFrame:': function (
      //   webView,
      //   windowObject,
      //   webFrame
      // ) {},

      // // Called when content starts arriving for a page load.
      // 'webView:didCommitLoadforFrame:': function (webView, webFrame) {},

      // // Notifies the delegate that a new JavaScript context has been created.
      // N.B - we intentionally omit the 2nd parameter (javascriptContext)
      // It was causing crashes in Sketch - possibly because of issues with converting
      // it from Objective C to Javascript
      'webView:didCreateJavaScriptContext:forFrame:': function(webView) {
        // any time there is a new js context, set a global value (on window.) to refer
        // to this frameloaddelegate class
        webView.windowScriptObject().setValue_forKey_(this, CONSTANTS.JS_BRIDGE)
      },

      // the normal way to expose a selector to webscript is with 'isSelectorExcludedFromWebScript:'
      // but that didn't work, so this is an alternative. This method gets invoked any time
      // an unknown method is called on this class by webscript
      'invokeUndefinedMethodFromWebScript:withArguments:': function(
        method,
        webArguments
      ) {
        if (String(method) !== 'callNative') {
          return false
        }

        var args = this.utils.parseWebArguments(webArguments)
        if (!args) {
          return false
        }

        this.utils.emit.apply(this, args)
        return true
      },

      // Called when an error occurs loading a committed data source.
      'webView:didFailLoadWithError:forFrame:': function(_, error) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when a page load completes.
      'webView:didFinishLoadForFrame:': function() {
        if (this.state.wasReady == 0) {
          // eslint-disable-line
          this.utils.emitBrowserEvent('ready-to-show')
          this.state.setObject_forKey(1, 'wasReady')
        }
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
        this.utils.emit('dom-ready')
      },

      // Called when a provisional data source for a frame receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalLoadForFrame:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // Called when the page title of a frame loads or changes.
      'webView:didReceiveTitle:forFrame:': function(_, _title) {
        var title = String(_title)
        var shouldChangeTitle = true
        this.utils.emitBrowserEvent(
          'page-title-updated',
          {
            get defaultPrevented() {
              return !shouldChangeTitle
            },
            preventDefault: function() {
              shouldChangeTitle = false
            },
          },
          title
        )

        if (shouldChangeTitle && title) {
          this.utils.setTitle(title)
        }
      },

      // Called when a page load is in progress in a given frame.
      'webView:didStartProvisionalLoadForFrame:': function() {
        this.utils.emit('did-start-loading')
      },

      // Called when a frame will be closed.
      // 'webView:willCloseFrame:': function (webView, webFrame) {}

      // Called when a frame receives a client redirect and before it is fired.
      'webView:willPerformClientRedirectToURL:delay:fireDate:forFrame:': function(
        _,
        url
      ) {
        this.utils.emit('will-navigate', {}, String(url.absoluteString))
      },
    })
  }

  var frameLoadDelegate = FrameLoadDelegateClass.new()
  frameLoadDelegate.utils = NSDictionary.dictionaryWithDictionary({
    setTitle: browserWindow.setTitle.bind(browserWindow),
    emitBrowserEvent: browserWindow.emit.bind(browserWindow),
    emit: browserWindow.webContents.emit.bind(browserWindow.webContents),
    parseWebArguments: parseWebArguments,
  })
  // reset state as well
  frameLoadDelegate.state = NSMutableDictionary.dictionaryWithDictionary({
    lastQueryId: null,
    wasReady: 0,
  })

  webview.setFrameLoadDelegate(frameLoadDelegate)

  var windowDelegate = WindowDelegateClass.new()
  windowDelegate.utils = NSDictionary.dictionaryWithDictionary({
    emit: browserWindow.emit.bind(browserWindow),
  })

  panel.setDelegate(windowDelegate)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/webview-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! @skpm/events */ "./node_modules/@skpm/events/index.js")

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL
  webContents.getURL = webview.mainFrameURL
  webContents.getTitle = webview.mainFrameTitle
  webContents.isDestroyed = function() {
    // TODO:
  }
  webContents.isLoading = function() {
    return webview.loading()
  }
  webContents.stop = webview.stopLoading
  webContents.reload = webview.reload
  webContents.canGoBack = webview.canGoBack
  webContents.canGoForward = webview.canGoForward
  webContents.goBack = webview.goBack
  webContents.goForward = webview.goForward
  webContents.executeJavaScript = function(script) {
    return webview.stringByEvaluatingJavaScriptFromString(script)
  }
  webContents.undo = function() {
    webview.undoManager().undo()
  }
  webContents.redo = function() {
    webview.undoManager().redo()
  }
  webContents.cut = webview.cut
  webContents.copy = webview.copy
  webContents.paste = webview.paste
  webContents.pasteAndMatchStyle = webview.pasteAsRichText
  webContents.delete = webview.delete
  webContents.replace = webview.replaceSelectionWithText
  webContents.getNativeWebview = function() {
    return webview
  }

  browserWindow.webContents = webContents
}


/***/ }),

/***/ "./node_modules/two-product/two-product.js":
/*!*************************************************!*\
  !*** ./node_modules/two-product/two-product.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = twoProduct

var SPLITTER = +(Math.pow(2, 27) + 1.0)

function twoProduct(a, b, result) {
  var x = a * b

  var c = SPLITTER * a
  var abig = c - a
  var ahi = c - abig
  var alo = a - ahi

  var d = SPLITTER * b
  var bbig = d - b
  var bhi = d - bbig
  var blo = b - bhi

  var err1 = x - (ahi * bhi)
  var err2 = err1 - (alo * bhi)
  var err3 = err2 - (ahi * blo)

  var y = alo * blo - err3

  if(result) {
    result[0] = y
    result[1] = x
    return result
  }

  return [ y, x ]
}

/***/ }),

/***/ "./node_modules/two-sum/two-sum.js":
/*!*****************************************!*\
  !*** ./node_modules/two-sum/two-sum.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = fastTwoSum

function fastTwoSum(a, b, result) {
	var x = a + b
	var bv = x - a
	var av = x - bv
	var br = b - bv
	var ar = a - av
	if(result) {
		result[0] = ar + br
		result[1] = x
		return result
	}
	return [ar+br, x]
}

/***/ }),

/***/ "./node_modules/typedarray-pool/pool.js":
/*!**********************************************!*\
  !*** ./node_modules/typedarray-pool/pool.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, Buffer) {

var bits = __webpack_require__(/*! bit-twiddle */ "./node_modules/bit-twiddle/twiddle.js")
var dup = __webpack_require__(/*! dup */ "./node_modules/dup/dup.js")

//Legacy pool support
if(!global.__TYPEDARRAY_POOL) {
  global.__TYPEDARRAY_POOL = {
      UINT8   : dup([32, 0])
    , UINT16  : dup([32, 0])
    , UINT32  : dup([32, 0])
    , INT8    : dup([32, 0])
    , INT16   : dup([32, 0])
    , INT32   : dup([32, 0])
    , FLOAT   : dup([32, 0])
    , DOUBLE  : dup([32, 0])
    , DATA    : dup([32, 0])
    , UINT8C  : dup([32, 0])
    , BUFFER  : dup([32, 0])
  }
}

var hasUint8C = (typeof Uint8ClampedArray) !== 'undefined'
var POOL = global.__TYPEDARRAY_POOL

//Upgrade pool
if(!POOL.UINT8C) {
  POOL.UINT8C = dup([32, 0])
}
if(!POOL.BUFFER) {
  POOL.BUFFER = dup([32, 0])
}

//New technique: Only allocate from ArrayBufferView and Buffer
var DATA    = POOL.DATA
  , BUFFER  = POOL.BUFFER

exports.free = function free(array) {
  if(Buffer.isBuffer(array)) {
    BUFFER[bits.log2(array.length)].push(array)
  } else {
    if(Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
      array = array.buffer
    }
    if(!array) {
      return
    }
    var n = array.length || array.byteLength
    var log_n = bits.log2(n)|0
    DATA[log_n].push(array)
  }
}

function freeArrayBuffer(buffer) {
  if(!buffer) {
    return
  }
  var n = buffer.length || buffer.byteLength
  var log_n = bits.log2(n)
  DATA[log_n].push(buffer)
}

function freeTypedArray(array) {
  freeArrayBuffer(array.buffer)
}

exports.freeUint8 =
exports.freeUint16 =
exports.freeUint32 =
exports.freeInt8 =
exports.freeInt16 =
exports.freeInt32 =
exports.freeFloat32 = 
exports.freeFloat =
exports.freeFloat64 = 
exports.freeDouble = 
exports.freeUint8Clamped = 
exports.freeDataView = freeTypedArray

exports.freeArrayBuffer = freeArrayBuffer

exports.freeBuffer = function freeBuffer(array) {
  BUFFER[bits.log2(array.length)].push(array)
}

exports.malloc = function malloc(n, dtype) {
  if(dtype === undefined || dtype === 'arraybuffer') {
    return mallocArrayBuffer(n)
  } else {
    switch(dtype) {
      case 'uint8':
        return mallocUint8(n)
      case 'uint16':
        return mallocUint16(n)
      case 'uint32':
        return mallocUint32(n)
      case 'int8':
        return mallocInt8(n)
      case 'int16':
        return mallocInt16(n)
      case 'int32':
        return mallocInt32(n)
      case 'float':
      case 'float32':
        return mallocFloat(n)
      case 'double':
      case 'float64':
        return mallocDouble(n)
      case 'uint8_clamped':
        return mallocUint8Clamped(n)
      case 'buffer':
        return mallocBuffer(n)
      case 'data':
      case 'dataview':
        return mallocDataView(n)

      default:
        return null
    }
  }
  return null
}

function mallocArrayBuffer(n) {
  var n = bits.nextPow2(n)
  var log_n = bits.log2(n)
  var d = DATA[log_n]
  if(d.length > 0) {
    return d.pop()
  }
  return new ArrayBuffer(n)
}
exports.mallocArrayBuffer = mallocArrayBuffer

function mallocUint8(n) {
  return new Uint8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocUint8 = mallocUint8

function mallocUint16(n) {
  return new Uint16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocUint16 = mallocUint16

function mallocUint32(n) {
  return new Uint32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocUint32 = mallocUint32

function mallocInt8(n) {
  return new Int8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocInt8 = mallocInt8

function mallocInt16(n) {
  return new Int16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocInt16 = mallocInt16

function mallocInt32(n) {
  return new Int32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocInt32 = mallocInt32

function mallocFloat(n) {
  return new Float32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocFloat32 = exports.mallocFloat = mallocFloat

function mallocDouble(n) {
  return new Float64Array(mallocArrayBuffer(8*n), 0, n)
}
exports.mallocFloat64 = exports.mallocDouble = mallocDouble

function mallocUint8Clamped(n) {
  if(hasUint8C) {
    return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n)
  } else {
    return mallocUint8(n)
  }
}
exports.mallocUint8Clamped = mallocUint8Clamped

function mallocDataView(n) {
  return new DataView(mallocArrayBuffer(n), 0, n)
}
exports.mallocDataView = mallocDataView

function mallocBuffer(n) {
  n = bits.nextPow2(n)
  var log_n = bits.log2(n)
  var cache = BUFFER[log_n]
  if(cache.length > 0) {
    return cache.pop()
  }
  return new Buffer(n)
}
exports.mallocBuffer = mallocBuffer

exports.clearCache = function clearCache() {
  for(var i=0; i<32; ++i) {
    POOL.UINT8[i].length = 0
    POOL.UINT16[i].length = 0
    POOL.UINT32[i].length = 0
    POOL.INT8[i].length = 0
    POOL.INT16[i].length = 0
    POOL.INT32[i].length = 0
    POOL.FLOAT[i].length = 0
    POOL.DOUBLE[i].length = 0
    POOL.UINT8C[i].length = 0
    DATA[i].length = 0
    BUFFER[i].length = 0
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/union-find/index.js":
/*!******************************************!*\
  !*** ./node_modules/union-find/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 "use restrict";

module.exports = UnionFind;

function UnionFind(count) {
  this.roots = new Array(count);
  this.ranks = new Array(count);
  
  for(var i=0; i<count; ++i) {
    this.roots[i] = i;
    this.ranks[i] = 0;
  }
}

var proto = UnionFind.prototype

Object.defineProperty(proto, "length", {
  "get": function() {
    return this.roots.length
  }
})

proto.makeSet = function() {
  var n = this.roots.length;
  this.roots.push(n);
  this.ranks.push(0);
  return n;
}

proto.find = function(x) {
  var x0 = x
  var roots = this.roots;
  while(roots[x] !== x) {
    x = roots[x]
  }
  while(roots[x0] !== x) {
    var y = roots[x0]
    roots[x0] = x
    x0 = y
  }
  return x;
}

proto.link = function(x, y) {
  var xr = this.find(x)
    , yr = this.find(y);
  if(xr === yr) {
    return;
  }
  var ranks = this.ranks
    , roots = this.roots
    , xd    = ranks[xr]
    , yd    = ranks[yr];
  if(xd < yd) {
    roots[xr] = yr;
  } else if(yd < xd) {
    roots[yr] = xr;
  } else {
    roots[yr] = xr;
    ++ranks[xr];
  }
}

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/geometry/Line.js":
/*!******************************!*\
  !*** ./src/geometry/Line.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Line; });
/* harmony import */ var _main_ColorManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/ColorManager */ "./src/main/ColorManager.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



function createLine(p1, p2, thickness, name) {
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(p1.getX(), p1.getY()));
  path.lineToPoint(NSMakePoint(p2.getX(), p2.getY()));
  var shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  var border = shape.style().addStylePartOfType(1);
  border.color = MSColor.colorWithRGBADictionary(_main_ColorManager__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomColor());
  border.thickness = thickness;
  shape.name = name;
  return shape;
}

var Line =
/*#__PURE__*/
function () {
  function Line(p1, p2, thickness, name) {
    _classCallCheck(this, Line);

    this.p1 = p1;
    this.p2 = p2;
    this.thickness = thickness;
    this.name = name;
    this.id = _toConsumableArray(this.p1.toArray()).concat(_toConsumableArray(this.p2.toArray())).sort(function (a, b) {
      return a - b;
    }).reduce(function (acc, num) {
      return "".concat(acc).concat(num);
    }, '');
  }

  _createClass(Line, [{
    key: "setName",
    value: function setName(name) {
      this.name = name;
      return this;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }, {
    key: "getShape",
    value: function getShape() {
      return createLine(this.p1, this.p2, this.thickness, this.name);
    }
  }]);

  return Line;
}();



/***/ }),

/***/ "./src/geometry/Oval.js":
/*!******************************!*\
  !*** ./src/geometry/Oval.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Oval; });
/* harmony import */ var _main_ColorManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/ColorManager */ "./src/main/ColorManager.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



function createOval(centerPoint, radius, name) {
  var ovalShape = MSOvalShape.alloc().init();
  ovalShape.frame = MSRect.rectWithRect(NSMakeRect(centerPoint.getX(), centerPoint.getY(), radius, radius));
  var shapeGroup = MSShapeGroup.shapeWithPath(ovalShape);
  var fill = shapeGroup.style().addStylePartOfType(0);
  fill.color = MSColor.colorWithRGBADictionary(_main_ColorManager__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomColor());
  shapeGroup.name = name || 'Point';
  return shapeGroup;
}

var Oval =
/*#__PURE__*/
function () {
  function Oval(center, radius, name) {
    _classCallCheck(this, Oval);

    this.center = center.clone().addScalar(-radius / 2);
    this.radius = radius;
    this.name = name;
  }

  _createClass(Oval, [{
    key: "getShape",
    value: function getShape() {
      return createOval(this.center, this.radius, this.name);
    }
  }]);

  return Oval;
}();



/***/ }),

/***/ "./src/geometry/Point.js":
/*!*******************************!*\
  !*** ./src/geometry/Point.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point =
/*#__PURE__*/
function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x || 0;
    this.y = y || 0;
  }

  _createClass(Point, [{
    key: "getX",
    value: function getX() {
      return this.x;
    }
  }, {
    key: "getY",
    value: function getY() {
      return this.y;
    }
  }, {
    key: "add",
    value: function add(p) {
      return new Point(this.x + p.x, this.y + p.y);
    }
  }, {
    key: "multScalar",
    value: function multScalar(scalar) {
      return new Point(this.x * scalar, this.y * scalar);
    }
  }, {
    key: "addScalar",
    value: function addScalar(scalar) {
      return new Point(this.x + scalar, this.y + scalar);
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.x, this.y];
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Point(this.x, this.y);
    }
  }]);

  return Point;
}();



/***/ }),

/***/ "./src/geometry/Triangle.js":
/*!**********************************!*\
  !*** ./src/geometry/Triangle.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Triangle; });
/* harmony import */ var _main_ColorManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../main/ColorManager */ "./src/main/ColorManager.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



function createTriangle(p1, p2, p3, name) {
  var path = NSBezierPath.bezierPath();
  path.moveToPoint(NSMakePoint(p1.getX(), p1.getY()));
  path.lineToPoint(NSMakePoint(p2.getX(), p2.getY()));
  path.lineToPoint(NSMakePoint(p3.getX(), p3.getY()));
  path.closePath();
  var shape = MSShapeGroup.shapeWithBezierPath(MSPath.pathWithBezierPath(path));
  shape.name = name; // const border = shape.style().addStylePartOfType(1);
  // border.color = MSColor.colorWithRGBADictionary(getRandomColor());
  // border.thickness = 1;

  var fill = shape.style().addStylePartOfType(0); // `0` constant indicates that we need a `fill` part to be created

  fill.color = MSColor.colorWithRGBADictionary(_main_ColorManager__WEBPACK_IMPORTED_MODULE_0__["default"].getRandomColor());
  return shape;
}

var Triangle =
/*#__PURE__*/
function () {
  function Triangle(p1, p2, p3, name) {
    _classCallCheck(this, Triangle);

    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.name = name;
  }

  _createClass(Triangle, [{
    key: "getShape",
    value: function getShape() {
      return createTriangle(this.p1, this.p2, this.p3, this.name);
    }
  }]);

  return Triangle;
}();



/***/ }),

/***/ "./src/main/ColorManager.js":
/*!**********************************!*\
  !*** ./src/main/ColorManager.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_Color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/Color */ "./src/util/Color.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ColorManager =
/*#__PURE__*/
function () {
  function ColorManager(colors) {
    _classCallCheck(this, ColorManager);

    this.colors = [];
  }

  _createClass(ColorManager, [{
    key: "setFromHexList",
    value: function setFromHexList(hexList) {
      this.colors = hexList.map(_util_Color__WEBPACK_IMPORTED_MODULE_0__["default"].fromHex);
    }
  }, {
    key: "setGenerationMethod",
    value: function setGenerationMethod(generationMethod) {
      this.generationMethod = generationMethod;
    }
  }, {
    key: "getRandomColorIndex",
    value: function getRandomColorIndex() {
      return Math.floor(this.colors.length * Math.random());
    }
  }, {
    key: "generateColorFromContinuousSpace",
    value: function generateColorFromContinuousSpace() {
      if (this.colors.length < 2) {
        return this.colors[0];
      }

      var index1 = this.getRandomColorIndex();
      var index2 = this.getRandomColorIndex();

      while (index1 === index2) {
        index2 = this.getRandomColorIndex();
      }

      return this.colors[index1].interpolateWith(this.colors[index2]);
    }
  }, {
    key: "generateColorFromDiscreteSpace",
    value: function generateColorFromDiscreteSpace() {
      return this.colors[this.getRandomColorIndex()];
    }
  }, {
    key: "getRandomColor",
    value: function getRandomColor() {
      return this.generationMethod === 'continuous' ? this.generateColorFromContinuousSpace() : this.generateColorFromDiscreteSpace();
    }
  }]);

  return ColorManager;
}();

var instance = new ColorManager();
/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./src/main/FieldGenerator.js":
/*!************************************!*\
  !*** ./src/main/FieldGenerator.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _geometry_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/Point */ "./src/geometry/Point.js");
/* harmony import */ var _util_Math__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/Math */ "./src/util/Math.js");
/* harmony import */ var _util_Intersection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/Intersection */ "./src/util/Intersection.js");




function getBounds(points) {
  var dimensions = {
    minX: Number.MAX_VALUE,
    maxX: Number.MIN_VALUE,
    minY: Number.MAX_VALUE,
    maxY: Number.MIN_VALUE
  };
  var fieldDimensions = points.reduce(function (dims, point) {
    var x = point.getX();
    var y = point.getY();

    if (x < dims.minX) {
      dims.minX = x;
    }

    if (x > dims.maxX) {
      dims.maxX = x;
    }

    if (y < dims.minY) {
      dims.minY = y;
    }

    if (y > dims.maxY) {
      dims.maxY = y;
    }

    return dims;
  }, dimensions);
  fieldDimensions.rangeX = fieldDimensions.maxX - fieldDimensions.minX;
  fieldDimensions.rangeY = fieldDimensions.maxY - fieldDimensions.minY;
  return fieldDimensions;
}

function createRandomField(numFieldPoints, edgePoints) {
  var centroid = Object(_util_Math__WEBPACK_IMPORTED_MODULE_1__["getCentroid"])(edgePoints);
  var bounds = getBounds(edgePoints);
  var points = [];

  while (points.length < numFieldPoints) {
    var potentialPoint = new _geometry_Point__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_util_Math__WEBPACK_IMPORTED_MODULE_1__["getRandomNum"])(bounds.rangeX) + bounds.minX, Object(_util_Math__WEBPACK_IMPORTED_MODULE_1__["getRandomNum"])(bounds.rangeY) + bounds.minY);

    if (Object(_util_Intersection__WEBPACK_IMPORTED_MODULE_2__["pointIsInsidePolygon"])(edgePoints, potentialPoint)) {
      points.push(potentialPoint);
    }
  }

  return {
    points: points
  };
}

function createGaussianField(numFieldPoints, edgePoints) {
  var centroid = Object(_util_Math__WEBPACK_IMPORTED_MODULE_1__["getCentroid"])(edgePoints);
  var bounds = getBounds(edgePoints);
  var maxRadius = Math.max(bounds.maxX - centroid.x, centroid.x - bounds.minX, bounds.maxY - centroid.x, centroid.y - bounds.minY);
  var points = [];

  while (points.length < numFieldPoints) {
    var angle = 2 * Math.PI * Math.random();
    var radius = maxRadius * Math.pow(Math.random(), 1.5);
    var potentialPoint = new _geometry_Point__WEBPACK_IMPORTED_MODULE_0__["default"](radius * Math.cos(angle) + centroid.x, radius * Math.sin(angle) + centroid.y);

    if (Object(_util_Intersection__WEBPACK_IMPORTED_MODULE_2__["pointIsInsidePolygon"])(edgePoints, potentialPoint)) {
      points.push(potentialPoint);
    }
  }

  return {
    points: points
  };
}

function createSquareField(numFieldPoints, edgePoints) {
  var bounds = getBounds(edgePoints);
  var numRows = 10;
  var numColumns = 10;
  var xStride = bounds.rangeX / numColumns;
  var yStride = bounds.rangeY / numRows;
  var points = [];

  for (var i = 0; i < numColumns; i++) {
    for (var j = 0; j < numRows; j++) {
      var potentialPoint = new _geometry_Point__WEBPACK_IMPORTED_MODULE_0__["default"](i * xStride + bounds.minX, j * yStride + bounds.minY);

      if (Object(_util_Intersection__WEBPACK_IMPORTED_MODULE_2__["pointIsInsidePolygon"])(edgePoints, potentialPoint)) {
        points.push(potentialPoint);
      }
    }
  }

  return {
    points: points
  };
}

function createRadialField(numFieldPoints, edgePoints) {
  var centroid = Object(_util_Math__WEBPACK_IMPORTED_MODULE_1__["getCentroid"])(edgePoints);
  var bounds = getBounds(edgePoints);
  var maxRadius = Math.max(bounds.maxX - centroid.x, centroid.x - bounds.minX, bounds.maxY - centroid.x, centroid.y - bounds.minY);
  var TWO_PI = 2 * Math.PI;
  var numSectors = 8;
  var numSegments = 5;
  var thetaStride = TWO_PI / numSectors;
  var radiusStride = maxRadius / numSegments;
  var points = [centroid.clone()];

  for (var t = 0; t < numSectors; t++) {
    for (var r = 1; r < numSegments; r++) {
      var theta = t * thetaStride;
      var radius = r * radiusStride;
      var potentialPoint = new _geometry_Point__WEBPACK_IMPORTED_MODULE_0__["default"](radius * Math.cos(theta) + centroid.x, radius * Math.sin(theta) + centroid.y);

      if (Object(_util_Intersection__WEBPACK_IMPORTED_MODULE_2__["pointIsInsidePolygon"])(edgePoints, potentialPoint)) {
        points.push(potentialPoint);
      }
    }
  }

  return {
    points: points
  };
}

var strategy = {
  random: createRandomField,
  parabolic: createGaussianField,
  grid: createSquareField,
  radial: createRadialField
};

function distributionStrategy(key) {
  return strategy[key] || createRandomField;
}

/* harmony default export */ __webpack_exports__["default"] = (distributionStrategy);

/***/ }),

/***/ "./src/main/Init.js":
/*!**************************!*\
  !*** ./src/main/Init.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return init; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TriangleField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TriangleField */ "./src/main/TriangleField.js");



var UI_WIDTH = 684;
var UI_PATH = './ui/index.html';
var GENERATE_FIELD = 'GENERATE_FIELD';
var CLOSE_LOADER = 'closeLoader()';
var WEBVIEW_ID = 'triangle-field-ui';
function init(context) {
  var options = {
    identifier: WEBVIEW_ID,
    width: UI_WIDTH,
    show: false
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_1___default.a(options);

  var closeLoader = function closeLoader() {
    return browserWindow.webContents.executeJavaScript(CLOSE_LOADER);
  };

  browserWindow.webContents.on(GENERATE_FIELD, function (dto) {
    var params;

    try {
      params = JSON.parse(dto);
    } catch (error) {
      console.log('ERROR', error);
      context.document.showMessage('Error, check logs');
      return;
    }

    var selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();

    if (selection.count() < 1) {
      context.document.showMessage('Select a shape!');
      closeLoader();
      return;
    }

    var sketchObject = selection.firstObject();
    var isShape = sketchObject instanceof MSShapeGroup;

    if (!isShape) {
      context.document.showMessage('Selecton must be a shape!');
      closeLoader();
      return;
    }

    var page = NSDocumentController.sharedDocumentController().currentDocument().currentPage();
    Object(_TriangleField__WEBPACK_IMPORTED_MODULE_2__["default"])(page, sketchObject, params);
    closeLoader();
  });
  browserWindow.on('closed', function () {
    return browserWindow = null;
  });
  browserWindow.once('ready-to-show', function () {
    return browserWindow.show();
  });
  browserWindow.loadURL(UI_PATH);
}

/***/ }),

/***/ "./src/main/ShapeExtractor.js":
/*!************************************!*\
  !*** ./src/main/ShapeExtractor.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getPointsFromShape; });
/* harmony import */ var _geometry_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/Point */ "./src/geometry/Point.js");
 // TODO: figure out how to sequence all "pointAtIndex" into this

function getPointsFromShape(shape, numFieldPoints) {
  var absoluteRect = shape.absoluteRect();
  var frame = shape.frame();
  var deltaX = absoluteRect.x() - frame.x();
  var deltaY = absoluteRect.y() - frame.y();
  var path = shape.pathInFrameWithTransforms();
  var numPoints = path.elementCount();
  var bezierPath = NSBezierPath.bezierPathWithPath(path);
  var length = Math.floor(bezierPath.length());
  var stride = length / numFieldPoints;
  return new Array(numFieldPoints).fill(null).map(function (n, i) {
    var length = Math.floor(i * stride);

    var _bezierPath$pointOnPa = bezierPath.pointOnPathAtLength(length),
        x = _bezierPath$pointOnPa.x,
        y = _bezierPath$pointOnPa.y;

    return new _geometry_Point__WEBPACK_IMPORTED_MODULE_0__["default"](deltaX + x, deltaY + y);
  });
}

/***/ }),

/***/ "./src/main/TriangleField.js":
/*!***********************************!*\
  !*** ./src/main/TriangleField.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createTriangleField; });
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch/dom */ "sketch/dom");
/* harmony import */ var sketch_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var cdt2d__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cdt2d */ "./node_modules/cdt2d/cdt2d.js");
/* harmony import */ var cdt2d__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cdt2d__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var clean_pslg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! clean-pslg */ "./node_modules/clean-pslg/clean-pslg.js");
/* harmony import */ var clean_pslg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(clean_pslg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _FieldGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FieldGenerator */ "./src/main/FieldGenerator.js");
/* harmony import */ var _ShapeExtractor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ShapeExtractor */ "./src/main/ShapeExtractor.js");
/* harmony import */ var _geometry_Triangle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../geometry/Triangle */ "./src/geometry/Triangle.js");
/* harmony import */ var _geometry_Oval__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../geometry/Oval */ "./src/geometry/Oval.js");
/* harmony import */ var _geometry_Line__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../geometry/Line */ "./src/geometry/Line.js");
/* harmony import */ var _ColorManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ColorManager */ "./src/main/ColorManager.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










function createTriangleField(page, shape, params) {
  var numEdgePoints = params.numEdgePoints,
      numFieldPoints = params.numFieldPoints,
      renderPoints = params.renderPoints,
      renderLines = params.renderLines,
      renderTriangles = params.renderTriangles,
      distribution = params.distribution,
      lineWidth = params.lineWidth,
      pointRadius = params.pointRadius,
      colors = params.colors,
      colorDistribution = params.colorDistribution;
  var edgePoints = Object(_ShapeExtractor__WEBPACK_IMPORTED_MODULE_4__["default"])(shape, numEdgePoints);
  var distributionFn = Object(_FieldGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(distribution);
  var pointField = distributionFn(numFieldPoints, edgePoints);
  var allPoints = edgePoints.concat(pointField.points);
  var pointArray = allPoints.map(function (point) {
    return point.toArray();
  });
  var edgeIndices = edgePoints.map(function (point, index, arr) {
    return [index, (index + 1) % arr.length];
  });
  clean_pslg__WEBPACK_IMPORTED_MODULE_2___default()(pointArray, edgeIndices);
  var triangleIndices = cdt2d__WEBPACK_IMPORTED_MODULE_1___default()(pointArray, edgeIndices, {
    exterior: false
  });
  var trianglePoints = triangleIndices.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        i0 = _ref2[0],
        i1 = _ref2[1],
        i2 = _ref2[2];

    return {
      p0: allPoints[i0],
      p1: allPoints[i1],
      p2: allPoints[i2]
    };
  });
  var parentGroup = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Group"]({
    parent: page,
    name: 'triangle field'
  });
  _ColorManager__WEBPACK_IMPORTED_MODULE_8__["default"].setFromHexList(colors);
  _ColorManager__WEBPACK_IMPORTED_MODULE_8__["default"].setGenerationMethod(colorDistribution);

  if (renderTriangles) {
    var triangleLayers = trianglePoints.map(function (_ref3, index) {
      var p0 = _ref3.p0,
          p1 = _ref3.p1,
          p2 = _ref3.p2;
      return new _geometry_Triangle__WEBPACK_IMPORTED_MODULE_5__["default"](p0, p1, p2, "Triangle-".concat(index));
    }).map(function (triangle) {
      return triangle.getShape();
    });
    var triangleGroup = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Group"]({
      parent: parentGroup,
      name: 'triangles',
      layers: triangleLayers
    });
    triangleGroup.adjustToFit();
  }

  if (renderLines) {
    var lineLayers = trianglePoints.map(function (_ref4) {
      var p0 = _ref4.p0,
          p1 = _ref4.p1,
          p2 = _ref4.p2;
      var line0 = new _geometry_Line__WEBPACK_IMPORTED_MODULE_7__["default"](p0, p1, lineWidth, '');
      var line1 = new _geometry_Line__WEBPACK_IMPORTED_MODULE_7__["default"](p1, p2, lineWidth, '');
      var line2 = new _geometry_Line__WEBPACK_IMPORTED_MODULE_7__["default"](p2, p0, lineWidth, '');
      return [line0, line1, line2];
    }).reduce(function (uniqueList, triangleLines) {
      triangleLines.forEach(function (line) {
        if (!uniqueList.some(function (_line) {
          return _line.getId() === line.getId();
        })) {
          uniqueList.push(line);
        }
      });
      return uniqueList;
    }, []).map(function (line, index) {
      return line.setName("Line-".concat(index)).getShape();
    });
    var lineGroup = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Group"]({
      parent: parentGroup,
      name: 'lines',
      layers: lineLayers
    });
    lineGroup.adjustToFit();
  }

  if (renderPoints) {
    var pointLayers = allPoints.map(function (p, index) {
      return new _geometry_Oval__WEBPACK_IMPORTED_MODULE_6__["default"](p, pointRadius, "Point-".concat(index));
    }).map(function (oval) {
      return oval.getShape();
    });
    var pointGroup = new sketch_dom__WEBPACK_IMPORTED_MODULE_0__["Group"]({
      parent: parentGroup,
      name: 'points',
      layers: pointLayers
    });
    pointGroup.adjustToFit();
  }

  parentGroup.adjustToFit();
}

/***/ }),

/***/ "./src/util/Color.js":
/*!***************************!*\
  !*** ./src/util/Color.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Color; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// https://en.wikipedia.org/wiki/Smoothstep
function smoothstep(x) {
  return 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
}

function getValueBetweenTwoPoints(y1, y2, percent) {
  var range = y2 - y1;
  return y1 + range * percent;
}

var Color =
/*#__PURE__*/
function () {
  function Color(r, g, b) {
    _classCallCheck(this, Color);

    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 1;
  }

  _createClass(Color, [{
    key: "interpolateWith",
    value: function interpolateWith(color) {
      var percent = smoothstep(Math.random());
      var r = getValueBetweenTwoPoints(this.r, color.r, percent);
      var g = getValueBetweenTwoPoints(this.g, color.g, percent);
      var b = getValueBetweenTwoPoints(this.b, color.b, percent);
      return new Color(r, g, b);
    }
  }], [{
    key: "fromHex",
    value: function fromHex(hexValue) {
      try {
        var r = parseInt(hexValue.substring(0, 2), 16) / 255;
        var g = parseInt(hexValue.substring(2, 4), 16) / 255;
        var b = parseInt(hexValue.substring(4, 6), 16) / 255;
        return new Color(r, g, b);
      } catch (error) {
        console.log('error', error);
        return new Color(1, 0, 0);
      }
    }
  }]);

  return Color;
}();



/***/ }),

/***/ "./src/util/Intersection.js":
/*!**********************************!*\
  !*** ./src/util/Intersection.js ***!
  \**********************************/
/*! exports provided: pointIsInsidePolygon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pointIsInsidePolygon", function() { return pointIsInsidePolygon; });
/* harmony import */ var _geometry_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/Point */ "./src/geometry/Point.js");

var ORIENTATION = {
  COLINEAR: 'COLINEAR',
  CLOCKWISE: 'CLOCKWISE',
  COUNTERCLOCKWISE: 'COUNTERCLOCKWISE'
};

function isOnSegment(p, q, r) {
  return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function getOrientation(p, q, r) {
  var orientation = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

  if (orientation === 0) {
    return ORIENTATION.COLINEAR;
  }

  return orientation > 0 ? ORIENTATION.CLOCKWISE : ORIENTATION.COUNTERCLOCKWISE;
}

function linesDoIntersect(p1, q1, p2, q2) {
  var o1 = getOrientation(p1, q1, p2);
  var o2 = getOrientation(p1, q1, q2);
  var o3 = getOrientation(p2, q2, p1);
  var o4 = getOrientation(p2, q2, q1);

  if (o1 !== o2 && o3 !== o4) {
    return true;
  }

  if (o1 === ORIENTATION.COLINEAR && isOnSegment(p1, p2, q1)) {
    return true;
  }

  if (o2 === ORIENTATION.COLINEAR && isOnSegment(p1, q2, q1)) {
    return true;
  }

  if (o3 === ORIENTATION.COLINEAR && isOnSegment(p2, p1, q2)) {
    return true;
  }

  if (o4 === ORIENTATION.COLINEAR && isOnSegment(p2, q1, q2)) {
    return true;
  }

  return false;
}

function pointIsInsidePolygon(polygon, p) {
  if (polygon.length < 3) {
    throw new Error('Polygon must have at least 3 points');
  }

  var n = polygon.length;
  var extreme = new _geometry_Point__WEBPACK_IMPORTED_MODULE_0__["default"](Number.MAX_VALUE, p.y);
  var count = 0;

  for (var i = 0; i < n; i++) {
    var nextIndex = (i + 1) % n; // p-etreme intersects with polygon[i]-polygon[nextIndex]

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

/***/ }),

/***/ "./src/util/Math.js":
/*!**************************!*\
  !*** ./src/util/Math.js ***!
  \**************************/
/*! exports provided: getRandomNum, getCentroid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomNum", function() { return getRandomNum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCentroid", function() { return getCentroid; });
/* harmony import */ var _geometry_Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geometry/Point */ "./src/geometry/Point.js");


function getPosNeg() {
  return Math.random() < 0.5 ? -1 : 1;
}

function getRandomNum(mult) {
  return mult * Math.random();
}
function getCentroid(points) {
  if (!points || !points.length) {
    return new _geometry_Point__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0);
  }

  var sum = points.reduce(function (s, p) {
    return s.add(p);
  }, new _geometry_Point__WEBPACK_IMPORTED_MODULE_0__["default"](0, 0));
  return sum.multScalar(1 / points.length);
}

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=Init.js.map