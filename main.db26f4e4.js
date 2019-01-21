/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/qr-packets-demo/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([339,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/*!***********************!*\
  !*** ./src/vue-ts.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(__webpack_require__(/*! vue */ 52));
exports.default = vue_1.default;


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */
/*!**********************************************!*\
  !*** ./src/App.vue?vue&type=script&lang=ts& ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/ts-loader??ref--14-0!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=ts& */ 70);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 70 */
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! ./vue-ts */ 4));
var layouts_1 = __webpack_require__(/*! ./layouts */ 251);
var App = vue_ts_1.default.extend({
    computed: {
        layout: function () {
            return layouts_1.layoutNameToComponent(this.$route.meta.layout || "default");
        }
    }
});
exports.default = App;


/***/ }),
/* 71 */
/*!******************************************************!*\
  !*** ./src/layouts/App.vue?vue&type=script&lang=ts& ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=ts& */ 72);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 72 */
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/App.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var SideMenu_vue_1 = __importDefault(__webpack_require__(/*! ../components/SideMenu.vue */ 344));
exports.default = vue_ts_1.default.extend({
    components: {
        SideMenu: SideMenu_vue_1.default
    }
});


/***/ }),
/* 73 */
/*!**************************************************************!*\
  !*** ./src/components/SideMenu.vue?vue&type=script&lang=ts& ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./SideMenu.vue?vue&type=script&lang=ts& */ 74);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 74 */
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideMenu.vue?vue&type=script&lang=ts& ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var Logo_vue_1 = __importDefault(__webpack_require__(/*! ./Logo.vue */ 252));
var CryptoIcon_vue_1 = __importDefault(__webpack_require__(/*! ./icons/CryptoIcon.vue */ 346));
exports.default = vue_ts_1.default.extend({
    computed: {
        wallets: function () {
            var wallets = this.$store.state.wallets;
            if (!wallets.length && this.currentWallet && this.currentWallet.address)
                return [this.currentWallet];
            return wallets;
        },
        selectedAddress: function () {
            console.log(JSON.stringify(this.currentWallet));
            return this.currentWallet ? this.currentWallet.address : '';
        },
        currentWallet: function () {
            return this.$store.state.currentWallet;
        },
        calcWalletId: function () {
            return this.$store.getters.calcWalletId;
        },
    },
    methods: {
        link: function (w) {
            return {
                name: 'wallet',
                params: {
                    address: w.address,
                    blockchain: w.blockchain,
                },
                query: { chainId: w.chainId }
            };
        },
        isActiveWallet: function (w) {
            if (!this.selectedAddress || !w || !w.address)
                return false;
            return this.selectedAddress.toLowerCase() === w.address.toLowerCase();
        }
    },
    components: {
        Logo: Logo_vue_1.default,
        CryptoIcon: CryptoIcon_vue_1.default,
    }
});


/***/ }),
/* 75 */
/*!**********************************************************!*\
  !*** ./src/components/Logo.vue?vue&type=script&lang=ts& ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./Logo.vue?vue&type=script&lang=ts& */ 76);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 76 */
/*!************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Logo.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({
    props: {
        black: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        hcolor: function () {
            return this.black ? 'rgb(23, 25, 51)' : '#fff';
        }
    }
});


/***/ }),
/* 77 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Logo.vue?vue&type=style&index=0&id=7ad89cba&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 78 */
/*!**********************************************************************!*\
  !*** ./src/components/icons/CryptoIcon.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./CryptoIcon.vue?vue&type=script&lang=ts& */ 79);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 79 */
/*!************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/CryptoIcon.vue?vue&type=script&lang=ts& ***!
  \************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var IconBtc_vue_1 = __importDefault(__webpack_require__(/*! ./IconBtc.vue */ 347));
var IconEos_vue_1 = __importDefault(__webpack_require__(/*! ./IconEos.vue */ 348));
var IconEth_vue_1 = __importDefault(__webpack_require__(/*! ./IconEth.vue */ 349));
var IconNeo_vue_1 = __importDefault(__webpack_require__(/*! ./IconNeo.vue */ 350));
var bbhoc_1 = __webpack_require__(/*! src/pages/blockchain/bbhoc */ 168);
exports.default = bbhoc_1.generate({
    eth: IconEth_vue_1.default,
    btc: IconBtc_vue_1.default,
    eos: IconEos_vue_1.default,
    neo: IconNeo_vue_1.default,
});


/***/ }),
/* 80 */
/*!*******************************************************************!*\
  !*** ./src/components/icons/IconBtc.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./IconBtc.vue?vue&type=script&lang=ts& */ 81);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 81 */
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/IconBtc.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({});


/***/ }),
/* 82 */
/*!*******************************************************************!*\
  !*** ./src/components/icons/IconEos.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./IconEos.vue?vue&type=script&lang=ts& */ 83);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 83 */
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/IconEos.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({});


/***/ }),
/* 84 */
/*!*******************************************************************!*\
  !*** ./src/components/icons/IconEth.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./IconEth.vue?vue&type=script&lang=ts& */ 85);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 85 */
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/IconEth.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({});


/***/ }),
/* 86 */
/*!*******************************************************************!*\
  !*** ./src/components/icons/IconNeo.vue?vue&type=script&lang=ts& ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./IconNeo.vue?vue&type=script&lang=ts& */ 87);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 87 */
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/IconNeo.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({});


/***/ }),
/* 88 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideMenu.vue?vue&type=style&index=0&id=58b7fd7c&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 89 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/App.vue?vue&type=style&index=0&id=99b082d8&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 90 */
/*!********************************************************************!*\
  !*** ./src/components/MainPageHeader.vue?vue&type=script&lang=ts& ***!
  \********************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageHeader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./MainPageHeader.vue?vue&type=script&lang=ts& */ 91);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageHeader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageHeader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageHeader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 91 */
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainPageHeader.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var Logo_vue_1 = __importDefault(__webpack_require__(/*! ./Logo.vue */ 252));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            links: [
                { text: 'Support', href: 'https://github.com/DucaturFw/cold-crypto-web/issues' },
                { text: 'Privacy policy', href: 'https://duxi.io/cold/COLDCRYPTO_PRIVACY_POLICY.pdf' },
                { text: 'Terms of use', href: 'https://duxi.io/cold/COLDCRYPTO_TERMS_OF_USE.pdf' },
            ]
        };
    },
    components: {
        Logo: Logo_vue_1.default,
    }
});


/***/ }),
/* 92 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainPageHeader.vue?vue&type=style&index=0&id=13f97712&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 93 */
/*!********************************************************************!*\
  !*** ./src/components/MainPageFooter.vue?vue&type=script&lang=ts& ***!
  \********************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageFooter_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./MainPageFooter.vue?vue&type=script&lang=ts& */ 94);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageFooter_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageFooter_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageFooter_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 94 */
/*!**********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainPageFooter.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var config_1 = __importDefault(__webpack_require__(/*! src/config */ 169));
exports.default = vue_ts_1.default.extend({
    computed: {
        version: function () {
            return config_1.default.gitVersion;
        },
        commitLink: function () {
            var remoteUrl = config_1.default.gitRemote;
            if (!remoteUrl)
                return '#';
            remoteUrl = remoteUrl.replace('git@github.com:', 'https://github.com/');
            remoteUrl = remoteUrl.replace(/\.git$/, '');
            return remoteUrl + "/commit/" + this.version.split('@')[1];
        }
    }
});


/***/ }),
/* 95 */
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainPageFooter.vue?vue&type=style&index=0&id=793e9b02&lang=scss&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 96 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/Home.vue?vue&type=style&index=0&id=4c062fcc&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 97 */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 98 */
/*!******************************************************!*\
  !*** ./src/pages/Index.vue?vue&type=script&lang=ts& ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=script&lang=ts& */ 99);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 99 */
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Index.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var WhitePopup_vue_1 = __importDefault(__webpack_require__(/*! src/components/WhitePopup.vue */ 170));
var webrtcsingleton_1 = __webpack_require__(/*! src/webrtcsingleton */ 171);
exports.default = vue_ts_1.default.extend({
    beforeMount: function () {
        webrtcsingleton_1.reset(true);
    },
    components: {
        WhitePopup: WhitePopup_vue_1.default,
    }
});


/***/ }),
/* 100 */
/*!****************************************************************!*\
  !*** ./src/components/WhitePopup.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./WhitePopup.vue?vue&type=script&lang=ts& */ 101);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 101 */
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WhitePopup.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(__webpack_require__(/*! vue */ 52));
exports.default = vue_1.default.extend({
    props: {
        header: {
            type: String,
            required: true,
        },
        subheader: {
            type: String,
            required: true,
        },
    }
});


/***/ }),
/* 102 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WhitePopup.vue?vue&type=style&index=0&id=10cb9676&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 103 */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Index.vue?vue&type=style&index=0&id=5cc5c441&lang=scss&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 104 */
/*!******************************************************!*\
  !*** ./src/pages/Login.vue?vue&type=script&lang=ts& ***!
  \******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./Login.vue?vue&type=script&lang=ts& */ 105);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 105 */
/*!********************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Login.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var RemoteCall_vue_1 = __importDefault(__webpack_require__(/*! src/components/RemoteCall.vue */ 253));
var WhitePopup_vue_1 = __importDefault(__webpack_require__(/*! src/components/WhitePopup.vue */ 170));
var config_1 = __importDefault(__webpack_require__(/*! src/config */ 169));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {};
    },
    computed: {
        msgId: function () {
            return this.$store.state.webrtc.outgoingId;
        },
        bcs: function () {
            return JSON.stringify({ blockchains: config_1.default.blockchains });
        }
    },
    methods: {
        onResult: function (wallets) {
            this.$store.commit('setWalletList', { wallets: wallets });
            this.$router.push({ path: "/wallets" });
        }
    },
    components: {
        RemoteCall: RemoteCall_vue_1.default,
        WhitePopup: WhitePopup_vue_1.default,
    }
});


/***/ }),
/* 106 */
/*!****************************************************************!*\
  !*** ./src/components/RemoteCall.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./RemoteCall.vue?vue&type=script&lang=ts& */ 107);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 107 */
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RemoteCall.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var QrExchange_vue_1 = __importDefault(__webpack_require__(/*! ../components/QrExchange.vue */ 362));
var hostproto_1 = __webpack_require__(/*! ../network/hostproto */ 173);
var hostprotocmd_1 = __webpack_require__(/*! ../network/hostprotocmd */ 259);
var webrtcsingleton_1 = __webpack_require__(/*! ../webrtcsingleton */ 171);
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            webrtcConnected: false,
            loadingWebrtc: true,
        };
    },
    props: {
        intro: String,
        qrWidth: {
            type: String,
            default: '60%',
        },
        id: {
            type: [String, Number],
            default: Math.floor(Math.random() * 100000).toString(),
            required: false,
        },
        method: {
            type: String,
            required: true,
        },
        params: {
            type: String,
            required: true,
        },
    },
    mounted: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, webrtcsingleton_1.checkConnection()];
                    case 1:
                        _a.webrtcConnected = _b.sent();
                        this.loadingWebrtc = false;
                        this.callWebrtc();
                        return [2 /*return*/];
                }
            });
        });
    },
    computed: {},
    methods: {
        callWebrtc: function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.webrtcConnected)
                                return [2 /*return*/];
                            return [4 /*yield*/, webrtcsingleton_1.getSingleton().jrpc.callRaw(this.method, JSON.parse(this.params), !webrtcsingleton_1.getSingleton().full)];
                        case 1:
                            result = _a.sent();
                            this.$emit('result', result);
                            return [2 /*return*/];
                    }
                });
            });
        },
        onQr: function (qr) {
            console.log("RemoteCall.onQr(): " + qr);
            var m = hostproto_1.parseHostMessage(qr);
            if (!m || !hostprotocmd_1.isResult(m))
                return;
            if (("" + m.id) == (this.id + "")) {
                this.$emit('result', m.result);
            }
        }
    },
    components: {
        QrExchange: QrExchange_vue_1.default,
    }
});


/***/ }),
/* 108 */
/*!****************************************************************!*\
  !*** ./src/components/QrExchange.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./QrExchange.vue?vue&type=script&lang=ts& */ 109);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 109 */
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrExchange.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var QrGif_vue_1 = __importDefault(__webpack_require__(/*! ./QrGif.vue */ 254));
var QrReader_vue_1 = __importDefault(__webpack_require__(/*! ./QrReader.vue */ 387));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            qrindex: 0,
            timer: 0,
        };
    },
    props: {
        qrWidth: {
            type: String,
            default: '50%',
        },
        qrs: {
            type: Array,
            default: [],
        }
    },
    computed: {
        readerWidth: function () {
            return "calc(100% - " + this.qrWidth + ")";
        }
    },
    methods: {
        onQr: function (qr) {
            console.log("QR!!! " + qr.data, qr);
            this.$emit("qr", qr.data);
        },
    },
    components: {
        Qr: QrGif_vue_1.default,
        QrReader: QrReader_vue_1.default,
    }
});


/***/ }),
/* 110 */
/*!***********************************************************!*\
  !*** ./src/components/QrGif.vue?vue&type=script&lang=ts& ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./QrGif.vue?vue&type=script&lang=ts& */ 111);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 111 */
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrGif.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var QrImage_vue_1 = __importDefault(__webpack_require__(/*! ./QrImage.vue */ 363));
exports.default = vue_ts_1.default.extend({
    components: {
        QrImage: QrImage_vue_1.default
    },
    data: function () {
        return {
            qrindex: 0,
            timer: 0,
        };
    },
    props: {
        qrs: {
            type: Array,
            default: function () { return []; }
        },
        showTimeout: {
            type: Number,
            default: 275
        },
    },
    computed: {
        qrcode: function () {
            return this.qrs[this.qrindex] || "";
        }
    },
    beforeDestroy: function () {
        if (this.timer)
            window.clearInterval(this.timer), this.timer = 0;
    },
    watch: {
        qrs: function () {
            var _this = this;
            this.qrindex = 0;
            if (this.timer)
                window.clearInterval(this.timer), this.timer = 0;
            if (this.qrs.length <= 1)
                return;
            this.timer = window.setInterval(function () { return _this.showNext(); }, this.showTimeout);
        }
    },
    methods: {
        showNext: function () {
            if (!this.qrs.length)
                return;
            this.qrindex = (this.qrindex + 1) % this.qrs.length;
        }
    }
});


/***/ }),
/* 112 */
/*!*************************************************************!*\
  !*** ./src/components/QrImage.vue?vue&type=script&lang=ts& ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./QrImage.vue?vue&type=script&lang=ts& */ 113);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 113 */
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrImage.vue?vue&type=script&lang=ts& ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var qrcode_1 = __importDefault(__webpack_require__(/*! qrcode */ 364));
var App = vue_ts_1.default.extend({
    data: function () {
        return {
            dataUrl: "",
        };
    },
    props: {
        qrcode: String
    },
    mounted: function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.qrcode)
                            return [2 /*return*/];
                        console.log(this.qrcode);
                        _a = this;
                        return [4 /*yield*/, qrcode_1.default.toDataURL(this.qrcode)];
                    case 1:
                        _a.dataUrl = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    watch: {
        qrcode: function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.qrcode)
                                return [2 /*return*/];
                            console.log(this.qrcode);
                            _a = this;
                            return [4 /*yield*/, qrcode_1.default.toDataURL(this.qrcode)];
                        case 1:
                            _a.dataUrl = _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    }
});
exports.default = App;


/***/ }),
/* 114 */
/*!**********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--0-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrImage.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 115 */
/*!**************************************************************!*\
  !*** ./src/components/QrReader.vue?vue&type=script&lang=ts& ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./QrReader.vue?vue&type=script&lang=ts& */ 116);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 116 */
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrReader.vue?vue&type=script&lang=ts& ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var jsqr_1 = __importDefault(__webpack_require__(/*! jsqr */ 388));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            readTimer: 0,
            pollTimeout: 200,
            videoReady: false,
        };
    },
    props: {
        autoplay: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        fakeQrCode: function () {
            var video = this.$refs.video;
            if (video && video.hasAttribute('data-fake-qr'))
                return video.getAttribute('data-fake-qr') || null;
            return null;
        }
    },
    beforeDestroy: function () {
        this.pollQrStop();
        var video = this.$refs.video;
        if (video && video.srcObject) {
            var stream = video.srcObject;
            var tracks = stream.getTracks();
            tracks.forEach(function (x) { return x && x.stop(); });
        }
    },
    mounted: function () {
        if (this.autoplay)
            this.startCamera();
    },
    methods: {
        startCamera: function () {
            return __awaiter(this, void 0, void 0, function () {
                var stream, video;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: true })];
                        case 1:
                            stream = _a.sent();
                            video = this.$refs.video;
                            video.srcObject = stream;
                            video.play();
                            video.addEventListener('canplay', function () {
                                console.log('canplay');
                                _this.pollQr();
                                var w = video.width, h = video.height;
                                _this.$refs.canvas.width = video.width = video.videoWidth;
                                _this.$refs.canvas.height = video.height = video.videoHeight;
                                video.width = w;
                                video.height = h;
                                _this.videoReady = true;
                            });
                            video.style.display = "block";
                            return [2 /*return*/];
                    }
                });
            });
        },
        pollQr: function () {
            var _this = this;
            this.pollQrStop();
            this.readTimer = window.setTimeout(function () { return (_this.readQr(), _this.pollQr()); }, this.pollTimeout);
        },
        pollQrStop: function () {
            if (this.readTimer)
                clearTimeout(this.readTimer), this.readTimer = 0;
        },
        readQr: function () {
            var fakeQr = this.fakeQrCode;
            if (fakeQr)
                return this.$emit("qr", { data: fakeQr });
            var _a = this.$refs, video = _a.video, canvas = _a.canvas;
            var ctx = canvas.getContext("2d");
            if (!ctx)
                return console.error("canvas context not available!");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var qr = jsqr_1.default(data.data, data.width, data.height);
            // console.log(`QrReader.readQr(): ${qr}`)
            if (!qr)
                return;
            this.$emit("qr", qr);
        }
    }
});


/***/ }),
/* 117 */
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrReader.vue?vue&type=style&index=0&id=c0fc5292&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 118 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrExchange.vue?vue&type=style&index=0&id=f364cea6&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 119 */
/*!********************************************************!*\
  !*** ./src/pages/Wallets.vue?vue&type=script&lang=ts& ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./Wallets.vue?vue&type=script&lang=ts& */ 120);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 120 */
/*!**********************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Wallets.vue?vue&type=script&lang=ts& ***!
  \**********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
function unique(arr) {
    var unique = {};
    arr.forEach(function (x) { return unique[x] = 1; });
    return Object.keys(unique);
}
exports.default = vue_ts_1.default.extend({
    beforeMount: function () {
        var _this = this;
        var blockchains = unique(this.wallets.map(function (w) { return w.blockchain; }));
        blockchains.forEach(function (key) { return _this.$store.dispatch('updateTokenPrice', { blockchain: key }); });
    },
    mounted: function () {
        if (this.wallets.length >= 1) {
            var w = this.wallets[0];
            this.$router.replace({ name: 'wallet', params: {
                    address: w.address,
                    blockchain: w.blockchain,
                }, query: { chainId: w.chainId + "" } });
        }
    },
    computed: {
        wallets: function () {
            return this.$store.state.wallets;
        }
    }
});


/***/ }),
/* 121 */
/*!*******************************************************!*\
  !*** ./src/pages/Wallet.vue?vue&type=script&lang=ts& ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./Wallet.vue?vue&type=script&lang=ts& */ 122);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 122 */
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Wallet.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var TxListHoc_vue_1 = __importDefault(__webpack_require__(/*! ./blockchain/TxListHoc.vue */ 393));
var OverlayPopup_vue_1 = __importDefault(__webpack_require__(/*! src/components/popup/OverlayPopup.vue */ 398));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {};
    },
    computed: {
        address: function () {
            return this.wallet.address;
        },
        blockchain: function () {
            return this.wallet.blockchain;
        },
        wallet: function () {
            return this.$store.state.currentWallet;
        },
        networkName: function () {
            return this.$store.getters.currentBlockchain.networkName;
        },
        hasPopup: function () {
            return !!this.$route.meta.popup;
        },
        popupHeader: function () {
            var headers = {
                newtx: "Send " + this.blockchain.toUpperCase(),
                erc20: 'Send tokens',
                pushtx: 'Push TX',
            };
            return headers[this.$route.name] || '';
        },
    },
    methods: {
        closePopup: function () {
            this.$router.push({ name: 'wallet', params: this.$route.params, query: this.$route.query });
        }
    },
    components: {
        TxListHoc: TxListHoc_vue_1.default,
        OverlayPopup: OverlayPopup_vue_1.default,
    },
});


