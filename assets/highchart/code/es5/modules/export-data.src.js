/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/export-data
 * @requires highcharts
 * @requires highcharts/modules/exporting
 *
 * Export data module
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("highcharts"), require("highcharts")["AST"], require("highcharts")["Chart"]);
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/export-data", [["highcharts/highcharts"], ["highcharts/highcharts","AST"], ["highcharts/highcharts","Chart"]], factory);
	else if(typeof exports === 'object')
		exports["highcharts/modules/export-data"] = factory(require("highcharts"), require("highcharts")["AST"], require("highcharts")["Chart"]);
	else
		root["Highcharts"] = factory(root["Highcharts"], root["Highcharts"]["AST"], root["Highcharts"]["Chart"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__944__, __WEBPACK_EXTERNAL_MODULE__660__, __WEBPACK_EXTERNAL_MODULE__960__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 660:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__660__;

/***/ }),

/***/ 944:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

/***/ }),

/***/ 960:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__960__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ export_data_src; }
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es5/es-modules/Extensions/DownloadURL.js
/* *
 *
 *  (c) 2015-2025 Oystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Mixin for downloading content in the browser
 *
 * */

/* *
 *
 *  Imports
 *
 * */

var isSafari = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isSafari, win = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).win, doc = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).win.document;

var error = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).error;
/* *
 *
 *  Constants
 *
 * */
var domurl = win.URL || win.webkitURL || win;
/* *
 *
 *  Functions
 *
 * */
/**
 * Convert base64 dataURL to Blob if supported, otherwise returns undefined.
 *
 * @private
 * @function Highcharts.dataURLtoBlob
 *
 * @param {string} dataURL
 * URL to convert.
 *
 * @return {string | undefined}
 * Blob.
 */
function dataURLtoBlob(dataURL) {
    var parts = dataURL
            .replace(/filename=.*;/, '')
            .match(/data:([^;]*)(;base64)?,([A-Z+\d\/]+)/i);
    if (parts &&
        parts.length > 3 &&
        (win.atob) &&
        win.ArrayBuffer &&
        win.Uint8Array &&
        win.Blob &&
        (domurl.createObjectURL)) {
        // Try to convert data URL to Blob
        var binStr = win.atob(parts[3]),
            buf = new win.ArrayBuffer(binStr.length),
            binary = new win.Uint8Array(buf);
        for (var i = 0; i < binary.length; ++i) {
            binary[i] = binStr.charCodeAt(i);
        }
        return domurl
            .createObjectURL(new win.Blob([binary], { 'type': parts[1] }));
    }
}
/**
 * Download a data URL in the browser. Can also take a blob as first param.
 *
 * @private
 * @function Highcharts.downloadURL
 *
 * @param {string | global.URL} dataURL
 * The dataURL/Blob to download.
 * @param {string} filename
 * The name of the resulting file (w/extension).
 */
function downloadURL(dataURL, filename) {
    var nav = win.navigator,
        a = doc.createElement('a');
    // IE specific blob implementation
    // Don't use for normal dataURLs
    if (typeof dataURL !== 'string' &&
        !(dataURL instanceof String) &&
        nav.msSaveOrOpenBlob) {
        nav.msSaveOrOpenBlob(dataURL, filename);
        return;
    }
    dataURL = '' + dataURL;
    if (nav.userAgent.length > 1000 /* RegexLimits.shortLimit */) {
        throw new Error('Input too long');
    }
    var // Some browsers have limitations for data URL lengths. Try to convert
        // to Blob or fall back. Edge always needs that blob.
        isOldEdgeBrowser = /Edge\/\d+/.test(nav.userAgent), 
        // Safari on iOS needs Blob in order to download PDF
        safariBlob = (isSafari &&
            typeof dataURL === 'string' &&
            dataURL.indexOf('data:application/pdf') === 0);
    if (safariBlob || isOldEdgeBrowser || dataURL.length > 2000000) {
        dataURL = dataURLtoBlob(dataURL) || '';
        if (!dataURL) {
            throw new Error('Failed to convert to blob');
        }
    }
    // Try HTML5 download attr if supported
    if (typeof a.download !== 'undefined') {
        a.href = dataURL;
        a.download = filename; // HTML5 download attribute
        doc.body.appendChild(a);
        a.click();
        doc.body.removeChild(a);
    }
    else {
        // No download attr, just opening data URI
        try {
            if (!win.open(dataURL, 'chart')) {
                throw new Error('Failed to open window');
            }
        }
        catch (_a) {
            // If window.open failed, try location.href
            win.location.href = dataURL;
        }
    }
}
/**
 * Asynchronously downloads a script from a provided location.
 *
 * @private
 * @function Highcharts.getScript
 *
 * @param {string} scriptLocation
 * The location for the script to fetch.
 */
function getScript(scriptLocation) {
    return new Promise(function (resolve, reject) {
        var head = doc.getElementsByTagName('head')[0], script = doc.createElement('script');
        // Set type and location for the script
        script.type = 'text/javascript';
        script.src = scriptLocation;
        // Resolve in case of a succesful script fetching
        script.onload = function () {
            resolve();
        };
        // Reject in case of fail
        script.onerror = function () {
            reject(error("Error loading script ".concat(scriptLocation)));
        };
        // Append the newly created script
        head.appendChild(script);
    });
}
/* *
 *
 *  Default Export
 *
 * */
var DownloadURL = {
    dataURLtoBlob: dataURLtoBlob,
    downloadURL: downloadURL,
    getScript: getScript
};
/* harmony default export */ var Extensions_DownloadURL = (DownloadURL);

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","AST"],"commonjs":["highcharts","AST"],"commonjs2":["highcharts","AST"],"root":["Highcharts","AST"]}
var highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_ = __webpack_require__(660);
var highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default = /*#__PURE__*/__webpack_require__.n(highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_);
// EXTERNAL MODULE: external {"amd":["highcharts/highcharts","Chart"],"commonjs":["highcharts","Chart"],"commonjs2":["highcharts","Chart"],"root":["Highcharts","Chart"]}
var highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_ = __webpack_require__(960);
var highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_default = /*#__PURE__*/__webpack_require__.n(highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_);
;// ./code/es5/es-modules/Extensions/ExportData/ExportDataDefaults.js
/* *
 *
 *  Experimental data export module for Highcharts
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  Constants
 *
 * */
