// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }
  return bundleURL;
}
function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }
  return '/';
}
function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"assets/Butterfly.png":[function(require,module,exports) {
module.exports = "/Butterfly.ef124cfb.png";
},{}],"assets/block_grey.png":[function(require,module,exports) {
module.exports = "/block_grey.24e50b4a.png";
},{}],"assets/block_white.png":[function(require,module,exports) {
module.exports = "/block_white.e3071701.png";
},{}],"assets/flower_blue.png":[function(require,module,exports) {
module.exports = "/flower_blue.f3c2aa35.png";
},{}],"assets/flower_red.png":[function(require,module,exports) {
module.exports = "/flower_red.525bdadf.png";
},{}],"assets/man.png":[function(require,module,exports) {
module.exports = "/man.d245246d.png";
},{}],"assets/wasp.png":[function(require,module,exports) {
module.exports = "/wasp.5290b4dc.png";
},{}],"assets/*.png":[function(require,module,exports) {
module.exports = {
  "Butterfly": require("./Butterfly.png"),
  "block_grey": require("./block_grey.png"),
  "block_white": require("./block_white.png"),
  "flower_blue": require("./flower_blue.png"),
  "flower_red": require("./flower_red.png"),
  "man": require("./man.png"),
  "wasp": require("./wasp.png")
};
},{"./Butterfly.png":"assets/Butterfly.png","./block_grey.png":"assets/block_grey.png","./block_white.png":"assets/block_white.png","./flower_blue.png":"assets/flower_blue.png","./flower_red.png":"assets/flower_red.png","./man.png":"assets/man.png","./wasp.png":"assets/wasp.png"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.css");
var _ = _interopRequireDefault(require("../assets/*.png"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var game;
var numflowers = 0;
var gameOptions = {
  manGravity: 0,
  manSpeed: 150,
  blocksize: 60,
  numBlueFlowers: 5,
  numRedFlowers: 5,
  numBlocks: 50,
  xblocks: 12,
  yblocks: 12
};
window.onload = function () {
  var gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x22b14c,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: gameOptions.blocksize * gameOptions.xblocks,
      height: gameOptions.blocksize * gameOptions.yblocks
    },
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 0
        }
      }
    },
    scene: PlayGame
  };
  game = new Phaser.Game(gameConfig);
  //  xblocks = game.config.width / gameOptions.blocksize;
  //  yblocks = game.config.height / gameOptions.blocksize;
  window.focus();
};
var PlayGame = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(PlayGame, _Phaser$Scene);
  var _super = _createSuper(PlayGame);
  function PlayGame() {
    var _this;
    _classCallCheck(this, PlayGame);
    _this = _super.call(this, "PlayGame");
    _this.score = 0;
    return _this;
  }
  _createClass(PlayGame, [{
    key: "preload",
    value: function preload() {
      this.load.image("block", require("../assets/block_grey.png"));
      this.load.image("flowerBlue", require("../assets/flower_blue.png"));
      this.load.image("flowerRed", require("../assets/flower_red.png"));
      this.load.spritesheet("man", require("../assets/man.png"), {
        frameWidth: 46,
        frameHeight: 46
      });
      this.load.spritesheet("butterfly", require("../assets/Butterfly.png"), {
        frameWidth: 75,
        frameHeight: 75
      });
      this.load.spritesheet("wasp", require("../assets/wasp.png"), {
        frameWidth: 75,
        frameHeight: 75
      });
    }
  }, {
    key: "create",
    value: function create() {
      var flowers = [];
      this.scoreText = this.add.text(game.config.width - gameOptions.blocksize, 0, this.score, {
        fontSize: "34px",
        fill: "#000000"
      });

      //      this.add.image(blocksize/2, blocksize/2, "man")
      this.blockGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      });
      this.blueFlowerGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      });
      this.redFlowerGroup = this.physics.add.group({
        immovable: true,
        allowGravity: false
      });
      var x, y;
      for (var i = 0; i < gameOptions.numBlueFlowers; i++) {
        x = Phaser.Math.Between(1, gameOptions.xblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        y = Phaser.Math.Between(1, gameOptions.yblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        //        console.log("blue: ", i, x, y);
        this.blueFlowerGroup.create(x, y, "flowerBlue");
        flowers[i] = {
          x: x,
          y: y
        };
        numflowers++;
      }
      for (var _i = 0; _i < gameOptions.numRedFlowers; _i++) {
        x = Phaser.Math.Between(1, gameOptions.xblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        y = Phaser.Math.Between(1, gameOptions.yblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        //        console.log("red: ",i, x, y);
        this.redFlowerGroup.create(x, y, "flowerRed");
        flowers[5 + _i] = {
          x: x,
          y: y
        };
        numflowers++;
      }
      for (var _i2 = 0; _i2 < gameOptions.numBlocks; _i2++) {
        x = Phaser.Math.Between(1, gameOptions.xblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        y = Phaser.Math.Between(1, gameOptions.yblocks - 2) * gameOptions.blocksize + gameOptions.blocksize / 2;
        //        console.log("block: ",i);
        var allowed = true;
        for (var j = 0; j < gameOptions.numBlueFlowers + gameOptions.numRedFlowers; j++) {
          if (x == flowers[j].x && y == flowers[j].y) {
            allowed = false;
            console.log("ei käy");
          }
        }
        if (allowed == true) {
          this.blockGroup.create(x, y, "block");
          console.log(x, y);
        }
      }
      this.man = this.physics.add.sprite(gameOptions.blocksize / 2, gameOptions.blocksize / 2, "man");
      //      this.man.body.gravity.y = gameOptions.manGravity;
      this.physics.add.collider(this.man, this.blockGroup);
      this.physics.add.overlap(this.man, this.blueFlowerGroup, this.collectBlueFlower, null, this);
      this.physics.add.overlap(this.man, this.redFlowerGroup, this.collectRedFlower, null, this);
      this.butterfly = this.physics.add.sprite(100, 100, "butterfly");
      this.wasp = this.physics.add.sprite(200, 200, "wasp");
      this.cursors = this.input.keyboard.createCursorKeys();
    }
  }, {
    key: "collectBlueFlower",
    value: function collectBlueFlower(man, flowerBlue) {
      var _this2 = this;
      flowerBlue.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText(this.score);
      numflowers--;
      if (numflowers == 0) {
        this.time.addEvent({
          delay: 2000,
          callback: function callback() {
            _this2.scene.start("PlayGame");
            _this2.score = 0;
            numflowers = 0;
            _this2.flowers = [];
          },
          loop: true
        });
      }
    }
  }, {
    key: "collectRedFlower",
    value: function collectRedFlower(man, flowerRed) {
      var _this3 = this;
      flowerRed.disableBody(true, true);
      this.score += 20;
      this.scoreText.setText(this.score);
      numflowers--;
      if (numflowers == 0) {
        this.time.addEvent({
          delay: 2000,
          callback: function callback() {
            _this3.scene.start("PlayGame");
            _this3.score = 0;
            numflowers = 0;
            _this3.flowers = [];
          },
          loop: true
        });
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.cursors.left.isDown) {
        if (this.man.body.position.x > 0) {
          this.man.body.velocity.x = -gameOptions.manSpeed;
        }
      } else if (this.cursors.right.isDown) {
        this.man.body.velocity.x = gameOptions.manSpeed;
      } else if (this.cursors.up.isDown) {
        this.man.body.velocity.y = -gameOptions.manSpeed;
      } else if (this.cursors.down.isDown) {
        this.man.body.velocity.y = gameOptions.manSpeed;
      } else {
        this.man.body.velocity.x = 0;
        this.man.body.velocity.y = 0;
      }
    }
  }]);
  return PlayGame;
}(Phaser.Scene);
},{"./styles.css":"src/styles.css","../assets/*.png":"assets/*.png","../assets/block_grey.png":"assets/block_grey.png","../assets/flower_blue.png":"assets/flower_blue.png","../assets/flower_red.png":"assets/flower_red.png","../assets/man.png":"assets/man.png","../assets/Butterfly.png":"assets/Butterfly.png","../assets/wasp.png":"assets/wasp.png"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41181" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map