/***/ }),
/* 123 */
/*!*********************************************************************!*\
  !*** ./src/pages/blockchain/TxListHoc.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./TxListHoc.vue?vue&type=script&lang=ts& */ 124);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 124 */
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/TxListHoc.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EthTxList_vue_1 = __importDefault(__webpack_require__(/*! ./EthTxList.vue */ 394));
var EosTxList_vue_1 = __importDefault(__webpack_require__(/*! ./EosTxList.vue */ 396));
var bbhoc_1 = __webpack_require__(/*! ./bbhoc */ 168);
exports.default = bbhoc_1.generate({
    eth: EthTxList_vue_1.default,
    eos: EosTxList_vue_1.default
});


/***/ }),
/* 125 */
/*!*********************************************************************!*\
  !*** ./src/pages/blockchain/EthTxList.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./EthTxList.vue?vue&type=script&lang=ts& */ 126);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 126 */
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EthTxList.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {};
    },
    props: {
        wallet: {
            type: Object,
            required: true,
        }
    },
    computed: {
        txs: function () {
            var txs = this.$store.getters.ethtx_getTxs(this.wallet);
            return txs;
        },
        hasTxs: function () {
            return !!(this.txs && this.txs.length);
        },
        error: function () {
            var e = this.$store.getters.ethtx_hasError(this.wallet);
            return (e instanceof Error) ? e.message : e;
        },
        loading: function () {
            return this.$store.getters.ethtx_isLoading(this.wallet) || !this.$store.getters.ethtx_getTxs(this.wallet);
        }
    },
    watch: {
        wallet: function () {
            this.updateTxs();
        }
    },
    methods: {
        isSelf: function (addr) {
            return addr.toLowerCase() == this.wallet.address.toLowerCase();
        },
        updateTxs: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.$store.dispatch('ethtx_hardUpdateTxs', { wallet: this.wallet });
                    return [2 /*return*/];
                });
            });
        },
    },
    mounted: function () {
        this.updateTxs();
    },
});


/***/ }),
/* 127 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EthTxList.vue?vue&type=style&index=0&id=87930da2&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 128 */
/*!*********************************************************************!*\
  !*** ./src/pages/blockchain/EosTxList.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./EosTxList.vue?vue&type=script&lang=ts& */ 129);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 129 */
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EosTxList.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            txs: [],
            error: '',
            loading: true,
        };
    },
    props: {
        wallet: {
            type: Object,
            required: true,
        }
    },
    computed: {
        eos: function () {
            return this.$store.getters.blockchains.eos(this.wallet.chainId);
        },
    },
    mounted: function () {
        return __awaiter(this, void 0, void 0, function () {
            var txList, unique_1, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.eos.loadTxList(this.wallet)];
                    case 1:
                        txList = _a.sent();
                        unique_1 = {} // TODO: handle duplicate txs
                        ;
                        this.txs = txList.filter(function (x) { return unique_1[x.trx_id] ? false : (unique_1[x.trx_id] = true); }).map(function (x) { return ({
                            hash: x.trx_id,
                            from: x.act.data.from,
                            to: x.act.data.to,
                            amount: x.act.data.quantity,
                            memo: x.act.data.memo,
                        }); });
                        this.loading = false;
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        this.error = (e_1 instanceof Error) ? e_1.message : e_1;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
});


/***/ }),
/* 130 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EosTxList.vue?vue&type=style&index=0&id=645205a4&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 131 */
/*!************************************************************************!*\
  !*** ./src/components/popup/OverlayPopup.vue?vue&type=script&lang=ts& ***!
  \************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./OverlayPopup.vue?vue&type=script&lang=ts& */ 132);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 132 */
/*!**************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/OverlayPopup.vue?vue&type=script&lang=ts& ***!
  \**************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var CloseButton_vue_1 = __importDefault(__webpack_require__(/*! ./CloseButton.vue */ 399));
var GreyOverlay_vue_1 = __importDefault(__webpack_require__(/*! ./GreyOverlay.vue */ 691));
var WhiteRect_vue_1 = __importDefault(__webpack_require__(/*! ./WhiteRect.vue */ 403));
exports.default = vue_ts_1.default.extend({
    props: {
        header: {
            type: String,
            default: ''
        },
        closeHref: {
            type: String,
            default: '.'
        }
    },
    computed: {
        headerState: function () {
            return this.header;
        }
    },
    components: {
        GreyOverlay: GreyOverlay_vue_1.default,
        CloseButton: CloseButton_vue_1.default,
        WhiteRect: WhiteRect_vue_1.default,
    }
});


/***/ }),
/* 133 */
/*!***********************************************************************!*\
  !*** ./src/components/popup/CloseButton.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./CloseButton.vue?vue&type=script&lang=ts& */ 134);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 134 */
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/CloseButton.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var BigX_vue_1 = __importDefault(__webpack_require__(/*! ./BigX.vue */ 692));
exports.default = vue_ts_1.default.extend({
    props: {
        href: {
            type: String,
            default: '#'
        }
    },
    components: {
        BigX: BigX_vue_1.default,
    }
});


/***/ }),
/* 135 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/BigX.vue?vue&type=style&index=0&id=4437afc4&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 136 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/CloseButton.vue?vue&type=style&index=0&id=edb8d842&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 137 */
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/GreyOverlay.vue?vue&type=style&index=0&id=cb375184&lang=scss&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 138 */
/*!*********************************************************************!*\
  !*** ./src/components/popup/WhiteRect.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./WhiteRect.vue?vue&type=script&lang=ts& */ 139);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 139 */
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/WhiteRect.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({
    props: {
        root: {
            type: String,
            default: "div"
        }
    }
});


/***/ }),
/* 140 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/WhiteRect.vue?vue&type=style&index=0&id=4583477e&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 141 */
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/OverlayPopup.vue?vue&type=style&index=0&id=4e44c077&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 142 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Wallet.vue?vue&type=style&index=0&id=7923f42d&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 143 */
/*!***********************************************************************!*\
  !*** ./src/pages/blockchain/TransferHoc.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./TransferHoc.vue?vue&type=script&lang=ts& */ 144);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 144 */
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/TransferHoc.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var EthTransfer_vue_1 = __importDefault(__webpack_require__(/*! ./EthTransfer.vue */ 408));
var EosTransfer_vue_1 = __importDefault(__webpack_require__(/*! ./EosTransfer.vue */ 586));
var bbhoc_1 = __webpack_require__(/*! ./bbhoc */ 168);
exports.default = bbhoc_1.generate({
    eth: EthTransfer_vue_1.default,
    eos: EosTransfer_vue_1.default,
});


/***/ }),
/* 145 */
/*!***********************************************************************!*\
  !*** ./src/pages/blockchain/EthTransfer.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./EthTransfer.vue?vue&type=script&lang=ts& */ 146);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 146 */
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EthTransfer.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var TransferForm_vue_1 = __importDefault(__webpack_require__(/*! src/components/TransferForm.vue */ 174));
var eth = __importStar(__webpack_require__(/*! src/blockchains/eth */ 175));
function validateAddress(addr) {
    if (!addr)
        return false;
    return eth.isValidEthAddress(addr.toLowerCase());
}
function validateNumber(num) {
    if (typeof num !== "number")
        if (typeof num !== "string")
            return false;
    return !isNaN(parseFloat(num.toString()));
}
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            loading: false,
            nonce: NaN,
            form: {
                to: { label: "To:", placeholder: "Address", cy: "form-to", validate: validateAddress },
                amount: { label: "Amount:", placeholder: "0", cy: "form-amount", type: 'number', validate: validateNumber },
                usd: { label: "USD value:", cy: "form-usd", type: 'number' },
                gas: { label: "Gas price:", cy: "form-gas", type: 'number', validate: validateNumber },
            },
            tx: {
                from: '',
                to: '',
                nonce: NaN,
                gasPrice: '',
                value: '',
            },
            inputs: ['to', 'amount', 'usd', 'gas']
        };
    },
    computed: {
        address: function () {
            return this.wallet.address;
        },
        wallet: function () {
            return this.$store.state.currentWallet;
        },
        txJson: function () {
            console.log(this.tx);
            return JSON.stringify({ tx: this.tx, wallet: this.wallet });
        },
        web3: function () {
            return this.$store.getters.blockchains.eth(this.wallet.chainId).web3;
        },
        ethPrice: function () {
            return this.$store.getters.ethPrice;
        },
    },
    mounted: function () {
        var _this = this;
        this.$store.dispatch('updateTokenPrice', { blockchain: 'eth' }).then(function () {
            var amount = parseFloat(_this.$refs.txform.values['amount'] + "");
            if (!isNaN(amount))
                _this.$refs.txform.setValue('usd', amount * _this.$store.getters.ethPrice);
        });
    },
    methods: {
        sign: function (form) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.loading = true;
                            _a = this;
                            return [4 /*yield*/, this.web3.getNonce(this.address)];
                        case 1:
                            _a.nonce = _b.sent();
                            this.tx = {
                                from: this.address,
                                to: form.to,
                                nonce: this.nonce,
                                gasPrice: eth.utils.toWei(form.gas, 'gwei'),
                                value: eth.utils.toWei(form.amount),
                            };
                            this.loading = false;
                            return [2 /*return*/];
                    }
                });
            });
        },
        onFormChange: function (_a) {
            // console.log(`form change! ${field} ${value}`, field, value)
            var field = _a.field, value = _a.value;
            if (!this.ethPrice)
                return; // we can't update when the price is not ready for any reason
            if (field == 'amount') {
                var val = parseFloat(value + "");
                if (!isNaN(val))
                    this.$refs.txform.setValue('usd', val * this.ethPrice);
            }
            if (field == 'usd') {
                var val = parseFloat(value + "");
                if (!isNaN(val))
                    this.$refs.txform.setValue('amount', val / this.ethPrice);
            }
        },
        cancel: function () {
            this.loading = false;
        },
    },
    components: {
        TransferForm: TransferForm_vue_1.default,
    }
});


/***/ }),
/* 147 */
/*!******************************************************************!*\
  !*** ./src/components/TransferForm.vue?vue&type=script&lang=ts& ***!
  \******************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./TransferForm.vue?vue&type=script&lang=ts& */ 148);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 148 */
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/TransferForm.vue?vue&type=script&lang=ts& ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var RemoteSign_vue_1 = __importDefault(__webpack_require__(/*! ./RemoteSign.vue */ 409));
var FormInput_vue_1 = __importDefault(__webpack_require__(/*! ./FormInput.vue */ 411));
var InputLabel_vue_1 = __importDefault(__webpack_require__(/*! ./form/InputLabel.vue */ 260));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            signing: false,
            values: {}
        };
    },
    props: {
        form: {
            type: Object,
            required: true
        },
        inputs: {
            type: Array,
            required: true
        },
        validate: {
            type: Function,
            required: false,
            default: function () { return true; }
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        method: {
            type: String,
            required: false,
            default: 'signTransferTx'
        },
        txJson: {
            type: String,
            required: false
        }
    },
    computed: {
        inputsValid: function () {
            var _this = this;
            return !this.inputs
                .map(function (n) { return (__assign({}, _this.form[n], { value: _this.values[n] })); })
                .map(function (x) { return x.validate ? x.validate(x.value) : true; })
                .some(function (x) { return !x; });
        },
        canSign: function () {
            return this.inputsValid && this.validate();
        },
    },
    methods: {
        onSign: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.signing = true;
                    this.$emit('sign', this.values);
                    return [2 /*return*/];
                });
            });
        },
        onCancel: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.signing = false;
                    this.$emit('cancel');
                    return [2 /*return*/];
                });
            });
        },
        onInput: function (field) {
            this.$emit('change', { field: field, value: this.values[field] });
        },
        setValue: function (field, value) {
            this.values[field] = value;
        },
    },
    components: {
        RemoteSign: RemoteSign_vue_1.default,
        FormInput: FormInput_vue_1.default,
        InputLabel: InputLabel_vue_1.default,
    }
});


/***/ }),
/* 149 */
/*!****************************************************************!*\
  !*** ./src/components/RemoteSign.vue?vue&type=script&lang=ts& ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./RemoteSign.vue?vue&type=script&lang=ts& */ 150);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 150 */
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RemoteSign.vue?vue&type=script&lang=ts& ***!
  \******************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var RemoteCall_vue_1 = __importDefault(__webpack_require__(/*! ./RemoteCall.vue */ 253));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            signing: false,
        };
    },
    props: {
        signCaption: {
            type: String,
            default: 'Sign'
        },
        cancelCaption: {
            type: String,
            default: '\u2190 Back'
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        txJson: {
            type: String,
            required: false
        },
        method: {
            type: String,
            required: true,
        },
        canSign: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        wallet: function () {
            return this.$store.state.currentWallet;
        },
        blockchainId: function () {
            return this.wallet.blockchain;
        },
        blockchain: function () {
            return this.$store.getters.currentBlockchain;
        }
    },
    methods: {
        onButton: function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.signing = true;
                    this.$emit('sign');
                    return [2 /*return*/];
                });
            });
        },
        onCancel: function () {
            this.signing = false;
            this.$emit('cancel');
        },
        onResult: function (signedTx) {
            console.log("signed tx: " + signedTx);
            this.$store.commit('setTxToPush', { tx: signedTx, wallet: this.wallet });
            this.$router.push({ name: "pushtx", params: {
                    blockchain: this.blockchainId,
                    txhash: this.blockchain.getTxHash(signedTx)
                } });
        }
    },
    components: {
        RemoteCall: RemoteCall_vue_1.default
    }
});


/***/ }),
/* 151 */
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RemoteSign.vue?vue&type=style&index=0&id=d6f847b8&lang=scss&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 152 */
/*!***************************************************************!*\
  !*** ./src/components/FormInput.vue?vue&type=script&lang=ts& ***!
  \***************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./FormInput.vue?vue&type=script&lang=ts& */ 153);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 153 */
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormInput.vue?vue&type=script&lang=ts& ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {};
    },
    props: {
        enabled: Boolean,
        value: [String, Number],
        cy: String,
        placeholder: String,
        type: {
            type: String,
            required: false,
            default: "text",
        }
    }
});


/***/ }),
/* 154 */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormInput.vue?vue&type=style&index=0&id=4f39c132&lang=scss&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 155 */
/*!*********************************************************************!*\
  !*** ./src/components/form/InputLabel.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./InputLabel.vue?vue&type=script&lang=ts& */ 156);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 156 */
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/InputLabel.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({});


/***/ }),
/* 157 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/InputLabel.vue?vue&type=style&index=0&id=2ca8cde6&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 158 */
/*!***********************************************************************!*\
  !*** ./src/pages/blockchain/EosTransfer.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./EosTransfer.vue?vue&type=script&lang=ts& */ 159);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 159 */
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EosTransfer.vue?vue&type=script&lang=ts& ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var TransferForm_vue_1 = __importDefault(__webpack_require__(/*! src/components/TransferForm.vue */ 174));
function validateAddress(addr) {
    if (!addr)
        return false;
    // TODO: unit test
    return (addr.length <= 12) && (addr.toLowerCase() == addr) && !addr.match(/[6|7|8|9|0]/);
}
function validateNumber(num) {
    if (typeof num !== "number")
        if (typeof num !== "string")
            return false;
    return !isNaN(parseFloat(num.toString()));
}
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            loading: false,
            txHeaders: null,
            form: {
                to: { label: "To:", cy: "form-to", validate: validateAddress },
                amount: { label: "Amount:", cy: "form-amount", type: 'number', validate: validateNumber },
                usd: { label: "USD value:", cy: "form-usd", type: 'number' },
                memo: { label: "Memo:", cy: "form-memo", type: '' },
            },
            tx: {
                to: '',
                memo: '',
                value: '',
            },
            inputs: ['to', 'amount', 'usd', 'memo']
        };
    },
    computed: {
        address: function () {
            return this.wallet.address;
        },
        wallet: function () {
            return this.$store.state.currentWallet;
        },
        txMemoNotUndef: function () {
            return (typeof this.tx.memo === 'undefined') ? '' : this.tx.memo;
        },
        preparedTx: function () {
            return __assign({}, this.txHeaders, { actions: [
                    {
                        name: "transfer",
                        account: "eosio.token",
                        authorization: [{
                                actor: this.address,
                                permission: "active"
                            }],
                        data: {
                            to: this.tx.to,
                            from: this.address,
                            quantity: this.tx.value,
                            memo: this.txMemoNotUndef,
                        }
                    }
                ] });
        },
        eosMethod: function () {
            return "transfer(from:name,to:name,quantity:asset,memo:string)";
        },
        txJson: function () {
            console.log(this.preparedTx);
            return JSON.stringify({ transaction: this.preparedTx, method: this.eosMethod, wallet: this.wallet });
        },
        eos: function () {
            return this.$store.getters.blockchains.eos(this.wallet.chainId);
        },
        eosPrice: function () {
            return this.$store.getters.eosPrice;
        },
    },
    mounted: function () {
        var _this = this;
        this.$store.dispatch('updateTokenPrice', { blockchain: 'eos' }).then(function () {
            var amount = parseFloat(_this.$refs.txform.values['amount'] + "");
            console.log("EOS updating amount: " + amount + " (" + _this.eosPrice + ")[" + _this.$store.getters.eosPrice + "]", _this.$store.state.tokenPrices);
            if (!isNaN(amount))
                _this.$refs.txform.setValue('usd', amount * _this.eosPrice);
        });
    },
    methods: {
        sign: function (form) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, amount, memo;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.loading = true;
                            _a = this;
                            return [4 /*yield*/, this.eos.getTxHeaders()];
                        case 1:
                            _a.txHeaders = _b.sent();
                            amount = parseFloat(form.amount + "").toFixed(4);
                            memo = (typeof form.memo === 'undefined') ? '' : form.memo;
                            this.tx = {
                                to: form.to,
                                value: amount + " EOS",
                                memo: form.memo
                            };
                            this.loading = false;
                            return [2 /*return*/];
                    }
                });
            });
        },
        onFormChange: function (_a) {
            var field = _a.field, value = _a.value;
            console.log("form change! " + field + "=" + value + " (" + this.eosPrice + ")", field, value);
            if (!this.eosPrice)
                return; // we can't update when the price is not ready for any reason
            if (field == 'amount') {
                var val = parseFloat(value + "");
                if (!isNaN(val))
                    this.$refs.txform.setValue('usd', val * this.eosPrice);
            }
            if (field == 'usd') {
                var val = parseFloat(value + "");
                if (!isNaN(val))
                    this.$refs.txform.setValue('amount', val / this.eosPrice);
            }
        },
        cancel: function () {
            this.loading = false;
        },
    },
    components: {
        TransferForm: TransferForm_vue_1.default,
    }
});


/***/ }),
/* 160 */
/*!*********************************************************************!*\
  !*** ./src/pages/blockchain/EthTokens.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/ts-loader??ref--14-0!../../../node_modules/vue-loader/lib??vue-loader-options!./EthTokens.vue?vue&type=script&lang=ts& */ 161);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 161 */
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EthTokens.vue?vue&type=script&lang=ts& ***!
  \***********************************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var TransferForm_vue_1 = __importDefault(__webpack_require__(/*! src/components/TransferForm.vue */ 174));
var InputLabel_vue_1 = __importDefault(__webpack_require__(/*! src/components/form/InputLabel.vue */ 260));
var eth = __importStar(__webpack_require__(/*! src/blockchains/eth */ 175));
function validateAddress(addr) {
    if (!addr)
        return false;
    return eth.isValidEthAddress(addr.toLowerCase());
}
function validateNumber(num) {
    if (typeof num !== "number")
        if (typeof num !== "string")
            return false;
    return !isNaN(parseFloat(num.toString()));
}
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            loading: false,
            nonce: NaN,
            token: {
                address: '',
                name: '',
                symbol: '',
                decimals: 0,
                loaded: false,
                status: '',
            },
            form: {
                to: { label: "To:", cy: "form-to", validate: validateAddress },
                amount: { label: "Amount:", cy: "form-amount", type: 'number', validate: validateNumber },
                gas: { label: "Gas price:", cy: "form-gas", type: 'number', validate: validateNumber },
            },
            tx: {
                from: '',
                to: '',
                nonce: NaN,
                gasPrice: '',
                gasLimit: '300000',
                value: '',
                data: '',
            },
            abi: {
                method: 'transfer(address,uint256)',
                args: null,
            },
            inputs: ['to', 'amount', 'gas']
        };
    },
    computed: {
        address: function () {
            return this.wallet.address;
        },
        wallet: function () {
            return this.$store.state.currentWallet;
        },
        txJson: function () {
            console.log(this.tx);
            return JSON.stringify({
                abi: this.abi,
                tx: this.tx,
                wallet: this.wallet
            });
        },
        web3: function () {
            return this.$store.getters.blockchains.eth(this.wallet.chainId).web3;
        },
    },
    methods: {
        onTokenAddressChange: function () {
            return __awaiter(this, void 0, void 0, function () {
                var addr, _a, name, symbol, notatoken;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.token.loaded = false;
                            addr = this.token.address;
                            if (!addr || !eth.isValidEthAddress(addr)) {
                                this.token.status = 'incorrect token address';
                                return [2 /*return*/];
                            }
                            this.token.status = 'loading token data...';
                            return [4 /*yield*/, this.web3.getTokenInfo(addr)];
                        case 1:
                            _a = _b.sent(), name = _a.name, symbol = _a.symbol, notatoken = _a.notatoken;
                            if (notatoken) {
                                this.token.status = "ERC20 token is not found on " + addr;
                                return [2 /*return*/];
                            }
                            this.token.name = name;
                            this.token.symbol = symbol;
                            this.token.loaded = true;
                            this.token.status = '';
                            this.$emit('token_loaded', this.token);
                            return [2 /*return*/];
                    }
                });
            });
        },
        sign: function (form) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, addrTo, amount;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.loading = true;
                            _a = this;
                            return [4 /*yield*/, this.web3.getNonce(this.address)];
                        case 1:
                            _a.nonce = _b.sent();
                            addrTo = "000000000000000000000000" + form.to.toLowerCase().replace('0x', '');
                            amount = eth.utils.numberToHex(eth.utils.toBN(eth.utils.toWei(form.amount))).replace('0x', '');
                            amount = '0'.repeat(64 - amount.length) + amount;
                            this.abi.args = ["0x" + addrTo, "0x" + amount];
                            this.tx = {
                                from: this.address,
                                to: this.token.address,
                                nonce: this.nonce,
                                gasPrice: eth.utils.toWei(form.gas, 'gwei'),
                                gasLimit: '300000',
                                value: eth.utils.toWei('0'),
                                data: "0xa9059cbb" + addrTo + amount,
                            };
                            this.loading = false;
                            return [2 /*return*/];
                    }
                });
            });
        },
        onFormChange: function (_a) {
            var field = _a.field, value = _a.value;
        },
        cancel: function () {
            this.loading = false;
        },
    },
    components: {
        TransferForm: TransferForm_vue_1.default,
        InputLabel: InputLabel_vue_1.default,
    }
});