/**
 * @optionparent exporting
 * @private
 */
var exporting = {
    /**
     * Caption for the data table. Same as chart title by default. Set to
     * `false` to disable.
     *
     * @sample highcharts/export-data/multilevel-table
     *         Multiple table headers
     *
     * @type      {boolean | string}
     * @since     6.0.4
     * @requires  modules/export-data
     * @apioption exporting.tableCaption
     */
    /**
     * Options for exporting data to CSV or ExCel, or displaying the data
     * in a HTML table or a JavaScript structure.
     *
     * This module adds data export options to the export menu and provides
     * functions like `Exporting.getCSV`, `Exporting.getTable`,
     * `Exporting.getDataRows` and `Exporting.viewData`.
     *
     * The XLS converter is limited and only creates a HTML string that is
     * passed for download, which works but creates a warning before
     * opening. The workaround for this is to use a third party XLSX
     * converter, as demonstrated in the sample below.
     *
     * @sample  highcharts/export-data/categorized/ Categorized data
     * @sample  highcharts/export-data/stock-timeaxis/ Highcharts Stock time axis
     * @sample  highcharts/export-data/xlsx/
     *          Using a third party XLSX converter
     *
     * @since    6.0.0
     * @requires modules/export-data
     */
    csv: {
        /**
         *
         * Options for annotations in the export-data table.
         *
         * @since    8.2.0
         * @requires modules/export-data
         * @requires modules/annotations
         *
         *
         */
        annotations: {
            /**
            * The way to mark the separator for annotations
            * combined in one export-data table cell.
            *
            * @since    8.2.0
            * @requires modules/annotations
            */
            itemDelimiter: '; ',
            /**
            * When several labels are assigned to a specific point,
            * they will be displayed in one field in the table.
            *
            * @sample highcharts/export-data/join-annotations/
            *         Concatenate point annotations with itemDelimiter set.
            *
            * @since    8.2.0
            * @requires modules/annotations
            */
            join: false
        },
        /**
         * Formatter callback for the column headers. Parameters are:
         * - `item` - The series or axis object)
         * - `key` -  The point key, for example y or z
         * - `keyLength` - The amount of value keys for this item, for
         *   example a range series has the keys `low` and `high` so the
         *   key length is 2.
         *
         * If [useMultiLevelHeaders](#exporting.useMultiLevelHeaders) is
         * true, columnHeaderFormatter by default returns an object with
         * columnTitle and topLevelColumnTitle for each key. Columns with
         * the same topLevelColumnTitle have their titles merged into a
         * single cell with colspan for table/Excel export.
         *
         * If `useMultiLevelHeaders` is false, or for CSV export, it returns
         * the series name, followed by the key if there is more than one
         * key.
         *
         * For the axis it returns the axis title or "Category" or
         * "DateTime" by default.
         *
         * Return `false` to use Highcharts' proposed header.
         *
         * @sample highcharts/export-data/multilevel-table
         *         Multiple table headers
         *
         * @type {Function | null}
         */
        columnHeaderFormatter: null,
        /**
         * Which date format to use for exported dates on a datetime X axis.
         * See `Highcharts.dateFormat`.
         */
        dateFormat: '%Y-%m-%d %H:%M:%S',
        /**
         * Which decimal point to use for exported CSV. Defaults to the same
         * as the browser locale, typically `.` (English) or `,` (German,
         * French etc).
         *
         * @type  {string | null}
         * @since 6.0.4
         */
        decimalPoint: null,
        /**
         * The item delimiter in the exported data. Use `;` for direct
         * exporting to Excel. Defaults to a best guess based on the browser
         * locale. If the locale _decimal point_ is `,`, the `itemDelimiter`
         * defaults to `;`, otherwise the `itemDelimiter` defaults to `,`.
         *
         * @type {string | null}
         */
        itemDelimiter: null,
        /**
         * The line delimiter in the exported data, defaults to a newline.
         */
        lineDelimiter: '\n'
    },
    /**
     * An object consisting of definitions for the menu items in the context
     * menu. Each key value pair has a `key` that is referenced in the
     * [menuItems](#exporting.buttons.contextButton.menuItems) setting,
     * and a `value`, which is an object with the following properties:
     *
     * - **onclick:** The click handler for the menu item
     *
     * - **text:** The text for the menu item
     *
     * - **textKey:** If internationalization is required, the key to a language
     *   string
     *
     * Custom text for the "exitFullScreen" can be set only in lang options
     * (it is not a separate button).
     *
     * @sample highcharts/exporting/menuitemdefinitions/
     *         Menu item definitions
     * @sample highcharts/exporting/menuitemdefinitions-webp/
     *         Adding a custom menu item for WebP export
     *
     * @type     {Highcharts.Dictionary<Highcharts.ExportingMenuObject>}
     * @default  {"downloadCSV": {}, "downloadXLS": {}, "viewData": {}}
     * @requires modules/export-data
     */
    menuItemDefinitions: {
        /**
         * @ignore
         */
        downloadCSV: {
            textKey: 'downloadCSV',
            onclick: function () {
                var _a;
                (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.downloadCSV();
            }
        },
        /**
         * @ignore
         */
        downloadXLS: {
            textKey: 'downloadXLS',
            onclick: function () {
                var _a;
                (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.downloadXLS();
            }
        },
        /**
         * @ignore
         */
        viewData: {
            textKey: 'viewData',
            onclick: function () {
                var _a;
                (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.wrapLoading(this.exporting.toggleDataTable);
            }
        }
    },
    /**
     * Show a HTML table below the chart with the chart's current data.
     *
     * @sample highcharts/export-data/showtable/
     *         Show the table
     * @sample highcharts/studies/exporting-table-html
     *         Experiment with putting the table inside the subtitle to
     *         allow exporting it.
     *
     * @since    6.0.0
     * @requires modules/export-data
     */
    showTable: false,
    /**
     * Use multi level headers in data table. If [csv.columnHeaderFormatter
     * ](#exporting.csv.columnHeaderFormatter) is defined, it has to return
     * objects in order for multi level headers to work.
     *
     * @sample highcharts/export-data/multilevel-table
     *         Multiple table headers
     *
     * @since    6.0.4
     * @requires modules/export-data
     */
    useMultiLevelHeaders: true,
    /**
     * If using multi level table headers, use rowspans for headers that
     * have only one level.
     *
     * @sample highcharts/export-data/multilevel-table
     *         Multiple table headers
     *
     * @since    6.0.4
     * @requires modules/export-data
     */
    useRowspanHeaders: true,
    /**
     * Display a message when export is in progress.
     * Uses [Chart.setLoading()](/class-reference/Highcharts.Chart#setLoading)
     *
     * The message can be altered by changing [](#lang.exporting.exportInProgress)
     *
     * @since    11.3.0
     * @requires modules/export-data
     */
    showExportInProgress: true
};
/**
 * @optionparent lang
 * @private
 */
var lang = {
    /**
     * The text for the menu item.
     *
     * @since    6.0.0
     * @requires modules/export-data
     */
    downloadCSV: 'Download CSV',
    /**
     * The text for the menu item.
     *
     * @since    6.0.0
     * @requires modules/export-data
     */
    downloadXLS: 'Download XLS',
    /**
     * The text for exported table.
     *
     * @since    8.1.0
     * @requires modules/export-data
     */
    exportData: {
        /**
         * The annotation column title.
         */
        annotationHeader: 'Annotations',
        /**
         * The category column title.
         */
        categoryHeader: 'Category',
        /**
         * The category column title when axis type set to "datetime".
         */
        categoryDatetimeHeader: 'DateTime'
    },
    /**
     * The text for the menu item.
     *
     * @since    6.0.0
     * @requires modules/export-data
     */
    viewData: 'View data table',
    /**
     * The text for the menu item.
     *
     * @since    8.2.0
     * @requires modules/export-data
     */
    hideData: 'Hide data table',
    /**
     * Text to show when export is in progress.
     *
     * @since    11.3.0
     * @requires modules/export-data
     */
    exportInProgress: 'Exporting...'
};
/* *
 *
 *  Default Export
 *
 * */
var ExportDataDefaults = {
    exporting: exporting,
    lang: lang
};
/* harmony default export */ var ExportData_ExportDataDefaults = (ExportDataDefaults);
/* *
 *
 *  API Options
 *
 * */
/**
 * Callback that fires while exporting data. This allows the modification of
 * data rows before processed into the final format.
 *
 * @type      {Highcharts.ExportDataCallbackFunction}
 * @context   Highcharts.Chart
 * @requires  modules/export-data
 * @apioption chart.events.exportData
 */
/**
 * When set to `false` will prevent the series data from being included in
 * any form of data export.
 *
 * Since version 6.0.0 until 7.1.0 the option was existing undocumented
 * as `includeInCSVExport`.
 *
 * @type      {boolean}
 * @since     7.1.0
 * @requires  modules/export-data
 * @apioption plotOptions.series.includeInDataExport
 */
(''); // Keep doclets above in JS file

;// ./code/es5/es-modules/Extensions/ExportData/ExportData.js
/* *
 *
 *  Experimental data export module for Highcharts
 *
 *  (c) 2010-2025 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
// @todo
// - Set up systematic tests for all series types, paired with tests of the data
//   module importing the same data.

var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};



var getOptions = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).getOptions, setOptions = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).setOptions;

var ExportData_downloadURL = Extensions_DownloadURL.downloadURL;


var composed = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).composed, ExportData_doc = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).doc, ExportData_win = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).win;

var addEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).addEvent, defined = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).defined, extend = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).extend, find = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).find, fireEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).fireEvent, isNumber = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isNumber, pick = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).pick, pushUnique = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).pushUnique;
/* *
 *
 *  Composition
 *
 * */
var ExportData;
(function (ExportData) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Composition function.
     *
     * @private
     * @function Highcharts.Exporting#compose
     *
     * @param {ChartClass} ChartClass
     * Chart class.
     * @param {ExportingClass} ExportingClass
     * Exporting class.
     * @param {SeriesClass} SeriesClass
     * Series class.
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function compose(ChartClass, ExportingClass, SeriesClass) {
        var _a,
            _b,
            _c;
        // Check the composition registry for the Exporting
        if (!pushUnique(composed, 'ExportData')) {
            return;
        }
        // Adding wrappers for the deprecated functions
        extend((highcharts_Chart_commonjs_highcharts_Chart_commonjs2_highcharts_Chart_root_Highcharts_Chart_default()).prototype, {
            downloadCSV: function () {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.downloadCSV();
            },
            downloadXLS: function () {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.downloadXLS();
            },
            getCSV: function (useLocalDecimalPoint) {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.getCSV(useLocalDecimalPoint);
            },
            getDataRows: function (multiLevelHeaders) {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.getDataRows(multiLevelHeaders);
            },
            getTable: function (useLocalDecimalPoint) {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.getTable(useLocalDecimalPoint);
            },
            getTableAST: function (useLocalDecimalPoint) {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.getTableAST(useLocalDecimalPoint);
            },
            hideData: function () {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.hideData();
            },
            toggleDataTable: function (show) {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.toggleDataTable(show);
            },
            viewData: function () {
                var _a;
                return (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.viewData();
            }
        });
        var exportingProto = ExportingClass.prototype;
        if (!exportingProto.downloadCSV) {
            // Add an event listener to handle the showTable option
            addEvent(ChartClass, 'afterViewData', onChartAfterViewData);
            addEvent(ChartClass, 'render', onChartRenderer);
            addEvent(ChartClass, 'destroy', onChartDestroy);
            // Adding functions to the Exporting prototype
            exportingProto.downloadCSV = downloadCSV;
            exportingProto.downloadXLS = downloadXLS;
            exportingProto.getCSV = getCSV;
            exportingProto.getDataRows = getDataRows;
            exportingProto.getTable = getTable;
            exportingProto.getTableAST = getTableAST;
            exportingProto.hideData = hideData;
            exportingProto.toggleDataTable = toggleDataTable;
            exportingProto.wrapLoading = wrapLoading;
            exportingProto.viewData = viewData;
            // Update with defaults of the export data module
            setOptions(ExportData_ExportDataDefaults);
            // Additionaly, extend the menuItems with the export data variants
            var menuItems = (_c = (_b = (_a = getOptions().exporting) === null || _a === void 0 ? void 0 : _a.buttons) === null || _b === void 0 ? void 0 : _b.contextButton) === null || _c === void 0 ? void 0 : _c.menuItems;
            menuItems && menuItems.push('separator', 'downloadCSV', 'downloadXLS', 'viewData');
            var _d = SeriesClass.types,
                AreaRangeSeries = _d.arearange,
                GanttSeries = _d.gantt,
                MapSeries = _d.map,
                MapBubbleSeries = _d.mapbubble,
                TreemapSeries = _d.treemap,
                XRangeSeries = _d.xrange;
            if (AreaRangeSeries) {
                AreaRangeSeries.prototype.keyToAxis = {
                    low: 'y',
                    high: 'y'
                };
            }
            if (GanttSeries) {
                GanttSeries.prototype.exportKey = 'name';
                GanttSeries.prototype.keyToAxis = {
                    start: 'x',
                    end: 'x'
                };
            }
            if (MapSeries) {
                MapSeries.prototype.exportKey = 'name';
            }
            if (MapBubbleSeries) {
                MapBubbleSeries.prototype.exportKey = 'name';
            }
            if (TreemapSeries) {
                TreemapSeries.prototype.exportKey = 'name';
            }
            if (XRangeSeries) {
                XRangeSeries.prototype.keyToAxis = {
                    x2: 'x'
                };
            }
        }
    }
    ExportData.compose = compose;
    /**
     * Generates a data URL of CSV for local download in the browser. This is
     * the default action for a click on the 'Download CSV' button.
     *
     * See {@link Highcharts.Exporting#getCSV} to get the CSV data itself.
     *
     * @function Highcharts.Exporting#downloadCSV
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function downloadCSV() {
        var _this = this;
        this.wrapLoading(function () {
            var csv = _this.getCSV(true);
            ExportData_downloadURL(getBlobFromContent(csv, 'text/csv') ||
                'data:text/csv,\uFEFF' + encodeURIComponent(csv), _this.getFilename() + '.csv');
        });
    }
    /**
     * Generates a data URL of an XLS document for local download in the
     * browser. This is the default action for a click on the 'Download XLS'
     * button.
     *
     * See {@link Highcharts.Exporting#getTable} to get the table data itself.
     *
     * @function Highcharts.Exporting#downloadXLS
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function downloadXLS() {
        var _this = this;
        this.wrapLoading(function () {
            var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
                    'xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
                    'xmlns="http://www.w3.org/TR/REC-html40">' +
                    '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook>' +
                    '<x:ExcelWorksheets><x:ExcelWorksheet>' +
                    '<x:Name>Ark1</x:Name>' +
                    '<x:WorksheetOptions><x:DisplayGridlines/>' +
                    '</x:WorksheetOptions>' +
                    '</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>' +
                    '</xml><![endif]-->' +
                    '<style>td{border:none;font-family: Calibri, sans-serif;} ' +
                    '.number{mso-number-format:"0.00";} ' +
                    '.text{ mso-number-format:"\@";}</style>' +
                    '<meta name=ProgId content=Excel.Sheet>' +
                    '<meta charset=UTF-8>' +
                    '</head><body>' +
                    _this.getTable(true) +
                    '</body></html>', base64 = function (s) {
                    return ExportData_win.btoa(unescape(encodeURIComponent(s))); // #50
                };
            ExportData_downloadURL(getBlobFromContent(template, 'application/vnd.ms-excel') ||
                uri + base64(template), _this.getFilename() + '.xls');
        });
    }
    /**
     * Get a blob object from content, if blob is supported.
     *
     * @private
     * @function Highcharts.getBlobFromContent
     *
     * @param {string} content
     * The content to create the blob from.
     * @param {string} type
     * The type of the content.
     *
     * @return {string | undefined}
     * The blob object, or undefined if not supported.
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function getBlobFromContent(content, type) {
        var nav = ExportData_win.navigator,
            domurl = ExportData_win.URL || ExportData_win.webkitURL || ExportData_win;
        try {
            // MS specific
            if ((nav.msSaveOrOpenBlob) && ExportData_win.MSBlobBuilder) {
                var blob = new ExportData_win.MSBlobBuilder();
                blob.append(content);
                return blob.getBlob('image/svg+xml');
            }
            return domurl.createObjectURL(new ExportData_win.Blob(['\uFEFF' + content], // #7084
            { type: type }));
        }
        catch (e) {
            // Ignore
        }
    }
    /**
     * Returns the current chart data as a CSV string.
     *
     * @function Highcharts.Exporting#getCSV
     *
     * @param {boolean} [useLocalDecimalPoint]
     * Whether to use the local decimal point as detected from the browser. This
     * makes it easier to export data to Excel in the same locale as the user
     * is.
     *
     * @return {string}
     * CSV representation of the data.
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function getCSV(useLocalDecimalPoint) {
        var _a;
        var csv = '';
        var rows = this.getDataRows(), csvOptions = (_a = this.options) === null || _a === void 0 ? void 0 : _a.csv, decimalPoint = pick(csvOptions === null || csvOptions === void 0 ? void 0 : csvOptions.decimalPoint, (csvOptions === null || csvOptions === void 0 ? void 0 : csvOptions.itemDelimiter) !== ',' && useLocalDecimalPoint ?
                (1.1).toLocaleString()[1] :
                '.'), 
            // Use ';' for direct to Excel
            itemDelimiter = pick(csvOptions === null || csvOptions === void 0 ? void 0 : csvOptions.itemDelimiter, decimalPoint === ',' ? ';' : ','), 
            // '\n' isn't working with the js csv data extraction
            lineDelimiter = csvOptions === null || csvOptions === void 0 ? void 0 : csvOptions.lineDelimiter;
        // Transform the rows to CSV
        rows.forEach(function (row, i) {
            var val = '',
                j = row.length;
            while (j--) {
                val = row[j];
                if (typeof val === 'string') {
                    val = "\"".concat(val, "\"");
                }
                if (typeof val === 'number') {
                    if (decimalPoint !== '.') {
                        val = val.toString().replace('.', decimalPoint);
                    }
                }
                row[j] = val;
            }
            // The first row is the header - it defines the number of columns.
            // Empty columns between not-empty cells are covered in the
            // getDataRows method.
            // Now add empty values only to the end of the row so all rows have
            // the same number of columns, #17186
            row.length = rows.length ? rows[0].length : 0;
            // Add the values
            csv += row.join(itemDelimiter);
            // Add the line delimiter
            if (i < rows.length - 1) {
                csv += lineDelimiter;
            }
        });
        return csv;
    }
    /**
     * Returns a two-dimensional array containing the current chart data.
     *
     * @function Highcharts.Exporting#getDataRows
     *
     * @param {boolean} [multiLevelHeaders]
     * Use multilevel headers for the rows by default. Adds an extra row with
     * top level headers. If a custom columnHeaderFormatter is defined, this can
     * override the behavior.
     *
     * @return {Array<Array<(number | string)>>}
     * The current chart data
     *
     * @emits Highcharts.Chart#event:exportData
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function getDataRows(multiLevelHeaders) {
        var _a;
        var chart = this.chart,
            hasParallelCoords = chart.hasParallelCoordinates,
            time = chart.time,
            csvOptions = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.csv) || {},
            xAxes = chart.xAxis,
            rows = {},
            rowArr = [],
            topLevelColumnTitles = [],
            columnTitles = [],
            langOptions = chart.options.lang,
            exportDataOptions = langOptions.exportData,
            categoryHeader = exportDataOptions === null || exportDataOptions === void 0 ? void 0 : exportDataOptions.categoryHeader,
            categoryDatetimeHeader = exportDataOptions === null || exportDataOptions === void 0 ? void 0 : exportDataOptions.categoryDatetimeHeader, 
            // Options
            columnHeaderFormatter = function (item,
            key,
            keyLength) {
                if (csvOptions.columnHeaderFormatter) {
                    var s = csvOptions.columnHeaderFormatter(item,
            key,
            keyLength);
                if (s !== false) {
                    return s;
                }
            }
            if (!item && categoryHeader) {
                return categoryHeader;
            }
            if (!item.bindAxes &&
                categoryDatetimeHeader &&
                categoryHeader) {
                return (item.options.title &&
                    item.options.title.text) || (item.dateTime ?
                    categoryDatetimeHeader :
                    categoryHeader);
            }
            if (multiLevelHeaders) {
                return {
                    columnTitle: ((keyLength || 0) > 1 ?
                        key :
                        item.name) || '',
                    topLevelColumnTitle: item.name
                };
            }
            return item.name + ((keyLength || 0) > 1 ? ' (' + key + ')' : '');
        }, 
        // Map the categories for value axes
        getCategoryAndDateTimeMap = function (series, pointArrayMap, pIdx) {
            var categoryMap = {},
                dateTimeValueAxisMap = {};
            pointArrayMap.forEach(function (prop) {
                var axisName = ((series.keyToAxis && series.keyToAxis[prop]) ||
                        prop) + 'Axis', 
                    // Points in parallel coordinates refers to all yAxis
                    // not only `series.yAxis`
                    axis = isNumber(pIdx) ?
                        series.chart[axisName][pIdx] :
                        series[axisName];
                categoryMap[prop] = (axis && axis.categories) || [];
                dateTimeValueAxisMap[prop] = (axis && axis.dateTime);
            });
            return {
                categoryMap: categoryMap,
                dateTimeValueAxisMap: dateTimeValueAxisMap
            };
        }, 
        // Create point array depends if xAxis is category
        // or point.name is defined #13293
        getPointArray = function (series, xAxis) {
            var pointArrayMap = series.pointArrayMap || ['y'],
                namedPoints = series.data.some(function (d) {
                    return (typeof d.y !== 'undefined') && d.name;
            });
            // If there are points with a name, we also want the x value in
            // the table
            if (namedPoints &&
                xAxis &&
                !xAxis.categories &&
                series.exportKey !== 'name') {
                return __spreadArray(['x'], pointArrayMap, true);
            }
            return pointArrayMap;
        }, xAxisIndices = [];
        var xAxis,
            dataRows,
            columnTitleObj,
            i = 0, // Loop the series and index values
            x,
            xTitle;
        chart.series.forEach(function (series) {
            var _a;
            var keys = series.options.keys,
                xAxis = series.xAxis,
                pointArrayMap = keys || getPointArray(series,
                xAxis),
                valueCount = pointArrayMap.length,
                xTaken = !series.requireSorting && {},
                xAxisIndex = xAxes.indexOf(xAxis);
            var categoryAndDatetimeMap = getCategoryAndDateTimeMap(series,
                pointArrayMap),
                mockSeries,
                j;
            if (series.options.includeInDataExport !== false &&
                !series.options.isInternal &&
                series.visible !== false // #55
            ) {
                // Build a lookup for X axis index and the position of the first
                // series that belongs to that X axis. Includes -1 for non-axis
                // series types like pies.
                if (!find(xAxisIndices, function (index) {
                    return index[0] === xAxisIndex;
                })) {
                    xAxisIndices.push([xAxisIndex, i]);
                }
                // Compute the column headers and top level headers, usually the
                // same as series names
                j = 0;
                while (j < valueCount) {
                    columnTitleObj = columnHeaderFormatter(series, pointArrayMap[j], pointArrayMap.length);
                    columnTitles.push(columnTitleObj.columnTitle ||
                        columnTitleObj);
                    if (multiLevelHeaders) {
                        topLevelColumnTitles.push(columnTitleObj.topLevelColumnTitle ||
                            columnTitleObj);
                    }
                    j++;
                }
                mockSeries = {
                    chart: series.chart,
                    autoIncrement: series.autoIncrement,
                    options: series.options,
                    pointArrayMap: series.pointArrayMap,
                    index: series.index
                };
                // Export directly from options.data because we need the
                // uncropped data (#7913), and we need to support Boost (#7026).
                (_a = series.options.data) === null || _a === void 0 ? void 0 : _a.forEach(function eachData(options, pIdx) {
                    var _a;
                    var mockPoint = { series: mockSeries };
                    var key,
                        prop,
                        val;
                    // In parallel coordinates chart, each data point is
                    // connected to a separate yAxis, conform this
                    if (hasParallelCoords) {
                        categoryAndDatetimeMap = getCategoryAndDateTimeMap(series, pointArrayMap, pIdx);
                    }
                    series.pointClass.prototype.applyOptions.apply(mockPoint, [options]);
                    var name = series.data[pIdx] && series.data[pIdx].name;
                    key = ((_a = mockPoint.x) !== null && _a !== void 0 ? _a : '') + ',' + name;
                    j = 0;
                    // Pies, funnels, geo maps etc. use point name in X row
                    if (!xAxis ||
                        series.exportKey === 'name' ||
                        (!hasParallelCoords && xAxis && xAxis.hasNames) && name) {
                        key = name;
                    }
                    if (xTaken) {
                        if (xTaken[key]) {
                            key += '|' + pIdx;
                        }
                        xTaken[key] = true;
                    }
                    if (!rows[key]) {
                        rows[key] = [];
                        rows[key].xValues = [];
                        // ES5 replacement for Array.from / fill.
                        var arr = [];
                        for (var i_1 = 0; i_1 < series.chart.series.length; i_1++) {
                            arr[i_1] = 0;
                        }
                        // Create pointers array, holding information how many
                        // duplicates of specific x occurs in each series.
                        // Used for creating rows with duplicates.
                        rows[key].pointers = arr;
                        rows[key].pointers[series.index] = 1;
                    }
                    else {
                        // Handle duplicates (points with the same x), by
                        // creating extra rows based on pointers for better
                        // performance.
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        var modifiedKey = "" + key + ",".concat(rows[key].pointers[series.index]), originalKey = key;
                        if (rows[key].pointers[series.index]) {
                            if (!rows[modifiedKey]) {
                                rows[modifiedKey] = [];
                                rows[modifiedKey].xValues = [];
                                rows[modifiedKey].pointers = [];
                            }
                            key = modifiedKey;
                        }
                        rows[originalKey].pointers[series.index] += 1;
                    }
                    rows[key].x = mockPoint.x;
                    rows[key].name = name;
                    rows[key].xValues[xAxisIndex] = mockPoint.x;
                    while (j < valueCount) {
                        prop = pointArrayMap[j]; // `y`, `z` etc
                        val =
                            series.pointClass.prototype.getNestedProperty.apply(mockPoint, [prop]);
                        // Allow values from nested properties (#20470)
                        rows[key][i + j] = pick(
                        // Y axis category if present
                        categoryAndDatetimeMap.categoryMap[prop][val], 
                        // Datetime yAxis
                        categoryAndDatetimeMap.dateTimeValueAxisMap[prop] ?
                            time.dateFormat(csvOptions.dateFormat, val) :
                            null, 
                        // Linear/log yAxis
                        val);
                        j++;
                    }
                });
                i = i + j;
            }
        });
        // Make a sortable array
        for (x in rows) {
            if (Object.hasOwnProperty.call(rows, x)) {
                rowArr.push(rows[x]);
            }
        }
        var xAxisIndex,
            column;
        // Add computed column headers and top level headers to final row set
        dataRows = multiLevelHeaders ? [topLevelColumnTitles, columnTitles] :
            [columnTitles];
        i = xAxisIndices.length;
        while (i--) { // Start from end to splice in
            xAxisIndex = xAxisIndices[i][0];
            column = xAxisIndices[i][1];
            xAxis = xAxes[xAxisIndex];
            // Sort it by X values
            rowArr.sort(function (// eslint-disable-line no-loop-func
            a, b) {
                return a.xValues[xAxisIndex] - b.xValues[xAxisIndex];
            });
            // Add header row
            xTitle = columnHeaderFormatter(xAxis);
            dataRows[0].splice(column, 0, xTitle);
            if (multiLevelHeaders && dataRows[1]) {
                // If using multi level headers, we just added top level header.
                // Also add for sub level
                dataRows[1].splice(column, 0, xTitle);
            }
            // Add the category column
            rowArr.forEach(function (// eslint-disable-line no-loop-func
            row) {
                var category = row.name;
                if (xAxis && !defined(category)) {
                    if (xAxis.dateTime) {
                        if (row.x instanceof Date) {
                            row.x = row.x.getTime();
                        }
                        category = time.dateFormat(csvOptions.dateFormat, row.x);
                    }
                    else if (xAxis.categories) {
                        category = pick(xAxis.names[row.x], xAxis.categories[row.x], row.x);
                    }
                    else {
                        category = row.x;
                    }
                }
                // Add the X/date/category
                row.splice(column, 0, category);
            });
        }
        dataRows = dataRows.concat(rowArr);
        fireEvent(chart, 'exportData', { dataRows: dataRows });
        return dataRows;
    }
    /**
     * Build a HTML table with the chart's current data.
     *
     * @sample highcharts/export-data/viewdata/
     * View the data from the export menu
     *
     * @function Highcharts.Exporting#getTable
     *
     * @param {boolean} [useLocalDecimalPoint]
     * Whether to use the local decimal point as detected from the browser. This
     * makes it easier to export data to Excel in the same locale as the user
     * is.
     *
     * @return {string}
     * HTML representation of the data.
     *
     * @emits Highcharts.Chart#event:afterGetTable
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function getTable(useLocalDecimalPoint) {
        var serialize = function (node) {
                if (!node.tagName || node.tagName === '#text') {
                    // Text node
                    return node.textContent || '';
            }
            var attributes = node.attributes;
            var html = "<".concat(node.tagName);
            if (attributes) {
                Object.keys(attributes)
                    .forEach(function (key) {
                    var value = attributes[key];
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    html += " ".concat(key, "=\"").concat(value, "\"");
                });
            }
            html += '>';
            html += node.textContent || '';
            (node.children || []).forEach(function (child) {
                html += serialize(child);
            });
            html += "</".concat(node.tagName, ">");
            return html;
        };
        var tree = this.getTableAST(useLocalDecimalPoint);
        return serialize(tree);
    }
    /**
     * Get the AST of a HTML table representing the chart data.
     *
     * @private
     * @function Highcharts.Exporting#getTableAST
     *
     * @param {boolean} [useLocalDecimalPoint]
     * Whether to use the local decimal point as detected from the browser. This
     * makes it easier to export data to Excel in the same locale as the user
     * is.
     *
     * @return {Highcharts.ASTNode}
     * The abstract syntax tree
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function getTableAST(useLocalDecimalPoint) {
        var _a;
        var rowLength = 0;
        var treeChildren = [],
            exporting = this,
            chart = exporting.chart,
            options = chart.options,
            decimalPoint = useLocalDecimalPoint ? (1.1).toLocaleString()[1] : '.',
            useMultiLevelHeaders = pick(exporting.options.useMultiLevelHeaders,
            true),
            rows = exporting.getDataRows(useMultiLevelHeaders),
            topHeaders = useMultiLevelHeaders ? rows.shift() : null,
            subHeaders = rows.shift(), 
            // Compare two rows for equality
            isRowEqual = function (row1,
            row2) {
                var i = row1.length;
            if (row2.length === i) {
                while (i--) {
                    if (row1[i] !== row2[i]) {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
            return true;
        }, 
        // Get table cell HTML from value
        getCellHTMLFromValue = function (tagName, classes, attributes, value) {
            var textContent = pick(value, ''), className = 'highcharts-text' + (classes ? ' ' + classes : '');
            // Convert to string if number
            if (typeof textContent === 'number') {
                textContent = textContent.toString();
                if (decimalPoint === ',') {
                    textContent = textContent.replace('.', decimalPoint);
                }
                className = 'highcharts-number';
            }
            else if (!value) {
                className = 'highcharts-empty';
            }
            attributes = extend({ 'class': className }, attributes);
            return {
                tagName: tagName,
                attributes: attributes,
                textContent: textContent
            };
        }, 
        // Get table header markup from row data
        getTableHeaderHTML = function (topheaders, subheaders, rowLength) {
            var theadChildren = [];
            var i = 0,
                len = rowLength || subheaders && subheaders.length,
                next,
                cur,
                curColspan = 0,
                rowspan;
            // Clean up multiple table headers. Chart.getDataRows() returns
            // two levels of headers when using multilevel, not merged. We
            // need to merge identical headers, remove redundant headers,
            // and keep it all marked up nicely.
            if (useMultiLevelHeaders &&
                topheaders &&
                subheaders &&
                !isRowEqual(topheaders, subheaders)) {
                var trChildren = [];
                for (; i < len; ++i) {
                    cur = topheaders[i];
                    next = topheaders[i + 1];
                    if (cur === next) {
                        ++curColspan;
                    }
                    else if (curColspan) {
                        // Ended colspan
                        // Add cur to HTML with colspan.
                        trChildren.push(getCellHTMLFromValue('th', 'highcharts-table-topheading', {
                            scope: 'col',
                            colspan: curColspan + 1
                        }, cur));
                        curColspan = 0;
                    }
                    else {
                        // Cur is standalone. If it is same as sublevel,
                        // remove sublevel and add just toplevel.
                        if (cur === subheaders[i]) {
                            if (exporting.options.useRowspanHeaders) {
                                rowspan = 2;
                                delete subheaders[i];
                            }
                            else {
                                rowspan = 1;
                                subheaders[i] = '';
                            }
                        }
                        else {
                            rowspan = 1;
                        }
                        var cell = getCellHTMLFromValue('th', 'highcharts-table-topheading', { scope: 'col' }, cur);
                        if (rowspan > 1 && cell.attributes) {
                            cell.attributes.valign = 'top';
                            cell.attributes.rowspan = rowspan;
                        }
                        trChildren.push(cell);
                    }
                }
                theadChildren.push({
                    tagName: 'tr',
                    children: trChildren
                });
            }
            // Add the subheaders (the only headers if not using
            // multilevels)
            if (subheaders) {
                var trChildren = [];
                for (i = 0, len = subheaders.length; i < len; ++i) {
                    if (typeof subheaders[i] !== 'undefined') {
                        trChildren.push(getCellHTMLFromValue('th', null, { scope: 'col' }, subheaders[i]));
                    }
                }
                theadChildren.push({
                    tagName: 'tr',
                    children: trChildren
                });
            }
            return {
                tagName: 'thead',
                children: theadChildren
            };
        };
        // Add table caption
        var tableCaption = (exporting.options || {}).tableCaption;
        if (tableCaption !== false) {
            treeChildren.push({
                tagName: 'caption',
                attributes: {
                    'class': 'highcharts-table-caption'
                },
                textContent: typeof tableCaption === 'string' ?
                    tableCaption :
                    ((_a = options.title) === null || _a === void 0 ? void 0 : _a.text) || options.lang.chartTitle
            });
        }
        // Find longest row
        for (var i = 0, len = rows.length; i < len; ++i) {
            if (rows[i].length > rowLength) {
                rowLength = rows[i].length;
            }
        }
        // Add header
        treeChildren.push(getTableHeaderHTML(topHeaders, subHeaders || [], Math.max(rowLength, (subHeaders === null || subHeaders === void 0 ? void 0 : subHeaders.length) || 0)));
        // Transform the rows to HTML
        var trs = [];
        rows.forEach(function (row) {
            var trChildren = [];
            for (var j = 0; j < rowLength; j++) {
                // Make first column a header too. Especially important for
                // category axes, but also might make sense for datetime? Should
                // await user feedback on this.
                trChildren.push(getCellHTMLFromValue(j ? 'td' : 'th', null, j ? {} : { scope: 'row' }, row[j]));
            }
            trs.push({
                tagName: 'tr',
                children: trChildren
            });
        });
        treeChildren.push({
            tagName: 'tbody',
            children: trs
        });
        var e = {
                tree: {
                    tagName: 'table',
                    id: "highcharts-data-table-".concat(chart.index),
                    children: treeChildren
                }
            };
        fireEvent(chart, 'afterGetTableAST', e);
        return e.tree;
    }
    /**
     * Hide the data table when visible.
     *
     * @function Highcharts.Exporting#hideData
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function hideData() {
        this.toggleDataTable(false);
    }
    /**
     * Toggle showing data table.
     *
     * @private
     * @function Highcharts.Exporting#hideData
     *
     * @param {boolean} [show]
     * Whether to show data table or not.
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function toggleDataTable(show) {
        var _a;
        var chart = this.chart, 
            // Create the div
            createContainer = (show = pick(show, !this.isDataTableVisible)) &&
                !this.dataTableDiv;
        if (createContainer) {
            this.dataTableDiv = ExportData_doc.createElement('div');
            this.dataTableDiv.className = 'highcharts-data-table';
            // Insert after the chart container
            chart.renderTo.parentNode.insertBefore(this.dataTableDiv, chart.renderTo.nextSibling);
        }
        // Toggle the visibility
        if (this.dataTableDiv) {
            var style = this.dataTableDiv.style,
                oldDisplay = style.display;
            style.display = show ? 'block' : 'none';
            // Generate the data table
            if (show) {
                this.dataTableDiv.innerHTML = (highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default()).emptyHTML;
                var ast = new (highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default())([this.getTableAST()]);
                ast.addToDOM(this.dataTableDiv);
                fireEvent(chart, 'afterViewData', {
                    element: this.dataTableDiv,
                    wasHidden: createContainer || oldDisplay !== style.display
                });
            }
            else {
                fireEvent(chart, 'afterHideData');
            }
        }
        // Set the flag
        this.isDataTableVisible = show;
        // Change the menu item text
        var exportDivElements = this.divElements,
            options = this.options,
            menuItems = (_a = options.buttons) === null || _a === void 0 ? void 0 : _a.contextButton.menuItems,
            lang = chart.options.lang;
        if (options &&
            options.menuItemDefinitions &&
            lang &&
            lang.viewData &&
            lang.hideData &&
            menuItems &&
            exportDivElements) {
            var exportDivElement = exportDivElements[menuItems.indexOf('viewData')];
            if (exportDivElement) {
                highcharts_AST_commonjs_highcharts_AST_commonjs2_highcharts_AST_root_Highcharts_AST_default().setElementHTML(exportDivElement, this.isDataTableVisible ? lang.hideData : lang.viewData);
            }
        }
    }
    /**
     * View the data in a table below the chart.
     *
     * @function Highcharts.Exporting#viewData
     *
     * @emits Highcharts.Chart#event:afterViewData
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function viewData() {
        this.toggleDataTable(true);
    }
    /**
     * Wrapper function for the download functions, which handles showing and
     * hiding the loading message
     *
     * @private
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function wrapLoading(fn) {
        var _this = this;
        var chart = this.chart,
            showMessage = Boolean(this.options.showExportInProgress);
        // Prefer requestAnimationFrame if available
        var timeoutFn = ExportData_win.requestAnimationFrame || setTimeout;
        // Outer timeout avoids menu freezing on click
        timeoutFn(function () {
            showMessage &&
                chart.showLoading(chart.options.lang.exportInProgress);
            timeoutFn(function () {
                try {
                    fn.call(_this);
                }
                finally {
                    showMessage && chart.hideLoading();
                }
            });
        });
    }
    /**
     * Function that runs on the chart's 'afterViewData' event.
     *
     * @private
     * @function Highcharts.Chart#onChartAfterViewData
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function onChartAfterViewData() {
        var exporting = this.exporting,
            dataTableDiv = exporting === null || exporting === void 0 ? void 0 : exporting.dataTableDiv,
            getCellValue = function (tr,
            index) {
                return tr.children[index].textContent;
        }, comparer = function (index, ascending) {
            return function (a, b) {
                var sort = function (v1,
                    v2) { return (v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ?
                        v1 - v2 :
                        v1.toString().localeCompare(v2)); };
                return sort(getCellValue(ascending ? a : b, index), getCellValue(ascending ? b : a, index));
            };
        };
        if (dataTableDiv && exporting.options.allowTableSorting) {
            var row = dataTableDiv.querySelector('thead tr');
            if (row) {
                row.childNodes.forEach(function (th) {
                    var tableBody = dataTableDiv.querySelector('tbody');
                    th.addEventListener('click', function () {
                        var rows = __spreadArray([],
                            dataTableDiv.querySelectorAll('tr:not(thead tr)'),
                            true),
                            headers = __spreadArray([],
                            th.parentNode.children,
                            true);
                        if (exporting) {
                            rows.sort(comparer(headers.indexOf(th), exporting.ascendingOrderInTable =
                                !exporting.ascendingOrderInTable)).forEach(function (tr) {
                                tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(tr);
                            });
                            headers.forEach(function (th) {
                                [
                                    'highcharts-sort-ascending',
                                    'highcharts-sort-descending'
                                ].forEach(function (className) {
                                    if (th.classList.contains(className)) {
                                        th.classList.remove(className);
                                    }
                                });
                            });
                            th.classList.add(exporting.ascendingOrderInTable ?
                                'highcharts-sort-ascending' :
                                'highcharts-sort-descending');
                        }
                    });
                });
            }
        }
    }
    /**
     * Function that runs on the chart's 'render' event. Handle the showTable
     * option.
     *
     * @private
     * @function Highcharts.Chart#onChartRenderer
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function onChartRenderer() {
        var _a,
            _b,
            _c;
        if (((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.exporting) === null || _b === void 0 ? void 0 : _b.showTable) &&
            !this.options.chart.forExport) {
            (_c = this.exporting) === null || _c === void 0 ? void 0 : _c.viewData();
        }
    }
    /**
     * Function that runs on the chart's 'destroy' event. Handle cleaning up the
     * dataTableDiv element.
     *
     * @private
     * @function Highcharts.Chart#onChartDestroy
     *
     * @requires modules/exporting
     * @requires modules/export-data
     */
    function onChartDestroy() {
        var _a,
            _b;
        (_b = (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.dataTableDiv) === null || _b === void 0 ? void 0 : _b.remove();
    }
})(ExportData || (ExportData = {}));
/* *
 *
 * Default Export
 *
 * */
/* harmony default export */ var ExportData_ExportData = (ExportData);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Function callback to execute while data rows are processed for exporting.
 * This allows the modification of data rows before processed into the final
 * format.
 *
 * @callback Highcharts.ExportDataCallbackFunction
 * @extends Highcharts.EventCallbackFunction<Highcharts.Chart>
 *
 * @param {Highcharts.Chart} this
 * Chart context where the event occurred.
 *
 * @param {Highcharts.ExportDataEventObject} event
 * Event object with data rows that can be modified.
 */
/**
 * Contains information about the export data event.
 *
 * @interface Highcharts.ExportDataEventObject
 */ /**
* Contains the data rows for the current export task and can be modified.
* @name Highcharts.ExportDataEventObject#dataRows
* @type {Array<Array<string>>}
*/
(''); // Keeps doclets above in JS file

;// ./code/es5/es-modules/masters/modules/export-data.src.js





var G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
// Compatibility
G.dataURLtoBlob = G.dataURLtoBlob || Extensions_DownloadURL.dataURLtoBlob;
G.downloadURL = G.downloadURL || Extensions_DownloadURL.downloadURL;
// Compose
ExportData_ExportData.compose(G.Chart, G.Exporting, G.Series);
/* harmony default export */ var export_data_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});