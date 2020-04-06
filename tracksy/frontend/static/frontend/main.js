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
/******/ 	return __webpack_require__(__webpack_require__.s = "./tracksy/frontend/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./tracksy/frontend/src/components/App.js":
/*!************************************************!*\
  !*** ./tracksy/frontend/src/components/App.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: /Users/sebastianisaacs/Desktop/tracksy/tracksy/frontend/src/components/App.js: Unexpected token (17:1)\\n\\n\\u001b[0m \\u001b[90m 15 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[32m\\\"./App.css\\\"\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 16 | \\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 17 | \\u001b[39m\\u001b[33m<<\\u001b[39m\\u001b[33m<<\\u001b[39m\\u001b[33m<<\\u001b[39m\\u001b[33m<\\u001b[39m \\u001b[33mHEAD\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    | \\u001b[39m \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 18 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[33mStartupOverview\\u001b[39m from \\u001b[32m\\\"./startups/StartupOverview\\\"\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 19 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[33mBusinessDevelopment\\u001b[39m from \\u001b[32m\\\"./startups/BusinessDevelopment\\\"\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 20 | \\u001b[39m\\u001b[36mimport\\u001b[39m \\u001b[33mFundraising\\u001b[39m from \\u001b[32m\\\"./startups/Fundraising\\\"\\u001b[39m\\u001b[33m;\\u001b[39m\\u001b[0m\\n    at Object._raise (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:742:17)\\n    at Object.raiseWithData (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:735:17)\\n    at Object.raise (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:729:17)\\n    at Object.unexpected (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:8752:16)\\n    at Object.jsxParseIdentifier (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:4388:12)\\n    at Object.jsxParseNamespacedName (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:4398:23)\\n    at Object.jsxParseElementName (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:4409:21)\\n    at Object.jsxParseOpeningElementAt (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:4495:22)\\n    at Object.jsxParseElementAt (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:4528:33)\\n    at Object.jsxParseElement (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:4602:17)\\n    at Object.parseExprAtom (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:4609:19)\\n    at Object.parseExprSubscripts (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:9597:23)\\n    at Object.parseMaybeUnary (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:9577:21)\\n    at Object.parseExprOps (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:9447:23)\\n    at Object.parseMaybeConditional (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:9420:23)\\n    at Object.parseMaybeAssign (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:9375:21)\\n    at Object.parseExpression (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:9327:23)\\n    at Object.parseStatementContent (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:11205:23)\\n    at Object.parseStatement (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:11076:17)\\n    at Object.parseBlockOrModuleBlockBody (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:11650:25)\\n    at Object.parseBlockBody (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:11637:10)\\n    at Object.parseTopLevel (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:11007:10)\\n    at Object.parse (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:12623:10)\\n    at parse (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/parser/lib/index.js:12674:38)\\n    at parser (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/core/lib/parser/index.js:54:34)\\n    at parser.next (<anonymous>)\\n    at normalizeFile (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/core/lib/transformation/normalize-file.js:93:38)\\n    at normalizeFile.next (<anonymous>)\\n    at run (/Users/sebastianisaacs/Desktop/tracksy/node_modules/@babel/core/lib/transformation/index.js:31:50)\\n    at run.next (<anonymous>)\");\n\n//# sourceURL=webpack:///./tracksy/frontend/src/components/App.js?");

/***/ }),

/***/ "./tracksy/frontend/src/index.js":
/*!***************************************!*\
  !*** ./tracksy/frontend/src/index.js ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/App */ \"./tracksy/frontend/src/components/App.js\");\n/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_App__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./tracksy/frontend/src/index.js?");

/***/ })

/******/ });