/***/ }),
/* 162 */
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EthTokens.vue?vue&type=style&index=0&id=0da13cfe&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 163 */
/*!*******************************************************!*\
  !*** ./src/pages/PushTx.vue?vue&type=script&lang=ts& ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./PushTx.vue?vue&type=script&lang=ts& */ 164);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 164 */
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PushTx.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            loading: true,
            networkName: '',
            error: undefined,
            resultHash: undefined,
        };
    },
    props: {
        blockchain: {
            type: String,
            required: true,
        },
        txhash: {
            type: String,
            required: true,
        },
    },
    computed: {
        tx: function () {
            return this.$store.state.txToPush;
        },
        shorthash: function () {
            if (this.txhash.length < 30)
                return this.txhash;
            return this.txhash.slice(0, 15) + "..." + this.txhash.slice(this.txhash.length - 15, this.txhash.length);
        }
    },
    mounted: function () {
        return __awaiter(this, void 0, void 0, function () {
            var tx, bc, hash, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tx = this.tx;
                        if (!tx) {
                            this.error = new Error("no transaction to push");
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        bc = this.$store.getters.blockchains[this.blockchain](tx.wallet.chainId);
                        this.networkName = bc.networkName;
                        return [4 /*yield*/, bc.pushTx(tx.tx)];
                    case 2:
                        hash = _a.sent();
                        this.resultHash = hash;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.error = e_1;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
});


/***/ }),
/* 165 */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--1-oneOf-2-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PushTx.vue?vue&type=style&index=0&id=c1079a10&lang=scss&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 166 */
/*!*******************************************************!*\
  !*** ./src/pages/Webrtc.vue?vue&type=script&lang=ts& ***!
  \*******************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/ts-loader??ref--14-0!../../node_modules/vue-loader/lib??vue-loader-options!./Webrtc.vue?vue&type=script&lang=ts& */ 167);
/* harmony import */ var _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_ts_loader_index_js_ref_14_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 167 */
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/ts-loader??ref--14-0!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Webrtc.vue?vue&type=script&lang=ts& ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var QrGif_vue_1 = __importDefault(__webpack_require__(/*! ../components/QrGif.vue */ 254));
var WhitePopup_vue_1 = __importDefault(__webpack_require__(/*! src/components/WhitePopup.vue */ 170));
var webrtcsingleton_1 = __webpack_require__(/*! ../webrtcsingleton */ 171);
var jrpcrtc_1 = __webpack_require__(/*! ../network/jrpcrtc */ 592);
var jrpcfb_1 = __webpack_require__(/*! ../network/jrpcfb */ 593);
var wrtchs_1 = __webpack_require__(/*! ../network/wrtchs */ 594);
exports.default = vue_ts_1.default.extend({
    data: function () {
        return {
            status: 'not started',
            url: "wss://duxi.io/shake",
            sid: '',
        };
    },
    props: {},
    mounted: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.connected) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    },
    computed: {
        forceFallback: function () {
            var wrapper = this.$refs.wrapper;
            if (wrapper && wrapper.hasAttribute('data-force-fallback'))
                return !!wrapper.getAttribute('data-force-fallback');
            return false;
        },
        connected: function () {
            return this.$store.state.webrtc.connected;
        },
        qr: function () {
            if (!this.sid)
                return "";
            return "webrtcLogin|1|" + JSON.stringify({ sid: this.sid, url: this.url });
        }
    },
    watch: {
        connected: function () {
        }
    },
    methods: {
        connect: function () {
            return __awaiter(this, void 0, void 0, function () {
                function fallback() {
                    console.log('falling back?');
                    if (jrpc.connected)
                        return;
                    console.log('FALLING BACK!');
                    wss.rtc.removeAllListeners();
                    wss.rtc.end();
                    var jrpcFallback = new jrpcfb_1.JsonRpcFallback(wss.ws.wsrpc, function (json, cb) {
                        console.log('Webrtc.vue: incoming fallback: ', json);
                    });
                    webrtcsingleton_1.getSingleton().jrpc = jrpcFallback;
                    ready();
                }
                var wss, jrpc, onAnswer, ready;
                var _this = this;
                return __generator(this, function (_a) {
                    this.status = 'connecting to handshake server...';
                    wss = new wrtchs_1.WebrtcHSInitiator(this.url, function (sid) {
                        _this.sid = sid;
                        _this.status = '';
                    }, function (rtc) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            this.status = 'CONNECTED!';
                            console.log('CONNECTED!!!!!');
                            this.$store.dispatch('webrtcConnected');
                            rtc.on('close', function () { return _this.$store.dispatch('webrtcDisconnected'); });
                            rtc.on('error', function () { return _this.$store.dispatch('webrtcDisconnected'); });
                            this.getWalletsOld();
                            return [2 /*return*/];
                        });
                    }); });
                    jrpc = webrtcsingleton_1.getSingleton().jrpc = new jrpcrtc_1.JsonRpcWebRtc(wss.rtc, function (json, cb) { return console.log('Webrtc.vue: incoming: ', json); }, function () { return console.log("Webrtc.vue: connected 2"); });
                    onAnswer = wss.onAnswer;
                    wss.onAnswer = function (answer) {
                        onAnswer.call(wss, answer);
                        var timeout = _this.forceFallback ? 1 : 5000;
                        setTimeout(fallback, timeout);
                    };
                    ready = function () {
                        _this.$store.dispatch('webrtcConnected');
                        _this.getWalletsOld();
                    };
                    return [2 /*return*/];
                });
            });
        },
        getWalletsOld: function () {
            return __awaiter(this, void 0, void 0, function () {
                var wallets;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, webrtcsingleton_1.getSingleton().jrpc.callRaw("getWalletList", { blockchains: ["eth"] }, !webrtcsingleton_1.getSingleton().full)];
                        case 1:
                            wallets = _a.sent();
                            this.$store.commit('setWalletList', { wallets: wallets });
                            this.$router.push({ path: "/wallets" });
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    components: {
        QrGif: QrGif_vue_1.default,
        WhitePopup: WhitePopup_vue_1.default,
    }
});


/***/ }),
/* 168 */
/*!***************************************!*\
  !*** ./src/pages/blockchain/bbhoc.ts ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var bb = vue_ts_1.default.extend({
    props: {
        blockchain: {
            type: String,
            required: true,
        },
        eth: Function,
        eos: Function,
        neo: Function,
        btc: Function,
        pha: Function,
        props: Object,
    },
    computed: {},
    render: function (h) {
        var comp = this[this.blockchain];
        if (!comp)
            return h('div', ["error: no component for blockchain " + this.blockchain + " (" + comp + ")"]);
        // console.log(`BBHOC render with props:`)
        // console.log(this.props)
        return h(comp, { props: this.props });
    }
});
function generate(chains) {
    return vue_ts_1.default.extend({
        props: {
            wallet: {
                type: Object,
                required: false,
            },
            blockchain: {
                type: String,
                required: false,
            }
        },
        render: function (h) {
            var wallet = this.wallet || this.$store.state.currentWallet;
            // console.log(`BBHOC wallet:`)
            // console.log(wallet)
            var blockchain = this.blockchain || (wallet && wallet.blockchain);
            // console.log(blockchain)
            return h(bb, {
                props: __assign({ wallet: wallet,
                    blockchain: blockchain, props: this.$props }, chains)
            });
        },
    });
}
exports.generate = generate;


/***/ }),
/* 169 */
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// webpack env variables
Object.defineProperty(exports, "__esModule", { value: true });
console.log("ROOT_PATH: " + "/qr-packets-demo");
console.assert("Detached: dc6a434388bc42d88a9bf6b1ff74d56b7c58d726@dc6a434388bc42d88a9bf6b1ff74d56b7c58d726", "GIT_VERSION is not defined!");
console.assert("https://github.com/zlumer/qr-packets-demo.git", "GIT_REMOTE is not defined!");
exports.default = {
    blockchains: ["eth"],
    basePath: "/qr-packets-demo",
    gitVersion: "Detached: dc6a434388bc42d88a9bf6b1ff74d56b7c58d726@dc6a434388bc42d88a9bf6b1ff74d56b7c58d726",
    gitRemote: "https://github.com/zlumer/qr-packets-demo.git",
};


/***/ }),
/* 170 */
/*!***************************************!*\
  !*** ./src/components/WhitePopup.vue ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WhitePopup_vue_vue_type_template_id_10cb9676_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhitePopup.vue?vue&type=template&id=10cb9676&scoped=true& */ 226);
/* harmony import */ var _WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhitePopup.vue?vue&type=script&lang=ts& */ 100);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _WhitePopup_vue_vue_type_style_index_0_id_10cb9676_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WhitePopup.vue?vue&type=style&index=0&id=10cb9676&lang=scss&scoped=true& */ 359);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _WhitePopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WhitePopup_vue_vue_type_template_id_10cb9676_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _WhitePopup_vue_vue_type_template_id_10cb9676_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "10cb9676",
  null
  
)

component.options.__file = "WhitePopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 171 */
/*!********************************!*\
  !*** ./src/webrtcsingleton.ts ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var i = 0;
function init(initiator) {
    var servers = [
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: "stun:global.stun:3478?transport=udp"
        },
        {
            urls: 'stun:global.stun.twilio.com:3478?transport=udp'
        },
    ];
    var obj = {
        jrpc: null,
        full: false,
    };
    return obj;
}
exports.init = init;
function checkConnection() {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            // console.log(`### WEBRTC STATUS: ${singleton.connected} ###`)
            if (!singleton.jrpc)
                return [2 /*return*/, false];
            try {
                // await timedPromise(singleton.jrpc.ping(), 5000)
                return [2 /*return*/, true];
            }
            catch (e) {
                return [2 /*return*/, false];
            }
            return [2 /*return*/];
        });
    });
}
exports.checkConnection = checkConnection;
var singleton = init(true);
exports.getSingleton = function () { return singleton; };
function reset(initiator) {
    singleton = init(initiator);
}
exports.reset = reset;


/***/ }),
/* 172 */,
/* 173 */
/*!**********************************!*\
  !*** ./src/network/hostproto.ts ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function parseHostMessage(msg) {
    if (!msg)
        return undefined; // empty message
    if (msg.startsWith('{'))
        return JSON.parse(msg);
    var regex = /^.*|.*|.*$/;
    if (!regex.test(msg))
        return undefined; // not enough data to parse
    var _a = msg.split('|', 3).map(function (x) { return x || ""; }), method = _a[0], _id = _a[1], data = _a[2];
    var prefixLength = method.length + _id.length + data.length + 2;
    if (msg.length > prefixLength)
        data += msg.substr(prefixLength);
    var id = _id.match(/^\d+/) ? parseInt(_id) : _id;
    var params = JSON.parse(data || "[]");
    if (!method)
        return {
            id: id,
            result: params
        };
    return {
        method: method,
        id: id,
        params: params
    };
}
exports.parseHostMessage = parseHostMessage;
function arrayToObj(args, mapping) {
    return args.reduce(function (acc, cur, idx) { return (acc[mapping[idx]] = cur, acc); }, {});
}
exports.arrayToObj = arrayToObj;
function objToArray(args, mapping) {
    return mapping.map(function (name) { return args[name]; });
}
exports.objToArray = objToArray;
function allToObj(msg, mapping) {
    return Array.isArray(msg.params) ? arrayToObj(msg.params, mapping) : msg.params;
}
exports.allToObj = allToObj;
function allToArray(msg, mapping) {
    return Array.isArray(msg.params) ? msg.params : objToArray(msg.params, mapping);
}
exports.allToArray = allToArray;


/***/ }),
/* 174 */
/*!*****************************************!*\
  !*** ./src/components/TransferForm.vue ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TransferForm_vue_vue_type_template_id_234b3d35___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransferForm.vue?vue&type=template&id=234b3d35& */ 231);
/* harmony import */ var _TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TransferForm.vue?vue&type=script&lang=ts& */ 147);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _TransferForm_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TransferForm_vue_vue_type_template_id_234b3d35___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _TransferForm_vue_vue_type_template_id_234b3d35___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "TransferForm.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 175 */
/*!********************************!*\
  !*** ./src/blockchains/eth.ts ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = __webpack_require__(/*! web3 */ 414);
var erc20abi = __webpack_require__(/*! ./erc20abi.json */ 585);
exports.utils = Web3.utils;
function getNetwork(providerUrl) {
    var web3 = new Web3();
    var provider = providerUrl.match(/^wss?\:\/\//) ? new Web3.providers.WebsocketProvider(providerUrl) : new Web3.providers.HttpProvider(providerUrl);
    web3.setProvider(provider);
    return {
        getNonce: function (address) {
            return __awaiter(this, void 0, Promise, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, web3.eth.getTransactionCount(address)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        getTokenInfo: function (address) {
            return __awaiter(this, void 0, Promise, function () {
                var cntr, _a, name, symbol, error_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            cntr = new web3.eth.Contract(erc20abi, address);
                            return [4 /*yield*/, Promise.all([cntr.methods.name().call(), cntr.methods.symbol().call()])];
                        case 1:
                            _a = _b.sent(), name = _a[0], symbol = _a[1];
                            return [2 /*return*/, { name: name, symbol: symbol }];
                        case 2:
                            error_1 = _b.sent();
                            console.log(error_1);
                            return [2 /*return*/, { name: '...', symbol: '...', notatoken: true }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        },
        sendTx: function (tx) {
            return __awaiter(this, void 0, Promise, function () {
                var txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if ("__eth__sendTx" in window) {
                                console.log('FAKING ETH CALL!!!', tx);
                                txHash = window.__eth__sendTx(tx);
                                console.log('tx hash: ', txHash);
                                return [2 /*return*/, Promise.resolve(txHash)];
                            }
                            console.log("[ETH] SENDING TX: " + tx);
                            return [4 /*yield*/, web3.eth.sendSignedTransaction(tx, function (err, transactionHash) {
                                    console.log('transactionHash: ', transactionHash);
                                    if (err)
                                        throw err;
                                    return transactionHash;
                                })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
    };
}
exports.getNetwork = getNetwork;
function getRawTxHash(tx) {
    // TODO: cover with tests
    return exports.utils.sha3(tx);
}
exports.getRawTxHash = getRawTxHash;
function isValidEthAddress(address) {
    return isAddress(address);
}
exports.isValidEthAddress = isValidEthAddress;
/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        // console.log('basic: ', address.length)
        return false;
    }
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        // console.log('small')
        return true;
    }
    else {
        // console.log('checksum')
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};
/**
 * Checks if the given string is a checksummed address
 *
 * @method isChecksumAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isChecksumAddress = function (address) {
    // Check each case
    var addressHash = exports.utils.sha3(address.toLowerCase());
    addressHash = addressHash.replace('0x', '');
    address = address.replace('0x', '');
    // console.log(addressHash)
    // console.log(address)
    for (var i = 0; i < 40; i++) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};


/***/ }),
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */
/*!********************************!*\
  !*** ./src/network/jsonrpc.ts ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hostproto_1 = __webpack_require__(/*! ./hostproto */ 173);
var hostprotocmd_1 = __webpack_require__(/*! ./hostprotocmd */ 259);
function notify(method, params, reduced) {
    if (reduced === void 0) { reduced = false; }
    if (reduced)
        return method + "||" + JSON.stringify(params);
    return jrpcs({
        method: method,
        params: params,
    });
}
exports.notify = notify;
function error(id, error) {
    return jrpcs({
        id: id,
        error: error,
    });
}
exports.error = error;
function result(id, result, reduced) {
    if (reduced === void 0) { reduced = false; }
    if (reduced)
        return "|" + id + "|" + JSON.stringify(result);
    return jrpcs({
        id: id,
        result: result,
    });
}
exports.result = result;
function call(method, id, params, reduced) {
    if (reduced === void 0) { reduced = false; }
    if (reduced)
        return method + "|" + id + "|" + JSON.stringify(params);
    return jrpcs({
        method: method,
        id: id,
        params: params,
    });
}
exports.call = call;
function jrpc(obj) {
    return Object.assign({}, obj, { jsonrpc: "2.0" });
}
exports.jrpc = jrpc;
function jrpcs(obj) {
    return JSON.stringify(jrpc(obj));
}
exports.jrpcs = jrpcs;
var JsonRpc = /** @class */ (function () {
    function JsonRpc(send, onRequest) {
        var _this = this;
        this.lastOutgoingMsgId = 1;
        this.listeners = {};
        this.onMessage = function (data) {
            var json = hostproto_1.parseHostMessage(data);
            console.log(json);
            if (!json)
                return console.error("JsonRpc: error parsing data!\n" + data);
            var id = json.id;
            if (hostprotocmd_1.isMethodCall(json)) {
                // console.log('%%%! 5')
                _this.onRequest(json, function (error, result) {
                    return ( /* console.log('%%%! 6'),
                    console.log(this.send.toString()), */_this.send(JSON.stringify(__assign({ id: id, jsonrpc: '2.0' }, (error ? { error: error } : { result: result })))));
                });
            }
            else if (_this.listeners[id]) {
                var m = _this.listeners[id];
                delete _this.listeners[id];
                if (hostprotocmd_1.isError(json))
                    m(json.error, undefined);
                else
                    m(undefined, json.result);
            }
        };
        this.send = send;
        this.onRequest = onRequest;
    }
    JsonRpc.prototype.ping = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call("ping")];
                    case 1:
                        response = _a.sent();
                        if (response != "pong")
                            throw "JSON-RPC: unknown ping error!";
                        return [2 /*return*/];
                }
            });
        });
    };
    JsonRpc.prototype.callRaw = function (method, args, reduced, _id) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("JSON.RAW: " + method + "(" + JSON.stringify(args) + ")");
                return [2 /*return*/, new Promise(function (res, rej) {
                        var id = _id || _this.getNextMsgId();
                        _this.listeners[id] = function (err, msg) { return err ? rej(err) : res(msg); };
                        console.log("outgoing: " + call(method, id, args, reduced));
                        _this.send(call(method, id, args, reduced));
                    })];
            });
        });
    };
    JsonRpc.prototype.call = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.callRaw(method, args)];
            });
        });
    };
    JsonRpc.prototype.getNextMsgId = function () {
        return this.lastOutgoingMsgId++;
    };
    return JsonRpc;
}());
exports.JsonRpc = JsonRpc;


/***/ }),
/* 194 */
/*!******************************************!*\
  !*** ./src/blockchains/coinmarketcap.ts ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickerIds = {
    eth: '1027',
    eos: '1765',
    pha: '3513',
    btc: '1',
    neo: '1376',
};
function loadTicker(id) {
    return __awaiter(this, void 0, Promise, function () {
        var url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.coinmarketcap.com/v2/ticker/" + id + "/";
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.json()];
            }
        });
    });
}
exports.loadTicker = loadTicker;
function loadPrice(id) {
    return __awaiter(this, void 0, Promise, function () {
        var ticker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, loadTicker(id)];
                case 1:
                    ticker = _a.sent();
                    return [2 /*return*/, ticker.data.quotes.USD.price];
            }
        });
    });
}
exports.loadPrice = loadPrice;


/***/ }),
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */
/*!****************************************************************!*\
  !*** ./src/App.vue?vue&type=template&id=1c518424& + 1 modules ***!
  \****************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=1c518424&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c(_vm.layout,{tag:"component"},[_c('router-view')],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/App.vue?vue&type=template&id=1c518424&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 215 */
/*!************************************************************************************!*\
  !*** ./src/layouts/App.vue?vue&type=template&id=99b082d8&scoped=true& + 1 modules ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/App.vue?vue&type=template&id=99b082d8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-container"},[_c('main',{staticClass:"app-main"},[_vm._t("default")],2),_vm._v(" "),_c('side-menu')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/layouts/App.vue?vue&type=template&id=99b082d8&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 216 */
/*!************************************************************************************!*\
  !*** ./src/pages/Index.vue?vue&type=template&id=5cc5c441&scoped=true& + 1 modules ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Index.vue?vue&type=template&id=5cc5c441&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('white-popup',{attrs:{"header":"Welcome!","subheader":"Sign in to your wallet below"}},[_c('div',{staticClass:"button-container"},[_c('div',{staticClass:"login-button button-left"},[_c('router-link',{attrs:{"to":"/login"}},[_c('button',{staticClass:"button-blue"},[_vm._v("Airgapped login")])])],1),_vm._v(" "),_c('div',{staticClass:"login-button button-right"},[_c('router-link',{attrs:{"to":"/webrtc"}},[_c('button',{staticClass:"button-white"},[_vm._v("Online login")])])],1)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Index.vue?vue&type=template&id=5cc5c441&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 217 */
/*!************************************************************************!*\
  !*** ./src/pages/Login.vue?vue&type=template&id=8ce9aa8e& + 1 modules ***!
  \************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Login.vue?vue&type=template&id=8ce9aa8e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('white-popup',{attrs:{"header":"Airgapped Login","subheader":"Scan QR code with Cold Crypto mobile app to login"}},[_c('remote-call',{attrs:{"intro":"","method":"getWalletList","params":_vm.bcs,"id":2},on:{"result":_vm.onResult}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Login.vue?vue&type=template&id=8ce9aa8e&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 218 */
/*!**************************************************************************!*\
  !*** ./src/pages/Wallets.vue?vue&type=template&id=7ebb8564& + 1 modules ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Wallets.vue?vue&type=template&id=7ebb8564&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.wallets.length)?_c('div',[_vm._v("No wallets found!")]):_vm._e(),_vm._v(" "),_c('ul',_vm._l((_vm.wallets),function(w){return _c('li',{key:w.address},[_c('router-link',{attrs:{"to":{ name: 'wallet', params: {
					address: w.address,
					blockchain: w.blockchain,
				}, query: { chainId: w.chainId } }}},[_vm._v(_vm._s(w.address))])],1)}))])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Wallets.vue?vue&type=template&id=7ebb8564&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 219 */
/*!*************************************************************************************!*\
  !*** ./src/pages/Wallet.vue?vue&type=template&id=7923f42d&scoped=true& + 1 modules ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Wallet.vue?vue&type=template&id=7923f42d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.wallet)?_c('div',[_vm._v("ERROR: NO ACTIVE WALLET! (should never happen)")]):_c('div',{staticClass:"column"},[(_vm.hasPopup)?_c('overlay-popup',{attrs:{"header":_vm.popupHeader},on:{"close":_vm.closePopup}},[_c('router-view')],1):_vm._e(),_vm._v(" "),_c('div',{staticClass:"row"},[_c('div',{staticClass:"column column-buttons"},[_c('router-link',{attrs:{"to":{name:'newtx', query:{ chainId: _vm.wallet.chainId }}}},[_c('button',{staticClass:"blue-button"},[_vm._v("\n\t\t\t\t\tSend "+_vm._s(_vm.blockchain.toUpperCase())+"\n\t\t\t\t")])]),_vm._v(" "),(_vm.blockchain == 'eth')?_c('router-link',{attrs:{"to":{name:'erc20', query:{ chainId: _vm.wallet.chainId }}}},[_c('button',{staticClass:"blue-button"},[_vm._v("\n\t\t\t\t\tTransfer ERC20\n\t\t\t\t")])]):_vm._e()],1),_vm._v(" "),_c('div',{staticClass:"column column-info"},[_c('h1',[_vm._v(_vm._s(_vm.blockchain)+" Wallet")]),_vm._v(" "),_c('h2',[_c('div',{staticClass:"address"},[_vm._v(_vm._s(_vm.address))])]),_vm._v(" "),_c('h3',[_vm._v("\n\t\t\t\tNetwork: "),_c('b',[_vm._v(_vm._s(_vm.networkName))])])])]),_vm._v(" "),_c('div',{staticClass:"hr"}),_vm._v(" "),_c('tx-list-hoc',{attrs:{"wallet":_vm.wallet}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Wallet.vue?vue&type=template&id=7923f42d&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 220 */
/*!***************************************************************************************************!*\
  !*** ./src/pages/blockchain/EthTokens.vue?vue&type=template&id=0da13cfe&scoped=true& + 1 modules ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EthTokens.vue?vue&type=template&id=0da13cfe&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('input-label',[_vm._v("Token contract address:")]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.token.address),expression:"token.address"}],attrs:{"type":"text","data-cy":"form-token"},domProps:{"value":(_vm.token.address)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.token, "address", $event.target.value)},_vm.onTokenAddressChange]}}),_vm._v(" "),(!_vm.token.loaded && _vm.token.status)?_c('div',[_vm._v(_vm._s(_vm.token.status))]):_vm._e(),_vm._v(" "),(_vm.token.loaded)?_c('div',[_vm._v(_vm._s(_vm.token.name)+" ("+_vm._s(_vm.token.symbol)+")")]):_vm._e(),_vm._v(" "),_c('br'),_vm._v(" "),(_vm.token.loaded)?_c('transfer-form',{ref:"txform",attrs:{"form":_vm.form,"inputs":_vm.inputs,"loading":_vm.loading,"tx-json":_vm.txJson,"method":"signContractCall"},on:{"sign":_vm.sign,"cancel":_vm.cancel,"change":_vm.onFormChange}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/blockchain/EthTokens.vue?vue&type=template&id=0da13cfe&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 221 */
/*!*************************************************************************************!*\
  !*** ./src/pages/PushTx.vue?vue&type=template&id=c1079a10&scoped=true& + 1 modules ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/PushTx.vue?vue&type=template&id=c1079a10&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tx-hash-header"},[_vm._v("TX hash: "),_c('code',[_vm._v(_vm._s(_vm.txhash))])]),_vm._v(" "),(_vm.tx)?_c('div',{attrs:{"data-cy":"loading"}},[_vm._v("Pushing "),_c('strong',[_vm._v(_vm._s(_vm.blockchain.toUpperCase()))]),_vm._v(" tx to "),_c('strong',[_vm._v(_vm._s(_vm.networkName))]),_vm._v(" network...")]):_vm._e(),_vm._v(" "),(_vm.error)?_c('div',{staticClass:"error-container",attrs:{"data-cy":"error"}},[_c('div',{staticClass:"error-header"},[_vm._v("Error pushing tx!")]),_vm._v(" "),_c('div',{staticClass:"error-description"},[_c('span',{staticClass:"error-name"},[_vm._v("["+_vm._s(_vm.error.name)+"]")]),_vm._v(" "),_c('span',{staticClass:"error-message"},[_vm._v(_vm._s(_vm.error.message))])]),_vm._v(" "),_c('div',{staticClass:"error-link"},[_vm._v("Try checking if tx is in the blockchain: "),_c('br'),_c('a',{staticClass:"error-link-a",attrs:{"href":""}},[_c('code',[_vm._v(_vm._s(_vm.shorthash))])])])]):_vm._e(),_vm._v(" "),(_vm.resultHash)?_c('span',{attrs:{"data-cy":"result-hash"}},[_vm._v("Success! pushed tx with hash: "+_vm._s(_vm.resultHash))]):_vm._e()])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/PushTx.vue?vue&type=template&id=c1079a10&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 222 */
/*!*************************************************************************!*\
  !*** ./src/pages/Webrtc.vue?vue&type=template&id=00ad6e6a& + 1 modules ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/Webrtc.vue?vue&type=template&id=00ad6e6a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('white-popup',{attrs:{"header":"Online Login","subheader":"Scan QR code with Cold Crypto mobile app to login"}},[(_vm.connected)?_c('h1',[_vm._v("CONNECTED")]):_c('div',{ref:"wrapper",attrs:{"data-cy":"webrtc-force"}},[(_vm.status)?_c('span',[_vm._v(_vm._s(_vm.status))]):_vm._e(),_vm._v(" "),(_vm.sid)?_c('qr-gif',{attrs:{"qrs":[_vm.qr]}}):_vm._e()],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/Webrtc.vue?vue&type=template&id=00ad6e6a&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 223 */
/*!********************************************************************************************!*\
  !*** ./src/components/SideMenu.vue?vue&type=template&id=58b7fd7c&scoped=true& + 1 modules ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/SideMenu.vue?vue&type=template&id=58b7fd7c&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('aside',{staticClass:"side-container"},[_c('logo',{attrs:{"black":true}}),_vm._v(" "),_c('menu',{staticClass:"menu-container"},[_c('div',{staticClass:"link black"},[_vm._v("Wallets")]),_vm._v(" "),_vm._l((_vm.wallets),function(w){return _c('router-link',{key:_vm.calcWalletId(w),staticClass:"link",class:{ blue: _vm.isActiveWallet(w) },attrs:{"tag":"div","to":_vm.link(w)}},[_c(_vm.isActiveWallet(w) ? 'span' : 'a',{tag:"component"},[_c('crypto-icon',{staticClass:"icon",attrs:{"blockchain":w.blockchain}}),_vm._v(" "),_c('span',{staticClass:"address"},[_vm._v(_vm._s(w.address))])],1)],1)})],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/SideMenu.vue?vue&type=template&id=58b7fd7c&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 224 */
/*!**************************************************************************************************!*\
  !*** ./src/components/MainPageHeader.vue?vue&type=template&id=13f97712&scoped=true& + 1 modules ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainPageHeader.vue?vue&type=template&id=13f97712&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',[_c('logo'),_vm._v(" "),_c('div',{staticClass:"top-menu"},_vm._l((_vm.links),function(link){return _c('a',{key:link.text,staticClass:"top-menu-link",attrs:{"href":link.href}},[_vm._v("\n\t\t"+_vm._s(link.text)+"\n\t\t")])}))],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/MainPageHeader.vue?vue&type=template&id=13f97712&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 225 */
/*!**************************************************************************************************!*\
  !*** ./src/components/MainPageFooter.vue?vue&type=template&id=793e9b02&scoped=true& + 1 modules ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/MainPageFooter.vue?vue&type=template&id=793e9b02&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',[_c('div',{staticClass:"copyright"},[_vm._v("\n\t\t© Cold Crypto 2018. All rights reserved. Version:\n\t\t"),_c('span',{staticClass:"version"},[_c('a',{attrs:{"href":_vm.commitLink}},[_c('code',[_vm._v(_vm._s(_vm.version))])])]),_vm._v(" "),_vm._m(0)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"api"},[_vm._v("API by\n\t\t\t"),_c('a',{attrs:{"href":"https://etherscan.io/"}},[_vm._v("Etherscan")]),_vm._v(",\n\t\t\t"),_c('a',{attrs:{"href":"https://coinmarketcap.com/"}},[_vm._v("CoinMarketCap")]),_vm._v(",\n\t\t\t"),_c('a',{attrs:{"href":"https://greymass.com/"}},[_vm._v("Greymass")]),_vm._v(".\n\t\t\tBlockchain nodes by\n\t\t\t"),_c('a',{attrs:{"href":"https://infura.io/"}},[_vm._v("Infura")]),_vm._v(",\n\t\t\t"),_c('a',{attrs:{"href":"https://cryptolions.io/"}},[_vm._v("CryptoLions")]),_vm._v(".\n\t\t")])}]


// CONCATENATED MODULE: ./src/components/MainPageFooter.vue?vue&type=template&id=793e9b02&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 226 */
/*!**********************************************************************************************!*\
  !*** ./src/components/WhitePopup.vue?vue&type=template&id=10cb9676&scoped=true& + 1 modules ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/WhitePopup.vue?vue&type=template&id=10cb9676&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"center-window"},[_c('div',[_c('h2',{staticClass:"header"},[_vm._v(_vm._s(_vm.header))]),_vm._v(" "),_c('h3',{staticClass:"subheader"},[_vm._v(_vm._s(_vm.subheader))]),_vm._v(" "),_c('div',{staticClass:"separator"}),_vm._v(" "),_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/WhitePopup.vue?vue&type=template&id=10cb9676&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 227 */
/*!**********************************************************************************!*\
  !*** ./src/components/RemoteCall.vue?vue&type=template&id=080e4f5e& + 1 modules ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RemoteCall.vue?vue&type=template&id=080e4f5e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.webrtcConnected && !_vm.loadingWebrtc)?_c('qr-exchange',{attrs:{"qrs":[(_vm.method + "|" + _vm.id + "|" + _vm.params)],"intro":_vm.intro,"qr-width":_vm.qrWidth},on:{"qr":_vm.onQr}}):(_vm.loadingWebrtc)?_c('div',[_vm._v("Trying to connect to WebRTC...")]):_c('div',{staticStyle:{"margin-top":"40px"}},[_vm._v("Please proceed on your phone")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/RemoteCall.vue?vue&type=template&id=080e4f5e&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 228 */
/*!*****************************************************************************!*\
  !*** ./src/components/QrGif.vue?vue&type=template&id=075d5a82& + 1 modules ***!
  \*****************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrGif.vue?vue&type=template&id=075d5a82&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('QrImage',{attrs:{"qrcode":_vm.qrcode}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/QrGif.vue?vue&type=template&id=075d5a82&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 229 */
/*!******************************************************************************************************!*\
  !*** ./src/components/popup/OverlayPopup.vue?vue&type=template&id=4e44c077&scoped=true& + 1 modules ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/OverlayPopup.vue?vue&type=template&id=4e44c077&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('grey-overlay',{staticClass:"above-all container"},[_c('div',{staticClass:"modal"},[_c('white-rect',{staticClass:"modal-conten"},[_c('div',{staticClass:"header"},[_c('h1',[_vm._v(_vm._s(_vm.headerState))]),_vm._v(" "),_c('close-button',{attrs:{"href":_vm.closeHref},on:{"click":function($event){_vm.$emit('close')}}})],1),_vm._v(" "),_vm._t("default")],2)],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popup/OverlayPopup.vue?vue&type=template&id=4e44c077&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 230 */
/*!*****************************************************************************************!*\
  !*** ./src/pages/blockchain/EthTransfer.vue?vue&type=template&id=51b73ed6& + 1 modules ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EthTransfer.vue?vue&type=template&id=51b73ed6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transfer-form',{ref:"txform",attrs:{"form":_vm.form,"inputs":_vm.inputs,"loading":_vm.loading,"tx-json":_vm.txJson},on:{"sign":_vm.sign,"cancel":_vm.cancel,"change":_vm.onFormChange}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/blockchain/EthTransfer.vue?vue&type=template&id=51b73ed6&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 231 */
/*!************************************************************************************!*\
  !*** ./src/components/TransferForm.vue?vue&type=template&id=234b3d35& + 1 modules ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/TransferForm.vue?vue&type=template&id=234b3d35&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(!_vm.signing || _vm.loading)?_c('div',_vm._l((_vm.inputs),function(name){return _c('span',{key:name},[_c('input-label',[_vm._v(_vm._s(_vm.form[name].label))]),_vm._v(" "),_c('form-input',{attrs:{"cy":_vm.form[name].cy,"enabled":!_vm.signing,"placeholder":_vm.form[name].placeholder},on:{"input":function($event){_vm.onInput(name)}},model:{value:(_vm.values[name]),callback:function ($$v) {_vm.$set(_vm.values, name, $$v)},expression:"values[name]"}})],1)})):_vm._e(),_vm._v(" "),_c('remote-sign',{attrs:{"loading":_vm.loading,"tx-json":_vm.txJson,"method":_vm.method,"can-sign":_vm.canSign},on:{"sign":_vm.onSign,"cancel":_vm.onCancel}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/TransferForm.vue?vue&type=template&id=234b3d35&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 232 */
/*!***************************************************************************************************!*\
  !*** ./src/components/form/InputLabel.vue?vue&type=template&id=2ca8cde6&scoped=true& + 1 modules ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/form/InputLabel.vue?vue&type=template&id=2ca8cde6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/form/InputLabel.vue?vue&type=template&id=2ca8cde6&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 233 */
/*!*****************************************************************************************!*\
  !*** ./src/pages/blockchain/EosTransfer.vue?vue&type=template&id=0866a0a2& + 1 modules ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EosTransfer.vue?vue&type=template&id=0866a0a2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transfer-form',{ref:"txform",attrs:{"form":_vm.form,"inputs":_vm.inputs,"loading":_vm.loading,"tx-json":_vm.txJson},on:{"sign":_vm.sign,"cancel":_vm.cancel,"change":_vm.onFormChange}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/pages/blockchain/EosTransfer.vue?vue&type=template&id=0866a0a2&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 234 */
/*!****************************************************************************************!*\
  !*** ./src/components/Logo.vue?vue&type=template&id=7ad89cba&scoped=true& + 1 modules ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Logo.vue?vue&type=template&id=7ad89cba&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-link',{staticClass:"logo-link",attrs:{"to":"/"}},[_c('h1',{style:({ color: _vm.hcolor })},[_vm._v("Cold Crypto"),_c('sup',[_vm._v("beta mode")])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Logo.vue?vue&type=template&id=7ad89cba&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 235 */
/*!**********************************************************************************************!*\
  !*** ./src/components/QrExchange.vue?vue&type=template&id=f364cea6&scoped=true& + 1 modules ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrExchange.vue?vue&type=template&id=f364cea6&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{staticClass:"qr",style:({ width: _vm.qrWidth })},[_c('Qr',{attrs:{"qrs":_vm.qrs}})],1),_vm._v(" "),_c('div',{staticClass:"qr-reader",style:({ width: _vm.readerWidth })},[_c('QrReader',{ref:"reader",on:{"qr":_vm.onQr}})],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/QrExchange.vue?vue&type=template&id=f364cea6&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 236 */
/*!*******************************************************************************!*\
  !*** ./src/components/QrImage.vue?vue&type=template&id=3eae33e3& + 1 modules ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrImage.vue?vue&type=template&id=3eae33e3&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('img',{staticClass:"qr-image",attrs:{"src":_vm.dataUrl,"alt":"","data-cy":"qr-image"}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/QrImage.vue?vue&type=template&id=3eae33e3&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 237 */
/*!***************************************************************************************************!*\
  !*** ./src/pages/blockchain/EthTxList.vue?vue&type=template&id=87930da2&scoped=true& + 1 modules ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EthTxList.vue?vue&type=template&id=87930da2&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tx-list-container"},[(_vm.error)?_c('span',{attrs:{"data-cy":"error"}},[_vm._v("ERROR LOADING TRANSACTIONS: "+_vm._s(_vm.error))]):(_vm.loading)?_c('span',{attrs:{"data-cy":"loading"}},[_vm._v("Loading tx list...")]):(!_vm.hasTxs)?_c('span',{attrs:{"data-cy":"tx-list-empty"}},[_vm._v("No transactions on this wallet yet.")]):_c('table',{attrs:{"data-cy":"tx-list"}},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.txs),function(tx){return _c('tr',{key:tx.hash},[_c('td',[_vm._v(_vm._s(new Date(tx.timeStamp * 1000).toLocaleString()))]),_vm._v(" "),_c('td',{staticClass:"short"},[_vm._v(_vm._s(tx.hash))]),_vm._v(" "),_c('td',{staticClass:"short"},[(!_vm.isSelf(tx.from))?_c('span',[_vm._v(_vm._s(tx.from))]):_c('span',{staticClass:"self-tag"},[_vm._v("this wallet")])]),_vm._v(" "),_c('td',{staticClass:"arrow"},[_vm._v(_vm._s("\u2192"))]),_vm._v(" "),_c('td',{staticClass:"short"},[(!_vm.isSelf(tx.to))?_c('span',[_vm._v(_vm._s(tx.to || tx.contractAddress))]):_c('span',{staticClass:"self-tag"},[_vm._v("this wallet")])]),_vm._v(" "),_c('td',[_vm._v(_vm._s((tx.value / 1e18).toFixed(4)))])])}))])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("Date")]),_vm._v(" "),_c('th',[_vm._v("TxHash")]),_vm._v(" "),_c('th',[_vm._v("From")]),_vm._v(" "),_c('th'),_vm._v(" "),_c('th',[_vm._v("To")]),_vm._v(" "),_c('th',[_vm._v("Value")])])])}]


// CONCATENATED MODULE: ./src/pages/blockchain/EthTxList.vue?vue&type=template&id=87930da2&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 238 */
/*!***************************************************************************************************!*\
  !*** ./src/pages/blockchain/EosTxList.vue?vue&type=template&id=645205a4&scoped=true& + 1 modules ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/pages/blockchain/EosTxList.vue?vue&type=template&id=645205a4&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tx-list-container"},[(_vm.error)?_c('span',{attrs:{"data-cy":"error"}},[_vm._v("ERROR LOADING TRANSACTIONS: "+_vm._s(_vm.error))]):(_vm.loading)?_c('span',{attrs:{"data-cy":"loading"}},[_vm._v("Loading tx list...")]):_c('table',{attrs:{"data-cy":"tx-list"}},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.txs),function(tx){return _c('tr',{key:tx.hash},[_c('td',[_vm._v(_vm._s(tx.hash.substr(0, 10) + "..."))]),_vm._v(" "),_c('td',[_c('code',[_vm._v(_vm._s(tx.from))])]),_vm._v(" "),_c('td',[_c('code',[_vm._v(_vm._s(tx.to))])]),_vm._v(" "),_c('td',[_c('code',[_vm._v(_vm._s(tx.amount))])]),_vm._v(" "),_c('td',{staticClass:"td-memo",attrs:{"title":tx.memo}},[_c('code',[_vm._v(_vm._s(tx.memo))])])])}))])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("TxHash")]),_vm._v(" "),_c('th',[_vm._v("From")]),_vm._v(" "),_c('th',[_vm._v("To")]),_vm._v(" "),_c('th',[_vm._v("Amount")]),_vm._v(" "),_c('th',[_vm._v("Memo")])])])}]


// CONCATENATED MODULE: ./src/pages/blockchain/EosTxList.vue?vue&type=template&id=645205a4&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 239 */
/*!*****************************************************************************************************!*\
  !*** ./src/components/popup/CloseButton.vue?vue&type=template&id=edb8d842&scoped=true& + 1 modules ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/CloseButton.vue?vue&type=template&id=edb8d842&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('a',{staticClass:"link",attrs:{"href":_vm.href},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.$emit('click')}}},[_c('big-x')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popup/CloseButton.vue?vue&type=template&id=edb8d842&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 240 */
/*!***************************************************************************************************!*\
  !*** ./src/components/popup/WhiteRect.vue?vue&type=template&id=4583477e&scoped=true& + 1 modules ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/WhiteRect.vue?vue&type=template&id=4583477e&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.root,{tag:"component",staticClass:"white-rect"},[_c('div',{staticClass:"content"},[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popup/WhiteRect.vue?vue&type=template&id=4583477e&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 241 */
/*!**********************************************************************************************!*\
  !*** ./src/components/RemoteSign.vue?vue&type=template&id=d6f847b8&scoped=true& + 1 modules ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RemoteSign.vue?vue&type=template&id=d6f847b8&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.signing && !_vm.loading)?_c('a',{staticClass:"back-link",attrs:{"href":"."},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.onCancel($event)}}},[_vm._v(_vm._s(_vm.cancelCaption))]):_vm._e(),_vm._v(" "),(!_vm.signing || _vm.loading)?_c('button',{staticClass:"blue-button",attrs:{"type":"submit","disabled":_vm.signing || !_vm.canSign},on:{"click":_vm.onButton}},[_vm._v(_vm._s(_vm.signCaption))]):_vm._e(),_vm._v(" "),(_vm.loading)?_c('span',[_vm._v("loading...")]):_vm._e(),_vm._v(" "),(_vm.signing && !_vm.loading)?_c('remote-call',{attrs:{"qr-width":"70%","method":_vm.method,"params":_vm.txJson},on:{"result":_vm.onResult}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/RemoteSign.vue?vue&type=template&id=d6f847b8&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 242 */
/*!*********************************************************************************************!*\
  !*** ./src/components/FormInput.vue?vue&type=template&id=4f39c132&scoped=true& + 1 modules ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormInput.vue?vue&type=template&id=4f39c132&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{attrs:{"type":_vm.type,"data-cy":_vm.cy,"disabled":!_vm.enabled,"placeholder":_vm.placeholder},domProps:{"value":_vm.value},on:{"input":function($event){_vm.$emit('input', $event.target.value)}}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FormInput.vue?vue&type=template&id=4f39c132&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 243 */
/*!*************************************************************************************!*\
  !*** ./src/components/icons/IconBtc.vue?vue&type=template&id=0312d9d6& + 1 modules ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/IconBtc.vue?vue&type=template&id=0312d9d6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"32","height":"32"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"cx":"16","cy":"16","r":"16","fill":"#F7931A"}}),_vm._v(" "),_c('path',{attrs:{"fill":"#FFF","fill-rule":"nonzero","d":"M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/icons/IconBtc.vue?vue&type=template&id=0312d9d6&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 244 */
/*!*************************************************************************************!*\
  !*** ./src/components/icons/IconEos.vue?vue&type=template&id=72a2bf30& + 1 modules ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/IconEos.vue?vue&type=template&id=72a2bf30&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"32","height":"32"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"cx":"16","cy":"16","r":"16","fill":"#000","fill-rule":"nonzero"}}),_vm._v(" "),_c('path',{attrs:{"stroke":"#FFF","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":".64","d":"M10.886 11.61L16 27.667l-7.588-4.754 2.474-11.303L16 4.624v4.9L8.412 22.913h15.183L16.007 9.524v-4.9l5.113 6.986 2.475 11.303-7.588 4.754L21.12 11.61"}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/icons/IconEos.vue?vue&type=template&id=72a2bf30&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 245 */
/*!*************************************************************************************!*\
  !*** ./src/components/icons/IconEth.vue?vue&type=template&id=a817d91e& + 1 modules ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/IconEth.vue?vue&type=template&id=a817d91e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"width":"32","height":"32","viewBox":"0 0 256 417","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","preserveAspectRatio":"xMidYMid"}},[_c('g',[_c('polygon',{attrs:{"fill":"#343434","points":"127.9611 0 125.1661 9.5 125.1661 285.168 127.9611 287.958 255.9231 212.32"}}),_vm._v(" "),_c('polygon',{attrs:{"fill":"#8C8C8C","points":"127.962 0 0 212.32 127.962 287.959 127.962 154.158"}}),_vm._v(" "),_c('polygon',{attrs:{"fill":"#3C3C3B","points":"127.9611 312.1866 126.3861 314.1066 126.3861 412.3056 127.9611 416.9066 255.9991 236.5866"}}),_vm._v(" "),_c('polygon',{attrs:{"fill":"#8C8C8C","points":"127.962 416.9052 127.962 312.1852 0 236.5852"}}),_vm._v(" "),_c('polygon',{attrs:{"fill":"#141414","points":"127.9611 287.9577 255.9211 212.3207 127.9611 154.1587"}}),_vm._v(" "),_c('polygon',{attrs:{"fill":"#393939","points":"0.0009 212.3208 127.9609 287.9578 127.9609 154.1588"}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/icons/IconEth.vue?vue&type=template&id=a817d91e&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 246 */
/*!*************************************************************************************!*\
  !*** ./src/components/icons/IconNeo.vue?vue&type=template&id=06015796& + 1 modules ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/IconNeo.vue?vue&type=template&id=06015796&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","width":"32","height":"32","viewBox":"0 0 32 32"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"cx":"16","cy":"16","r":"16","fill":"#58BF00"}}),_vm._v(" "),_c('path',{attrs:{"fill":"#FFF","fill-rule":"nonzero","d":"M25 22.58l-6.99-3.258v-7.22L25 9.623V22.58zM14.823 26L8 22.821V9.958l6.823 3.18V26zm10.01-16.843l-.113.04-6.71 2.381-.168.06-2.843 1.008-6.73-3.136 9.573-3.396.084-.03.177-.063.062-.021 6.73 3.136-.063.021z"}})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/icons/IconNeo.vue?vue&type=template&id=06015796&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 247 */
/*!********************************************************************************************!*\
  !*** ./src/components/QrReader.vue?vue&type=template&id=c0fc5292&scoped=true& + 1 modules ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/*! exports used: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QrReader.vue?vue&type=template&id=c0fc5292&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('section',{staticClass:"top-conatiner"},[_c('section',{staticClass:"container"},[_c('div',{staticClass:"overlay"}),_vm._v(" "),_c('video',{ref:"video",staticStyle:{"display":"none"},attrs:{"data-cy":"video-video"}},[_vm._v("Camera not available")]),_vm._v(" "),_c('canvas',{ref:"canvas",staticStyle:{"display":"none"}}),_vm._v(" "),(_vm.videoReady)?_c('div',{staticStyle:{"display":"none"},attrs:{"data-cy":"video-ready"}}):_vm._e()])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/QrReader.vue?vue&type=template&id=c0fc5292&scoped=true&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */
/*!******************************!*\
  !*** ./src/layouts/index.ts ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(__webpack_require__(/*! vue */ 52));
var App_vue_1 = __importDefault(__webpack_require__(/*! ./App.vue */ 343));
var Default_vue_1 = __importDefault(__webpack_require__(/*! ./Default.vue */ 689));
var Home_vue_1 = __importDefault(__webpack_require__(/*! ./Home.vue */ 690));
var LAYOUTS = {
    app: App_vue_1.default,
    default: Default_vue_1.default,
    home: Home_vue_1.default,
};
function layoutNameToComponent(name) {
    return name + "-layout";
}
exports.layoutNameToComponent = layoutNameToComponent;
function registerLayouts() {
    var layoutNames = Object.keys(LAYOUTS);
    layoutNames.forEach(function (key) {
        var layout = LAYOUTS[key];
        vue_1.default.component(layoutNameToComponent(key), layout);
    });
}
exports.registerLayouts = registerLayouts;


/***/ }),
/* 252 */
/*!*********************************!*\
  !*** ./src/components/Logo.vue ***!
  \*********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Logo_vue_vue_type_template_id_7ad89cba_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Logo.vue?vue&type=template&id=7ad89cba&scoped=true& */ 234);
/* harmony import */ var _Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Logo.vue?vue&type=script&lang=ts& */ 75);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Logo_vue_vue_type_style_index_0_id_7ad89cba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Logo.vue?vue&type=style&index=0&id=7ad89cba&lang=scss&scoped=true& */ 345);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _Logo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Logo_vue_vue_type_template_id_7ad89cba_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Logo_vue_vue_type_template_id_7ad89cba_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "7ad89cba",
  null
  
)

component.options.__file = "Logo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 253 */
/*!***************************************!*\
  !*** ./src/components/RemoteCall.vue ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RemoteCall_vue_vue_type_template_id_080e4f5e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RemoteCall.vue?vue&type=template&id=080e4f5e& */ 227);
/* harmony import */ var _RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RemoteCall.vue?vue&type=script&lang=ts& */ 106);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _RemoteCall_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RemoteCall_vue_vue_type_template_id_080e4f5e___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _RemoteCall_vue_vue_type_template_id_080e4f5e___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "RemoteCall.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 254 */
/*!**********************************!*\
  !*** ./src/components/QrGif.vue ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QrGif_vue_vue_type_template_id_075d5a82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QrGif.vue?vue&type=template&id=075d5a82& */ 228);
/* harmony import */ var _QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QrGif.vue?vue&type=script&lang=ts& */ 110);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _QrGif_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QrGif_vue_vue_type_template_id_075d5a82___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _QrGif_vue_vue_type_template_id_075d5a82___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "QrGif.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */
/*!*************************************!*\
  !*** ./src/network/hostprotocmd.ts ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isResult(msg) {
    return ("result" in msg);
}
exports.isResult = isResult;
function isMethodCall(msg) {
    return ("method" in msg);
}
exports.isMethodCall = isMethodCall;
function isError(msg) {
    return ("error" in msg);
}
exports.isError = isError;


/***/ }),
/* 260 */
/*!********************************************!*\
  !*** ./src/components/form/InputLabel.vue ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InputLabel_vue_vue_type_template_id_2ca8cde6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InputLabel.vue?vue&type=template&id=2ca8cde6&scoped=true& */ 232);
/* harmony import */ var _InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputLabel.vue?vue&type=script&lang=ts& */ 155);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _InputLabel_vue_vue_type_style_index_0_id_2ca8cde6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InputLabel.vue?vue&type=style&index=0&id=2ca8cde6&lang=scss&scoped=true& */ 413);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _InputLabel_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InputLabel_vue_vue_type_template_id_2ca8cde6_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _InputLabel_vue_vue_type_template_id_2ca8cde6_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "2ca8cde6",
  null
  
)

component.options.__file = "InputLabel.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */
/*!****************************!*\
  !*** ./src/store/utils.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function calcWalletId(wallet) {
    return wallet.blockchain + "/" + wallet.chainId + "/" + wallet.address;
}
exports.calcWalletId = calcWalletId;


/***/ }),
/* 337 */
/*!*******************************************!*\
  !*** ./src/components/MainPageHeader.vue ***!
  \*******************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _MainPageHeader_vue_vue_type_template_id_13f97712_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainPageHeader.vue?vue&type=template&id=13f97712&scoped=true& */ 224);
/* harmony import */ var _MainPageHeader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainPageHeader.vue?vue&type=script&lang=ts& */ 90);
/* harmony import */ var _MainPageHeader_vue_vue_type_style_index_0_id_13f97712_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainPageHeader.vue?vue&type=style&index=0&id=13f97712&lang=scss&scoped=true& */ 353);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _MainPageHeader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MainPageHeader_vue_vue_type_template_id_13f97712_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _MainPageHeader_vue_vue_type_template_id_13f97712_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "13f97712",
  null
  
)

component.options.__file = "MainPageHeader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 338 */
/*!*******************************************!*\
  !*** ./src/components/MainPageFooter.vue ***!
  \*******************************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _MainPageFooter_vue_vue_type_template_id_793e9b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainPageFooter.vue?vue&type=template&id=793e9b02&scoped=true& */ 225);
/* harmony import */ var _MainPageFooter_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MainPageFooter.vue?vue&type=script&lang=ts& */ 93);
/* harmony import */ var _MainPageFooter_vue_vue_type_style_index_0_id_793e9b02_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MainPageFooter.vue?vue&type=style&index=0&id=793e9b02&lang=scss&scoped=true& */ 354);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _MainPageFooter_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MainPageFooter_vue_vue_type_template_id_793e9b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _MainPageFooter_vue_vue_type_template_id_793e9b02_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "793e9b02",
  null
  
)

component.options.__file = "MainPageFooter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 339 */
/*!****************************!*\
  !*** multi ./src/index.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/travis/build/zlumer/qr-packets-demo/src/index.ts */340);


/***/ }),
/* 340 */
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(__webpack_require__(/*! vue */ 52));
var vuex_1 = __importDefault(__webpack_require__(/*! vuex */ 249));
var vue_router_1 = __importDefault(__webpack_require__(/*! vue-router */ 250));
var App_vue_1 = __importDefault(__webpack_require__(/*! ./App.vue */ 342));
var router_1 = __webpack_require__(/*! ./router */ 357);
var store_1 = __webpack_require__(/*! ./store */ 603);
var layouts_1 = __webpack_require__(/*! ./layouts */ 251);
vue_1.default.use(vue_router_1.default);
vue_1.default.use(vuex_1.default);
layouts_1.registerLayouts();
var store = store_1.createStore();
var router = router_1.createRouter(store);
window.vm = new vue_1.default({
    router: router,
    store: store,
    el: '#app',
    render: function (h) { return h(App_vue_1.default); }
});


/***/ }),
/* 341 */,
/* 342 */
/*!*********************!*\
  !*** ./src/App.vue ***!
  \*********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_1c518424___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=1c518424& */ 214);
/* harmony import */ var _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts& */ 69);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&lang=scss& */ 356);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_1c518424___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _App_vue_vue_type_template_id_1c518424___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 343 */
/*!*****************************!*\
  !*** ./src/layouts/App.vue ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_99b082d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=99b082d8&scoped=true& */ 215);
/* harmony import */ var _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=ts& */ 71);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _App_vue_vue_type_style_index_0_id_99b082d8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.vue?vue&type=style&index=0&id=99b082d8&lang=scss&scoped=true& */ 352);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _App_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_99b082d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _App_vue_vue_type_template_id_99b082d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "99b082d8",
  null
  
)

component.options.__file = "App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 344 */
/*!*************************************!*\
  !*** ./src/components/SideMenu.vue ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SideMenu_vue_vue_type_template_id_58b7fd7c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SideMenu.vue?vue&type=template&id=58b7fd7c&scoped=true& */ 223);
/* harmony import */ var _SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SideMenu.vue?vue&type=script&lang=ts& */ 73);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _SideMenu_vue_vue_type_style_index_0_id_58b7fd7c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SideMenu.vue?vue&type=style&index=0&id=58b7fd7c&lang=scss&scoped=true& */ 351);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _SideMenu_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _SideMenu_vue_vue_type_template_id_58b7fd7c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _SideMenu_vue_vue_type_template_id_58b7fd7c_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "58b7fd7c",
  null
  
)

component.options.__file = "SideMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 345 */
/*!*******************************************************************************************!*\
  !*** ./src/components/Logo.vue?vue&type=style&index=0&id=7ad89cba&lang=scss&scoped=true& ***!
  \*******************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_style_index_0_id_7ad89cba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./Logo.vue?vue&type=style&index=0&id=7ad89cba&lang=scss&scoped=true& */ 77);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_style_index_0_id_7ad89cba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_style_index_0_id_7ad89cba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Logo_vue_vue_type_style_index_0_id_7ad89cba_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 346 */
/*!*********************************************!*\
  !*** ./src/components/icons/CryptoIcon.vue ***!
  \*********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CryptoIcon.vue?vue&type=script&lang=ts& */ 78);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(
  _CryptoIcon_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "CryptoIcon.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 347 */
/*!******************************************!*\
  !*** ./src/components/icons/IconBtc.vue ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IconBtc_vue_vue_type_template_id_0312d9d6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IconBtc.vue?vue&type=template&id=0312d9d6& */ 243);
/* harmony import */ var _IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IconBtc.vue?vue&type=script&lang=ts& */ 80);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _IconBtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IconBtc_vue_vue_type_template_id_0312d9d6___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _IconBtc_vue_vue_type_template_id_0312d9d6___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "IconBtc.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 348 */
/*!******************************************!*\
  !*** ./src/components/icons/IconEos.vue ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IconEos_vue_vue_type_template_id_72a2bf30___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IconEos.vue?vue&type=template&id=72a2bf30& */ 244);
/* harmony import */ var _IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IconEos.vue?vue&type=script&lang=ts& */ 82);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _IconEos_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IconEos_vue_vue_type_template_id_72a2bf30___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _IconEos_vue_vue_type_template_id_72a2bf30___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "IconEos.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 349 */
/*!******************************************!*\
  !*** ./src/components/icons/IconEth.vue ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IconEth_vue_vue_type_template_id_a817d91e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IconEth.vue?vue&type=template&id=a817d91e& */ 245);
/* harmony import */ var _IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IconEth.vue?vue&type=script&lang=ts& */ 84);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _IconEth_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IconEth_vue_vue_type_template_id_a817d91e___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _IconEth_vue_vue_type_template_id_a817d91e___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "IconEth.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 350 */
/*!******************************************!*\
  !*** ./src/components/icons/IconNeo.vue ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _IconNeo_vue_vue_type_template_id_06015796___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./IconNeo.vue?vue&type=template&id=06015796& */ 246);
/* harmony import */ var _IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IconNeo.vue?vue&type=script&lang=ts& */ 86);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _IconNeo_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _IconNeo_vue_vue_type_template_id_06015796___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _IconNeo_vue_vue_type_template_id_06015796___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "IconNeo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 351 */
/*!***********************************************************************************************!*\
  !*** ./src/components/SideMenu.vue?vue&type=style&index=0&id=58b7fd7c&lang=scss&scoped=true& ***!
  \***********************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_style_index_0_id_58b7fd7c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./SideMenu.vue?vue&type=style&index=0&id=58b7fd7c&lang=scss&scoped=true& */ 88);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_style_index_0_id_58b7fd7c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_style_index_0_id_58b7fd7c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_SideMenu_vue_vue_type_style_index_0_id_58b7fd7c_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 352 */
/*!***************************************************************************************!*\
  !*** ./src/layouts/App.vue?vue&type=style&index=0&id=99b082d8&lang=scss&scoped=true& ***!
  \***************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_99b082d8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&id=99b082d8&lang=scss&scoped=true& */ 89);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_99b082d8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_99b082d8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_id_99b082d8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 353 */
/*!*****************************************************************************************************!*\
  !*** ./src/components/MainPageHeader.vue?vue&type=style&index=0&id=13f97712&lang=scss&scoped=true& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageHeader_vue_vue_type_style_index_0_id_13f97712_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./MainPageHeader.vue?vue&type=style&index=0&id=13f97712&lang=scss&scoped=true& */ 92);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageHeader_vue_vue_type_style_index_0_id_13f97712_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageHeader_vue_vue_type_style_index_0_id_13f97712_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageHeader_vue_vue_type_style_index_0_id_13f97712_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 354 */
/*!*****************************************************************************************************!*\
  !*** ./src/components/MainPageFooter.vue?vue&type=style&index=0&id=793e9b02&lang=scss&scoped=true& ***!
  \*****************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageFooter_vue_vue_type_style_index_0_id_793e9b02_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./MainPageFooter.vue?vue&type=style&index=0&id=793e9b02&lang=scss&scoped=true& */ 95);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageFooter_vue_vue_type_style_index_0_id_793e9b02_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageFooter_vue_vue_type_style_index_0_id_793e9b02_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_MainPageFooter_vue_vue_type_style_index_0_id_793e9b02_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 355 */
/*!****************************************************************************************!*\
  !*** ./src/layouts/Home.vue?vue&type=style&index=0&id=4c062fcc&lang=scss&scoped=true& ***!
  \****************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_4c062fcc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./Home.vue?vue&type=style&index=0&id=4c062fcc&lang=scss&scoped=true& */ 96);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_4c062fcc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_4c062fcc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_id_4c062fcc_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 356 */
/*!*******************************************************!*\
  !*** ./src/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader??ref--1-oneOf-2-1!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=style&index=0&lang=scss& */ 97);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 357 */
/*!***********************!*\
  !*** ./src/router.ts ***!
  \***********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = __importDefault(__webpack_require__(/*! vue-router */ 250));
var Index_vue_1 = __importDefault(__webpack_require__(/*! ./pages/Index.vue */ 358));
var Login_vue_1 = __importDefault(__webpack_require__(/*! ./pages/Login.vue */ 361));
var Wallets_vue_1 = __importDefault(__webpack_require__(/*! ./pages/Wallets.vue */ 391));
var Wallet_vue_1 = __importDefault(__webpack_require__(/*! ./pages/Wallet.vue */ 392));
var TransferHoc_vue_1 = __importDefault(__webpack_require__(/*! ./pages/blockchain/TransferHoc.vue */ 407));
var EthTokens_vue_1 = __importDefault(__webpack_require__(/*! ./pages/blockchain/EthTokens.vue */ 587));
var PushTx_vue_1 = __importDefault(__webpack_require__(/*! ./pages/PushTx.vue */ 589));
var Webrtc_vue_1 = __importDefault(__webpack_require__(/*! ./pages/Webrtc.vue */ 591));
var config_1 = __importDefault(__webpack_require__(/*! ./config */ 169));
var BASE_PATH = config_1.default.basePath;
function createRouter(store) {
    var updateWallet = function (to, from, next) {
        console.log('updating wallet!', to, from, next);
        var blockchain = to.params.blockchain;
        var address = to.params.address;
        var chainId = (to.query.chainId || "").toString();
        store.commit('setCurrentWallet', { wallet: { blockchain: blockchain, address: address, chainId: chainId } });
        return next();
    };
    var beforeEach = function (to, from, next) {
        if (to.name == 'wallet')
            return updateWallet(to, from, next);
        if (to.matched.some(function (x) { return x.name == 'wallet'; }))
            return updateWallet(to, from, next);
        return next();
    };
    function metaLayout(layout) {
        return { layout: layout };
    }
    var router = new vue_router_1.default(__assign({}, (BASE_PATH ? { base: BASE_PATH } : {}), { mode: 'history', routes: [
            { path: '/', component: Index_vue_1.default, meta: metaLayout('home') },
            { path: '/login', component: Login_vue_1.default, meta: metaLayout('home') },
            { path: '/webrtc', component: Webrtc_vue_1.default, meta: metaLayout('home') },
            { path: '/wallets', component: Wallets_vue_1.default, meta: metaLayout('default') },
            {
                path: '/wallet/:blockchain/:address',
                name: 'wallet',
                component: Wallet_vue_1.default,
                meta: metaLayout('app'),
                children: [
                    {
                        path: 'create',
                        name: 'newtx',
                        component: TransferHoc_vue_1.default,
                        meta: __assign({}, metaLayout('app'), { popup: true }),
                    },
                    {
                        path: 'erc20',
                        name: 'erc20',
                        component: EthTokens_vue_1.default,
                        meta: __assign({}, metaLayout('app'), { popup: true }),
                    },
                    {
                        path: '/pushtx/:blockchain/:txhash',
                        name: 'pushtx',
                        component: PushTx_vue_1.default,
                        props: true,
                        meta: __assign({}, metaLayout('app'), { popup: true }),
                    }
                ],
            },
        ] }));
    router.beforeEach(beforeEach);
    return router;
}
exports.createRouter = createRouter;


/***/ }),
/* 358 */
/*!*****************************!*\
  !*** ./src/pages/Index.vue ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Index_vue_vue_type_template_id_5cc5c441_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Index.vue?vue&type=template&id=5cc5c441&scoped=true& */ 216);
/* harmony import */ var _Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Index.vue?vue&type=script&lang=ts& */ 98);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Index_vue_vue_type_style_index_0_id_5cc5c441_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Index.vue?vue&type=style&index=0&id=5cc5c441&lang=scss&scoped=true& */ 360);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _Index_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Index_vue_vue_type_template_id_5cc5c441_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Index_vue_vue_type_template_id_5cc5c441_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "5cc5c441",
  null
  
)

component.options.__file = "Index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 359 */
/*!*************************************************************************************************!*\
  !*** ./src/components/WhitePopup.vue?vue&type=style&index=0&id=10cb9676&lang=scss&scoped=true& ***!
  \*************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_style_index_0_id_10cb9676_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./WhitePopup.vue?vue&type=style&index=0&id=10cb9676&lang=scss&scoped=true& */ 102);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_style_index_0_id_10cb9676_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_style_index_0_id_10cb9676_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhitePopup_vue_vue_type_style_index_0_id_10cb9676_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 360 */
/*!***************************************************************************************!*\
  !*** ./src/pages/Index.vue?vue&type=style&index=0&id=5cc5c441&lang=scss&scoped=true& ***!
  \***************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_5cc5c441_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./Index.vue?vue&type=style&index=0&id=5cc5c441&lang=scss&scoped=true& */ 103);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_5cc5c441_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_5cc5c441_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Index_vue_vue_type_style_index_0_id_5cc5c441_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 361 */
/*!*****************************!*\
  !*** ./src/pages/Login.vue ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_8ce9aa8e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Login.vue?vue&type=template&id=8ce9aa8e& */ 217);
/* harmony import */ var _Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Login.vue?vue&type=script&lang=ts& */ 104);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Login_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_8ce9aa8e___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Login_vue_vue_type_template_id_8ce9aa8e___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 362 */
/*!***************************************!*\
  !*** ./src/components/QrExchange.vue ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QrExchange_vue_vue_type_template_id_f364cea6_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QrExchange.vue?vue&type=template&id=f364cea6&scoped=true& */ 235);
/* harmony import */ var _QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QrExchange.vue?vue&type=script&lang=ts& */ 108);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _QrExchange_vue_vue_type_style_index_0_id_f364cea6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QrExchange.vue?vue&type=style&index=0&id=f364cea6&lang=scss&scoped=true& */ 390);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _QrExchange_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QrExchange_vue_vue_type_template_id_f364cea6_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _QrExchange_vue_vue_type_template_id_f364cea6_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "f364cea6",
  null
  
)

component.options.__file = "QrExchange.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 363 */
/*!************************************!*\
  !*** ./src/components/QrImage.vue ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QrImage_vue_vue_type_template_id_3eae33e3___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QrImage.vue?vue&type=template&id=3eae33e3& */ 236);
/* harmony import */ var _QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QrImage.vue?vue&type=script&lang=ts& */ 112);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _QrImage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QrImage.vue?vue&type=style&index=0&lang=css& */ 386);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _QrImage_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QrImage_vue_vue_type_template_id_3eae33e3___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _QrImage_vue_vue_type_template_id_3eae33e3___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "QrImage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */
/*!*********************************************************************!*\
  !*** ./src/components/QrImage.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--0-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vue-loader/lib??vue-loader-options!./QrImage.vue?vue&type=style&index=0&lang=css& */ 114);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_0_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_QrImage_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 387 */
/*!*************************************!*\
  !*** ./src/components/QrReader.vue ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _QrReader_vue_vue_type_template_id_c0fc5292_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QrReader.vue?vue&type=template&id=c0fc5292&scoped=true& */ 247);
/* harmony import */ var _QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QrReader.vue?vue&type=script&lang=ts& */ 115);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _QrReader_vue_vue_type_style_index_0_id_c0fc5292_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QrReader.vue?vue&type=style&index=0&id=c0fc5292&lang=scss&scoped=true& */ 389);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _QrReader_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _QrReader_vue_vue_type_template_id_c0fc5292_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _QrReader_vue_vue_type_template_id_c0fc5292_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "c0fc5292",
  null
  
)

component.options.__file = "QrReader.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 388 */,
/* 389 */
/*!***********************************************************************************************!*\
  !*** ./src/components/QrReader.vue?vue&type=style&index=0&id=c0fc5292&lang=scss&scoped=true& ***!
  \***********************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_style_index_0_id_c0fc5292_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./QrReader.vue?vue&type=style&index=0&id=c0fc5292&lang=scss&scoped=true& */ 117);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_style_index_0_id_c0fc5292_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_style_index_0_id_c0fc5292_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_QrReader_vue_vue_type_style_index_0_id_c0fc5292_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 390 */
/*!*************************************************************************************************!*\
  !*** ./src/components/QrExchange.vue?vue&type=style&index=0&id=f364cea6&lang=scss&scoped=true& ***!
  \*************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_style_index_0_id_f364cea6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./QrExchange.vue?vue&type=style&index=0&id=f364cea6&lang=scss&scoped=true& */ 118);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_style_index_0_id_f364cea6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_style_index_0_id_f364cea6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_QrExchange_vue_vue_type_style_index_0_id_f364cea6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 391 */
/*!*******************************!*\
  !*** ./src/pages/Wallets.vue ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Wallets_vue_vue_type_template_id_7ebb8564___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Wallets.vue?vue&type=template&id=7ebb8564& */ 218);
/* harmony import */ var _Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wallets.vue?vue&type=script&lang=ts& */ 119);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Wallets_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Wallets_vue_vue_type_template_id_7ebb8564___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Wallets_vue_vue_type_template_id_7ebb8564___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "Wallets.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 392 */
/*!******************************!*\
  !*** ./src/pages/Wallet.vue ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Wallet_vue_vue_type_template_id_7923f42d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Wallet.vue?vue&type=template&id=7923f42d&scoped=true& */ 219);
/* harmony import */ var _Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Wallet.vue?vue&type=script&lang=ts& */ 121);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _Wallet_vue_vue_type_style_index_0_id_7923f42d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Wallet.vue?vue&type=style&index=0&id=7923f42d&lang=scss&scoped=true& */ 406);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _Wallet_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Wallet_vue_vue_type_template_id_7923f42d_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Wallet_vue_vue_type_template_id_7923f42d_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "7923f42d",
  null
  
)

component.options.__file = "Wallet.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 393 */
/*!********************************************!*\
  !*** ./src/pages/blockchain/TxListHoc.vue ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TxListHoc.vue?vue&type=script&lang=ts& */ 123);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(
  _TxListHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "TxListHoc.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 394 */
/*!********************************************!*\
  !*** ./src/pages/blockchain/EthTxList.vue ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EthTxList_vue_vue_type_template_id_87930da2_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EthTxList.vue?vue&type=template&id=87930da2&scoped=true& */ 237);
/* harmony import */ var _EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EthTxList.vue?vue&type=script&lang=ts& */ 125);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _EthTxList_vue_vue_type_style_index_0_id_87930da2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EthTxList.vue?vue&type=style&index=0&id=87930da2&lang=scss&scoped=true& */ 395);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _EthTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EthTxList_vue_vue_type_template_id_87930da2_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _EthTxList_vue_vue_type_template_id_87930da2_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "87930da2",
  null
  
)

component.options.__file = "EthTxList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 395 */
/*!******************************************************************************************************!*\
  !*** ./src/pages/blockchain/EthTxList.vue?vue&type=style&index=0&id=87930da2&lang=scss&scoped=true& ***!
  \******************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_style_index_0_id_87930da2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./EthTxList.vue?vue&type=style&index=0&id=87930da2&lang=scss&scoped=true& */ 127);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_style_index_0_id_87930da2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_style_index_0_id_87930da2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTxList_vue_vue_type_style_index_0_id_87930da2_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 396 */
/*!********************************************!*\
  !*** ./src/pages/blockchain/EosTxList.vue ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EosTxList_vue_vue_type_template_id_645205a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EosTxList.vue?vue&type=template&id=645205a4&scoped=true& */ 238);
/* harmony import */ var _EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EosTxList.vue?vue&type=script&lang=ts& */ 128);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _EosTxList_vue_vue_type_style_index_0_id_645205a4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EosTxList.vue?vue&type=style&index=0&id=645205a4&lang=scss&scoped=true& */ 397);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _EosTxList_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EosTxList_vue_vue_type_template_id_645205a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _EosTxList_vue_vue_type_template_id_645205a4_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "645205a4",
  null
  
)

component.options.__file = "EosTxList.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 397 */
/*!******************************************************************************************************!*\
  !*** ./src/pages/blockchain/EosTxList.vue?vue&type=style&index=0&id=645205a4&lang=scss&scoped=true& ***!
  \******************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_style_index_0_id_645205a4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./EosTxList.vue?vue&type=style&index=0&id=645205a4&lang=scss&scoped=true& */ 130);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_style_index_0_id_645205a4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_style_index_0_id_645205a4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EosTxList_vue_vue_type_style_index_0_id_645205a4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 398 */
/*!***********************************************!*\
  !*** ./src/components/popup/OverlayPopup.vue ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _OverlayPopup_vue_vue_type_template_id_4e44c077_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OverlayPopup.vue?vue&type=template&id=4e44c077&scoped=true& */ 229);
/* harmony import */ var _OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OverlayPopup.vue?vue&type=script&lang=ts& */ 131);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _OverlayPopup_vue_vue_type_style_index_0_id_4e44c077_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OverlayPopup.vue?vue&type=style&index=0&id=4e44c077&lang=scss&scoped=true& */ 405);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _OverlayPopup_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _OverlayPopup_vue_vue_type_template_id_4e44c077_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _OverlayPopup_vue_vue_type_template_id_4e44c077_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "4e44c077",
  null
  
)

component.options.__file = "OverlayPopup.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 399 */
/*!**********************************************!*\
  !*** ./src/components/popup/CloseButton.vue ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CloseButton_vue_vue_type_template_id_edb8d842_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CloseButton.vue?vue&type=template&id=edb8d842&scoped=true& */ 239);
/* harmony import */ var _CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CloseButton.vue?vue&type=script&lang=ts& */ 133);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _CloseButton_vue_vue_type_style_index_0_id_edb8d842_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CloseButton.vue?vue&type=style&index=0&id=edb8d842&lang=scss&scoped=true& */ 401);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _CloseButton_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CloseButton_vue_vue_type_template_id_edb8d842_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _CloseButton_vue_vue_type_template_id_edb8d842_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "edb8d842",
  null
  
)

component.options.__file = "CloseButton.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 400 */
/*!*************************************************************************************************!*\
  !*** ./src/components/popup/BigX.vue?vue&type=style&index=0&id=4437afc4&lang=scss&scoped=true& ***!
  \*************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BigX_vue_vue_type_style_index_0_id_4437afc4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./BigX.vue?vue&type=style&index=0&id=4437afc4&lang=scss&scoped=true& */ 135);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BigX_vue_vue_type_style_index_0_id_4437afc4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BigX_vue_vue_type_style_index_0_id_4437afc4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BigX_vue_vue_type_style_index_0_id_4437afc4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 401 */
/*!********************************************************************************************************!*\
  !*** ./src/components/popup/CloseButton.vue?vue&type=style&index=0&id=edb8d842&lang=scss&scoped=true& ***!
  \********************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_style_index_0_id_edb8d842_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./CloseButton.vue?vue&type=style&index=0&id=edb8d842&lang=scss&scoped=true& */ 136);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_style_index_0_id_edb8d842_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_style_index_0_id_edb8d842_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_CloseButton_vue_vue_type_style_index_0_id_edb8d842_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 402 */
/*!********************************************************************************************************!*\
  !*** ./src/components/popup/GreyOverlay.vue?vue&type=style&index=0&id=cb375184&lang=scss&scoped=true& ***!
  \********************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GreyOverlay_vue_vue_type_style_index_0_id_cb375184_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./GreyOverlay.vue?vue&type=style&index=0&id=cb375184&lang=scss&scoped=true& */ 137);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GreyOverlay_vue_vue_type_style_index_0_id_cb375184_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GreyOverlay_vue_vue_type_style_index_0_id_cb375184_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GreyOverlay_vue_vue_type_style_index_0_id_cb375184_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 403 */
/*!********************************************!*\
  !*** ./src/components/popup/WhiteRect.vue ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WhiteRect_vue_vue_type_template_id_4583477e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WhiteRect.vue?vue&type=template&id=4583477e&scoped=true& */ 240);
/* harmony import */ var _WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WhiteRect.vue?vue&type=script&lang=ts& */ 138);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _WhiteRect_vue_vue_type_style_index_0_id_4583477e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./WhiteRect.vue?vue&type=style&index=0&id=4583477e&lang=scss&scoped=true& */ 404);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _WhiteRect_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WhiteRect_vue_vue_type_template_id_4583477e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _WhiteRect_vue_vue_type_template_id_4583477e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "4583477e",
  null
  
)

component.options.__file = "WhiteRect.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 404 */
/*!******************************************************************************************************!*\
  !*** ./src/components/popup/WhiteRect.vue?vue&type=style&index=0&id=4583477e&lang=scss&scoped=true& ***!
  \******************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_style_index_0_id_4583477e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./WhiteRect.vue?vue&type=style&index=0&id=4583477e&lang=scss&scoped=true& */ 140);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_style_index_0_id_4583477e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_style_index_0_id_4583477e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_WhiteRect_vue_vue_type_style_index_0_id_4583477e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 405 */
/*!*********************************************************************************************************!*\
  !*** ./src/components/popup/OverlayPopup.vue?vue&type=style&index=0&id=4e44c077&lang=scss&scoped=true& ***!
  \*********************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_style_index_0_id_4e44c077_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./OverlayPopup.vue?vue&type=style&index=0&id=4e44c077&lang=scss&scoped=true& */ 141);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_style_index_0_id_4e44c077_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_style_index_0_id_4e44c077_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_OverlayPopup_vue_vue_type_style_index_0_id_4e44c077_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 406 */
/*!****************************************************************************************!*\
  !*** ./src/pages/Wallet.vue?vue&type=style&index=0&id=7923f42d&lang=scss&scoped=true& ***!
  \****************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_style_index_0_id_7923f42d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./Wallet.vue?vue&type=style&index=0&id=7923f42d&lang=scss&scoped=true& */ 142);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_style_index_0_id_7923f42d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_style_index_0_id_7923f42d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Wallet_vue_vue_type_style_index_0_id_7923f42d_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 407 */
/*!**********************************************!*\
  !*** ./src/pages/blockchain/TransferHoc.vue ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TransferHoc.vue?vue&type=script&lang=ts& */ 143);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(
  _TransferHoc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "TransferHoc.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 408 */
/*!**********************************************!*\
  !*** ./src/pages/blockchain/EthTransfer.vue ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EthTransfer_vue_vue_type_template_id_51b73ed6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EthTransfer.vue?vue&type=template&id=51b73ed6& */ 230);
/* harmony import */ var _EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EthTransfer.vue?vue&type=script&lang=ts& */ 145);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _EthTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EthTransfer_vue_vue_type_template_id_51b73ed6___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _EthTransfer_vue_vue_type_template_id_51b73ed6___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "EthTransfer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 409 */
/*!***************************************!*\
  !*** ./src/components/RemoteSign.vue ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RemoteSign_vue_vue_type_template_id_d6f847b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RemoteSign.vue?vue&type=template&id=d6f847b8&scoped=true& */ 241);
/* harmony import */ var _RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RemoteSign.vue?vue&type=script&lang=ts& */ 149);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _RemoteSign_vue_vue_type_style_index_0_id_d6f847b8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RemoteSign.vue?vue&type=style&index=0&id=d6f847b8&lang=scss&scoped=true& */ 410);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _RemoteSign_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RemoteSign_vue_vue_type_template_id_d6f847b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _RemoteSign_vue_vue_type_template_id_d6f847b8_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "d6f847b8",
  null
  
)

component.options.__file = "RemoteSign.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 410 */
/*!*************************************************************************************************!*\
  !*** ./src/components/RemoteSign.vue?vue&type=style&index=0&id=d6f847b8&lang=scss&scoped=true& ***!
  \*************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_style_index_0_id_d6f847b8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./RemoteSign.vue?vue&type=style&index=0&id=d6f847b8&lang=scss&scoped=true& */ 151);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_style_index_0_id_d6f847b8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_style_index_0_id_d6f847b8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteSign_vue_vue_type_style_index_0_id_d6f847b8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 411 */
/*!**************************************!*\
  !*** ./src/components/FormInput.vue ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FormInput_vue_vue_type_template_id_4f39c132_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FormInput.vue?vue&type=template&id=4f39c132&scoped=true& */ 242);
/* harmony import */ var _FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FormInput.vue?vue&type=script&lang=ts& */ 152);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _FormInput_vue_vue_type_style_index_0_id_4f39c132_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FormInput.vue?vue&type=style&index=0&id=4f39c132&lang=scss&scoped=true& */ 412);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _FormInput_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _FormInput_vue_vue_type_template_id_4f39c132_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _FormInput_vue_vue_type_template_id_4f39c132_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "4f39c132",
  null
  
)

component.options.__file = "FormInput.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 412 */
/*!************************************************************************************************!*\
  !*** ./src/components/FormInput.vue?vue&type=style&index=0&id=4f39c132&lang=scss&scoped=true& ***!
  \************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_4f39c132_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./FormInput.vue?vue&type=style&index=0&id=4f39c132&lang=scss&scoped=true& */ 154);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_4f39c132_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_4f39c132_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_FormInput_vue_vue_type_style_index_0_id_4f39c132_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 413 */
/*!******************************************************************************************************!*\
  !*** ./src/components/form/InputLabel.vue?vue&type=style&index=0&id=2ca8cde6&lang=scss&scoped=true& ***!
  \******************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_style_index_0_id_2ca8cde6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./InputLabel.vue?vue&type=style&index=0&id=2ca8cde6&lang=scss&scoped=true& */ 157);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_style_index_0_id_2ca8cde6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_style_index_0_id_2ca8cde6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_InputLabel_vue_vue_type_style_index_0_id_2ca8cde6_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 445 */,
/* 446 */
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */
/*!***************************************!*\
  !*** ./src/blockchains/erc20abi.json ***!
  \***************************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, default */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module) {

module.exports = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"startIco","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finalizeIco","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"remainingTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basePrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenReserve","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

/***/ }),
/* 586 */
/*!**********************************************!*\
  !*** ./src/pages/blockchain/EosTransfer.vue ***!
  \**********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EosTransfer_vue_vue_type_template_id_0866a0a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EosTransfer.vue?vue&type=template&id=0866a0a2& */ 233);
/* harmony import */ var _EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EosTransfer.vue?vue&type=script&lang=ts& */ 158);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _EosTransfer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EosTransfer_vue_vue_type_template_id_0866a0a2___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _EosTransfer_vue_vue_type_template_id_0866a0a2___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "EosTransfer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 587 */
/*!********************************************!*\
  !*** ./src/pages/blockchain/EthTokens.vue ***!
  \********************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EthTokens_vue_vue_type_template_id_0da13cfe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EthTokens.vue?vue&type=template&id=0da13cfe&scoped=true& */ 220);
/* harmony import */ var _EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EthTokens.vue?vue&type=script&lang=ts& */ 160);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _EthTokens_vue_vue_type_style_index_0_id_0da13cfe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EthTokens.vue?vue&type=style&index=0&id=0da13cfe&lang=scss&scoped=true& */ 588);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _EthTokens_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _EthTokens_vue_vue_type_template_id_0da13cfe_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _EthTokens_vue_vue_type_template_id_0da13cfe_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "0da13cfe",
  null
  
)

component.options.__file = "EthTokens.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 588 */
/*!******************************************************************************************************!*\
  !*** ./src/pages/blockchain/EthTokens.vue?vue&type=style&index=0&id=0da13cfe&lang=scss&scoped=true& ***!
  \******************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_style_index_0_id_0da13cfe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../node_modules/css-loader??ref--1-oneOf-2-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../../node_modules/vue-loader/lib??vue-loader-options!./EthTokens.vue?vue&type=style&index=0&id=0da13cfe&lang=scss&scoped=true& */ 162);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_style_index_0_id_0da13cfe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_style_index_0_id_0da13cfe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_EthTokens_vue_vue_type_style_index_0_id_0da13cfe_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 589 */
/*!******************************!*\
  !*** ./src/pages/PushTx.vue ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PushTx_vue_vue_type_template_id_c1079a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PushTx.vue?vue&type=template&id=c1079a10&scoped=true& */ 221);
/* harmony import */ var _PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PushTx.vue?vue&type=script&lang=ts& */ 163);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _PushTx_vue_vue_type_style_index_0_id_c1079a10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PushTx.vue?vue&type=style&index=0&id=c1079a10&lang=scss&scoped=true& */ 590);
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(
  _PushTx_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PushTx_vue_vue_type_template_id_c1079a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _PushTx_vue_vue_type_template_id_c1079a10_scoped_true___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  "c1079a10",
  null
  
)

component.options.__file = "PushTx.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 590 */
/*!****************************************************************************************!*\
  !*** ./src/pages/PushTx.vue?vue&type=style&index=0&id=c1079a10&lang=scss&scoped=true& ***!
  \****************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_style_index_0_id_c1079a10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/mini-css-extract-plugin/dist/loader.js!../../node_modules/css-loader??ref--1-oneOf-2-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/sass-loader/lib/loader.js??ref--1-oneOf-2-2!../../node_modules/vue-loader/lib??vue-loader-options!./PushTx.vue?vue&type=style&index=0&id=c1079a10&lang=scss&scoped=true& */ 165);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_style_index_0_id_c1079a10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_style_index_0_id_c1079a10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_ref_1_oneOf_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_sass_loader_lib_loader_js_ref_1_oneOf_2_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PushTx_vue_vue_type_style_index_0_id_c1079a10_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 591 */
/*!******************************!*\
  !*** ./src/pages/Webrtc.vue ***!
  \******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Webrtc_vue_vue_type_template_id_00ad6e6a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Webrtc.vue?vue&type=template&id=00ad6e6a& */ 222);
/* harmony import */ var _Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Webrtc.vue?vue&type=script&lang=ts& */ 166);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ 0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Webrtc_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Webrtc_vue_vue_type_template_id_00ad6e6a___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Webrtc_vue_vue_type_template_id_00ad6e6a___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

component.options.__file = "Webrtc.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 592 */
/*!********************************!*\
  !*** ./src/network/jrpcrtc.ts ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jsonrpc_1 = __webpack_require__(/*! ./jsonrpc */ 193);
var JsonRpcWebRtc = /** @class */ (function (_super) {
    __extends(JsonRpcWebRtc, _super);
    function JsonRpcWebRtc(rtc, onRequest, onConnected) {
        var _this = _super.call(this, function (msg) { return _this.tryRtcSend(msg); }, onRequest) || this;
        _this.rtc = rtc;
        _this.onConnected = onConnected;
        _this.queue = [];
        _this.connected = false;
        rtc.on('data', function (data) { return _this.onMessage(data.toString()); });
        rtc.on('connect', function () { return _this.onRtcConnect(); });
        return _this;
    }
    JsonRpcWebRtc.prototype.onRtcConnect = function () {
        var _this = this;
        this.connected = true;
        if (this.queue.length)
            this.queue.map(function (msg) { return _this.rtc.send(msg); });
        this.queue = [];
        this.onConnected && this.onConnected();
    };
    JsonRpcWebRtc.prototype.tryRtcSend = function (msg) {
        if (this.connected)
            this.rtc.send(msg);
        else
            this.queue.push(msg);
    };
    return JsonRpcWebRtc;
}(jsonrpc_1.JsonRpc));
exports.JsonRpcWebRtc = JsonRpcWebRtc;


/***/ }),
/* 593 */
/*!*******************************!*\
  !*** ./src/network/jrpcfb.ts ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jsonrpc_1 = __webpack_require__(/*! ./jsonrpc */ 193);
function isFallback(msg) {
    return msg.method == "fallback";
}
exports.isFallback = isFallback;
var JsonRpcFallback = /** @class */ (function (_super) {
    __extends(JsonRpcFallback, _super);
    function JsonRpcFallback(jrpc, onRequest) {
        var _this = _super.call(this, function (msg) { return (console.log("FALLBACK OUT> " + msg), jrpc.callRaw("fallback", { msg: msg })); }, onRequest) || this;
        _this.jrpc = jrpc;
        _this.onIncoming = function (json, cb) {
            if (isFallback(json)) {
                var msg = Array.isArray(json.params) ? json.params[0] : json.params.msg;
                _this.onMessage(msg);
            }
        };
        jrpc.onRequest = function (json, cb) { return _this.onIncoming(json, cb); };
        return _this;
    }
    return JsonRpcFallback;
}(jsonrpc_1.JsonRpc));
exports.JsonRpcFallback = JsonRpcFallback;


/***/ }),
/* 594 */
/*!*******************************!*\
  !*** ./src/network/wrtchs.ts ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jrpchs_1 = __webpack_require__(/*! ./jrpchs */ 595);
var SimplePeer_1 = __webpack_require__(/*! ./SimplePeer */ 597);
var WebrtcHsBase = /** @class */ (function () {
    function WebrtcHsBase(initiator, onConnect) {
        var _this = this;
        this.signals = [];
        this.destroyed = false;
        this.rtc = SimplePeer_1.createPeer({ initiator: initiator });
        this.rtc.on('signal', function (signal) { return _this.onSignal(signal); });
        this.rtc.on('connect', function () { return _this.destroy(function () { return onConnect(_this.rtc); }); });
    }
    WebrtcHsBase.prototype.destroy = function (callback) {
        this.destroyed = true;
        callback();
    };
    WebrtcHsBase.prototype.onSignal = function (signal) {
        if (this.destroyed)
            return;
        if (signal.candidate) {
            if (this.signals)
                return this.signals.push(signal);
        }
        this.ws.signal(signal);
    };
    return WebrtcHsBase;
}());
var WebrtcHSInitiator = /** @class */ (function (_super) {
    __extends(WebrtcHSInitiator, _super);
    function WebrtcHSInitiator(wsUrl, onSid, onConnect) {
        var _this = _super.call(this, true, onConnect) || this;
        _this.onSid = onSid;
        _this.ws = new jrpchs_1.HandshakeConnectionInitiator(wsUrl, _this);
        return _this;
    }
    WebrtcHSInitiator.prototype.onAnswer = function (answer) {
        var _this = this;
        if (this.destroyed)
            return;
        this.rtc.signal({ type: "answer", sdp: answer });
        if (this.signals) {
            this.signals.map(function (x) { return _this.ws.signal(x); });
            delete this.signals;
        }
    };
    WebrtcHSInitiator.prototype.onWsConnect = function (sid) {
        if (this.destroyed)
            return;
        this.onSid(sid);
    };
    WebrtcHSInitiator.prototype.onIce = function (ice) {
        if (this.destroyed)
            return;
        console.log("INITIATOR ICE " + ice);
        if (ice)
            this.rtc.signal({ candidate: ice });
    };
    return WebrtcHSInitiator;
}(WebrtcHsBase));
exports.WebrtcHSInitiator = WebrtcHSInitiator;
var WebrtcHSResponder = /** @class */ (function (_super) {
    __extends(WebrtcHSResponder, _super);
    function WebrtcHSResponder(wsUrl, sid, onConnect) {
        var _this = _super.call(this, false, onConnect) || this;
        _this.ws = new jrpchs_1.HandshakeConnectionResponder(wsUrl, sid, _this);
        return _this;
    }
    WebrtcHSResponder.prototype.onOffer = function (offer) {
        if (this.destroyed)
            return;
        this.rtc.signal({ type: "offer", sdp: offer });
    };
    WebrtcHSResponder.prototype.onIce = function (ice) {
        if (this.destroyed)
            return;
        if (ice)
            this.rtc.signal({ candidate: ice });
    };
    return WebrtcHSResponder;
}(WebrtcHsBase));
exports.WebrtcHSResponder = WebrtcHSResponder;


/***/ }),
/* 595 */
/*!*******************************!*\
  !*** ./src/network/jrpchs.ts ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hostproto_1 = __webpack_require__(/*! ./hostproto */ 173);
var jrpcws_1 = __webpack_require__(/*! ./jrpcws */ 596);
function isIce(msg) {
    return msg.method == 'ice';
}
exports.isIce = isIce;
function isAnswer(msg) {
    return msg.method == 'answer';
}
exports.isAnswer = isAnswer;
function isOffer(msg) {
    return msg.method == 'offer';
}
exports.isOffer = isOffer;
var HandshakeStatus;
(function (HandshakeStatus) {
    HandshakeStatus[HandshakeStatus["NotStarted"] = 0] = "NotStarted";
    HandshakeStatus[HandshakeStatus["ConnectingHandshake"] = 1] = "ConnectingHandshake";
    HandshakeStatus[HandshakeStatus["ExchangingOfferAnswer"] = 2] = "ExchangingOfferAnswer";
    HandshakeStatus[HandshakeStatus["ExchangingIce"] = 3] = "ExchangingIce";
    HandshakeStatus[HandshakeStatus["Connected"] = 4] = "Connected";
})(HandshakeStatus = exports.HandshakeStatus || (exports.HandshakeStatus = {}));
var HandshakeConnectionBase = /** @class */ (function () {
    function HandshakeConnectionBase(wsUrl, _handler) {
        var _this = this;
        this._handler = _handler;
        this.status = HandshakeStatus.NotStarted;
        this._handshakeHandler = function (json, cb) {
            if (isIce(json)) {
                var ice = hostproto_1.allToObj(json, ["ice"]).ice;
                _this._handler.onIce(ice);
            }
            _this.m_handshakeHandler && _this.m_handshakeHandler(json, cb);
        };
        this.status = HandshakeStatus.ConnectingHandshake;
        this.wsrpc = new jrpcws_1.JsonRpcWebsocket(new WebSocket(wsUrl), function (json, cb) { return _this._handshakeHandler(json, cb); }, function () { return _this.onWsOpen(); });
    }
    HandshakeConnectionBase.prototype.onWsOpen = function () {
        this.status = HandshakeStatus.ExchangingOfferAnswer;
        this.m_onWsOpen && this.m_onWsOpen();
    };
    HandshakeConnectionBase.prototype.signal = function (signal) {
        if (signal.candidate) {
            this.wsrpc.callRaw('ice', { ice: signal.candidate });
        }
    };
    return HandshakeConnectionBase;
}());
exports.HandshakeConnectionBase = HandshakeConnectionBase;
var HandshakeConnectionInitiator = /** @class */ (function (_super) {
    __extends(HandshakeConnectionInitiator, _super);
    function HandshakeConnectionInitiator(wsUrl, handler) {
        var _this = _super.call(this, wsUrl, handler) || this;
        _this.handler = handler;
        _this.m_handshakeHandler = function (json, cb) {
            if (isAnswer(json)) {
                var answer = hostproto_1.allToObj(json, ['answer']).answer;
                console.log("got answer: " + answer);
                _this.status = HandshakeStatus.ExchangingIce;
                _this.handler.onAnswer(answer);
            }
        };
        return _this;
    }
    HandshakeConnectionInitiator.prototype.signal = function (signal) {
        return __awaiter(this, void 0, void 0, function () {
            var sidResponse, sid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.signal.call(this, signal);
                        if (!(signal.type == 'offer')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.wsrpc.callRaw('offer', { offer: signal.sdp })];
                    case 1:
                        sidResponse = _a.sent();
                        sid = sidResponse.sid;
                        this.handler.onWsConnect(sid);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return HandshakeConnectionInitiator;
}(HandshakeConnectionBase));
exports.HandshakeConnectionInitiator = HandshakeConnectionInitiator;
var HandshakeConnectionResponder = /** @class */ (function (_super) {
    __extends(HandshakeConnectionResponder, _super);
    function HandshakeConnectionResponder(wsUrl, sid, handler) {
        var _this = _super.call(this, wsUrl, handler) || this;
        _this.sid = sid;
        _this.handler = handler;
        _this.m_onWsOpen = function () { return __awaiter(_this, void 0, void 0, function () {
            var offerResponse, offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.wsrpc.callRaw('join', { sid: this.sid })];
                    case 1:
                        offerResponse = _a.sent();
                        offer = offerResponse.offer;
                        console.log("=================== OFFER ================", offer);
                        this.status = HandshakeStatus.ExchangingIce;
                        this.handler.onOffer(offer);
                        return [2 /*return*/];
                }
            });
        }); };
        _this.m_handshakeHandler = function (json, cb) {
            if (isOffer(json)) {
                var offer = hostproto_1.allToObj(json, ['offer']).offer;
                console.log("got offer: " + offer);
                _this.status = HandshakeStatus.ExchangingIce;
                _this.handler.onOffer(offer);
            }
        };
        return _this;
    }
    HandshakeConnectionResponder.prototype.signal = function (signal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _super.prototype.signal.call(this, signal);
                        if (!(signal.type == 'answer')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.wsrpc.callRaw('answer', { answer: signal.sdp })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return HandshakeConnectionResponder;
}(HandshakeConnectionBase));
exports.HandshakeConnectionResponder = HandshakeConnectionResponder;


/***/ }),
/* 596 */
/*!*******************************!*\
  !*** ./src/network/jrpcws.ts ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var jsonrpc_1 = __webpack_require__(/*! ./jsonrpc */ 193);
var JsonRpcWebsocket = /** @class */ (function (_super) {
    __extends(JsonRpcWebsocket, _super);
    function JsonRpcWebsocket(ws, onRequest, onOpened) {
        var _this = _super.call(this, function (msg) { return _this.tryWsSend(msg); }, onRequest) || this;
        _this.ws = ws;
        _this.onOpened = onOpened;
        _this.queue = [];
        _this.connected = false;
        ws.addEventListener('open', function () { return _this.onWsConnect(); });
        ws.addEventListener('message', function (msg) { return _this.onMessage(msg.data.toString()); });
        return _this;
    }
    JsonRpcWebsocket.prototype.onWsConnect = function () {
        var _this = this;
        this.connected = true;
        if (this.queue.length)
            this.queue.map(function (msg) { return _this.ws.send(msg); });
        this.queue = [];
        this.onOpened && this.onOpened();
    };
    JsonRpcWebsocket.prototype.tryWsSend = function (msg) {
        if (this.connected)
            this.ws.send(msg);
        else
            this.queue.push(msg);
    };
    return JsonRpcWebsocket;
}(jsonrpc_1.JsonRpc));
exports.JsonRpcWebsocket = JsonRpcWebsocket;


/***/ }),
/* 597 */
/*!***********************************!*\
  !*** ./src/network/SimplePeer.ts ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var simple_peer_1 = __importDefault(__webpack_require__(/*! simple-peer */ 598));
var global;
(function (global) {
})(global || (global = {}));
function createPeer(opts) {
    if (global && global.wrtc)
        opts.wrtc = global.wrtc;
    return new simple_peer_1.default(opts);
}
exports.createPeer = createPeer;


/***/ }),
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vuex_1 = __importDefault(__webpack_require__(/*! vuex */ 249));
var coinmarketcap_1 = __webpack_require__(/*! ./coinmarketcap */ 604);
var main_1 = __webpack_require__(/*! ./main */ 605);
var ethTxs_1 = __webpack_require__(/*! ./ethTxs */ 688);
function createStore() {
    return new vuex_1.default.Store(mergeOptions(coinmarketcap_1.options, main_1.options, ethTxs_1.options));
}
exports.createStore = createStore;
function mergeOptions2(opts1, opts2) {
    return Object.keys(opts1).concat(Object.keys(opts2)).map(function (key) { return [key, __assign({}, opts1[key], opts2[key])]; }).reduce(function (prev, _a) {
        var key = _a[0], val = _a[1];
        var _b;
        return (__assign({}, prev, (_b = {}, _b[key] = val, _b)));
    }, {});
}
function mergeOptions() {
    var opts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        opts[_i] = arguments[_i];
    }
    //@ts-ignore
    return opts.reduce(function (prev, cur) { return mergeOptions2(prev, cur); }, opts[0]);
}


/***/ }),
/* 604 */
/*!************************************!*\
  !*** ./src/store/coinmarketcap.ts ***!
  \************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
var cmc = __importStar(__webpack_require__(/*! src/blockchains/coinmarketcap */ 194));
function ensureToken(state, token) {
    if (!state.tokenPrices[token])
        vue_ts_1.default.set(state.tokenPrices, token, { price: NaN, loading: false });
}
exports.options = {
    state: {
        tokenPrices: {}
    },
    mutations: {
        tokenPriceUpdate: function (state, payload) {
            ensureToken(state, payload.token);
            state.tokenPrices[payload.token].price = payload.price;
        },
        tokenPriceSetLoading: function (state, payload) {
            ensureToken(state, payload.token);
            state.tokenPrices[payload.token].loading = payload.loading;
        },
    },
    actions: {
        updateTokenPrice: function (store, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var cmcId, price;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cmcId = ("cmcId" in payload) ? payload.cmcId : cmc.tickerIds[payload.blockchain];
                            store.commit('tokenPriceSetLoading', { token: cmcId, loading: true });
                            return [4 /*yield*/, cmc.loadPrice(cmcId)];
                        case 1:
                            price = _a.sent();
                            store.commit('tokenPriceUpdate', { token: cmcId, price: price });
                            store.commit('tokenPriceSetLoading', { token: cmcId, loading: false });
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    getters: {
        getTokenPrice: function (state, getters) { return function (token) {
            var t = state.tokenPrices[token];
            return t ? t.price : NaN;
        }; },
        eosPrice: function (state, getters) { return getters.getTokenPrice(cmc.tickerIds.eos); },
        ethPrice: function (state, getters) { return getters.getTokenPrice(cmc.tickerIds.eth); },
    }
};


/***/ }),
/* 605 */
/*!***************************!*\
  !*** ./src/store/main.ts ***!
  \***************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var blockchains_1 = __webpack_require__(/*! src/blockchains */ 606);
var utils_1 = __webpack_require__(/*! ./utils */ 336);
exports.options = {
    state: {
        wallets: [],
        currentWallet: null,
        txToPush: null,
        webrtc: {
            outgoingId: 1,
            connected: false
        },
    },
    getters: {
        calcWalletId: function (state, getters) { return function (wallet) { return utils_1.calcWalletId(wallet); }; },
        txHash: function (state, getters) { return function (tx, bc) {
            return getters.blockchains[bc](state.currentWallet.chainId).getTxHash(tx);
        }; },
        txToPushHash: function (state, getters) {
            var tx = state.txToPush;
            if (!tx)
                return undefined;
            return getters.txHash(tx.tx, tx.wallet.blockchain);
        },
        blockchains: function (state, getters) { return blockchains_1.typedBlockchains; },
        currentBlockchain: function (state, getters) { return getters.blockchains[state.currentWallet.blockchain](state.currentWallet.chainId); }
    },
    mutations: {
        setWalletList: function (state, payload) {
            console.log("SET_WALLET_LIST: ", payload);
            state.wallets = payload.wallets;
        },
        setCurrentWallet: function (state, payload) { return state.currentWallet = payload.wallet; },
        setTxToPush: function (state, payload) { return state.txToPush = payload; },
        resetTxToPush: function (state) { return state.txToPush = null; },
        webrtcIncId: function (state) { return state.webrtc.outgoingId++; },
        webrtcResetId: function (state) { return state.webrtc.outgoingId = 1; },
        webrtcConnected: function (state) {
            console.log('MUTATION: webrtcConnected');
            state.webrtc.connected = true;
        },
        webrtcDisconnected: function (state) { return state.webrtc.connected = false; },
    },
    actions: {
        webrtcConnected: function (store) {
            store.commit('webrtcConnected');
        },
        webrtcDisconnected: function (store) {
            store.commit('webrtcDisconnected');
            store.commit('webrtcResetId');
        },
    },
};


/***/ }),
/* 606 */
/*!**********************************!*\
  !*** ./src/blockchains/index.ts ***!
  \**********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var eth_chains_1 = __webpack_require__(/*! ./eth-chains */ 607);
var eos_1 = __webpack_require__(/*! ./eos */ 609);
exports.typedBlockchains = {
    eth: function (chainId) { return eth_chains_1.getCachedNetworkByChainId(chainId); },
    eos: function (chainId) { return eos_1.getCachedNetworkByChainId(chainId); },
    neo: function (chainId) { throw new Error('NEO is not supported yet!'); },
    btc: function (chainId) { throw new Error('BTC is not supported yet!'); },
    pha: function (chainId) { throw new Error('Phantom is not supported yet!'); },
};


/***/ }),
/* 607 */
/*!***************************************!*\
  !*** ./src/blockchains/eth-chains.ts ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var eth_1 = __webpack_require__(/*! ./eth */ 175);
var coinmarketcap = __importStar(__webpack_require__(/*! ./coinmarketcap */ 194));
var etherscan = __importStar(__webpack_require__(/*! ./etherscan */ 608));
var CHAINS = {
    1: {
        testnet: false,
        name: "Mainnet",
        url: 'https://mainnet.infura.io/',
        loadTxList: etherscan.mainnet.loadTxList
    },
    3: {
        testnet: true,
        name: "Ropsten",
        url: "wss://ropsten.infura.io/ws",
        loadTxList: etherscan.ropsten.loadTxList
    },
    4: {
        testnet: true,
        name: "Rinkeby",
        url: 'https://rinkeby.infura.io/',
        loadTxList: etherscan.rinkeby.loadTxList
    },
    42: {
        testnet: true,
        name: "Kovan",
        url: 'wss://kovan.infura.io/_ws',
        loadTxList: etherscan.kovan.loadTxList
    },
};
var CACHE = {};
var getUsdRate = function () { return coinmarketcap.loadPrice(coinmarketcap.tickerIds.eth); };
function getNetworkByChainId(chainId) {
    var _this = this;
    chainId = parseInt(chainId + "");
    var _a = CHAINS[chainId], testnet = _a.testnet, settings = __rest(_a, ["testnet"]);
    if (!settings)
        throw new Error("ETH: network with chain id \"" + chainId + "\" is not supported!");
    var web3 = eth_1.getNetwork(settings.url);
    return {
        testnet: testnet,
        networkName: settings.name,
        getTxHash: eth_1.getRawTxHash,
        pushTx: function (tx) { return __awaiter(_this, void 0, void 0, function () {
            var receipt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3.sendTx(tx)];
                    case 1:
                        receipt = _a.sent();
                        return [2 /*return*/, receipt.transactionHash];
                }
            });
        }); },
        getUsdValue: testnet ? function () { return Promise.resolve(0); } : getUsdRate,
        loadTxList: function (wallet) { return settings.loadTxList(wallet.address); },
        web3: web3
    };
}
exports.getNetworkByChainId = getNetworkByChainId;
function getCachedNetworkByChainId(chainId) {
    chainId = parseInt(chainId + "");
    if (isNaN(chainId))
        chainId = 1; // eth mainnet
    var chain = CACHE[chainId];
    if (chain)
        return chain;
    return CACHE[chainId] = getNetworkByChainId(chainId);
}
exports.getCachedNetworkByChainId = getCachedNetworkByChainId;


/***/ }),
/* 608 */
/*!**************************************!*\
  !*** ./src/blockchains/etherscan.ts ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainnet = {
    loadTxList: function (address) { return loadTxList('https://api.etherscan.io', address); }
};
exports.rinkeby = {
    loadTxList: function (address) { return loadTxList('https://api-rinkeby.etherscan.io', address); }
};
exports.ropsten = {
    loadTxList: function (address) { return loadTxList('https://api-ropsten.etherscan.io', address); }
};
exports.kovan = {
    loadTxList: function (address) { return loadTxList('https://api-kovan.etherscan.io', address); }
};
function loadTxList(host, address) {
    return __awaiter(this, void 0, Promise, function () {
        var res, txs, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, load(host, "/api?module=account&action=txlist&address=" + address + "&startblock=0&endblock=99999999&sort=asc&apikey=YourApiKeyToken")];
                case 1:
                    res = _a.sent();
                    txs = res.result;
                    txs = txs.filter(function (val, idx, arr) { return idx == arr.findIndex(function (x) { return x.hash == val.hash; }); }); // remove duplicates
                    return [2 /*return*/, txs.reverse()];
                case 2:
                    e_1 = _a.sent();
                    if (e_1.message === "No transactions found")
                        return [2 /*return*/, []];
                    throw e_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.loadTxList = loadTxList;
function load(host, path) {
    return __awaiter(this, void 0, Promise, function () {
        var url;
        return __generator(this, function (_a) {
            url = "" + host + path;
            return [2 /*return*/, fetch(url).then(function (x) { return x.json(); }).then(function (res) {
                    if (!res || (res.status != '1') || (res.message != "OK"))
                        throw Error(res.message);
                    return res;
                })];
        });
    });
}
exports.load = load;


/***/ }),
/* 609 */
/*!********************************!*\
  !*** ./src/blockchains/eos.ts ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var coinmarketcap = __importStar(__webpack_require__(/*! ./coinmarketcap */ 194));
var cryptolions = __importStar(__webpack_require__(/*! ./cryptolions */ 610));
var greymass = __importStar(__webpack_require__(/*! ./greymass */ 611));
var eosjs_1 = __importDefault(__webpack_require__(/*! eosjs */ 612));
var getUsdRate = function () { return coinmarketcap.loadPrice(coinmarketcap.tickerIds.eos); };
function getNetwork(httpEndpoint, chainId) {
    var eos = eosjs_1.default({
        httpEndpoint: httpEndpoint,
        chainId: chainId,
    });
    return {
        pushTx: function (tx) {
            return __awaiter(this, void 0, Promise, function () {
                var txHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if ("__eos__sendTx" in window)
                                return [2 /*return*/, (console.log('FAKING EOS CALL!!!', tx), window.__eos__sendTx(tx))];
                            console.log("[EOS] SENDING TX: " + tx);
                            return [4 /*yield*/, eos.pushTransaction(tx)];
                        case 1:
                            txHash = _a.sent();
                            console.log('txHash:', txHash);
                            if (!txHash.transaction_id)
                                throw new Error("EOS: couldn't push tx! full response: " + JSON.stringify(txHash));
                            return [2 /*return*/, txHash.transaction_id];
                    }
                });
            });
        },
        getTxHeaders: function () {
            return __awaiter(this, void 0, Promise, function () {
                var info, expireInSeconds, chainDate, expiration, block, transactionHeaders;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, eos.getInfo({})];
                        case 1:
                            info = _a.sent();
                            expireInSeconds = 60 * 60 // 1 hour
                            ;
                            chainDate = new Date(info.head_block_time + 'Z');
                            expiration = new Date(chainDate.getTime() + expireInSeconds * 1000).toISOString().split('.')[0];
                            return [4 /*yield*/, eos.getBlock(info.last_irreversible_block_num)
                                // console.log(block)
                            ];
                        case 2:
                            block = _a.sent();
                            transactionHeaders = {
                                expiration: expiration,
                                ref_block_num: info.last_irreversible_block_num & 0xFFFF,
                                ref_block_prefix: block.ref_block_prefix
                            };
                            // console.log(transactionHeaders)
                            return [2 /*return*/, transactionHeaders];
                    }
                });
            });
        }
    };
}
function getNetworkByChainId(chainId) {
    var chain = CHAINS[chainId];
    var httpEndpoint = chain.url;
    var eos = getNetwork(httpEndpoint, chainId);
    eos.getTxHeaders();
    return {
        networkName: chain.name,
        testnet: chain.testnet,
        getTxHash: function (tx) { return '0xEOS_FAKE_HASH'; },
        getUsdValue: function () { return getUsdRate(); },
        loadTxList: function (wallet) { return chain.loadTxList(wallet.address); },
        pushTx: eos.pushTx,
        getTxHeaders: eos.getTxHeaders
    };
}
var CACHE = {};
function getCachedNetworkByChainId(chainId) {
    chainId = chainId + "";
    if (!chainId)
        chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'; // eos mainnet
    var chain = CACHE[chainId];
    if (chain)
        return chain;
    return CACHE[chainId] = getNetworkByChainId(chainId);
}
exports.getCachedNetworkByChainId = getCachedNetworkByChainId;
var CHAINS = {
    'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': {
        testnet: false,
        name: 'Mainnet',
        url: 'https://eos.greymass.com',
        loadTxList: greymass.mainnet.loadTxList
    },
    'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473': {
        testnet: true,
        name: 'Jungle',
        url: 'https://jungle2.cryptolions.io',
        loadTxList: cryptolions.jungle.loadTxList
    },
};


/***/ }),
/* 610 */
/*!****************************************!*\
  !*** ./src/blockchains/cryptolions.ts ***!
  \****************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jungle = {
    loadTxList: function (address) { return loadTxList('https://junglehistory.cryptolions.io:4433', address); }
};
function loadTxList(host, address) {
    return __awaiter(this, void 0, Promise, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, load(host, "/v1/history/get_actions/" + address + "?limit=100&skip=0")];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.actions];
            }
        });
    });
}
exports.loadTxList = loadTxList;
function load(host, path) {
    return __awaiter(this, void 0, Promise, function () {
        var url;
        return __generator(this, function (_a) {
            url = "" + host + path;
            return [2 /*return*/, fetch(url).then(function (x) { return x.json(); }).then(function (res) {
                    // if (!res || (res.status != '1') || (res.message != "OK"))
                    // 	throw Error(res.message)
                    return res;
                })];
        });
    });
}
exports.load = load;


/***/ }),
/* 611 */
/*!*************************************!*\
  !*** ./src/blockchains/greymass.ts ***!
  \*************************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainnet = {
    loadTxList: function (address) { return loadTxList('https://eos.greymass.com', address); }
};
function loadTxList(host, address) {
    return __awaiter(this, void 0, Promise, function () {
        var params, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        account_name: address,
                        offset: -100,
                        pos: -1
                    };
                    return [4 /*yield*/, load(host, "/v1/history/get_actions", params)];
                case 1:
                    res = _a.sent();
                    console.log(res);
                    return [2 /*return*/, res.actions.map(function (x) { return x.action_trace; }).reverse()];
            }
        });
    });
}
exports.loadTxList = loadTxList;
function load(host, path, bodyParams) {
    return __awaiter(this, void 0, Promise, function () {
        var url;
        return __generator(this, function (_a) {
            url = "" + host + path;
            return [2 /*return*/, fetch(url, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bodyParams)
                }).then(function (x) { return x.json(); }).then(function (res) {
                    // if (!res || (res.status != '1') || (res.message != "OK"))
                    // 	throw Error(res.message)
                    return res;
                })];
        });
    });
}
exports.load = load;


/***/ }),
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */
/*!*****************************!*\
  !*** ./src/store/ethTxs.ts ***!
  \*****************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ 336);
var vue_ts_1 = __importDefault(__webpack_require__(/*! src/vue-ts */ 4));
function defaultStatus() {
    return { loading: false, txs: null, error: undefined };
}
function mutateWallet(state, wallet, update) {
    var id = utils_1.calcWalletId(wallet);
    if (!state.txLists[id])
        vue_ts_1.default.set(state.txLists, id, defaultStatus());
    Object
        .keys(update)
        .map(function (x) { return x; })
        .forEach(function (key) { return vue_ts_1.default.set(state.txLists[id], key, update[key]); });
}
function getStatus(state, wallet) {
    var id = utils_1.calcWalletId(wallet);
    return state.txLists[id] || defaultStatus();
}
exports.options = {
    state: {
        txLists: {}
    },
    getters: {
        ethtx_getTxs: function (state) { return function (wallet) { return getStatus(state, wallet).txs; }; },
        ethtx_hasError: function (state) { return function (wallet) { return getStatus(state, wallet).error; }; },
        ethtx_isLoading: function (state) { return function (wallet) { return getStatus(state, wallet).loading; }; },
    },
    mutations: {
        ethtx_setLoading: function (state, payload) { return mutateWallet(state, payload.wallet, { loading: payload.loading }); },
        ethtx_setTxs: function (state, payload) { return mutateWallet(state, payload.wallet, { txs: payload.txs }); },
        ethtx_error: function (state, payload) { return mutateWallet(state, payload.wallet, { error: payload.error }); },
    },
    actions: {
        ethtx_softUpdateTxs: function (store, payload) { return __awaiter(_this, void 0, void 0, function () {
            var txs, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (store.getters.ethtx_isLoading(payload.wallet))
                            return [2 /*return*/];
                        store.commit('ethtx_error', __assign({}, payload)); // clear error message
                        store.commit('ethtx_setLoading', __assign({}, payload, { loading: true }));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, store.getters.blockchains.eth(payload.wallet.chainId).loadTxList(payload.wallet)];
                    case 2:
                        txs = _a.sent();
                        txs.map(function (x) { return x.from; });
                        store.commit('ethtx_setTxs', __assign({}, payload, { txs: txs }));
                        store.commit('ethtx_setLoading', __assign({}, payload, { loading: false }));
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        store.commit('ethtx_error', __assign({}, payload, { error: error_1 }));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        ethtx_hardUpdateTxs: function (store, payload) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (store.getters.ethtx_isLoading(payload.wallet))
                            return [2 /*return*/];
                        store.commit('ethtx_setTxs', __assign({}, payload, { txs: null }));
                        return [4 /*yield*/, store.dispatch("ethtx_softUpdateTxs", payload)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }
    },
};


/***/ }),
/* 689 */
/*!*********************************************!*\
  !*** ./src/layouts/Default.vue + 4 modules ***!
  \*********************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/Default.vue?vue&type=template&id=5b4fd10e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/layouts/Default.vue?vue&type=template&id=5b4fd10e&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--5-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/Default.vue?vue&type=script&lang=js&
//
//
//
//
//
//
/* harmony default export */ var Defaultvue_type_script_lang_js_ = ({});
// CONCATENATED MODULE: ./src/layouts/Default.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_Defaultvue_type_script_lang_js_ = (Defaultvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/layouts/Default.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  layouts_Defaultvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

component.options.__file = "Default.vue"
/* harmony default export */ var Default = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 690 */
/*!******************************************!*\
  !*** ./src/layouts/Home.vue + 4 modules ***!
  \******************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./src/vue-ts.ts (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/MainPageFooter.vue (<- Module exports are unknown) */
/*! ModuleConcatenation bailout: Cannot concat with ./src/components/MainPageHeader.vue (<- Module exports are unknown) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/Home.vue?vue&type=template&id=4c062fcc&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('mp-header'),_vm._v(" "),_c('main',[_vm._t("default")],2),_vm._v(" "),_c('mp-footer')],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/layouts/Home.vue?vue&type=template&id=4c062fcc&scoped=true&

// EXTERNAL MODULE: ./src/vue-ts.ts
var vue_ts = __webpack_require__(4);
var vue_ts_default = /*#__PURE__*/__webpack_require__.n(vue_ts);

// EXTERNAL MODULE: ./src/components/MainPageHeader.vue
var MainPageHeader = __webpack_require__(337);

// EXTERNAL MODULE: ./src/components/MainPageFooter.vue
var MainPageFooter = __webpack_require__(338);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--5-0!./node_modules/vue-loader/lib??vue-loader-options!./src/layouts/Home.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var Homevue_type_script_lang_js_ = (vue_ts_default.a.extend({
  components: {
    "mp-header": MainPageHeader["default"],
    "mp-footer": MainPageFooter["default"]
  }
}));
// CONCATENATED MODULE: ./src/layouts/Home.vue?vue&type=script&lang=js&
 /* harmony default export */ var layouts_Homevue_type_script_lang_js_ = (Homevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/layouts/Home.vue?vue&type=style&index=0&id=4c062fcc&lang=scss&scoped=true&
var Homevue_type_style_index_0_id_4c062fcc_lang_scss_scoped_true_ = __webpack_require__(355);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/layouts/Home.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  layouts_Homevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "4c062fcc",
  null
  
)

component.options.__file = "Home.vue"
/* harmony default export */ var Home = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 691 */
/*!**********************************************************!*\
  !*** ./src/components/popup/GreyOverlay.vue + 2 modules ***!
  \**********************************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/GreyOverlay.vue?vue&type=template&id=cb375184&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"overlay-bg"},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popup/GreyOverlay.vue?vue&type=template&id=cb375184&scoped=true&

// EXTERNAL MODULE: ./src/components/popup/GreyOverlay.vue?vue&type=style&index=0&id=cb375184&lang=scss&scoped=true&
var GreyOverlayvue_type_style_index_0_id_cb375184_lang_scss_scoped_true_ = __webpack_require__(402);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/popup/GreyOverlay.vue

var script = {}



/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  render,
  staticRenderFns,
  false,
  null,
  "cb375184",
  null
  
)

component.options.__file = "GreyOverlay.vue"
/* harmony default export */ var GreyOverlay = __webpack_exports__["default"] = (component.exports);

/***/ }),
/* 692 */
/*!***************************************************!*\
  !*** ./src/components/popup/BigX.vue + 2 modules ***!
  \***************************************************/
/*! exports provided: default */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/components/popup/BigX.vue?vue&type=template&id=4437afc4&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"cross"},[_vm._v("×")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/popup/BigX.vue?vue&type=template&id=4437afc4&scoped=true&

// EXTERNAL MODULE: ./src/components/popup/BigX.vue?vue&type=style&index=0&id=4437afc4&lang=scss&scoped=true&
var BigXvue_type_style_index_0_id_4437afc4_lang_scss_scoped_true_ = __webpack_require__(400);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/components/popup/BigX.vue

var script = {}



/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  script,
  render,
  staticRenderFns,
  false,
  null,
  "4437afc4",
  null
  
)

component.options.__file = "BigX.vue"
/* harmony default export */ var BigX = __webpack_exports__["default"] = (component.exports);

/***/ })
/******/ ]);
//# sourceMappingURL=main.db26f4e4.js.map