/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/data-tools
 * @requires highcharts
 *
 * Highcharts
 *
 * (c) 2010-2025 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("highcharts"));
	else if(typeof define === 'function' && define.amd)
		define("highcharts/modules/data-tools", [["highcharts/highcharts"]], factory);
	else if(typeof exports === 'object')
		exports["highcharts/modules/data-tools"] = factory(require("highcharts"));
	else
		root["Highcharts"] = factory(root["Highcharts"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__944__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 944:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__944__;

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
  "default": function() { return /* binding */ data_tools_src; }
});

// EXTERNAL MODULE: external {"amd":["highcharts/highcharts"],"commonjs":["highcharts"],"commonjs2":["highcharts"],"root":["Highcharts"]}
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_ = __webpack_require__(944);
var highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default = /*#__PURE__*/__webpack_require__.n(highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_);
;// ./code/es5/es-modules/Data/Modifiers/DataModifier.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Gøran Slettemark
 *
 * */


var addEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).addEvent, fireEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).fireEvent, merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Abstract class to provide an interface for modifying a table.
 *
 */
var DataModifier = /** @class */ (function () {
    function DataModifier() {
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Runs a timed execution of the modifier on the given datatable.
     * Can be configured to run multiple times.
     *
     * @param {DataTable} dataTable
     * The datatable to execute
     *
     * @param {DataModifier.BenchmarkOptions} options
     * Options. Currently supports `iterations` for number of iterations.
     *
     * @return {Array<number>}
     * An array of times in milliseconds
     *
     */
    DataModifier.prototype.benchmark = function (dataTable, options) {
        var results = [];
        var modifier = this;
        var execute = function () {
                modifier.modifyTable(dataTable);
            modifier.emit({
                type: 'afterBenchmarkIteration'
            });
        };
        var defaultOptions = {
                iterations: 1
            };
        var iterations = merge(defaultOptions,
            options).iterations;
        modifier.on('afterBenchmarkIteration', function () {
            if (results.length === iterations) {
                modifier.emit({
                    type: 'afterBenchmark',
                    results: results
                });
                return;
            }
            // Run again
            execute();
        });
        var times = {
                startTime: 0,
                endTime: 0
            };
        // Add timers
        modifier.on('modify', function () {
            times.startTime = window.performance.now();
        });
        modifier.on('afterModify', function () {
            times.endTime = window.performance.now();
            results.push(times.endTime - times.startTime);
        });
        // Initial run
        execute();
        return results;
    };
    /**
     * Emits an event on the modifier to all registered callbacks of this event.
     *
     * @param {DataModifier.Event} [e]
     * Event object containing additonal event information.
     */
    DataModifier.prototype.emit = function (e) {
        fireEvent(this, e.type, e);
    };
    /**
     * Returns a modified copy of the given table.
     *
     * @param {Highcharts.DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<Highcharts.DataTable>}
     * Table with `modified` property as a reference.
     */
    DataModifier.prototype.modify = function (table, eventDetail) {
        var modifier = this;
        return new Promise(function (resolve, reject) {
            if (table.modified === table) {
                table.modified = table.clone(false, eventDetail);
            }
            try {
                resolve(modifier.modifyTable(table, eventDetail));
            }
            catch (e) {
                modifier.emit({
                    type: 'error',
                    detail: eventDetail,
                    table: table
                });
                reject(e);
            }
        });
    };
    /**
     * Applies partial modifications of a cell change to the property `modified`
     * of the given modified table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {string} columnName
     * Column name of changed cell.
     *
     * @param {number|undefined} rowIndex
     * Row index of changed cell.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Changed cell value.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    DataModifier.prototype.modifyCell = function (table, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    columnName, rowIndex, cellValue, eventDetail
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ) {
        return this.modifyTable(table);
    };
    /**
     * Applies partial modifications of column changes to the property
     * `modified` of the given table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Changed columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex=0]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    DataModifier.prototype.modifyColumns = function (table, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    columns, rowIndex, eventDetail
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ) {
        return this.modifyTable(table);
    };
    /**
     * Applies partial modifications of row changes to the property `modified`
     * of the given table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
     * Changed rows.
     *
     * @param {number} [rowIndex]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    DataModifier.prototype.modifyRows = function (table, 
    /* eslint-disable @typescript-eslint/no-unused-vars */
    rows, rowIndex, eventDetail
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ) {
        return this.modifyTable(table);
    };
    /**
     * Registers a callback for a specific modifier event.
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {DataEventEmitter.Callback} callback
     * Function to register for an modifier callback.
     *
     * @return {Function}
     * Function to unregister callback from the modifier event.
     */
    DataModifier.prototype.on = function (type, callback) {
        return addEvent(this, type, callback);
    };
    return DataModifier;
}());
/* *
 *
 *  Class Namespace
 *
 * */
/**
 * Additionally provided types for modifier events and options.
 */
(function (DataModifier) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    /**
     * Registry as a record object with modifier names and their class
     * constructor.
     */
    DataModifier.types = {};
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Adds a modifier class to the registry. The modifier class has to provide
     * the `DataModifier.options` property and the `DataModifier.modifyTable`
     * method to modify the table.
     *
     * @private
     *
     * @param {string} key
     * Registry key of the modifier class.
     *
     * @param {DataModifierType} DataModifierClass
     * Modifier class (aka class constructor) to register.
     *
     * @return {boolean}
     * Returns true, if the registration was successful. False is returned, if
     * their is already a modifier registered with this key.
     */
    function registerType(key, DataModifierClass) {
        return (!!key &&
            !DataModifier.types[key] &&
            !!(DataModifier.types[key] = DataModifierClass));
    }
    DataModifier.registerType = registerType;
})(DataModifier || (DataModifier = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Modifiers_DataModifier = (DataModifier);

;// ./code/es5/es-modules/Data/ColumnUtils.js
/* *
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Dawid Dragula
 *
 * */
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Utility functions for columns that can be either arrays or typed arrays.
 * @private
 */
var ColumnUtils;
(function (ColumnUtils) {
    /* *
    *
    *  Declarations
    *
    * */
    /* *
    *
    * Functions
    *
    * */
    /**
     * Sets the length of the column array.
     *
     * @param {DataTable.Column} column
     * Column to be modified.
     *
     * @param {number} length
     * New length of the column.
     *
     * @param {boolean} asSubarray
     * If column is a typed array, return a subarray instead of a new array. It
     * is faster `O(1)`, but the entire buffer will be kept in memory until all
     * views to it are destroyed. Default is `false`.
     *
     * @return {DataTable.Column}
     * Modified column.
     *
     * @private
     */
    function setLength(column, length, asSubarray) {
        if (Array.isArray(column)) {
            column.length = length;
            return column;
        }
        return column[asSubarray ? 'subarray' : 'slice'](0, length);
    }
    ColumnUtils.setLength = setLength;
    /**
     * Splices a column array.
     *
     * @param {DataTable.Column} column
     * Column to be modified.
     *
     * @param {number} start
     * Index at which to start changing the array.
     *
     * @param {number} deleteCount
     * An integer indicating the number of old array elements to remove.
     *
     * @param {boolean} removedAsSubarray
     * If column is a typed array, return a subarray instead of a new array. It
     * is faster `O(1)`, but the entire buffer will be kept in memory until all
     * views to it are destroyed. Default is `true`.
     *
     * @param {Array<number>|TypedArray} items
     * The elements to add to the array, beginning at the start index. If you
     * don't specify any elements, `splice()` will only remove elements from the
     * array.
     *
     * @return {SpliceResult}
     * Object containing removed elements and the modified column.
     *
     * @private
     */
    function splice(column, start, deleteCount, removedAsSubarray, items) {
        if (items === void 0) { items = []; }
        if (Array.isArray(column)) {
            if (!Array.isArray(items)) {
                items = Array.from(items);
            }
            return {
                removed: column.splice.apply(column, __spreadArray([start, deleteCount], items, false)),
                array: column
            };
        }
        var Constructor = Object.getPrototypeOf(column)
                .constructor;
        var removed = column[removedAsSubarray ? 'subarray' : 'slice'](start,
            start + deleteCount);
        var newLength = column.length - deleteCount + items.length;
        var result = new Constructor(newLength);
        result.set(column.subarray(0, start), 0);
        result.set(items, start);
        result.set(column.subarray(start + deleteCount), start + items.length);
        return {
            removed: removed,
            array: result
        };
    }
    ColumnUtils.splice = splice;
})(ColumnUtils || (ColumnUtils = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Data_ColumnUtils = (ColumnUtils);

;// ./code/es5/es-modules/Data/DataTableCore.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Gøran Slettemark
 *  - Torstein Hønsi
 *
 * */


var setLength = Data_ColumnUtils.setLength, splice = Data_ColumnUtils.splice;

var DataTableCore_fireEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).fireEvent, objectEach = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).objectEach, uniqueKey = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).uniqueKey;
/* *
 *
 *  Class
 *
 * */
/**
 * Class to manage columns and rows in a table structure. It provides methods
 * to add, remove, and manipulate columns and rows, as well as to retrieve data
 * from specific cells.
 *
 * @class
 * @name Highcharts.DataTable
 *
 * @param {Highcharts.DataTableOptions} [options]
 * Options to initialize the new DataTable instance.
 */
var DataTableCore = /** @class */ (function () {
    /**
     * Constructs an instance of the DataTable class.
     *
     * @example
     * const dataTable = new Highcharts.DataTableCore({
     *   columns: {
     *     year: [2020, 2021, 2022, 2023],
     *     cost: [11, 13, 12, 14],
     *     revenue: [12, 15, 14, 18]
     *   }
     * });

     *
     * @param {Highcharts.DataTableOptions} [options]
     * Options to initialize the new DataTable instance.
     */
    function DataTableCore(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        /**
         * Whether the ID was automatic generated or given in the constructor.
         *
         * @name Highcharts.DataTable#autoId
         * @type {boolean}
         */
        this.autoId = !options.id;
        this.columns = {};
        /**
         * ID of the table for identification purposes.
         *
         * @name Highcharts.DataTable#id
         * @type {string}
         */
        this.id = (options.id || uniqueKey());
        this.modified = this;
        this.rowCount = 0;
        this.versionTag = uniqueKey();
        var rowCount = 0;
        objectEach(options.columns || {}, function (column, columnName) {
            _this.columns[columnName] = column.slice();
            rowCount = Math.max(rowCount, column.length);
        });
        this.applyRowCount(rowCount);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Applies a row count to the table by setting the `rowCount` property and
     * adjusting the length of all columns.
     *
     * @private
     * @param {number} rowCount The new row count.
     */
    DataTableCore.prototype.applyRowCount = function (rowCount) {
        var _this = this;
        this.rowCount = rowCount;
        objectEach(this.columns, function (column, columnName) {
            if (column.length !== rowCount) {
                _this.columns[columnName] = setLength(column, rowCount);
            }
        });
    };
    /**
     * Delete rows. Simplified version of the full
     * `DataTable.deleteRows` method.
     *
     * @param {number} rowIndex
     * The start row index
     *
     * @param {number} [rowCount=1]
     * The number of rows to delete
     *
     * @return {void}
     *
     * @emits #afterDeleteRows
     */
    DataTableCore.prototype.deleteRows = function (rowIndex, rowCount) {
        var _this = this;
        if (rowCount === void 0) { rowCount = 1; }
        if (rowCount > 0 && rowIndex < this.rowCount) {
            var length_1 = 0;
            objectEach(this.columns, function (column, columnName) {
                _this.columns[columnName] =
                    splice(column, rowIndex, rowCount).array;
                length_1 = column.length;
            });
            this.rowCount = length_1;
        }
        DataTableCore_fireEvent(this, 'afterDeleteRows', { rowIndex: rowIndex, rowCount: rowCount });
        this.versionTag = uniqueKey();
    };
    /**
     * Fetches the given column by the canonical column name. Simplified version
     * of the full `DataTable.getRow` method, always returning by reference.
     *
     * @param {string} columnName
     * Name of the column to get.
     *
     * @return {Highcharts.DataTableColumn|undefined}
     * A copy of the column, or `undefined` if not found.
     */
    DataTableCore.prototype.getColumn = function (columnName, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asReference) {
        return this.columns[columnName];
    };
    /**
     * Retrieves all or the given columns. Simplified version of the full
     * `DataTable.getColumns` method, always returning by reference.
     *
     * @param {Array<string>} [columnNames]
     * Column names to retrieve.
     *
     * @return {Highcharts.DataTableColumnCollection}
     * Collection of columns. If a requested column was not found, it is
     * `undefined`.
     */
    DataTableCore.prototype.getColumns = function (columnNames, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    asReference) {
        var _this = this;
        return (columnNames || Object.keys(this.columns)).reduce(function (columns, columnName) {
            columns[columnName] = _this.columns[columnName];
            return columns;
        }, {});
    };
    /**
     * Retrieves the row at a given index.
     *
     * @param {number} rowIndex
     * Row index to retrieve. First row has index 0.
     *
     * @param {Array<string>} [columnNames]
     * Column names to retrieve.
     *
     * @return {Record<string, number|string|undefined>|undefined}
     * Returns the row values, or `undefined` if not found.
     */
    DataTableCore.prototype.getRow = function (rowIndex, columnNames) {
        var _this = this;
        return (columnNames || Object.keys(this.columns)).map(function (key) { var _a; return (_a = _this.columns[key]) === null || _a === void 0 ? void 0 : _a[rowIndex]; });
    };
    /**
     * Sets cell values for a column. Will insert a new column, if not found.
     *
     * @param {string} columnName
     * Column name to set.
     *
     * @param {Highcharts.DataTableColumn} [column]
     * Values to set in the column.
     *
     * @param {number} [rowIndex]
     * Index of the first row to change. (Default: 0)
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setColumns
     * @emits #afterSetColumns
     */
    DataTableCore.prototype.setColumn = function (columnName, column, rowIndex, eventDetail) {
        var _a;
        if (column === void 0) { column = []; }
        if (rowIndex === void 0) { rowIndex = 0; }
        this.setColumns((_a = {}, _a[columnName] = column, _a), rowIndex, eventDetail);
    };
    /**
     * Sets cell values for multiple columns. Will insert new columns, if not
     * found. Simplified version of the full `DataTableCore.setColumns`, limited
     * to full replacement of the columns (undefined `rowIndex`).
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex]
     * Index of the first row to change. Ignored in the `DataTableCore`, as it
     * always replaces the full column.
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setColumns
     * @emits #afterSetColumns
     */
    DataTableCore.prototype.setColumns = function (columns, rowIndex, eventDetail) {
        var _this = this;
        var rowCount = this.rowCount;
        objectEach(columns, function (column, columnName) {
            _this.columns[columnName] = column.slice();
            rowCount = column.length;
        });
        this.applyRowCount(rowCount);
        if (!(eventDetail === null || eventDetail === void 0 ? void 0 : eventDetail.silent)) {
            DataTableCore_fireEvent(this, 'afterSetColumns');
            this.versionTag = uniqueKey();
        }
    };
    /**
     * Sets cell values of a row. Will insert a new row if no index was
     * provided, or if the index is higher than the total number of table rows.
     * A simplified version of the full `DateTable.setRow`, limited to objects.
     *
     * @param {Record<string, number|string|undefined>} row
     * Cell values to set.
     *
     * @param {number} [rowIndex]
     * Index of the row to set. Leave `undefined` to add as a new row.
     *
     * @param {boolean} [insert]
     * Whether to insert the row at the given index, or to overwrite the row.
     *
     * @param {Record<string, (boolean|number|string|null|undefined)>} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #afterSetRows
     */
    DataTableCore.prototype.setRow = function (row, rowIndex, insert, eventDetail) {
        if (rowIndex === void 0) { rowIndex = this.rowCount; }
        var columns = this.columns,
            indexRowCount = insert ? this.rowCount + 1 : rowIndex + 1;
        objectEach(row, function (cellValue, columnName) {
            var column = columns[columnName] ||
                    (eventDetail === null || eventDetail === void 0 ? void 0 : eventDetail.addColumns) !== false && new Array(indexRowCount);
            if (column) {
                if (insert) {
                    column = splice(column, rowIndex, 0, true, [cellValue]).array;
                }
                else {
                    column[rowIndex] = cellValue;
                }
                columns[columnName] = column;
            }
        });
        if (indexRowCount > this.rowCount) {
            this.applyRowCount(indexRowCount);
        }
        if (!(eventDetail === null || eventDetail === void 0 ? void 0 : eventDetail.silent)) {
            DataTableCore_fireEvent(this, 'afterSetRows');
            this.versionTag = uniqueKey();
        }
    };
    return DataTableCore;
}());
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Data_DataTableCore = (DataTableCore);
/* *
 *
 *  API Declarations
 *
 * */
/**
 * A typed array.
 * @typedef {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} Highcharts.TypedArray
 * //**
 * A column of values in a data table.
 * @typedef {Array<boolean|null|number|string|undefined>|Highcharts.TypedArray} Highcharts.DataTableColumn
 */ /**
* A collection of data table columns defined by a object where the key is the
* column name and the value is an array of the column values.
* @typedef {Record<string, Highcharts.DataTableColumn>} Highcharts.DataTableColumnCollection
*/
/**
 * Options for the `DataTable` or `DataTableCore` classes.
 * @interface Highcharts.DataTableOptions
 */ /**
* The column options for the data table. The columns are defined by an object
* where the key is the column ID and the value is an array of the column
* values.
*
* @name Highcharts.DataTableOptions.columns
* @type {Highcharts.DataTableColumnCollection|undefined}
*/ /**
* Custom ID to identify the new DataTable instance.
*
* @name Highcharts.DataTableOptions.id
* @type {string|undefined}
*/
(''); // Keeps doclets above in JS file

;// ./code/es5/es-modules/Data/DataTable.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Gøran Slettemark
 *  - Jomar Hønsi
 *  - Dawid Dragula
 *
 * */

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var DataTable_addEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).addEvent, defined = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).defined, extend = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).extend, DataTable_fireEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).fireEvent, isNumber = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isNumber, DataTable_uniqueKey = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).uniqueKey;
/* *
 *
 *  Class
 *
 * */
/**
 * Class to manage columns and rows in a table structure. It provides methods
 * to add, remove, and manipulate columns and rows, as well as to retrieve data
 * from specific cells.
 *
 * @class
 * @name Highcharts.DataTable
 *
 * @param {Highcharts.DataTableOptions} [options]
 * Options to initialize the new DataTable instance.
 */
var DataTable = /** @class */ (function (_super) {
    __extends(DataTable, _super);
    /* *
     *
     *  Constructor
     *
     * */
    function DataTable(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this,
            options) || this;
        _this.modified = _this;
        return _this;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * Tests whether a row contains only `null` values or is equal to
     * DataTable.NULL. If all columns have `null` values, the function returns
     * `true`. Otherwise, it returns `false` to indicate that the row contains
     * at least one non-null value.
     *
     * @function Highcharts.DataTable.isNull
     *
     * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
     * Row to test.
     *
     * @return {boolean}
     * Returns `true`, if the row contains only null, otherwise `false`.
     *
     * @example
     * if (DataTable.isNull(row)) {
     *   // handle null row
     * }
     */
    DataTable.isNull = function (row) {
        if (row === DataTable.NULL) {
            return true;
        }
        if (row instanceof Array) {
            if (!row.length) {
                return false;
            }
            for (var i = 0, iEnd = row.length; i < iEnd; ++i) {
                if (row[i] !== null) {
                    return false;
                }
            }
        }
        else {
            var columnNames = Object.keys(row);
            if (!columnNames.length) {
                return false;
            }
            for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                if (row[columnNames[i]] !== null) {
                    return false;
                }
            }
        }
        return true;
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Returns a clone of this table. The cloned table is completely independent
     * of the original, and any changes made to the clone will not affect
     * the original table.
     *
     * @function Highcharts.DataTable#clone
     *
     * @param {boolean} [skipColumns]
     * Whether to clone columns or not.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Clone of this data table.
     *
     * @emits #cloneTable
     * @emits #afterCloneTable
     */
    DataTable.prototype.clone = function (skipColumns, eventDetail) {
        var table = this,
            tableOptions = {};
        table.emit({ type: 'cloneTable', detail: eventDetail });
        if (!skipColumns) {
            tableOptions.columns = table.columns;
        }
        if (!table.autoId) {
            tableOptions.id = table.id;
        }
        var tableClone = new DataTable(tableOptions);
        if (!skipColumns) {
            tableClone.versionTag = table.versionTag;
            tableClone.originalRowIndexes = table.originalRowIndexes;
            tableClone.localRowIndexes = table.localRowIndexes;
        }
        table.emit({
            type: 'afterCloneTable',
            detail: eventDetail,
            tableClone: tableClone
        });
        return tableClone;
    };
    /**
     * Deletes columns from the table.
     *
     * @function Highcharts.DataTable#deleteColumns
     *
     * @param {Array<string>} [columnNames]
     * Names of columns to delete. If no array is provided, all
     * columns will be deleted.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTableColumnCollection|undefined}
     * Returns the deleted columns, if found.
     *
     * @emits #deleteColumns
     * @emits #afterDeleteColumns
     */
    DataTable.prototype.deleteColumns = function (columnNames, eventDetail) {
        var table = this,
            columns = table.columns,
            deletedColumns = {},
            modifiedColumns = {},
            modifier = table.modifier,
            rowCount = table.rowCount;
        columnNames = (columnNames || Object.keys(columns));
        if (columnNames.length) {
            table.emit({
                type: 'deleteColumns',
                columnNames: columnNames,
                detail: eventDetail
            });
            for (var i = 0, iEnd = columnNames.length, column = void 0, columnName = void 0; i < iEnd; ++i) {
                columnName = columnNames[i];
                column = columns[columnName];
                if (column) {
                    deletedColumns[columnName] = column;
                    modifiedColumns[columnName] = new Array(rowCount);
                }
                delete columns[columnName];
            }
            if (!Object.keys(columns).length) {
                table.rowCount = 0;
                this.deleteRowIndexReferences();
            }
            if (modifier) {
                modifier.modifyColumns(table, modifiedColumns, 0, eventDetail);
            }
            table.emit({
                type: 'afterDeleteColumns',
                columns: deletedColumns,
                columnNames: columnNames,
                detail: eventDetail
            });
            return deletedColumns;
        }
    };
    /**
     * Deletes the row index references. This is useful when the original table
     * is deleted, and the references are no longer needed. This table is
     * then considered an original table or a table that has the same row's
     * order as the original table.
     */
    DataTable.prototype.deleteRowIndexReferences = function () {
        delete this.originalRowIndexes;
        delete this.localRowIndexes;
        // Here, in case of future need, can be implemented updating of the
        // modified tables' row indexes references.
    };
    /**
     * Deletes rows in this table.
     *
     * @function Highcharts.DataTable#deleteRows
     *
     * @param {number} [rowIndex]
     * Index to start delete of rows. If not specified, all rows will be
     * deleted.
     *
     * @param {number} [rowCount=1]
     * Number of rows to delete.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Array<Highcharts.DataTableRow>}
     * Returns the deleted rows, if found.
     *
     * @emits #deleteRows
     * @emits #afterDeleteRows
     */
    DataTable.prototype.deleteRows = function (rowIndex, rowCount, eventDetail) {
        if (rowCount === void 0) { rowCount = 1; }
        var table = this,
            deletedRows = [],
            modifiedRows = [],
            modifier = table.modifier;
        table.emit({
            type: 'deleteRows',
            detail: eventDetail,
            rowCount: rowCount,
            rowIndex: (rowIndex || 0)
        });
        if (typeof rowIndex === 'undefined') {
            rowIndex = 0;
            rowCount = table.rowCount;
        }
        if (rowCount > 0 && rowIndex < table.rowCount) {
            var columns = table.columns,
                columnNames = Object.keys(columns);
            for (var i = 0, iEnd = columnNames.length, column = void 0, deletedCells = void 0, columnName = void 0; i < iEnd; ++i) {
                columnName = columnNames[i];
                column = columns[columnName];
                var result = Data_ColumnUtils.splice(column,
                    rowIndex,
                    rowCount);
                deletedCells = result.removed;
                columns[columnName] = column = result.array;
                if (!i) {
                    table.rowCount = column.length;
                }
                for (var j = 0, jEnd = deletedCells.length; j < jEnd; ++j) {
                    deletedRows[j] = (deletedRows[j] || []);
                    deletedRows[j][i] = deletedCells[j];
                }
                modifiedRows.push(new Array(iEnd));
            }
        }
        if (modifier) {
            modifier.modifyRows(table, modifiedRows, (rowIndex || 0), eventDetail);
        }
        table.emit({
            type: 'afterDeleteRows',
            detail: eventDetail,
            rowCount: rowCount,
            rowIndex: (rowIndex || 0),
            rows: deletedRows
        });
        return deletedRows;
    };
    /**
     * Emits an event on this table to all registered callbacks of the given
     * event.
     * @private
     *
     * @param {DataTable.Event} e
     * Event object with event information.
     */
    DataTable.prototype.emit = function (e) {
        if ([
            'afterDeleteColumns',
            'afterDeleteRows',
            'afterSetCell',
            'afterSetColumns',
            'afterSetRows'
        ].includes(e.type)) {
            this.versionTag = DataTable_uniqueKey();
        }
        DataTable_fireEvent(this, e.type, e);
    };
    /**
     * Fetches a single cell value.
     *
     * @function Highcharts.DataTable#getCell
     *
     * @param {string} columnName
     * Column name of the cell to retrieve.
     *
     * @param {number} rowIndex
     * Row index of the cell to retrieve.
     *
     * @return {Highcharts.DataTableCellType|undefined}
     * Returns the cell value or `undefined`.
     */
    DataTable.prototype.getCell = function (columnName, rowIndex) {
        var table = this;
        var column = table.columns[columnName];
        if (column) {
            return column[rowIndex];
        }
    };
    /**
     * Fetches a cell value for the given row as a boolean.
     *
     * @function Highcharts.DataTable#getCellAsBoolean
     *
     * @param {string} columnName
     * Column name to fetch.
     *
     * @param {number} rowIndex
     * Row index to fetch.
     *
     * @return {boolean}
     * Returns the cell value of the row as a boolean.
     */
    DataTable.prototype.getCellAsBoolean = function (columnName, rowIndex) {
        var table = this;
        var column = table.columns[columnName];
        return !!(column && column[rowIndex]);
    };
    /**
     * Fetches a cell value for the given row as a number.
     *
     * @function Highcharts.DataTable#getCellAsNumber
     *
     * @param {string} columnName
     * Column name or to fetch.
     *
     * @param {number} rowIndex
     * Row index to fetch.
     *
     * @param {boolean} [useNaN]
     * Whether to return NaN instead of `null` and `undefined`.
     *
     * @return {number|null}
     * Returns the cell value of the row as a number.
     */
    DataTable.prototype.getCellAsNumber = function (columnName, rowIndex, useNaN) {
        var table = this;
        var column = table.columns[columnName];
        var cellValue = (column && column[rowIndex]);
        switch (typeof cellValue) {
            case 'boolean':
                return (cellValue ? 1 : 0);
            case 'number':
                return (isNaN(cellValue) && !useNaN ? null : cellValue);
        }
        cellValue = parseFloat("".concat(cellValue !== null && cellValue !== void 0 ? cellValue : ''));
        return (isNaN(cellValue) && !useNaN ? null : cellValue);
    };
    /**
     * Fetches a cell value for the given row as a string.
     *
     * @function Highcharts.DataTable#getCellAsString
     *
     * @param {string} columnName
     * Column name to fetch.
     *
     * @param {number} rowIndex
     * Row index to fetch.
     *
     * @return {string}
     * Returns the cell value of the row as a string.
     */
    DataTable.prototype.getCellAsString = function (columnName, rowIndex) {
        var table = this;
        var column = table.columns[columnName];
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return "".concat((column && column[rowIndex]));
    };
    /**
     * Fetches the given column by the canonical column name.
     * This function is a simplified wrap of {@link getColumns}.
     *
     * @function Highcharts.DataTable#getColumn
     *
     * @param {string} columnName
     * Name of the column to get.
     *
     * @param {boolean} [asReference]
     * Whether to return the column as a readonly reference.
     *
     * @return {Highcharts.DataTableColumn|undefined}
     * A copy of the column, or `undefined` if not found.
     */
    DataTable.prototype.getColumn = function (columnName, asReference) {
        return this.getColumns([columnName], asReference)[columnName];
    };
    /**
     * Fetches the given column by the canonical column name, and
     * validates the type of the first few cells. If the first defined cell is
     * of type number, it assumes for performance reasons, that all cells are of
     * type number or `null`. Otherwise it will convert all cells to number
     * type, except `null`.
     *
     * @deprecated
     *
     * @function Highcharts.DataTable#getColumnAsNumbers
     *
     * @param {string} columnName
     * Name of the column to get.
     *
     * @param {boolean} [useNaN]
     * Whether to use NaN instead of `null` and `undefined`.
     *
     * @return {Array<(number|null)>}
     * A copy of the column, or an empty array if not found.
     */
    DataTable.prototype.getColumnAsNumbers = function (columnName, useNaN) {
        var table = this,
            columns = table.columns;
        var column = columns[columnName],
            columnAsNumber = [];
        if (column) {
            var columnLength = column.length;
            if (useNaN) {
                for (var i = 0; i < columnLength; ++i) {
                    columnAsNumber.push(table.getCellAsNumber(columnName, i, true));
                }
            }
            else {
                for (var i = 0, cellValue = void 0; i < columnLength; ++i) {
                    cellValue = column[i];
                    if (typeof cellValue === 'number') {
                        // Assume unmixed data for performance reasons
                        return column.slice();
                    }
                    if (cellValue !== null &&
                        typeof cellValue !== 'undefined') {
                        break;
                    }
                }
                for (var i = 0; i < columnLength; ++i) {
                    columnAsNumber.push(table.getCellAsNumber(columnName, i));
                }
            }
        }
        return columnAsNumber;
    };
    /**
     * Fetches all column names.
     *
     * @function Highcharts.DataTable#getColumnNames
     *
     * @return {Array<string>}
     * Returns all column names.
     */
    DataTable.prototype.getColumnNames = function () {
        var table = this,
            columnNames = Object.keys(table.columns);
        return columnNames;
    };
    /**
     * Retrieves all or the given columns.
     *
     * @function Highcharts.DataTable#getColumns
     *
     * @param {Array<string>} [columnNames]
     * Column names to retrieve.
     *
     * @param {boolean} [asReference]
     * Whether to return columns as a readonly reference.
     *
     * @param {boolean} [asBasicColumns]
     * Whether to transform all typed array columns to normal arrays.
     *
     * @return {Highcharts.DataTableColumnCollection}
     * Collection of columns. If a requested column was not found, it is
     * `undefined`.
     */
    DataTable.prototype.getColumns = function (columnNames, asReference, asBasicColumns) {
        var table = this,
            tableColumns = table.columns,
            columns = {};
        columnNames = (columnNames || Object.keys(tableColumns));
        for (var i = 0, iEnd = columnNames.length, column = void 0, columnName = void 0; i < iEnd; ++i) {
            columnName = columnNames[i];
            column = tableColumns[columnName];
            if (column) {
                if (asReference) {
                    columns[columnName] = column;
                }
                else if (asBasicColumns && !Array.isArray(column)) {
                    columns[columnName] = Array.from(column);
                }
                else {
                    columns[columnName] = column.slice();
                }
            }
        }
        return columns;
    };
    /**
     * Takes the original row index and returns the local row index in the
     * modified table for which this function is called.
     *
     * @param {number} originalRowIndex
     * Original row index to get the local row index for.
     *
     * @return {number|undefined}
     * Returns the local row index or `undefined` if not found.
     */
    DataTable.prototype.getLocalRowIndex = function (originalRowIndex) {
        var localRowIndexes = this.localRowIndexes;
        if (localRowIndexes) {
            return localRowIndexes[originalRowIndex];
        }
        return originalRowIndex;
    };
    /**
     * Retrieves the modifier for the table.
     * @private
     *
     * @return {Highcharts.DataModifier|undefined}
     * Returns the modifier or `undefined`.
     */
    DataTable.prototype.getModifier = function () {
        return this.modifier;
    };
    /**
     * Takes the local row index and returns the index of the corresponding row
     * in the original table.
     *
     * @param {number} rowIndex
     * Local row index to get the original row index for.
     *
     * @return {number|undefined}
     * Returns the original row index or `undefined` if not found.
     */
    DataTable.prototype.getOriginalRowIndex = function (rowIndex) {
        var originalRowIndexes = this.originalRowIndexes;
        if (originalRowIndexes) {
            return originalRowIndexes[rowIndex];
        }
        return rowIndex;
    };
    /**
     * Retrieves the row at a given index. This function is a simplified wrap of
     * {@link getRows}.
     *
     * @function Highcharts.DataTable#getRow
     *
     * @param {number} rowIndex
     * Row index to retrieve. First row has index 0.
     *
     * @param {Array<string>} [columnNames]
     * Column names in order to retrieve.
     *
     * @return {Highcharts.DataTableRow}
     * Returns the row values, or `undefined` if not found.
     */
    DataTable.prototype.getRow = function (rowIndex, columnNames) {
        return this.getRows(rowIndex, 1, columnNames)[0];
    };
    /**
     * Returns the number of rows in this table.
     *
     * @function Highcharts.DataTable#getRowCount
     *
     * @return {number}
     * Number of rows in this table.
     */
    DataTable.prototype.getRowCount = function () {
        // @todo Implement via property getter `.length` browsers supported
        return this.rowCount;
    };
    /**
     * Retrieves the index of the first row matching a specific cell value.
     *
     * @function Highcharts.DataTable#getRowIndexBy
     *
     * @param {string} columnName
     * Column to search in.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Cell value to search for. `NaN` and `undefined` are not supported.
     *
     * @param {number} [rowIndexOffset]
     * Index offset to start searching.
     *
     * @return {number|undefined}
     * Index of the first row matching the cell value.
     */
    DataTable.prototype.getRowIndexBy = function (columnName, cellValue, rowIndexOffset) {
        var table = this;
        var column = table.columns[columnName];
        if (column) {
            var rowIndex = -1;
            if (Array.isArray(column)) {
                // Normal array
                rowIndex = column.indexOf(cellValue, rowIndexOffset);
            }
            else if (isNumber(cellValue)) {
                // Typed array
                rowIndex = column.indexOf(cellValue, rowIndexOffset);
            }
            if (rowIndex !== -1) {
                return rowIndex;
            }
        }
    };
    /**
     * Retrieves the row at a given index. This function is a simplified wrap of
     * {@link getRowObjects}.
     *
     * @function Highcharts.DataTable#getRowObject
     *
     * @param {number} rowIndex
     * Row index.
     *
     * @param {Array<string>} [columnNames]
     * Column names and their order to retrieve.
     *
     * @return {Highcharts.DataTableRowObject}
     * Returns the row values, or `undefined` if not found.
     */
    DataTable.prototype.getRowObject = function (rowIndex, columnNames) {
        return this.getRowObjects(rowIndex, 1, columnNames)[0];
    };
    /**
     * Fetches all or a number of rows.
     *
     * @function Highcharts.DataTable#getRowObjects
     *
     * @param {number} [rowIndex]
     * Index of the first row to fetch. Defaults to first row at index `0`.
     *
     * @param {number} [rowCount]
     * Number of rows to fetch. Defaults to maximal number of rows.
     *
     * @param {Array<string>} [columnNames]
     * Column names and their order to retrieve.
     *
     * @return {Highcharts.DataTableRowObject}
     * Returns retrieved rows.
     */
    DataTable.prototype.getRowObjects = function (rowIndex, rowCount, columnNames) {
        if (rowIndex === void 0) { rowIndex = 0; }
        if (rowCount === void 0) { rowCount = (this.rowCount - rowIndex); }
        var table = this,
            columns = table.columns,
            rows = new Array(rowCount);
        columnNames = (columnNames || Object.keys(columns));
        for (var i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column = void 0, row = void 0; i < iEnd; ++i, ++i2) {
            row = rows[i2] = {};
            for (var _i = 0, columnNames_1 = columnNames; _i < columnNames_1.length; _i++) {
                var columnName = columnNames_1[_i];
                column = columns[columnName];
                row[columnName] = (column ? column[i] : void 0);
            }
        }
        return rows;
    };
    /**
     * Fetches all or a number of rows.
     *
     * @function Highcharts.DataTable#getRows
     *
     * @param {number} [rowIndex]
     * Index of the first row to fetch. Defaults to first row at index `0`.
     *
     * @param {number} [rowCount]
     * Number of rows to fetch. Defaults to maximal number of rows.
     *
     * @param {Array<string>} [columnNames]
     * Column names and their order to retrieve.
     *
     * @return {Highcharts.DataTableRow}
     * Returns retrieved rows.
     */
    DataTable.prototype.getRows = function (rowIndex, rowCount, columnNames) {
        if (rowIndex === void 0) { rowIndex = 0; }
        if (rowCount === void 0) { rowCount = (this.rowCount - rowIndex); }
        var table = this,
            columns = table.columns,
            rows = new Array(rowCount);
        columnNames = (columnNames || Object.keys(columns));
        for (var i = rowIndex, i2 = 0, iEnd = Math.min(table.rowCount, (rowIndex + rowCount)), column = void 0, row = void 0; i < iEnd; ++i, ++i2) {
            row = rows[i2] = [];
            for (var _i = 0, columnNames_2 = columnNames; _i < columnNames_2.length; _i++) {
                var columnName = columnNames_2[_i];
                column = columns[columnName];
                row.push(column ? column[i] : void 0);
            }
        }
        return rows;
    };
    /**
     * Returns the unique version tag of the current state of the table.
     *
     * @function Highcharts.DataTable#getVersionTag
     *
     * @return {string}
     * Unique version tag.
     */
    DataTable.prototype.getVersionTag = function () {
        return this.versionTag;
    };
    /**
     * Checks for given column names.
     *
     * @function Highcharts.DataTable#hasColumns
     *
     * @param {Array<string>} columnNames
     * Column names to check.
     *
     * @return {boolean}
     * Returns `true` if all columns have been found, otherwise `false`.
     */
    DataTable.prototype.hasColumns = function (columnNames) {
        var table = this,
            columns = table.columns;
        for (var i = 0, iEnd = columnNames.length, columnName = void 0; i < iEnd; ++i) {
            columnName = columnNames[i];
            if (!columns[columnName]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Searches for a specific cell value.
     *
     * @function Highcharts.DataTable#hasRowWith
     *
     * @param {string} columnName
     * Column to search in.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Cell value to search for. `NaN` and `undefined` are not supported.
     *
     * @return {boolean}
     * True, if a row has been found, otherwise false.
     */
    DataTable.prototype.hasRowWith = function (columnName, cellValue) {
        var table = this;
        var column = table.columns[columnName];
        // Normal array
        if (Array.isArray(column)) {
            return (column.indexOf(cellValue) !== -1);
        }
        // Typed array
        if (defined(cellValue) && Number.isFinite(cellValue)) {
            return (column.indexOf(+cellValue) !== -1);
        }
        return false;
    };
    /**
     * Registers a callback for a specific event.
     *
     * @function Highcharts.DataTable#on
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {Highcharts.EventCallbackFunction<Highcharts.DataTable>} callback
     * Function to register for an event callback.
     *
     * @return {Function}
     * Function to unregister callback from the event.
     */
    DataTable.prototype.on = function (type, callback) {
        return DataTable_addEvent(this, type, callback);
    };
    /**
     * Renames a column of cell values.
     *
     * @function Highcharts.DataTable#renameColumn
     *
     * @param {string} columnName
     * Name of the column to be renamed.
     *
     * @param {string} newColumnName
     * New name of the column. An existing column with the same name will be
     * replaced.
     *
     * @return {boolean}
     * Returns `true` if successful, `false` if the column was not found.
     */
    DataTable.prototype.renameColumn = function (columnName, newColumnName) {
        var table = this,
            columns = table.columns;
        if (columns[columnName]) {
            if (columnName !== newColumnName) {
                columns[newColumnName] = columns[columnName];
                delete columns[columnName];
            }
            return true;
        }
        return false;
    };
    /**
     * Sets a cell value based on the row index and column.  Will
     * insert a new column, if not found.
     *
     * @function Highcharts.DataTable#setCell
     *
     * @param {string} columnName
     * Column name to set.
     *
     * @param {number|undefined} rowIndex
     * Row index to set.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Cell value to set.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setCell
     * @emits #afterSetCell
     */
    DataTable.prototype.setCell = function (columnName, rowIndex, cellValue, eventDetail) {
        var table = this,
            columns = table.columns,
            modifier = table.modifier;
        var column = columns[columnName];
        if (column && column[rowIndex] === cellValue) {
            return;
        }
        table.emit({
            type: 'setCell',
            cellValue: cellValue,
            columnName: columnName,
            detail: eventDetail,
            rowIndex: rowIndex
        });
        if (!column) {
            column = columns[columnName] = new Array(table.rowCount);
        }
        if (rowIndex >= table.rowCount) {
            table.rowCount = (rowIndex + 1);
        }
        column[rowIndex] = cellValue;
        if (modifier) {
            modifier.modifyCell(table, columnName, rowIndex, cellValue);
        }
        table.emit({
            type: 'afterSetCell',
            cellValue: cellValue,
            columnName: columnName,
            detail: eventDetail,
            rowIndex: rowIndex
        });
    };
    /**
     * Sets cell values for multiple columns. Will insert new columns, if not
     * found.
     *
     * @function Highcharts.DataTable#setColumns
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex]
     * Index of the first row to change. Keep undefined to reset.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @param {boolean} [typeAsOriginal=false]
     * Determines whether the original column retains its type when data
     * replaced. If `true`, the original column keeps its type. If not
     * (default), the original column will adopt the type of the replacement
     * column.
     *
     * @emits #setColumns
     * @emits #afterSetColumns
     */
    DataTable.prototype.setColumns = function (columns, rowIndex, eventDetail, typeAsOriginal) {
        var table = this,
            tableColumns = table.columns,
            tableModifier = table.modifier,
            columnNames = Object.keys(columns);
        var rowCount = table.rowCount;
        table.emit({
            type: 'setColumns',
            columns: columns,
            columnNames: columnNames,
            detail: eventDetail,
            rowIndex: rowIndex
        });
        if (!defined(rowIndex) && !typeAsOriginal) {
            _super.prototype.setColumns.call(this, columns, rowIndex, extend(eventDetail, { silent: true }));
        }
        else {
            for (var i = 0, iEnd = columnNames.length, column = void 0, tableColumn = void 0, columnName = void 0, ArrayConstructor = void 0; i < iEnd; ++i) {
                columnName = columnNames[i];
                column = columns[columnName];
                tableColumn = tableColumns[columnName];
                ArrayConstructor = Object.getPrototypeOf((tableColumn && typeAsOriginal) ? tableColumn : column).constructor;
                if (!tableColumn) {
                    tableColumn = new ArrayConstructor(rowCount);
                }
                else if (ArrayConstructor === Array) {
                    if (!Array.isArray(tableColumn)) {
                        tableColumn = Array.from(tableColumn);
                    }
                }
                else if (tableColumn.length < rowCount) {
                    tableColumn =
                        new ArrayConstructor(rowCount);
                    tableColumn.set(tableColumns[columnName]);
                }
                tableColumns[columnName] = tableColumn;
                for (var i_1 = (rowIndex || 0), iEnd_1 = column.length; i_1 < iEnd_1; ++i_1) {
                    tableColumn[i_1] = column[i_1];
                }
                rowCount = Math.max(rowCount, column.length);
            }
            this.applyRowCount(rowCount);
        }
        if (tableModifier) {
            tableModifier.modifyColumns(table, columns, rowIndex || 0);
        }
        table.emit({
            type: 'afterSetColumns',
            columns: columns,
            columnNames: columnNames,
            detail: eventDetail,
            rowIndex: rowIndex
        });
    };
    /**
     * Sets or unsets the modifier for the table.
     *
     * @param {Highcharts.DataModifier} [modifier]
     * Modifier to set, or `undefined` to unset.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<Highcharts.DataTable>}
     * Resolves to this table if successful, or rejects on failure.
     *
     * @emits #setModifier
     * @emits #afterSetModifier
     */
    DataTable.prototype.setModifier = function (modifier, eventDetail) {
        var table = this;
        var promise;
        table.emit({
            type: 'setModifier',
            detail: eventDetail,
            modifier: modifier,
            modified: table.modified
        });
        table.modified = table;
        table.modifier = modifier;
        if (modifier) {
            promise = modifier.modify(table);
        }
        else {
            promise = Promise.resolve(table);
        }
        return promise
            .then(function (table) {
            table.emit({
                type: 'afterSetModifier',
                detail: eventDetail,
                modifier: modifier,
                modified: table.modified
            });
            return table;
        })['catch'](function (error) {
            table.emit({
                type: 'setModifierError',
                error: error,
                modifier: modifier,
                modified: table.modified
            });
            throw error;
        });
    };
    /**
     * Sets the original row indexes for the table. It is used to keep the
     * reference to the original rows when modifying the table.
     *
     * @param {Array<number|undefined>} originalRowIndexes
     * Original row indexes array.
     *
     * @param {boolean} omitLocalRowIndexes
     * Whether to omit the local row indexes calculation. Defaults to `false`.
     */
    DataTable.prototype.setOriginalRowIndexes = function (originalRowIndexes, omitLocalRowIndexes) {
        if (omitLocalRowIndexes === void 0) { omitLocalRowIndexes = false; }
        this.originalRowIndexes = originalRowIndexes;
        if (omitLocalRowIndexes) {
            return;
        }
        var modifiedIndexes = this.localRowIndexes = [];
        for (var i = 0, iEnd = originalRowIndexes.length, originalIndex = void 0; i < iEnd; ++i) {
            originalIndex = originalRowIndexes[i];
            if (defined(originalIndex)) {
                modifiedIndexes[originalIndex] = i;
            }
        }
    };
    /**
     * Sets cell values of a row. Will insert a new row, if no index was
     * provided, or if the index is higher than the total number of table rows.
     *
     * Note: This function is just a simplified wrap of
     * {@link Highcharts.DataTable#setRows}.
     *
     * @function Highcharts.DataTable#setRow
     *
     * @param {Highcharts.DataTableRow|Highcharts.DataTableRowObject} row
     * Cell values to set.
     *
     * @param {number} [rowIndex]
     * Index of the row to set. Leave `undefind` to add as a new row.
     *
     * @param {boolean} [insert]
     * Whether to insert the row at the given index, or to overwrite the row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setRows
     * @emits #afterSetRows
     */
    DataTable.prototype.setRow = function (row, rowIndex, insert, eventDetail) {
        this.setRows([row], rowIndex, insert, eventDetail);
    };
    /**
     * Sets cell values for multiple rows. Will insert new rows, if no index was
     * was provided, or if the index is higher than the total number of table
     * rows.
     *
     * @function Highcharts.DataTable#setRows
     *
     * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
     * Row values to set.
     *
     * @param {number} [rowIndex]
     * Index of the first row to set. Leave `undefined` to add as new rows.
     *
     * @param {boolean} [insert]
     * Whether to insert the row at the given index, or to overwrite the row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits #setRows
     * @emits #afterSetRows
     */
    DataTable.prototype.setRows = function (rows, rowIndex, insert, eventDetail) {
        if (rowIndex === void 0) { rowIndex = this.rowCount; }
        var table = this,
            columns = table.columns,
            columnNames = Object.keys(columns),
            modifier = table.modifier,
            rowCount = rows.length;
        table.emit({
            type: 'setRows',
            detail: eventDetail,
            rowCount: rowCount,
            rowIndex: rowIndex,
            rows: rows
        });
        for (var i = 0, i2 = rowIndex, row = void 0; i < rowCount; ++i, ++i2) {
            row = rows[i];
            if (row === DataTable.NULL) {
                for (var j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                    var column = columns[columnNames[j]];
                    if (insert) {
                        columns[columnNames[j]] = Data_ColumnUtils.splice(column, i2, 0, true, [null]).array;
                    }
                    else {
                        column[i2] = null;
                    }
                }
            }
            else if (row instanceof Array) {
                for (var j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                    columns[columnNames[j]][i2] = row[j];
                }
            }
            else {
                _super.prototype.setRow.call(this, row, i2, void 0, { silent: true });
            }
        }
        var indexRowCount = insert ?
                rowCount + rows.length :
                rowIndex + rowCount;
        if (indexRowCount > table.rowCount) {
            table.rowCount = indexRowCount;
            for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                var columnName = columnNames[i];
                columns[columnName] = Data_ColumnUtils.setLength(columns[columnName], indexRowCount);
            }
        }
        if (modifier) {
            modifier.modifyRows(table, rows, rowIndex);
        }
        table.emit({
            type: 'afterSetRows',
            detail: eventDetail,
            rowCount: rowCount,
            rowIndex: rowIndex,
            rows: rows
        });
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Null state for a row record. In some cases, a row in a table may not
     * contain any data or may be invalid. In these cases, a null state can be
     * used to indicate that the row record is empty or invalid.
     *
     * @name Highcharts.DataTable.NULL
     * @type {Highcharts.DataTableRowObject}
     *
     * @see {@link Highcharts.DataTable.isNull} for a null test.
     *
     * @example
     * table.setRows([DataTable.NULL, DataTable.NULL], 10);
     */
    DataTable.NULL = {};
    /**
     * Semantic version string of the DataTable class.
     * @internal
     */
    DataTable.version = '1.0.0';
    return DataTable;
}(Data_DataTableCore));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Data_DataTable = (DataTable);

;// ./code/es5/es-modules/Data/Connectors/DataConnector.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Wojciech Chmiel
 *  - Gøran Slettemark
 *
 * */

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0,
        sent: function() { if (t[0] & 1) throw t[1]; return t[1]; },
        trys: [],
        ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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



var DataConnector_addEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).addEvent, DataConnector_fireEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).fireEvent, DataConnector_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge, pick = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).pick;
/* *
 *
 *  Class
 *
 * */
/**
 * Abstract class providing an interface for managing a DataConnector.
 *
 * @private
 */
var DataConnector = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructor for the connector class.
     *
     * @param {DataConnector.UserOptions} [options]
     * Options to use in the connector.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     */
    function DataConnector(options, dataTables) {
        if (options === void 0) { options = {}; }
        if (dataTables === void 0) { dataTables = []; }
        /**
         * Tables managed by this DataConnector instance.
         */
        this.dataTables = {};
        /**
         * Helper flag for detecting whether the data connector is loaded.
         * @internal
         */
        this.loaded = false;
        this.metadata = options.metadata || { columns: {} };
        // Create a data table for each defined in the dataTables user options.
        var dataTableIndex = 0;
        if ((dataTables === null || dataTables === void 0 ? void 0 : dataTables.length) > 0) {
            for (var i = 0, iEnd = dataTables.length; i < iEnd; ++i) {
                var dataTable = dataTables[i];
                var key = dataTable === null || dataTable === void 0 ? void 0 : dataTable.key;
                this.dataTables[key !== null && key !== void 0 ? key : dataTableIndex] =
                    new Data_DataTable(dataTable);
                if (!key) {
                    dataTableIndex++;
                }
            }
            // If user options dataTables is not defined, generate a default table.
        }
        else {
            this.dataTables[0] = new Data_DataTable(options.dataTable);
        }
    }
    Object.defineProperty(DataConnector.prototype, "polling", {
        /**
         * Poll timer ID, if active.
         */
        get: function () {
            return !!this._polling;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConnector.prototype, "table", {
        /**
         * Gets the first data table.
         *
         * @return {DataTable}
         * The data table instance.
         */
        get: function () {
            return this.getTable();
        },
        enumerable: false,
        configurable: true
    });
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Method for adding metadata for a single column.
     *
     * @param {string} name
     * The name of the column to be described.
     *
     * @param {DataConnector.MetaColumn} columnMeta
     * The metadata to apply to the column.
     */
    DataConnector.prototype.describeColumn = function (name, columnMeta) {
        var connector = this,
            columns = connector.metadata.columns;
        columns[name] = DataConnector_merge(columns[name] || {}, columnMeta);
    };
    /**
     * Method for applying columns meta information to the whole DataConnector.
     *
     * @param {Highcharts.Dictionary<DataConnector.MetaColumn>} columns
     * Pairs of column names and MetaColumn objects.
     */
    DataConnector.prototype.describeColumns = function (columns) {
        var connector = this,
            columnNames = Object.keys(columns);
        var columnName;
        while (typeof (columnName = columnNames.pop()) === 'string') {
            connector.describeColumn(columnName, columns[columnName]);
        }
    };
    /**
     * Emits an event on the connector to all registered callbacks of this
     * event.
     *
     * @param {DataConnector.Event} [e]
     * Event object containing additional event information.
     */
    DataConnector.prototype.emit = function (e) {
        DataConnector_fireEvent(this, e.type, e);
    };
    /**
     * Returns the order of columns.
     *
     * @param {boolean} [usePresentationState]
     * Whether to use the column order of the presentation state of the table.
     *
     * @return {Array<string>|undefined}
     * Order of columns.
     */
    DataConnector.prototype.getColumnOrder = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    usePresentationState) {
        var connector = this,
            columns = connector.metadata.columns,
            names = Object.keys(columns || {});
        if (names.length) {
            return names.sort(function (a, b) { return (pick(columns[a].index, 0) - pick(columns[b].index, 0)); });
        }
    };
    /**
     * Returns a single data table instance based on the provided key.
     * Otherwise, returns the first data table.
     *
     * @param {string} [key]
     * The data table key.
     *
     * @return {DataTable}
     * The data table instance.
     */
    DataConnector.prototype.getTable = function (key) {
        if (key) {
            return this.dataTables[key];
        }
        return Object.values(this.dataTables)[0];
    };
    /**
     * Retrieves the columns of the dataTable,
     * applies column order from meta.
     *
     * @param {boolean} [usePresentationOrder]
     * Whether to use the column order of the presentation state of the table.
     *
     * @return {Highcharts.DataTableColumnCollection}
     * An object with the properties `columnNames` and `columnValues`
     */
    DataConnector.prototype.getSortedColumns = function (usePresentationOrder) {
        return this.table.getColumns(this.getColumnOrder(usePresentationOrder));
    };
    /**
     * The default load method, which fires the `afterLoad` event
     *
     * @return {Promise<DataConnector>}
     * The loaded connector.
     *
     * @emits DataConnector#afterLoad
     */
    DataConnector.prototype.load = function () {
        DataConnector_fireEvent(this, 'afterLoad', { table: this.table });
        return Promise.resolve(this);
    };
    /**
     * Registers a callback for a specific connector event.
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {DataEventEmitter.Callback} callback
     * Function to register for the connector callback.
     *
     * @return {Function}
     * Function to unregister callback from the connector event.
     */
    DataConnector.prototype.on = function (type, callback) {
        return DataConnector_addEvent(this, type, callback);
    };
    /**
     * The default save method, which fires the `afterSave` event.
     *
     * @return {Promise<DataConnector>}
     * The saved connector.
     *
     * @emits DataConnector#afterSave
     * @emits DataConnector#saveError
     */
    DataConnector.prototype.save = function () {
        DataConnector_fireEvent(this, 'saveError', { table: this.table });
        return Promise.reject(new Error('Not implemented'));
    };
    /**
     * Sets the index and order of columns.
     *
     * @param {Array<string>} columnNames
     * Order of columns.
     */
    DataConnector.prototype.setColumnOrder = function (columnNames) {
        var connector = this;
        for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
            connector.describeColumn(columnNames[i], { index: i });
        }
    };
    DataConnector.prototype.setModifierOptions = function (modifierOptions, tablesOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var _loop_1,
                _i,
                _a,
                _b,
                key,
                table;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _loop_1 = function (key, table) {
                            var tableOptions,
                                mergedModifierOptions,
                                ModifierClass;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        tableOptions = tablesOptions === null || tablesOptions === void 0 ? void 0 : tablesOptions.find(function (dataTable) { return dataTable.key === key; });
                                        mergedModifierOptions = DataConnector_merge(tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.dataModifier, modifierOptions);
                                        ModifierClass = (mergedModifierOptions &&
                                            Modifiers_DataModifier.types[mergedModifierOptions.type]);
                                        return [4 /*yield*/, table.setModifier(ModifierClass ?
                                                new ModifierClass(mergedModifierOptions) :
                                                void 0)];
                                    case 1:
                                        _d.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, _a = Object.entries(this.dataTables);
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        _b = _a[_i], key = _b[0], table = _b[1];
                        return [5 /*yield**/, _loop_1(key, table)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Starts polling new data after the specific time span in milliseconds.
     *
     * @param {number} refreshTime
     * Refresh time in milliseconds between polls.
     */
    DataConnector.prototype.startPolling = function (refreshTime) {
        if (refreshTime === void 0) { refreshTime = 1000; }
        var connector = this;
        var tables = connector.dataTables;
        // Assign a new abort controller.
        this.pollingController = new AbortController();
        // Clear the polling timeout.
        window.clearTimeout(connector._polling);
        connector._polling = window.setTimeout(function () { return connector
            .load()['catch'](function (error) { return connector.emit({
            type: 'loadError',
            error: error,
            tables: tables
        }); })
            .then(function () {
            if (connector._polling) {
                connector.startPolling(refreshTime);
            }
        }); }, refreshTime);
    };
    /**
     * Stops polling data. Shouldn't be performed if polling is already stopped.
     */
    DataConnector.prototype.stopPolling = function () {
        var _a;
        var connector = this;
        if (!connector.polling) {
            return;
        }
        // Abort the existing request.
        (_a = connector === null || connector === void 0 ? void 0 : connector.pollingController) === null || _a === void 0 ? void 0 : _a.abort();
        // Clear the polling timeout.
        window.clearTimeout(connector._polling);
        delete connector._polling;
    };
    /**
     * Retrieves metadata from a single column.
     *
     * @param {string} name
     * The identifier for the column that should be described
     *
     * @return {DataConnector.MetaColumn|undefined}
     * Returns a MetaColumn object if found.
     */
    DataConnector.prototype.whatIs = function (name) {
        return this.metadata.columns[name];
    };
    /**
     * Iterates over the dataTables and initiates the corresponding converters.
     * Updates the dataTables and assigns the first converter.
     *
     * @param {T}[data]
     * Data specific to the corresponding converter.
     *
     * @param {DataConnector.CreateConverterFunction}[createConverter]
     * Creates a specific converter combining the dataTable options.
     *
     * @param {DataConnector.ParseDataFunction<T>}[parseData]
     * Runs the converter parse method with the specific data type.
     */
    DataConnector.prototype.initConverters = function (data, createConverter, parseData) {
        var index = 0;
        for (var _i = 0, _a = Object.entries(this.dataTables); _i < _a.length; _i++) {
            var _b = _a[_i],
                key = _b[0],
                table = _b[1];
            // Create a proper converter and parse its data.
            var converter = createConverter(key,
                table);
            parseData(converter, data);
            // Update the dataTable.
            table.deleteColumns();
            table.setColumns(converter.getTable().getColumns());
            // Assign the first converter.
            if (index === 0) {
                this.converter = converter;
            }
            index++;
        }
    };
    return DataConnector;
}());
/* *
 *
 *  Class Namespace
 *
 * */
(function (DataConnector) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    /**
     * Registry as a record object with connector names and their class.
     */
    DataConnector.types = {};
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Adds a connector class to the registry. The connector has to provide the
     * `DataConnector.options` property and the `DataConnector.load` method to
     * modify the table.
     *
     * @private
     *
     * @param {string} key
     * Registry key of the connector class.
     *
     * @param {DataConnectorType} DataConnectorClass
     * Connector class (aka class constructor) to register.
     *
     * @return {boolean}
     * Returns true, if the registration was successful. False is returned, if
     * their is already a connector registered with this key.
     */
    function registerType(key, DataConnectorClass) {
        return (!!key &&
            !DataConnector.types[key] &&
            !!(DataConnector.types[key] = DataConnectorClass));
    }
    DataConnector.registerType = registerType;
})(DataConnector || (DataConnector = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Connectors_DataConnector = (DataConnector);

;// ./code/es5/es-modules/Data/Converters/DataConverter.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Sebastian Bochan
 *  - Gøran Slettemark
 *  - Torstein Hønsi
 *  - Wojciech Chmiel
 *  - Jomar Hønsi
 *
 * */



var DataConverter_addEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).addEvent, DataConverter_fireEvent = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).fireEvent, DataConverter_isNumber = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isNumber, DataConverter_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Base class providing an interface and basic methods for a DataConverter
 *
 * @private
 */
var DataConverter = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the DataConverter.
     *
     * @param {DataConverter.UserOptions} [options]
     * Options for the DataConverter.
     */
    function DataConverter(options) {
        /* *
         *
         *  Properties
         *
         * */
        /**
         * A collection of available date formats.
         */
        this.dateFormats = {
            'YYYY/mm/dd': {
                regex: /^(\d{4})([\-\.\/])(\d{1,2})\2(\d{1,2})$/,
                parser: function (match) {
                    return (match ?
                        Date.UTC(+match[1], match[3] - 1, +match[4]) :
                        NaN);
                }
            },
            'dd/mm/YYYY': {
                regex: /^(\d{1,2})([\-\.\/])(\d{1,2})\2(\d{4})$/,
                parser: function (match) {
                    return (match ?
                        Date.UTC(+match[4], match[3] - 1, +match[1]) :
                        NaN);
                },
                alternative: 'mm/dd/YYYY' // Different format with the same regex
            },
            'mm/dd/YYYY': {
                regex: /^(\d{1,2})([\-\.\/])(\d{1,2})\2(\d{4})$/,
                parser: function (match) {
                    return (match ?
                        Date.UTC(+match[4], match[1] - 1, +match[3]) :
                        NaN);
                }
            },
            'dd/mm/YY': {
                regex: /^(\d{1,2})([\-\.\/])(\d{1,2})\2(\d{2})$/,
                parser: function (match) {
                    var d = new Date();
                    if (!match) {
                        return NaN;
                    }
                    var year = +match[4];
                    if (year > (d.getFullYear() - 2000)) {
                        year += 1900;
                    }
                    else {
                        year += 2000;
                    }
                    return Date.UTC(year, match[3] - 1, +match[1]);
                },
                alternative: 'mm/dd/YY' // Different format with the same regex
            },
            'mm/dd/YY': {
                regex: /^(\d{1,2})([\-\.\/])(\d{1,2})\2(\d{2})$/,
                parser: function (match) {
                    return (match ?
                        Date.UTC(+match[4] + 2000, match[1] - 1, +match[3]) :
                        NaN);
                }
            }
        };
        var mergedOptions = DataConverter_merge(DataConverter.defaultOptions,
            options);
        var regExpPoint = mergedOptions.decimalPoint;
        if (regExpPoint === '.' || regExpPoint === ',') {
            regExpPoint = regExpPoint === '.' ? '\\.' : ',';
            this.decimalRegExp =
                new RegExp('^(-?[0-9]+)' + regExpPoint + '([0-9]+)$');
        }
        this.options = mergedOptions;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Converts a value to a boolean.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {boolean}
     * Converted value as a boolean.
     */
    DataConverter.prototype.asBoolean = function (value) {
        if (typeof value === 'boolean') {
            return value;
        }
        if (typeof value === 'string') {
            return value !== '' && value !== '0' && value !== 'false';
        }
        return !!this.asNumber(value);
    };
    /**
     * Converts a value to a Date.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {globalThis.Date}
     * Converted value as a Date.
     */
    DataConverter.prototype.asDate = function (value) {
        var timestamp;
        if (typeof value === 'string') {
            timestamp = this.parseDate(value);
        }
        else if (typeof value === 'number') {
            timestamp = value;
        }
        else if (value instanceof Date) {
            return value;
        }
        else {
            timestamp = this.parseDate(this.asString(value));
        }
        return new Date(timestamp);
    };
    /**
     * Casts a string value to it's guessed type
     *
     * @param {*} value
     * The value to examine.
     *
     * @return {number|string|Date}
     * The converted value.
     */
    DataConverter.prototype.asGuessedType = function (value) {
        var converter = this,
            typeMap = {
                'number': converter.asNumber,
                'Date': converter.asDate,
                'string': converter.asString
            };
        return typeMap[converter.guessType(value)].call(converter, value);
    };
    /**
     * Converts a value to a number.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {number}
     * Converted value as a number.
     */
    DataConverter.prototype.asNumber = function (value) {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        if (typeof value === 'string') {
            var decimalRegex = this.decimalRegExp;
            if (value.indexOf(' ') > -1) {
                value = value.replace(/\s+/g, '');
            }
            if (decimalRegex) {
                if (!decimalRegex.test(value)) {
                    return NaN;
                }
                value = value.replace(decimalRegex, '$1.$2');
            }
            return parseFloat(value);
        }
        if (value instanceof Date) {
            return value.getDate();
        }
        if (value) {
            return value.getRowCount();
        }
        return NaN;
    };
    /**
     * Converts a value to a string.
     *
     * @param {DataConverter.Type} value
     * Value to convert.
     *
     * @return {string}
     * Converted value as a string.
     */
    DataConverter.prototype.asString = function (value) {
        return '' + value;
    };
    /**
     * Tries to guess the date format
     *  - Check if either month candidate exceeds 12
     *  - Check if year is missing (use current year)
     *  - Check if a shortened year format is used (e.g. 1/1/99)
     *  - If no guess can be made, the user must be prompted
     * data is the data to deduce a format based on
     * @private
     *
     * @param {Array<string>} data
     * Data to check the format.
     *
     * @param {number} limit
     * Max data to check the format.
     *
     * @param {boolean} save
     * Whether to save the date format in the converter options.
     */
    DataConverter.prototype.deduceDateFormat = function (data, limit, save) {
        var parser = this,
            stable = [],
            max = [];
        var format = 'YYYY/mm/dd', thing, guessedFormat = [], i = 0, madeDeduction = false, 
            /// candidates = {},
            elem, j;
        if (!limit || limit > data.length) {
            limit = data.length;
        }
        for (; i < limit; i++) {
            if (typeof data[i] !== 'undefined' &&
                data[i] && data[i].length) {
                thing = data[i]
                    .trim()
                    .replace(/[\-\.\/]/g, ' ')
                    .split(' ');
                guessedFormat = [
                    '',
                    '',
                    ''
                ];
                for (j = 0; j < thing.length; j++) {
                    if (j < guessedFormat.length) {
                        elem = parseInt(thing[j], 10);
                        if (elem) {
                            max[j] = (!max[j] || max[j] < elem) ? elem : max[j];
                            if (typeof stable[j] !== 'undefined') {
                                if (stable[j] !== elem) {
                                    stable[j] = false;
                                }
                            }
                            else {
                                stable[j] = elem;
                            }
                            if (elem > 31) {
                                if (elem < 100) {
                                    guessedFormat[j] = 'YY';
                                }
                                else {
                                    guessedFormat[j] = 'YYYY';
                                }
                                /// madeDeduction = true;
                            }
                            else if (elem > 12 &&
                                elem <= 31) {
                                guessedFormat[j] = 'dd';
                                madeDeduction = true;
                            }
                            else if (!guessedFormat[j].length) {
                                guessedFormat[j] = 'mm';
                            }
                        }
                    }
                }
            }
        }
        if (madeDeduction) {
            // This handles a few edge cases with hard to guess dates
            for (j = 0; j < stable.length; j++) {
                if (stable[j] !== false) {
                    if (max[j] > 12 &&
                        guessedFormat[j] !== 'YY' &&
                        guessedFormat[j] !== 'YYYY') {
                        guessedFormat[j] = 'YY';
                    }
                }
                else if (max[j] > 12 && guessedFormat[j] === 'mm') {
                    guessedFormat[j] = 'dd';
                }
            }
            // If the middle one is dd, and the last one is dd,
            // the last should likely be year.
            if (guessedFormat.length === 3 &&
                guessedFormat[1] === 'dd' &&
                guessedFormat[2] === 'dd') {
                guessedFormat[2] = 'YY';
            }
            format = guessedFormat.join('/');
            // If the caculated format is not valid, we need to present an
            // error.
        }
        // Save the deduced format in the converter options.
        if (save) {
            parser.options.dateFormat = format;
        }
        return format;
    };
    /**
     * Emits an event on the DataConverter instance.
     *
     * @param {DataConverter.Event} [e]
     * Event object containing additional event data
     */
    DataConverter.prototype.emit = function (e) {
        DataConverter_fireEvent(this, e.type, e);
    };
    /**
     * Initiates the data exporting. Should emit `exportError` on failure.
     *
     * @param {DataConnector} connector
     * Connector to export from.
     *
     * @param {DataConverter.Options} [options]
     * Options for the export.
     */
    DataConverter.prototype.export = function (
    /* eslint-disable @typescript-eslint/no-unused-vars */
    connector, options
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ) {
        this.emit({
            type: 'exportError',
            columns: [],
            headers: []
        });
        throw new Error('Not implemented');
    };
    /**
     * Getter for the data table.
     *
     * @return {DataTable}
     * Table of parsed data.
     */
    DataConverter.prototype.getTable = function () {
        throw new Error('Not implemented');
    };
    /**
     * Guesses the potential type of a string value for parsing CSV etc.
     *
     * @param {*} value
     * The value to examine.
     *
     * @return {'number'|'string'|'Date'}
     * Type string, either `string`, `Date`, or `number`.
     */
    DataConverter.prototype.guessType = function (value) {
        var converter = this;
        var result = 'string';
        if (typeof value === 'string') {
            var trimedValue = converter.trim("".concat(value)),
                decimalRegExp = converter.decimalRegExp;
            var innerTrimedValue = converter.trim(trimedValue,
                true);
            if (decimalRegExp) {
                innerTrimedValue = (decimalRegExp.test(innerTrimedValue) ?
                    innerTrimedValue.replace(decimalRegExp, '$1.$2') :
                    '');
            }
            var floatValue = parseFloat(innerTrimedValue);
            if (+innerTrimedValue === floatValue) {
                // String is numeric
                value = floatValue;
            }
            else {
                // Determine if a date string
                var dateValue = converter.parseDate(value);
                result = DataConverter_isNumber(dateValue) ? 'Date' : 'string';
            }
        }
        if (typeof value === 'number') {
            // Greater than milliseconds in a year assumed timestamp
            result = value > 365 * 24 * 3600 * 1000 ? 'Date' : 'number';
        }
        return result;
    };
    /**
     * Registers a callback for a specific event.
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {DataEventEmitter.Callback} callback
     * Function to register for an modifier callback.
     *
     * @return {Function}
     * Function to unregister callback from the modifier event.
     */
    DataConverter.prototype.on = function (type, callback) {
        return DataConverter_addEvent(this, type, callback);
    };
    /**
     * Initiates the data parsing. Should emit `parseError` on failure.
     *
     * @param {DataConverter.UserOptions} options
     * Options of the DataConverter.
     */
    DataConverter.prototype.parse = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options) {
        this.emit({
            type: 'parseError',
            columns: [],
            headers: []
        });
        throw new Error('Not implemented');
    };
    /**
     * Parse a date and return it as a number.
     *
     * @param {string} value
     * Value to parse.
     *
     * @param {string} dateFormatProp
     * Which of the predefined date formats
     * to use to parse date values.
     */
    DataConverter.prototype.parseDate = function (value, dateFormatProp) {
        var converter = this,
            options = converter.options;
        var dateFormat = dateFormatProp || options.dateFormat,
            result = NaN,
            key,
            format,
            match;
        if (options.parseDate) {
            result = options.parseDate(value);
        }
        else {
            // Auto-detect the date format the first time
            if (!dateFormat) {
                for (key in converter.dateFormats) { // eslint-disable-line guard-for-in
                    format = converter.dateFormats[key];
                    match = value.match(format.regex);
                    if (match) {
                        // `converter.options.dateFormat` = dateFormat = key;
                        dateFormat = key;
                        // `converter.options.alternativeFormat` =
                        // format.alternative || '';
                        result = format.parser(match);
                        break;
                    }
                }
                // Next time, use the one previously found
            }
            else {
                format = converter.dateFormats[dateFormat];
                if (!format) {
                    // The selected format is invalid
                    format = converter.dateFormats['YYYY/mm/dd'];
                }
                match = value.match(format.regex);
                if (match) {
                    result = format.parser(match);
                }
            }
            // Fall back to Date.parse
            if (!match) {
                match = Date.parse(value);
                // External tools like Date.js and MooTools extend Date object
                // and returns a date.
                if (typeof match === 'object' &&
                    match !== null &&
                    match.getTime) {
                    result = (match.getTime() -
                        match.getTimezoneOffset() *
                            60000);
                    // Timestamp
                }
                else if (DataConverter_isNumber(match)) {
                    result = match - (new Date(match)).getTimezoneOffset() * 60000;
                    if ( // Reset dates without year in Chrome
                    value.indexOf('2001') === -1 &&
                        (new Date(result)).getFullYear() === 2001) {
                        result = NaN;
                    }
                }
            }
        }
        return result;
    };
    /**
     * Trim a string from whitespaces.
     *
     * @param {string} str
     * String to trim.
     *
     * @param {boolean} [inside=false]
     * Remove all spaces between numbers.
     *
     * @return {string}
     * Trimed string
     */
    DataConverter.prototype.trim = function (str, inside) {
        if (typeof str === 'string') {
            str = str.replace(/^\s+|\s+$/g, '');
            // Clear white space insdie the string, like thousands separators
            if (inside && /^[\d\s]+$/.test(str)) {
                str = str.replace(/\s/g, '');
            }
        }
        return str;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options
     */
    DataConverter.defaultOptions = {
        dateFormat: '',
        alternativeFormat: '',
        startColumn: 0,
        endColumn: Number.MAX_VALUE,
        startRow: 0,
        endRow: Number.MAX_VALUE,
        firstRowAsNames: true,
        switchRowsAndColumns: false
    };
    return DataConverter;
}());
/* *
 *
 *  Class Namespace
 *
 * */
/**
 * Additionally provided types for events and conversion.
 */
(function (DataConverter) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    /**
     * Registry as a record object with connector names and their class.
     */
    DataConverter.types = {};
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Adds a converter class to the registry.
     *
     * @private
     *
     * @param {string} key
     * Registry key of the converter class.
     *
     * @param {DataConverterTypes} DataConverterClass
     * Connector class (aka class constructor) to register.
     *
     * @return {boolean}
     * Returns true, if the registration was successful. False is returned, if
     * their is already a converter registered with this key.
     */
    function registerType(key, DataConverterClass) {
        return (!!key &&
            !DataConverter.types[key] &&
            !!(DataConverter.types[key] = DataConverterClass));
    }
    DataConverter.registerType = registerType;
    /**
     * Converts an array of columns to a table instance. Second dimension of the
     * array are the row cells.
     *
     * @param {Array<DataTable.Column>} [columns]
     * Array to convert.
     *
     * @param {Array<string>} [headers]
     * Column names to use.
     *
     * @return {DataTable}
     * Table instance from the arrays.
     */
    function getTableFromColumns(columns, headers) {
        if (columns === void 0) { columns = []; }
        if (headers === void 0) { headers = []; }
        var table = new Data_DataTable();
        for (var i = 0, iEnd = Math.max(headers.length, columns.length); i < iEnd; ++i) {
            table.setColumn(headers[i] || "".concat(i), columns[i]);
        }
        return table;
    }
    DataConverter.getTableFromColumns = getTableFromColumns;
})(DataConverter || (DataConverter = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Converters_DataConverter = (DataConverter);

;// ./code/es5/es-modules/Data/DataCursor.js
/* *
 *
 *  (c) 2020-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */

/* *
 *
 *  Class
 *
 * */
/**
 * This class manages state cursors pointing on {@link Data.DataTable}. It
 * creates a relation between states of the user interface and the table cells,
 * columns, or rows.
 *
 * @class
 * @name Data.DataCursor
 */
var DataCursor = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function DataCursor(stateMap) {
        if (stateMap === void 0) { stateMap = {}; }
        this.emittingRegister = [];
        this.listenerMap = {};
        this.stateMap = stateMap;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * This function registers a listener for a specific state and table.
     *
     * @example
     * ```TypeScript
     * dataCursor.addListener(myTable.id, 'hover', (e: DataCursor.Event) => {
     *     if (e.cursor.type === 'position') {
     *         console.log(`Hover over row #${e.cursor.row}.`);
     *     }
     * });
     * ```
     *
     * @function #addListener
     *
     * @param {Data.DataCursor.TableId} tableId
     * The ID of the table to listen to.
     *
     * @param {Data.DataCursor.State} state
     * The state on the table to listen to.
     *
     * @param {Data.DataCursor.Listener} listener
     * The listener to register.
     *
     * @return {Data.DataCursor}
     * Returns the DataCursor instance for a call chain.
     */
    DataCursor.prototype.addListener = function (tableId, state, listener) {
        var listenerMap = this.listenerMap[tableId] = (this.listenerMap[tableId] ||
                {});
        var listeners = listenerMap[state] = (listenerMap[state] ||
                []);
        listeners.push(listener);
        return this;
    };
    /**
     * @private
     */
    DataCursor.prototype.buildEmittingTag = function (e) {
        return (e.cursor.type === 'position' ?
            [
                e.table.id,
                e.cursor.column,
                e.cursor.row,
                e.cursor.state,
                e.cursor.type
            ] :
            [
                e.table.id,
                e.cursor.columns,
                e.cursor.firstRow,
                e.cursor.lastRow,
                e.cursor.state,
                e.cursor.type
            ]).join('\0');
    };
    /**
     * This function emits a state cursor related to a table. It will provide
     * lasting state cursors of the table to listeners.
     *
     * @example
     * ```ts
     * dataCursor.emit(myTable, {
     *     type: 'position',
     *     column: 'city',
     *     row: 4,
     *     state: 'hover',
     * });
     * ```
     *
     * @param {Data.DataTable} table
     * The related table of the cursor.
     *
     * @param {Data.DataCursor.Type} cursor
     * The state cursor to emit.
     *
     * @param {Event} [event]
     * Optional event information from a related source.
     *
     * @param {boolean} [lasting]
     * Whether this state cursor should be kept until it is cleared with
     * {@link DataCursor#remitCursor}.
     *
     * @return {Data.DataCursor}
     * Returns the DataCursor instance for a call chain.
     */
    DataCursor.prototype.emitCursor = function (table, cursor, event, lasting) {
        var _a;
        var tableId = table.id,
            state = cursor.state,
            listeners = (this.listenerMap[tableId] &&
                this.listenerMap[tableId][state]);
        if (listeners) {
            var stateMap = this.stateMap[tableId] = ((_a = this.stateMap[tableId]) !== null && _a !== void 0 ? _a : {});
            var cursors = stateMap[cursor.state] || [];
            if (lasting) {
                if (!cursors.length) {
                    stateMap[cursor.state] = cursors;
                }
                if (DataCursor.getIndex(cursor, cursors) === -1) {
                    cursors.push(cursor);
                }
            }
            var e = {
                    cursor: cursor,
                    cursors: cursors,
                    table: table
                };
            if (event) {
                e.event = event;
            }
            var emittingRegister = this.emittingRegister,
                emittingTag = this.buildEmittingTag(e);
            if (emittingRegister.indexOf(emittingTag) >= 0) {
                // Break call stack loops
                return this;
            }
            try {
                this.emittingRegister.push(emittingTag);
                for (var i = 0, iEnd = listeners.length; i < iEnd; ++i) {
                    listeners[i].call(this, e);
                }
            }
            finally {
                var index = this.emittingRegister.indexOf(emittingTag);
                if (index >= 0) {
                    this.emittingRegister.splice(index, 1);
                }
            }
        }
        return this;
    };
    /**
     * Removes a lasting state cursor.
     *
     * @function #remitCursor
     *
     * @param {string} tableId
     * ID of the related cursor table.
     *
     * @param {Data.DataCursor.Type} cursor
     * Copy or reference of the cursor.
     *
     * @return {Data.DataCursor}
     * Returns the DataCursor instance for a call chain.
     */
    DataCursor.prototype.remitCursor = function (tableId, cursor) {
        var cursors = (this.stateMap[tableId] &&
                this.stateMap[tableId][cursor.state]);
        if (cursors) {
            var index = DataCursor.getIndex(cursor,
                cursors);
            if (index >= 0) {
                cursors.splice(index, 1);
            }
        }
        return this;
    };
    /**
     * This function removes a listener.
     *
     * @function #addListener
     *
     * @param {Data.DataCursor.TableId} tableId
     * The ID of the table the listener is connected to.
     *
     * @param {Data.DataCursor.State} state
     * The state on the table the listener is listening to.
     *
     * @param {Data.DataCursor.Listener} listener
     * The listener to deregister.
     *
     * @return {Data.DataCursor}
     * Returns the DataCursor instance for a call chain.
     */
    DataCursor.prototype.removeListener = function (tableId, state, listener) {
        var listeners = (this.listenerMap[tableId] &&
                this.listenerMap[tableId][state]);
        if (listeners) {
            var index = listeners.indexOf(listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
        return this;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Semantic version string of the DataCursor class.
     * @internal
     */
    DataCursor.version = '1.0.0';
    return DataCursor;
}());
/* *
 *
 *  Class Namespace
 *
 * */
/**
 * @class Data.DataCursor
 */
(function (DataCursor) {
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
     * Finds the index of an cursor in an array.
     * @private
     */
    function getIndex(needle, cursors) {
        if (needle.type === 'position') {
            for (var cursor = void 0, i = 0, iEnd = cursors.length; i < iEnd; ++i) {
                cursor = cursors[i];
                if (cursor.type === 'position' &&
                    cursor.state === needle.state &&
                    cursor.column === needle.column &&
                    cursor.row === needle.row) {
                    return i;
                }
            }
        }
        else {
            var columnNeedle = JSON.stringify(needle.columns);
            for (var cursor = void 0, i = 0, iEnd = cursors.length; i < iEnd; ++i) {
                cursor = cursors[i];
                if (cursor.type === 'range' &&
                    cursor.state === needle.state &&
                    cursor.firstRow === needle.firstRow &&
                    cursor.lastRow === needle.lastRow &&
                    JSON.stringify(cursor.columns) === columnNeedle) {
                    return i;
                }
            }
        }
        return -1;
    }
    DataCursor.getIndex = getIndex;
    /**
     * Checks whether two cursor share the same properties.
     * @private
     */
    function isEqual(cursorA, cursorB) {
        if (cursorA.type === 'position' && cursorB.type === 'position') {
            return (cursorA.column === cursorB.column &&
                cursorA.row === cursorB.row &&
                cursorA.state === cursorB.state);
        }
        if (cursorA.type === 'range' && cursorB.type === 'range') {
            return (cursorA.firstRow === cursorB.firstRow &&
                cursorA.lastRow === cursorB.lastRow &&
                (JSON.stringify(cursorA.columns) ===
                    JSON.stringify(cursorB.columns)));
        }
        return false;
    }
    DataCursor.isEqual = isEqual;
    /**
     * Checks whether a cursor is in a range.
     * @private
     */
    function isInRange(needle, range) {
        if (range.type === 'position') {
            range = toRange(range);
        }
        if (needle.type === 'position') {
            needle = toRange(needle, range);
        }
        var needleColumns = needle.columns;
        var rangeColumns = range.columns;
        return (needle.firstRow >= range.firstRow &&
            needle.lastRow <= range.lastRow &&
            (!needleColumns ||
                !rangeColumns ||
                needleColumns.every(function (column) { return rangeColumns.indexOf(column) >= 0; })));
    }
    DataCursor.isInRange = isInRange;
    /**
     * @private
     */
    function toPositions(cursor) {
        if (cursor.type === 'position') {
            return [cursor];
        }
        var columns = (cursor.columns || []);
        var positions = [];
        var state = cursor.state;
        for (var row = cursor.firstRow, rowEnd = cursor.lastRow; row < rowEnd; ++row) {
            if (!columns.length) {
                positions.push({
                    type: 'position',
                    row: row,
                    state: state
                });
                continue;
            }
            for (var column = 0, columnEnd = columns.length; column < columnEnd; ++column) {
                positions.push({
                    type: 'position',
                    column: columns[column],
                    row: row,
                    state: state
                });
            }
        }
        return positions;
    }
    DataCursor.toPositions = toPositions;
    /**
     * @private
     */
    function toRange(cursor, defaultRange) {
        var _a,
            _b,
            _c,
            _d;
        if (cursor.type === 'range') {
            return cursor;
        }
        var range = {
                type: 'range',
                firstRow: ((_b = (_a = cursor.row) !== null && _a !== void 0 ? _a : (defaultRange && defaultRange.firstRow)) !== null && _b !== void 0 ? _b : 0),
                lastRow: ((_d = (_c = cursor.row) !== null && _c !== void 0 ? _c : (defaultRange && defaultRange.lastRow)) !== null && _d !== void 0 ? _d : Number.MAX_VALUE),
                state: cursor.state
            };
        if (typeof cursor.column !== 'undefined') {
            range.columns = [cursor.column];
        }
        return range;
    }
    DataCursor.toRange = toRange;
})(DataCursor || (DataCursor = {}));
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Data_DataCursor = (DataCursor);

;// ./code/es5/es-modules/Data/DataPoolDefaults.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */

/* *
 *
 *  API Options
 *
 * */
var DataPoolDefaults = {
    connectors: []
};
/* *
 *
 *  Export Defaults
 *
 * */
/* harmony default export */ var Data_DataPoolDefaults = (DataPoolDefaults);

;// ./code/es5/es-modules/Data/DataPool.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */




/* *
 *
 *  Class
 *
 * */
/**
 * Data pool to load connectors on-demand.
 *
 * @class
 * @name Data.DataPool
 *
 * @param {Data.DataPoolOptions} options
 * Pool options with all connectors.
 */
var DataPool = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function DataPool(options) {
        if (options === void 0) { options = Data_DataPoolDefaults; }
        options.connectors = (options.connectors || []);
        this.connectors = {};
        this.options = options;
        this.waiting = {};
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Emits an event on this data pool to all registered callbacks of the given
     * event.
     * @private
     *
     * @param {DataTable.Event} e
     * Event object with event information.
     */
    DataPool.prototype.emit = function (e) {
        highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().fireEvent(this, e.type, e);
    };
    /**
     * Loads the connector.
     *
     * @function Data.DataPool#getConnector
     *
     * @param {string} connectorId
     * ID of the connector.
     *
     * @return {Promise<Data.DataConnectorType>}
     * Returns the connector.
     */
    DataPool.prototype.getConnector = function (connectorId) {
        var _this = this;
        var connector = this.connectors[connectorId];
        // Already loaded
        if (connector === null || connector === void 0 ? void 0 : connector.loaded) {
            return Promise.resolve(connector);
        }
        var waitingList = this.waiting[connectorId];
        // Start loading
        if (!waitingList) {
            waitingList = this.waiting[connectorId] = [];
            var connectorOptions = this.getConnectorOptions(connectorId);
            if (!connectorOptions) {
                throw new Error("Connector '".concat(connectorId, "' not found."));
            }
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this
                .loadConnector(connectorOptions)
                .then(function (connector) {
                delete _this.waiting[connectorId];
                for (var i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                    waitingList[i][0](connector);
                }
            })['catch'](function (error) {
                delete _this.waiting[connectorId];
                for (var i = 0, iEnd = waitingList.length; i < iEnd; ++i) {
                    waitingList[i][1](error);
                }
            });
        }
        // Add request to waiting list
        return new Promise(function (resolve, reject) {
            waitingList.push([resolve, reject]);
        });
    };
    /**
     * Returns the IDs of all connectors.
     *
     * @private
     *
     * @return {Array<string>}
     * Names of all connectors.
     */
    DataPool.prototype.getConnectorIds = function () {
        var connectors = this.options.connectors,
            connectorIds = [];
        for (var i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            connectorIds.push(connectors[i].id);
        }
        return connectorIds;
    };
    /**
     * Loads the options of the connector.
     *
     * @private
     *
     * @param {string} connectorId
     * ID of the connector.
     *
     * @return {DataPoolConnectorOptions|undefined}
     * Returns the options of the connector, or `undefined` if not found.
     */
    DataPool.prototype.getConnectorOptions = function (connectorId) {
        var connectors = this.options.connectors;
        for (var i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            if (connectors[i].id === connectorId) {
                return connectors[i];
            }
        }
    };
    /**
     * Loads the connector table.
     *
     * @function Data.DataPool#getConnectorTable
     *
     * @param {string} connectorId
     * ID of the connector.
     *
     * @return {Promise<Data.DataTable>}
     * Returns the connector table.
     */
    DataPool.prototype.getConnectorTable = function (connectorId) {
        return this
            .getConnector(connectorId)
            .then(function (connector) { return connector.table; });
    };
    /**
     * Tests whether the connector has never been requested.
     *
     * @param {string} connectorId
     * Name of the connector.
     *
     * @return {boolean}
     * Returns `true`, if the connector has never been requested, otherwise
     * `false`.
     */
    DataPool.prototype.isNewConnector = function (connectorId) {
        return !this.connectors[connectorId];
    };
    /**
     * Creates and loads the connector.
     *
     * @private
     *
     * @param {Data.DataPoolConnectorOptions} options
     * Options of connector.
     *
     * @return {Promise<Data.DataConnectorType>}
     * Returns the connector.
     */
    DataPool.prototype.loadConnector = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.emit({
                type: 'load',
                options: options
            });
            var ConnectorClass = Connectors_DataConnector.types[options.type];
            if (!ConnectorClass) {
                throw new Error("Connector type not found. (".concat(options.type, ")"));
            }
            var connector = _this.connectors[options.id] = new ConnectorClass(options.options,
                options.dataTables);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            connector
                .load()
                .then(function (_a) {
                var converter = _a.converter,
                    dataTables = _a.dataTables;
                connector.dataTables = dataTables;
                connector.converter = converter;
                connector.loaded = true;
                _this.emit({
                    type: 'afterLoad',
                    options: options
                });
                resolve(connector);
            })['catch'](reject);
        });
    };
    /**
     * Cancels all data connectors pending requests.
     */
    DataPool.prototype.cancelPendingRequests = function () {
        var connectors = this.connectors;
        for (var _i = 0, _a = Object.keys(connectors); _i < _a.length; _i++) {
            var connectorKey = _a[_i];
            connectors[connectorKey].stopPolling();
        }
    };
    /**
     * Registers a callback for a specific event.
     *
     * @function Highcharts.DataPool#on
     *
     * @param {string} type
     * Event type as a string.
     *
     * @param {Highcharts.EventCallbackFunction<Highcharts.DataPool>} callback
     * Function to register for an event callback.
     *
     * @return {Function}
     * Function to unregister callback from the event.
     */
    DataPool.prototype.on = function (type, callback) {
        return highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default().addEvent(this, type, callback);
    };
    /**
     * Sets connector options under the specified `options.id`.
     *
     * @param {Data.DataPoolConnectorOptions} options
     * Connector options to set.
     */
    DataPool.prototype.setConnectorOptions = function (options) {
        var connectors = this.options.connectors,
            instances = this.connectors;
        this.emit({
            type: 'setConnectorOptions',
            options: options
        });
        for (var i = 0, iEnd = connectors.length; i < iEnd; ++i) {
            if (connectors[i].id === options.id) {
                connectors.splice(i, 1);
                break;
            }
        }
        if (instances[options.id]) {
            instances[options.id].stopPolling();
            delete instances[options.id];
        }
        connectors.push(options);
        this.emit({
            type: 'afterSetConnectorOptions',
            options: options
        });
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Semantic version string of the DataPool class.
     * @internal
     */
    DataPool.version = '1.0.0';
    return DataPool;
}());
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Data_DataPool = (DataPool);

;// ./code/es5/es-modules/Data/Formula/FormulaParser.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */

/* *
 *
 *  Constants
 *
 * */
/**
 * @private
 */
var booleanRegExp = /^(?:FALSE|TRUE)/;
/**
 * `.`-separated decimal.
 * @private
 */
var decimal1RegExp = /^[+\-]?\d+(?:\.\d+)?(?:e[+\-]\d+)?/;
/**
 * `,`-separated decimal.
 * @private
 */
var decimal2RegExp = /^[+\-]?\d+(?:,\d+)?(?:e[+\-]\d+)?/;
/**
 * - Group 1: Function name
 * @private
 */
var functionRegExp = /^([A-Z][A-Z\d\.]*)\(/;
/**
 * @private
 */
var operatorRegExp = /^(?:[+\-*\/^<=>]|<=|=>)/;
/**
 * - Group 1: Start column
 * - Group 2: Start row
 * - Group 3: End column
 * - Group 4: End row
 * @private
 */
var rangeA1RegExp = /^(\$?[A-Z]+)(\$?\d+)\:(\$?[A-Z]+)(\$?\d+)/;
/**
 * - Group 1: Start row
 * - Group 2: Start column
 * - Group 3: End row
 * - Group 4: End column
 * @private
 */
var rangeR1C1RegExp = /^R(\d*|\[\d+\])C(\d*|\[\d+\])\:R(\d*|\[\d+\])C(\d*|\[\d+\])/;
/**
 * - Group 1: Column
 * - Group 2: Row
 * @private
 */
var referenceA1RegExp = /^(\$?[A-Z]+)(\$?\d+)(?![\:C])/;
/**
 * - Group 1: Row
 * - Group 2: Column
 * @private
 */
var referenceR1C1RegExp = /^R(\d*|\[\d+\])C(\d*|\[\d+\])(?!\:)/;
/* *
 *
 *  Functions
 *
 * */
/**
 * Extracts the inner string of the most outer parantheses.
 *
 * @private
 *
 * @param {string} text
 * Text string to extract from.
 *
 * @return {string}
 * Extracted parantheses. If not found an exception will be thrown.
 */
function extractParantheses(text) {
    var parantheseLevel = 0;
    for (var i = 0, iEnd = text.length, char = void 0, parantheseStart = 1; i < iEnd; ++i) {
        char = text[i];
        if (char === '(') {
            if (!parantheseLevel) {
                parantheseStart = i + 1;
            }
            ++parantheseLevel;
            continue;
        }
        if (char === ')') {
            --parantheseLevel;
            if (!parantheseLevel) {
                return text.substring(parantheseStart, i);
            }
        }
    }
    if (parantheseLevel > 0) {
        var error = new Error('Incomplete parantheses.');
        error.name = 'FormulaParseError';
        throw error;
    }
    return '';
}
/**
 * Extracts the inner string value.
 *
 * @private
 *
 * @param {string} text
 * Text string to extract from.
 *
 * @return {string}
 * Extracted string. If not found an exception will be thrown.
 */
function extractString(text) {
    var start = -1;
    for (var i = 0, iEnd = text.length, char = void 0, escaping = false; i < iEnd; ++i) {
        char = text[i];
        if (char === '\\') {
            escaping = !escaping;
            continue;
        }
        if (escaping) {
            escaping = false;
            continue;
        }
        if (char === '"') {
            if (start < 0) {
                start = i;
            }
            else {
                return text.substring(start + 1, i); // `ì` is excluding
            }
        }
    }
    var error = new Error('Incomplete string.');
    error.name = 'FormulaParseError';
    throw error;
}
/**
 * Parses an argument string. Formula arrays with a single term will be
 * simplified to the term.
 *
 * @private
 *
 * @param {string} text
 * Argument string to parse.
 *
 * @param {boolean} alternativeSeparators
 * Whether to expect `;` as argument separator and `,` as decimal separator.
 *
 * @return {Formula|Function|Range|Reference|Value}
 * The recognized term structure.
 */
function parseArgument(text, alternativeSeparators) {
    var match;
    // Check for a R1C1:R1C1 range notation
    match = text.match(rangeR1C1RegExp);
    if (match) {
        var beginColumnRelative = (match[2] === '' || match[2][0] === '[');
        var beginRowRelative = (match[1] === '' || match[1][0] === '[');
        var endColumnRelative = (match[4] === '' || match[4][0] === '[');
        var endRowRelative = (match[3] === '' || match[3][0] === '[');
        var range = {
                type: 'range',
                beginColumn: (beginColumnRelative ?
                    parseInt(match[2].substring(1, -1) || '0', 10) :
                    parseInt(match[2], 10) - 1),
                beginRow: (beginRowRelative ?
                    parseInt(match[1].substring(1, -1) || '0', 10) :
                    parseInt(match[1], 10) - 1),
                endColumn: (endColumnRelative ?
                    parseInt(match[4].substring(1, -1) || '0', 10) :
                    parseInt(match[4], 10) - 1),
                endRow: (endRowRelative ?
                    parseInt(match[3].substring(1, -1) || '0', 10) :
                    parseInt(match[3], 10) - 1)
            };
        if (beginColumnRelative) {
            range.beginColumnRelative = true;
        }
        if (beginRowRelative) {
            range.beginRowRelative = true;
        }
        if (endColumnRelative) {
            range.endColumnRelative = true;
        }
        if (endRowRelative) {
            range.endRowRelative = true;
        }
        return range;
    }
    // Check for a A1:A1 range notation
    match = text.match(rangeA1RegExp);
    if (match) {
        var beginColumnRelative = match[1][0] !== '$';
        var beginRowRelative = match[2][0] !== '$';
        var endColumnRelative = match[3][0] !== '$';
        var endRowRelative = match[4][0] !== '$';
        var range = {
                type: 'range',
                beginColumn: parseReferenceColumn(beginColumnRelative ?
                    match[1] :
                    match[1].substring(1)) - 1,
                beginRow: parseInt(beginRowRelative ?
                    match[2] :
                    match[2].substring(1), 10) - 1,
                endColumn: parseReferenceColumn(endColumnRelative ?
                    match[3] :
                    match[3].substring(1)) - 1,
                endRow: parseInt(endRowRelative ?
                    match[4] :
                    match[4].substring(1), 10) - 1
            };
        if (beginColumnRelative) {
            range.beginColumnRelative = true;
        }
        if (beginRowRelative) {
            range.beginRowRelative = true;
        }
        if (endColumnRelative) {
            range.endColumnRelative = true;
        }
        if (endRowRelative) {
            range.endRowRelative = true;
        }
        return range;
    }
    // Fallback to formula processing for other pattern types
    var formula = parseFormula(text,
        alternativeSeparators);
    return (formula.length === 1 && typeof formula[0] !== 'string' ?
        formula[0] :
        formula);
}
/**
 * Parse arguments string inside function parantheses.
 *
 * @private
 *
 * @param {string} text
 * Parantheses string of the function.
 *
 * @param {boolean} alternativeSeparators
 * Whether to expect `;` as argument separator and `,` as decimal separator.
 *
 * @return {Highcharts.FormulaArguments}
 * Parsed arguments array.
 */
function parseArguments(text, alternativeSeparators) {
    var args = [], argumentsSeparator = (alternativeSeparators ? ';' : ',');
    var parantheseLevel = 0,
        term = '';
    for (var i = 0, iEnd = text.length, char = void 0; i < iEnd; ++i) {
        char = text[i];
        // Check for separator
        if (char === argumentsSeparator &&
            !parantheseLevel &&
            term) {
            args.push(parseArgument(term, alternativeSeparators));
            term = '';
            // Check for a quoted string before skip logic
        }
        else if (char === '"' &&
            !parantheseLevel &&
            !term) {
            var string = extractString(text.substring(i));
            args.push(string);
            i += string.length + 1; // Only +1 to cover ++i in for-loop
            // Skip space and check paranthesis nesting
        }
        else if (char !== ' ') {
            term += char;
            if (char === '(') {
                ++parantheseLevel;
            }
            else if (char === ')') {
                --parantheseLevel;
            }
        }
    }
    // Look for left-overs from last argument
    if (!parantheseLevel && term) {
        args.push(parseArgument(term, alternativeSeparators));
    }
    return args;
}
/**
 * Converts a spreadsheet formula string into a formula array. Throws a
 * `FormulaParserError` when the string can not be parsed.
 *
 * @private
 * @function Formula.parseFormula
 *
 * @param {string} text
 * Spreadsheet formula string, without the leading `=`.
 *
 * @param {boolean} alternativeSeparators
 * * `false` to expect `,` between arguments and `.` in decimals.
 * * `true` to expect `;` between arguments and `,` in decimals.
 *
 * @return {Formula.Formula}
 * Formula array representing the string.
 */
function parseFormula(text, alternativeSeparators) {
    var decimalRegExp = (alternativeSeparators ?
            decimal2RegExp :
            decimal1RegExp),
        formula = [];
    var match,
        next = (text[0] === '=' ? text.substring(1) : text).trim();
    while (next) {
        // Check for an R1C1 reference notation
        match = next.match(referenceR1C1RegExp);
        if (match) {
            var columnRelative = (match[2] === '' || match[2][0] === '[');
            var rowRelative = (match[1] === '' || match[1][0] === '[');
            var reference = {
                    type: 'reference',
                    column: (columnRelative ?
                        parseInt(match[2].substring(1, -1) || '0', 10) :
                        parseInt(match[2], 10) - 1),
                    row: (rowRelative ?
                        parseInt(match[1].substring(1, -1) || '0', 10) :
                        parseInt(match[1], 10) - 1)
                };
            if (columnRelative) {
                reference.columnRelative = true;
            }
            if (rowRelative) {
                reference.rowRelative = true;
            }
            formula.push(reference);
            next = next.substring(match[0].length).trim();
            continue;
        }
        // Check for an A1 reference notation
        match = next.match(referenceA1RegExp);
        if (match) {
            var columnRelative = match[1][0] !== '$';
            var rowRelative = match[2][0] !== '$';
            var reference = {
                    type: 'reference',
                    column: parseReferenceColumn(columnRelative ?
                        match[1] :
                        match[1].substring(1)) - 1,
                    row: parseInt(rowRelative ?
                        match[2] :
                        match[2].substring(1), 10) - 1
                };
            if (columnRelative) {
                reference.columnRelative = true;
            }
            if (rowRelative) {
                reference.rowRelative = true;
            }
            formula.push(reference);
            next = next.substring(match[0].length).trim();
            continue;
        }
        // Check for a formula operator
        match = next.match(operatorRegExp);
        if (match) {
            formula.push(match[0]);
            next = next.substring(match[0].length).trim();
            continue;
        }
        // Check for a boolean value
        match = next.match(booleanRegExp);
        if (match) {
            formula.push(match[0] === 'TRUE');
            next = next.substring(match[0].length).trim();
            continue;
        }
        // Check for a number value
        match = next.match(decimalRegExp);
        if (match) {
            formula.push(parseFloat(match[0]));
            next = next.substring(match[0].length).trim();
            continue;
        }
        // Check for a quoted string
        if (next[0] === '"') {
            var string = extractString(next);
            formula.push(string.substring(1, -1));
            next = next.substring(string.length + 2).trim();
            continue;
        }
        // Check for a function
        match = next.match(functionRegExp);
        if (match) {
            next = next.substring(match[1].length).trim();
            var parantheses = extractParantheses(next);
            formula.push({
                type: 'function',
                name: match[1],
                args: parseArguments(parantheses, alternativeSeparators)
            });
            next = next.substring(parantheses.length + 2).trim();
            continue;
        }
        // Check for a formula in parantheses
        if (next[0] === '(') {
            var paranteses = extractParantheses(next);
            if (paranteses) {
                formula
                    .push(parseFormula(paranteses, alternativeSeparators));
                next = next.substring(paranteses.length + 2).trim();
                continue;
            }
        }
        // Something is not right
        var position = text.length - next.length, error = new Error('Unexpected character `' +
                text.substring(position, position + 1) +
                '` at position ' + (position + 1) +
                '. (`...' + text.substring(position - 5, position + 6) + '...`)');
        error.name = 'FormulaParseError';
        throw error;
    }
    return formula;
}
/**
 * Converts a reference column `A` of `A1` into a number. Supports endless sizes
 * `ZZZ...`, just limited by integer precision.
 *
 * @private
 *
 * @param {string} text
 * Column string to convert.
 *
 * @return {number}
 * Converted column index.
 */
function parseReferenceColumn(text) {
    var column = 0;
    for (var i = 0, iEnd = text.length, code = void 0, factor = text.length - 1; i < iEnd; ++i) {
        code = text.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            column += (code - 64) * Math.pow(26, factor);
        }
        --factor;
    }
    return column;
}
/* *
 *
 *  Default Export
 *
 * */
var FormulaParser = {
    parseFormula: parseFormula
};
/* harmony default export */ var Formula_FormulaParser = (FormulaParser);

;// ./code/es5/es-modules/Data/Formula/FormulaTypes.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */

/* *
 *
 *  Constants
 *
 * */
/**
 * Array of all possible operators.
 * @private
 */
var operators = ['+', '-', '*', '/', '^', '=', '<', '<=', '>', '>='];
/* *
 *
 *  Functions
 *
 * */
/**
 * Tests an item for a Formula array.
 *
 * @private
 *
 * @param {Highcharts.FormulaItem} item
 * Item to test.
 *
 * @return {boolean}
 * `true`, if the item is a formula (or argument) array.
 */
function isFormula(item) {
    return item instanceof Array;
}
/**
 * Tests an item for a Function structure.
 *
 * @private
 *
 * @param {Highcharts.FormulaItem} item
 * Item to test.
 *
 * @return {boolean}
 * `true`, if the item is a formula function.
 */
function isFunction(item) {
    return (typeof item === 'object' &&
        !(item instanceof Array) &&
        item.type === 'function');
}
/**
 * Tests an item for an Operator string.
 *
 * @private
 *
 * @param {Highcharts.FormulaItem} item
 * Item to test.
 *
 * @return {boolean}
 * `true`, if the item is an operator string.
 */
function isOperator(item) {
    return (typeof item === 'string' &&
        operators.indexOf(item) >= 0);
}
/**
 * Tests an item for a Range structure.
 *
 * @private
 *
 * @param {Highcharts.FormulaItem} item
 * Item to test.
 *
 * @return {boolean}
 * `true`, if the item is a range.
 */
function isRange(item) {
    return (typeof item === 'object' &&
        !(item instanceof Array) &&
        item.type === 'range');
}
/**
 * Tests an item for a Reference structure.
 *
 * @private
 *
 * @param {Highcharts.FormulaItem} item
 * Item to test.
 *
 * @return {boolean}
 * `true`, if the item is a reference.
 */
function isReference(item) {
    return (typeof item === 'object' &&
        !(item instanceof Array) &&
        item.type === 'reference');
}
/**
 * Tests an item for a Value structure.
 *
 * @private
 *
 * @param {Highcharts.FormulaItem|null|undefined} item
 * Item to test.
 *
 * @return {boolean}
 * `true`, if the item is a value.
 */
function isValue(item) {
    return (typeof item === 'boolean' ||
        typeof item === 'number' ||
        typeof item === 'string');
}
/* *
 *
 *  Default Export
 *
 * */
var MathFormula = {
    isFormula: isFormula,
    isFunction: isFunction,
    isOperator: isOperator,
    isRange: isRange,
    isReference: isReference,
    isValue: isValue
};
/* harmony default export */ var FormulaTypes = (MathFormula);

;// ./code/es5/es-modules/Data/Formula/FormulaProcessor.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var FormulaProcessor_isFormula = FormulaTypes.isFormula, FormulaProcessor_isFunction = FormulaTypes.isFunction, FormulaProcessor_isOperator = FormulaTypes.isOperator, FormulaProcessor_isRange = FormulaTypes.isRange, FormulaProcessor_isReference = FormulaTypes.isReference, FormulaProcessor_isValue = FormulaTypes.isValue;
/* *
 *
 *  Constants
 *
 * */
var asLogicalStringRegExp = / */;
var MAX_FALSE = Number.MAX_VALUE / 1.000000000001;
var MAX_STRING = Number.MAX_VALUE / 1.000000000002;
var MAX_TRUE = Number.MAX_VALUE;
var operatorPriority = {
    '^': 3,
    '*': 2,
    '/': 2,
    '+': 1,
    '-': 1,
    '=': 0,
    '<': 0,
    '<=': 0,
    '>': 0,
    '>=': 0
};
var processorFunctions = {};
var processorFunctionNameRegExp = /^[A-Z][A-Z\.]*$/;
/* *
 *
 *  Functions
 *
 * */
/**
 * Converts non-number types to logical numbers.
 *
 * @param {Highcharts.FormulaValue} value
 * Value to convert.
 *
 * @return {number}
 * Logical number value. `NaN` if not convertable.
 */
function asLogicalNumber(value) {
    switch (typeof value) {
        case 'boolean':
            return value ? MAX_TRUE : MAX_FALSE;
        case 'string':
            return MAX_STRING;
        case 'number':
            return value;
        default:
            return NaN;
    }
}
/**
 * Converts strings to logical strings, while other types get passed through. In
 * logical strings the space character is the lowest value and letters are case
 * insensitive.
 *
 * @param {Highcharts.FormulaValue} value
 * Value to convert.
 *
 * @return {Highcharts.FormulaValue}
 * Logical string value or passed through value.
 */
function asLogicalString(value) {
    if (typeof value === 'string') {
        return value.toLowerCase().replace(asLogicalStringRegExp, '\0');
    }
    return value;
}
/**
 * Converts non-number types to a logic number.
 *
 * @param {Highcharts.FormulaValue} value
 * Value to convert.
 *
 * @return {number}
 * Number value. `NaN` if not convertable.
 */
function asNumber(value) {
    switch (typeof value) {
        case 'boolean':
            return value ? 1 : 0;
        case 'string':
            return parseFloat(value.replace(',', '.'));
        case 'number':
            return value;
        default:
            return NaN;
    }
}
/**
 * Process a basic operation of two given values.
 *
 * @private
 *
 * @param {Highcharts.FormulaOperator} operator
 * Operator between values.
 *
 * @param {Highcharts.FormulaValue} x
 * First value for operation.
 *
 * @param {Highcharts.FormulaValue} y
 * Second value for operation.
 *
 * @return {Highcharts.FormulaValue}
 * Operation result. `NaN` if operation is not support.
 */
function basicOperation(operator, x, y) {
    switch (operator) {
        case '=':
            return asLogicalString(x) === asLogicalString(y);
        case '<':
            if (typeof x === typeof y) {
                return asLogicalString(x) < asLogicalString(y);
            }
            return asLogicalNumber(x) < asLogicalNumber(y);
        case '<=':
            if (typeof x === typeof y) {
                return asLogicalString(x) <= asLogicalString(y);
            }
            return asLogicalNumber(x) <= asLogicalNumber(y);
        case '>':
            if (typeof x === typeof y) {
                return asLogicalString(x) > asLogicalString(y);
            }
            return asLogicalNumber(x) > asLogicalNumber(y);
        case '>=':
            if (typeof x === typeof y) {
                return asLogicalString(x) >= asLogicalString(y);
            }
            return asLogicalNumber(x) >= asLogicalNumber(y);
    }
    x = asNumber(x);
    y = asNumber(y);
    var result;
    switch (operator) {
        case '+':
            result = x + y;
            break;
        case '-':
            result = x - y;
            break;
        case '*':
            result = x * y;
            break;
        case '/':
            result = x / y;
            break;
        case '^':
            result = Math.pow(x, y);
            break;
        default:
            return NaN;
    }
    // Limit decimal to 9 digits
    return (result % 1 ?
        Math.round(result * 1000000000) / 1000000000 :
        result);
}
/**
 * Converts an argument to Value and in case of a range to an array of Values.
 *
 * @function Highcharts.Formula.getArgumentValue
 *
 * @param {Highcharts.FormulaRange|Highcharts.FormulaTerm} arg
 * Formula range or term to convert.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
 * Converted value.
 */
function getArgumentValue(arg, table) {
    // Add value
    if (FormulaProcessor_isValue(arg)) {
        return arg;
    }
    // Add values of a range
    if (FormulaProcessor_isRange(arg)) {
        return (table && getRangeValues(arg, table) || []);
    }
    // Add values of a function
    if (FormulaProcessor_isFunction(arg)) {
        return processFunction(arg, table);
    }
    // Process functions, operations, references with formula processor
    return processFormula((FormulaProcessor_isFormula(arg) ? arg : [arg]), table);
}
/**
 * Converts all arguments to Values and in case of ranges to arrays of Values.
 *
 * @function Highcharts.Formula.getArgumentsValues
 *
 * @param {Highcharts.FormulaArguments} args
 * Formula arguments to convert.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {Array<(Highcharts.FormulaValue|Array<Highcharts.FormulaValue>)>}
 * Converted values.
 */
function getArgumentsValues(args, table) {
    var values = [];
    for (var i = 0, iEnd = args.length; i < iEnd; ++i) {
        values.push(getArgumentValue(args[i], table));
    }
    return values;
}
/**
 * Extracts cell values from a table for a given range.
 *
 * @function Highcharts.Formula.getRangeValues
 *
 * @param {Highcharts.FormulaRange} range
 * Formula range to use.
 *
 * @param {Highcharts.DataTable} table
 * Table to extract from.
 *
 * @return {Array<Highcharts.FormulaValue>}
 * Extracted values.
 */
function getRangeValues(range, table) {
    var columnNames = table
            .getColumnNames()
            .slice(range.beginColumn,
        range.endColumn + 1),
        values = [];
    for (var i = 0, iEnd = columnNames.length, cell = void 0; i < iEnd; ++i) {
        var cells = table.getColumn(columnNames[i],
            true) || [];
        for (var j = range.beginRow, jEnd = range.endRow + 1; j < jEnd; ++j) {
            cell = cells[j];
            if (typeof cell === 'string' &&
                cell[0] === '=' &&
                table !== table.modified) {
                // Look in the modified table for formula result
                cell = table.modified.getCell(columnNames[i], j);
            }
            values.push(FormulaProcessor_isValue(cell) ? cell : NaN);
        }
    }
    return values;
}
/**
 * Extracts the cell value from a table for a given reference.
 *
 * @private
 *
 * @param {Highcharts.FormulaReference} reference
 * Formula reference to use.
 *
 * @param {Highcharts.DataTable} table
 * Table to extract from.
 *
 * @return {Highcharts.FormulaValue}
 * Extracted value. 'undefined' might also indicate that the cell was not found.
 */
function getReferenceValue(reference, table) {
    var columnName = table.getColumnNames()[reference.column];
    if (columnName) {
        var cell = table.getCell(columnName,
            reference.row);
        if (typeof cell === 'string' &&
            cell[0] === '=' &&
            table !== table.modified) {
            // Look in the modified table for formula result
            var result = table.modified.getCell(columnName,
                reference.row);
            return FormulaProcessor_isValue(result) ? result : NaN;
        }
        return FormulaProcessor_isValue(cell) ? cell : NaN;
    }
    return NaN;
}
/**
 * Processes a formula array on the given table. If the formula does not contain
 * references or ranges, then no table has to be provided.
 *
 * @private
 * @function Highcharts.processFormula
 *
 * @param {Highcharts.Formula} formula
 * Formula array to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {Highcharts.FormulaValue}
 * Result value of the process. `NaN` indicates an error.
 */
function processFormula(formula, table) {
    var x;
    for (var i = 0, iEnd = formula.length, item = void 0, operator = void 0, result = void 0, y = void 0; i < iEnd; ++i) {
        item = formula[i];
        // Remember operator for operation on next item
        if (FormulaProcessor_isOperator(item)) {
            operator = item;
            continue;
        }
        // Next item is a value
        if (FormulaProcessor_isValue(item)) {
            y = item;
            // Next item is a formula and needs to get processed first
        }
        else if (FormulaProcessor_isFormula(item)) {
            y = processFormula(formula, table);
            // Next item is a function call and needs to get processed first
        }
        else if (FormulaProcessor_isFunction(item)) {
            result = processFunction(item, table);
            y = (FormulaProcessor_isValue(result) ? result : NaN); // Arrays are not allowed here
            // Next item is a reference and needs to get resolved
        }
        else if (FormulaProcessor_isReference(item)) {
            y = (table && getReferenceValue(item, table));
        }
        // If we have a next value, lets do the operation
        if (typeof y !== 'undefined') {
            // Next value is our first value
            if (typeof x === 'undefined') {
                if (operator) {
                    x = basicOperation(operator, 0, y);
                }
                else {
                    x = y;
                }
                // Fail fast if no operator available
            }
            else if (!operator) {
                return NaN;
                // Regular next value
            }
            else {
                var operator2 = formula[i + 1];
                if (FormulaProcessor_isOperator(operator2) &&
                    operatorPriority[operator2] > operatorPriority[operator]) {
                    y = basicOperation(operator2, y, processFormula(formula.slice(i + 2)));
                    i = iEnd;
                }
                x = basicOperation(operator, x, y);
            }
            operator = void 0;
            y = void 0;
        }
    }
    return FormulaProcessor_isValue(x) ? x : NaN;
}
/**
 * Process a function on the given table. If the arguments do not contain
 * references or ranges, then no table has to be provided.
 *
 * @private
 *
 * @param {Highcharts.FormulaFunction} formulaFunction
 * Formula function to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @param {Highcharts.FormulaReference} [reference]
 * Table cell reference to use for relative references and ranges.
 *
 * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
 * Result value (or values) of the process. `NaN` indicates an error.
 */
function processFunction(formulaFunction, table, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
reference // @todo
) {
    var processor = processorFunctions[formulaFunction.name];
    if (processor) {
        try {
            return processor(formulaFunction.args, table);
        }
        catch (_a) {
            return NaN;
        }
    }
    var error = new Error("Function \"".concat(formulaFunction.name, "\" not found."));
    error.name = 'FormulaProcessError';
    throw error;
}
/**
 * Registers a function for the FormulaProcessor.
 *
 * @param {string} name
 * Name of the function in spreadsheets notation with upper case.
 *
 * @param {Highcharts.FormulaFunction} processorFunction
 * ProcessorFunction for the FormulaProcessor. This is an object so that it
 * can take additional parameter for future validation routines.
 *
 * @return {boolean}
 * Return true, if the ProcessorFunction has been registered.
 */
function registerProcessorFunction(name, processorFunction) {
    return (processorFunctionNameRegExp.test(name) &&
        !processorFunctions[name] &&
        !!(processorFunctions[name] = processorFunction));
}
/**
 * Translates relative references and ranges in-place.
 *
 * @param {Highcharts.Formula} formula
 * Formula to translate references and ranges in.
 *
 * @param {number} [columnDelta=0]
 * Column delta to translate to. Negative translate back.
 *
 * @param {number} [rowDelta=0]
 * Row delta to translate to. Negative numbers translate back.
 *
 * @return {Highcharts.Formula}
 * Formula with translated reference and ranges. This formula is equal to the
 * first argument.
 */
function translateReferences(formula, columnDelta, rowDelta) {
    if (columnDelta === void 0) { columnDelta = 0; }
    if (rowDelta === void 0) { rowDelta = 0; }
    for (var i = 0, iEnd = formula.length, item = void 0; i < iEnd; ++i) {
        item = formula[i];
        if (item instanceof Array) {
            translateReferences(item, columnDelta, rowDelta);
        }
        else if (FormulaProcessor_isFunction(item)) {
            translateReferences(item.args, columnDelta, rowDelta);
        }
        else if (FormulaProcessor_isRange(item)) {
            if (item.beginColumnRelative) {
                item.beginColumn += columnDelta;
            }
            if (item.beginRowRelative) {
                item.beginRow += rowDelta;
            }
            if (item.endColumnRelative) {
                item.endColumn += columnDelta;
            }
            if (item.endRowRelative) {
                item.endRow += rowDelta;
            }
        }
        else if (FormulaProcessor_isReference(item)) {
            if (item.columnRelative) {
                item.column += columnDelta;
            }
            if (item.rowRelative) {
                item.row += rowDelta;
            }
        }
    }
    return formula;
}
/* *
 *
 *  Default Export
 *
 * */
var FormulaProcessor = {
    asNumber: asNumber,
    getArgumentValue: getArgumentValue,
    getArgumentsValues: getArgumentsValues,
    getRangeValues: getRangeValues,
    getReferenceValue: getReferenceValue,
    processFormula: processFormula,
    processorFunctions: processorFunctions,
    registerProcessorFunction: registerProcessorFunction,
    translateReferences: translateReferences
};
/* harmony default export */ var Formula_FormulaProcessor = (FormulaProcessor);

;// ./code/es5/es-modules/Data/Formula/Functions/ABS.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var ABS_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `ABS(value)` implementation. Returns positive numbers.
 *
 * @private
 * @function Formula.processorFunctions.AND
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {Array<number>}
 * Result value of the process.
 */
function ABS(args, table) {
    var value = ABS_getArgumentValue(args[0],
        table);
    switch (typeof value) {
        case 'number':
            return Math.abs(value);
        case 'object': {
            var values = [];
            for (var i = 0, iEnd = value.length, value2 = void 0; i < iEnd; ++i) {
                value2 = value[i];
                if (typeof value2 !== 'number') {
                    return NaN;
                }
                values.push(Math.abs(value2));
            }
            return values;
        }
        default:
            return NaN;
    }
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('ABS', ABS);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_ABS = ((/* unused pure expression or super */ null && (ABS)));

;// ./code/es5/es-modules/Data/Formula/Functions/AND.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var AND_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `AND(...tests)` implementation. Returns `TRUE`, if all test
 * results are not `0` or `FALSE`.
 *
 * @private
 * @function Formula.processorFunctions.AND
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {boolean}
 * Result value of the process.
 */
function AND(args, table) {
    for (var i = 0, iEnd = args.length, value = void 0; i < iEnd; ++i) {
        value = AND_getArgumentValue(args[i], table);
        if (!value ||
            (typeof value === 'object' &&
                !AND(value, table))) {
            return false;
        }
    }
    return true;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('AND', AND);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_AND = ((/* unused pure expression or super */ null && (AND)));

;// ./code/es5/es-modules/Data/Formula/Functions/AVERAGE.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var AVERAGE_getArgumentsValues = Formula_FormulaProcessor.getArgumentsValues;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `AVERAGE(...values)` implementation. Calculates the average
 * of the given values that are numbers.
 *
 * @private
 * @function Formula.processorFunctions.AVERAGE
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function AVERAGE(args, table) {
    var values = AVERAGE_getArgumentsValues(args,
        table);
    var count = 0,
        result = 0;
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (!isNaN(value)) {
                    ++count;
                    result += value;
                }
                break;
            case 'object':
                for (var j = 0, jEnd = value.length, value2 = void 0; j < jEnd; ++j) {
                    value2 = value[j];
                    if (typeof value2 === 'number' &&
                        !isNaN(value2)) {
                        ++count;
                        result += value2;
                    }
                }
                break;
        }
    }
    return (count ? (result / count) : 0);
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('AVERAGE', AVERAGE);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_AVERAGE = ((/* unused pure expression or super */ null && (AVERAGE)));

;// ./code/es5/es-modules/Data/Formula/Functions/AVERAGEA.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var AVERAGEA_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `AVERAGEA(...values)` implementation. Calculates the
 * average of the given values. Strings and FALSE are calculated as 0.
 *
 * @private
 * @function Formula.processorFunctions.AVERAGEA
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function AVERAGEA(args, table) {
    var count = 0,
        result = 0;
    for (var i = 0, iEnd = args.length, value = void 0; i < iEnd; ++i) {
        value = AVERAGEA_getArgumentValue(args[i], table);
        switch (typeof value) {
            case 'boolean':
                ++count;
                result += (value ? 1 : 0);
                continue;
            case 'number':
                if (!isNaN(value)) {
                    ++count;
                    result += value;
                }
                continue;
            case 'string':
                ++count;
                continue;
            default:
                for (var j = 0, jEnd = value.length, value2 = void 0; j < jEnd; ++j) {
                    value2 = value[j];
                    switch (typeof value2) {
                        case 'boolean':
                            ++count;
                            result += (value2 ? 1 : 0);
                            continue;
                        case 'number':
                            if (!isNaN(value2)) {
                                ++count;
                                result += value2;
                            }
                            continue;
                        case 'string':
                            ++count;
                            continue;
                    }
                }
                continue;
        }
    }
    return (count ? (result / count) : 0);
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('AVERAGEA', AVERAGEA);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_AVERAGEA = ((/* unused pure expression or super */ null && (AVERAGEA)));

;// ./code/es5/es-modules/Data/Formula/Functions/COUNT.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `COUNT(...values)` implementation. Returns the count of
 * given values that are numbers.
 *
 * @private
 * @function Formula.processorFunctions.COUNT
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function COUNT(args, table) {
    var values = Formula_FormulaProcessor.getArgumentsValues(args,
        table);
    var count = 0;
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (!isNaN(value)) {
                    ++count;
                }
                break;
            case 'object':
                count += COUNT(value, table);
                break;
        }
    }
    return count;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('COUNT', COUNT);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_COUNT = ((/* unused pure expression or super */ null && (COUNT)));

;// ./code/es5/es-modules/Data/Formula/Functions/COUNTA.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `COUNTA(...values)` implementation. Returns the count of
 * given values that are not empty.
 *
 * @private
 * @function Formula.processorFunctions.COUNT
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function COUNTA(args, table) {
    var values = Formula_FormulaProcessor.getArgumentsValues(args,
        table);
    var count = 0;
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (isNaN(value)) {
                    continue;
                }
                break;
            case 'object':
                count += COUNTA(value, table);
                continue;
            case 'string':
                if (!value) {
                    continue;
                }
                break;
        }
        ++count;
    }
    return count;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('COUNTA', COUNTA);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_COUNTA = ((/* unused pure expression or super */ null && (COUNTA)));

;// ./code/es5/es-modules/Data/Formula/Functions/IF.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var IF_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `IF(test, value1, value2)` implementation. Returns one of
 * the values based on the test result. `value1` will be returned, if the test
 * result is not `0` or `FALSE`.
 *
 * @private
 * @function Formula.processorFunctions.IF
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {Highcharts.FormulaValue|Array<Highcharts.FormulaValue>}
 * Result value of the process.
 */
function IF(args, table) {
    return (IF_getArgumentValue(args[0], table) ?
        IF_getArgumentValue(args[1], table) :
        IF_getArgumentValue(args[2], table));
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('IF', IF);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_IF = ((/* unused pure expression or super */ null && (IF)));

;// ./code/es5/es-modules/Data/Formula/Functions/ISNA.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var ISNA_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `ISNA(value)` implementation. Returns TRUE if value is not
 * a number.
 *
 * @private
 * @function Formula.processorFunctions.ISNA
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {boolean}
 * Result value of the process.
 */
function ISNA(args, table) {
    var value = ISNA_getArgumentValue(args[0],
        table);
    return (typeof value !== 'number' || isNaN(value));
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('ISNA', ISNA);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_ISNA = ((/* unused pure expression or super */ null && (ISNA)));

;// ./code/es5/es-modules/Data/Formula/Functions/MAX.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var MAX_getArgumentsValues = Formula_FormulaProcessor.getArgumentsValues;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `MAX(...values)` implementation. Calculates the largest
 * of the given values that are numbers.
 *
 * @private
 * @function Formula.processorFunctions.MAX
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function MAX(args, table) {
    var values = MAX_getArgumentsValues(args,
        table);
    var result = Number.NEGATIVE_INFINITY;
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (value > result) {
                    result = value;
                }
                break;
            case 'object':
                value = MAX(value);
                if (value > result) {
                    result = value;
                }
                break;
        }
    }
    return isFinite(result) ? result : 0;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('MAX', MAX);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_MAX = ((/* unused pure expression or super */ null && (MAX)));

;// ./code/es5/es-modules/Data/Formula/Functions/MEDIAN.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `MEDIAN(...values)` implementation. Calculates the median
 * average of the given values.
 *
 * @private
 * @function Formula.processorFunctions.MEDIAN
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to process.
 *
 * @return {number}
 * Result value of the process.
 */
function MEDIAN(args, table) {
    var median = [],
        values = Formula_FormulaProcessor.getArgumentsValues(args,
        table);
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (!isNaN(value)) {
                    median.push(value);
                }
                break;
            case 'object':
                for (var j = 0, jEnd = value.length, value2 = void 0; j < jEnd; ++j) {
                    value2 = value[j];
                    if (typeof value2 === 'number' &&
                        !isNaN(value2)) {
                        median.push(value2);
                    }
                }
                break;
        }
    }
    var count = median.length;
    if (!count) {
        return NaN;
    }
    var half = Math.floor(count / 2); // Floor because index starts at 0
        return (count % 2 ?
            median[half] : // Odd
            (median[half - 1] + median[half]) / 2 // Even
        );
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('MEDIAN', MEDIAN);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_MEDIAN = ((/* unused pure expression or super */ null && (MEDIAN)));

;// ./code/es5/es-modules/Data/Formula/Functions/MIN.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var MIN_getArgumentsValues = Formula_FormulaProcessor.getArgumentsValues;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `MIN(...values)` implementation. Calculates the lowest
 * of the given values that are numbers.
 *
 * @private
 * @function Formula.processorFunctions.MIN
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function MIN(args, table) {
    var values = MIN_getArgumentsValues(args,
        table);
    var result = Number.POSITIVE_INFINITY;
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (value < result) {
                    result = value;
                }
                break;
            case 'object':
                value = MIN(value);
                if (value < result) {
                    result = value;
                }
                break;
        }
    }
    return isFinite(result) ? result : 0;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('MIN', MIN);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_MIN = ((/* unused pure expression or super */ null && (MIN)));

;// ./code/es5/es-modules/Data/Formula/Functions/MOD.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var MOD_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `MOD(value1, value2)` implementation. Calculates the rest
 * of the division with the given values.
 *
 * @private
 * @function Formula.processorFunctions.MOD
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function MOD(args, table) {
    var value1 = MOD_getArgumentValue(args[0],
        table),
        value2 = MOD_getArgumentValue(args[1],
        table);
    if (typeof value1 === 'object') {
        value1 = value1[0];
    }
    if (typeof value2 === 'object') {
        value2 = value2[0];
    }
    if (typeof value1 !== 'number' ||
        typeof value2 !== 'number' ||
        value2 === 0) {
        return NaN;
    }
    return value1 % value2;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('MOD', MOD);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_MOD = ((/* unused pure expression or super */ null && (MOD)));

;// ./code/es5/es-modules/Data/Formula/Functions/MODE.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* *
 *
 *  Functions
 *
 * */
/**
 * Creates the mode map of the given arguments.
 *
 * @private
 * @function Formula.processorFunctions.MULT
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to process.
 *
 * @return {number}
 * Result value of the process.
 */
function getModeMap(args, table) {
    var modeMap = {},
        values = Formula_FormulaProcessor.getArgumentsValues(args,
        table);
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (!isNaN(value)) {
                    modeMap[value] = (modeMap[value] || 0) + 1;
                }
                break;
            case 'object':
                for (var j = 0, jEnd = value.length, value2 = void 0; j < jEnd; ++j) {
                    value2 = value[j];
                    if (typeof value2 === 'number' &&
                        !isNaN(value2)) {
                        modeMap[value2] = (modeMap[value2] || 0) + 1;
                    }
                }
                break;
        }
    }
    return modeMap;
}
/**
 * Processor for the `MODE.MULT(...values)` implementation. Calculates the most
 * frequent values of the give values.
 *
 * @private
 * @function Formula.processorFunctions.MULT
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to process.
 *
 * @return {number|Array<number>}
 * Result value of the process.
 */
function MULT(args, table) {
    var modeMap = getModeMap(args,
        table),
        keys = Object.keys(modeMap);
    if (!keys.length) {
        return NaN;
    }
    var modeKeys = [parseFloat(keys[0])],
        modeCount = modeMap[keys[0]];
    for (var i = 1, iEnd = keys.length, key = void 0, count = void 0; i < iEnd; ++i) {
        key = keys[i];
        count = modeMap[key];
        if (modeCount < count) {
            modeKeys = [parseFloat(key)];
            modeCount = count;
        }
        else if (modeCount === count) {
            modeKeys.push(parseFloat(key));
        }
    }
    return modeCount > 1 ? modeKeys : NaN;
}
/**
 * Processor for the `MODE.SNGL(...values)` implementation. Calculates the
 * lowest most frequent value of the give values.
 *
 * @private
 * @function Formula.processorFunctions['MODE.SNGL']
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to process.
 *
 * @return {number}
 * Result value of the process.
 */
function SNGL(args, table) {
    var modeMap = getModeMap(args,
        table),
        keys = Object.keys(modeMap);
    if (!keys.length) {
        return NaN;
    }
    var modeKey = parseFloat(keys[0]),
        modeCount = modeMap[keys[0]];
    for (var i = 1, iEnd = keys.length, key = void 0, keyValue = void 0, count = void 0; i < iEnd; ++i) {
        key = keys[i];
        count = modeMap[key];
        if (modeCount < count) {
            modeKey = parseFloat(key);
            modeCount = count;
        }
        else if (modeCount === count) {
            keyValue = parseFloat(key);
            if (modeKey > keyValue) {
                modeKey = keyValue;
                modeCount = count;
            }
        }
    }
    return modeCount > 1 ? modeKey : NaN;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('MODE', SNGL);
Formula_FormulaProcessor.registerProcessorFunction('MODE.MULT', MULT);
Formula_FormulaProcessor.registerProcessorFunction('MODE.SNGL', SNGL);
/* *
 *
 *  Default Export
 *
 * */
var MODE = {
    MULT: MULT,
    SNGL: SNGL
};
/* harmony default export */ var Functions_MODE = ((/* unused pure expression or super */ null && (MODE)));

;// ./code/es5/es-modules/Data/Formula/Functions/NOT.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var NOT_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `NOT(value)` implementation. Returns the opposite test
 * result.
 *
 * @private
 * @function Formula.processorFunctions.NOT
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {boolean|number}
 * Result value of the process.
 */
function NOT(args, table) {
    var value = NOT_getArgumentValue(args[0],
        table);
    if (typeof value === 'object') {
        value = value[0];
    }
    switch (typeof value) {
        case 'boolean':
        case 'number':
            return !value;
    }
    return NaN;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('NOT', NOT);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_NOT = ((/* unused pure expression or super */ null && (NOT)));

;// ./code/es5/es-modules/Data/Formula/Functions/OR.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var OR_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `OR(...tests)` implementation. Returns `TRUE`, if one test
 * result is not `0` or `FALSE`.
 *
 * @private
 * @function Formula.processorFunctions.AND
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {boolean}
 * Result value of the process.
 */
function OR(args, table) {
    for (var i = 0, iEnd = args.length, value = void 0; i < iEnd; ++i) {
        value = OR_getArgumentValue(args[i], table);
        if (typeof value === 'object') {
            if (OR(value, table)) {
                return true;
            }
        }
        else if (value) {
            return true;
        }
    }
    return false;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('OR', OR);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_OR = ((/* unused pure expression or super */ null && (OR)));

;// ./code/es5/es-modules/Data/Formula/Functions/PRODUCT.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var PRODUCT_getArgumentsValues = Formula_FormulaProcessor.getArgumentsValues;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `PRODUCT(...values)` implementation. Calculates the product
 * of the given values.
 *
 * @private
 * @function Formula.processorFunctions.PRODUCT
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {number}
 * Result value of the process.
 */
function PRODUCT(args, table) {
    var values = PRODUCT_getArgumentsValues(args,
        table);
    var result = 1,
        calculated = false;
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (!isNaN(value)) {
                    calculated = true;
                    result *= value;
                }
                break;
            case 'object':
                calculated = true;
                result *= PRODUCT(value, table);
                break;
        }
    }
    return (calculated ? result : 0);
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('PRODUCT', PRODUCT);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_PRODUCT = ((/* unused pure expression or super */ null && (PRODUCT)));

;// ./code/es5/es-modules/Data/Formula/Functions/SUM.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `SUM(...values)` implementation. Calculates the sum of the
 * given values.
 *
 * @private
 * @function Formula.processorFunctions.SUM
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to process.
 *
 * @return {number}
 * Result value of the process.
 */
function SUM(args, table) {
    var values = Formula_FormulaProcessor.getArgumentsValues(args,
        table);
    var result = 0;
    for (var i = 0, iEnd = values.length, value = void 0; i < iEnd; ++i) {
        value = values[i];
        switch (typeof value) {
            case 'number':
                if (!isNaN(value)) {
                    result += value;
                }
                break;
            case 'object':
                result += SUM(value, table);
                break;
        }
    }
    return result;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('SUM', SUM); // 🐝
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_SUM = ((/* unused pure expression or super */ null && (SUM)));

;// ./code/es5/es-modules/Data/Formula/Functions/XOR.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


var XOR_getArgumentValue = Formula_FormulaProcessor.getArgumentValue;
/* *
 *
 *  Functions
 *
 * */
/**
 * Processor for the `XOR(...tests)` implementation. Returns `TRUE`, if at least
 * one of the given tests differs in result of other tests.
 *
 * @private
 * @function Formula.processorFunctions.AND
 *
 * @param {Highcharts.FormulaArguments} args
 * Arguments to process.
 *
 * @param {Highcharts.DataTable} [table]
 * Table to use for references and ranges.
 *
 * @return {boolean|number}
 * Result value of the process.
 */
function XOR(args, table) {
    for (var i = 0, iEnd = args.length, lastValue = void 0, value = void 0; i < iEnd; ++i) {
        value = XOR_getArgumentValue(args[i], table);
        switch (typeof value) {
            case 'boolean':
            case 'number':
                if (typeof lastValue === 'undefined') {
                    lastValue = !!value;
                }
                else if (!!value !== lastValue) {
                    return true;
                }
                break;
            case 'object':
                for (var j = 0, jEnd = value.length, value2 = void 0; j < jEnd; ++j) {
                    value2 = value[j];
                    switch (typeof value2) {
                        case 'boolean':
                        case 'number':
                            if (typeof lastValue === 'undefined') {
                                lastValue = !!value2;
                            }
                            else if (!!value2 !== lastValue) {
                                return true;
                            }
                            break;
                    }
                }
                break;
        }
    }
    return false;
}
/* *
 *
 *  Registry
 *
 * */
Formula_FormulaProcessor.registerProcessorFunction('XOR', XOR);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Functions_XOR = ((/* unused pure expression or super */ null && (XOR)));

;// ./code/es5/es-modules/Data/Formula/Formula.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */

var __assign = (undefined && undefined.__assign) || function () {
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
/* *
 *
 *  Imports
 *
 * */





















/* *
 *
 *  Default Export
 *
 * */
/**
 * Formula engine to make use of spreadsheet formula strings.
 * @internal
 */
var Formula = __assign(__assign(__assign({}, Formula_FormulaParser), Formula_FormulaProcessor), FormulaTypes);
/* harmony default export */ var Formula_Formula = (Formula);

;// ./code/es5/es-modules/Data/Converters/CSVConverter.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Torstein Hønsi
 *  - Christer Vasseng
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */

var CSVConverter_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CSVConverter_assign = (undefined && undefined.__assign) || function () {
    CSVConverter_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return CSVConverter_assign.apply(this, arguments);
};


var CSVConverter_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Handles parsing and transforming CSV to a table.
 *
 * @private
 */
var CSVConverter = /** @class */ (function (_super) {
    CSVConverter_extends(CSVConverter, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the CSV parser.
     *
     * @param {CSVConverter.UserOptions} [options]
     * Options for the CSV parser.
     */
    function CSVConverter(options) {
        var _this = this;
        var mergedOptions = CSVConverter_merge(CSVConverter.defaultOptions,
            options);
        _this = _super.call(this, mergedOptions) || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.columns = [];
        _this.headers = [];
        _this.dataTypes = [];
        _this.options = mergedOptions;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Creates a CSV string from the datatable on the connector instance.
     *
     * @param {DataConnector} connector
     * Connector instance to export from.
     *
     * @param {CSVConverter.Options} [options]
     * Options used for the export.
     *
     * @return {string}
     * CSV string from the connector table.
     */
    CSVConverter.prototype.export = function (connector, options) {
        if (options === void 0) { options = this.options; }
        var useLocalDecimalPoint = options.useLocalDecimalPoint,
            lineDelimiter = options.lineDelimiter,
            exportNames = (this.options.firstRowAsNames !== false);
        var decimalPoint = options.decimalPoint,
            itemDelimiter = options.itemDelimiter;
        if (!decimalPoint) {
            decimalPoint = (itemDelimiter !== ',' && useLocalDecimalPoint ?
                (1.1).toLocaleString()[1] :
                '.');
        }
        if (!itemDelimiter) {
            itemDelimiter = (decimalPoint === ',' ? ';' : ',');
        }
        var columns = connector.getSortedColumns(options.usePresentationOrder),
            columnNames = Object.keys(columns),
            csvRows = [],
            columnsCount = columnNames.length;
        var rowArray = [];
        // Add the names as the first row if they should be exported
        if (exportNames) {
            csvRows.push(columnNames.map(function (columnName) { return "\"".concat(columnName, "\""); }).join(itemDelimiter));
        }
        for (var columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
            var columnName = columnNames[columnIndex],
                column = columns[columnName],
                columnLength = column.length;
            var columnMeta = connector.whatIs(columnName);
            var columnDataType = void 0;
            if (columnMeta) {
                columnDataType = columnMeta.dataType;
            }
            for (var rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                var cellValue = column[rowIndex];
                if (!rowArray[rowIndex]) {
                    rowArray[rowIndex] = [];
                }
                // Prefer datatype from metadata
                if (columnDataType === 'string') {
                    cellValue = '"' + cellValue + '"';
                }
                else if (typeof cellValue === 'number') {
                    cellValue = String(cellValue).replace('.', decimalPoint);
                }
                else if (typeof cellValue === 'string') {
                    cellValue = "\"".concat(cellValue, "\"");
                }
                rowArray[rowIndex][columnIndex] = cellValue;
                // On the final column, push the row to the CSV
                if (columnIndex === columnsCount - 1) {
                    // Trim repeated undefined values starting at the end
                    // Currently, we export the first "comma" even if the
                    // second value is undefined
                    var i = columnIndex;
                    while (rowArray[rowIndex].length > 2) {
                        var cellVal = rowArray[rowIndex][i];
                        if (cellVal !== void 0) {
                            break;
                        }
                        rowArray[rowIndex].pop();
                        i--;
                    }
                    csvRows.push(rowArray[rowIndex].join(itemDelimiter));
                }
            }
        }
        return csvRows.join(lineDelimiter);
    };
    /**
     * Initiates parsing of CSV
     *
     * @param {CSVConverter.UserOptions}[options]
     * Options for the parser
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits CSVDataParser#parse
     * @emits CSVDataParser#afterParse
     */
    CSVConverter.prototype.parse = function (options, eventDetail) {
        var converter = this,
            dataTypes = converter.dataTypes,
            parserOptions = CSVConverter_merge(this.options,
            options),
            beforeParse = parserOptions.beforeParse,
            lineDelimiter = parserOptions.lineDelimiter,
            firstRowAsNames = parserOptions.firstRowAsNames,
            itemDelimiter = parserOptions.itemDelimiter;
        var lines,
            rowIt = 0,
            csv = parserOptions.csv,
            startRow = parserOptions.startRow,
            endRow = parserOptions.endRow,
            column;
        converter.columns = [];
        converter.emit({
            type: 'parse',
            columns: converter.columns,
            detail: eventDetail,
            headers: converter.headers
        });
        if (csv && beforeParse) {
            csv = beforeParse(csv);
        }
        if (csv) {
            lines = csv
                .replace(/\r\n|\r/g, '\n') // Windows | Mac
                .split(lineDelimiter || '\n');
            if (!startRow || startRow < 0) {
                startRow = 0;
            }
            if (!endRow || endRow >= lines.length) {
                endRow = lines.length - 1;
            }
            if (!itemDelimiter) {
                converter.guessedItemDelimiter =
                    converter.guessDelimiter(lines);
            }
            // If the first row contain names, add them to the
            // headers array and skip the row.
            if (firstRowAsNames) {
                var headers = lines[0].split(itemDelimiter || converter.guessedItemDelimiter || ',');
                // Remove ""s from the headers
                for (var i = 0; i < headers.length; i++) {
                    headers[i] = headers[i].trim().replace(/^["']|["']$/g, '');
                }
                converter.headers = headers;
                startRow++;
            }
            var offset = 0;
            for (rowIt = startRow; rowIt <= endRow; rowIt++) {
                if (lines[rowIt][0] === '#') {
                    offset++;
                }
                else {
                    converter
                        .parseCSVRow(lines[rowIt], rowIt - startRow - offset);
                }
            }
            if (dataTypes.length &&
                dataTypes[0].length &&
                dataTypes[0][1] === 'date' && // Format is a string date
                !converter.options.dateFormat) {
                converter.deduceDateFormat(converter.columns[0], null, true);
            }
            // Guess types.
            for (var i = 0, iEnd = converter.columns.length; i < iEnd; ++i) {
                column = converter.columns[i];
                for (var j = 0, jEnd = column.length; j < jEnd; ++j) {
                    if (column[j] && typeof column[j] === 'string') {
                        var cellValue = converter.asGuessedType(column[j]);
                        if (cellValue instanceof Date) {
                            cellValue = cellValue.getTime();
                        }
                        converter.columns[i][j] = cellValue;
                    }
                }
            }
        }
        converter.emit({
            type: 'afterParse',
            columns: converter.columns,
            detail: eventDetail,
            headers: converter.headers
        });
    };
    /**
     * Internal method that parses a single CSV row
     */
    CSVConverter.prototype.parseCSVRow = function (columnStr, rowNumber) {
        var converter = this,
            columns = converter.columns || [],
            dataTypes = converter.dataTypes,
            _a = converter.options,
            startColumn = _a.startColumn,
            endColumn = _a.endColumn,
            itemDelimiter = (converter.options.itemDelimiter ||
                converter.guessedItemDelimiter);
        var decimalPoint = converter.options.decimalPoint;
        if (!decimalPoint || decimalPoint === itemDelimiter) {
            decimalPoint = converter.guessedDecimalPoint || '.';
        }
        var i = 0, c = '', token = '', actualColumn = 0, column = 0;
        var read = function (j) {
                c = columnStr[j];
        };
        var pushType = function (type) {
                if (dataTypes.length < column + 1) {
                    dataTypes.push([type]);
            }
            if (dataTypes[column][dataTypes[column].length - 1] !== type) {
                dataTypes[column].push(type);
            }
        };
        var push = function () {
                if (startColumn > actualColumn || actualColumn > endColumn) {
                    // Skip this column, but increment the column count (#7272)
                    ++actualColumn;
                token = '';
                return;
            }
            // Save the type of the token.
            if (typeof token === 'string') {
                if (!isNaN(parseFloat(token)) && isFinite(token)) {
                    token = parseFloat(token);
                    pushType('number');
                }
                else if (!isNaN(Date.parse(token))) {
                    token = token.replace(/\//g, '-');
                    pushType('date');
                }
                else {
                    pushType('string');
                }
            }
            else {
                pushType('number');
            }
            if (columns.length < column + 1) {
                columns.push([]);
            }
            // Try to apply the decimal point, and check if the token then is a
            // number. If not, reapply the initial value
            if (typeof token !== 'number' &&
                converter.guessType(token) !== 'number' &&
                decimalPoint) {
                var initialValue = token;
                token = token.replace(decimalPoint, '.');
                if (converter.guessType(token) !== 'number') {
                    token = initialValue;
                }
            }
            columns[column][rowNumber] = token;
            token = '';
            ++column;
            ++actualColumn;
        };
        if (!columnStr.trim().length) {
            return;
        }
        if (columnStr.trim()[0] === '#') {
            return;
        }
        for (; i < columnStr.length; i++) {
            read(i);
            if (c === '#') {
                // If there are hexvalues remaining (#13283)
                if (!/^#[A-F\d]{3,3}|[A-F\d]{6,6}/i.test(columnStr.substring(i))) {
                    // The rest of the row is a comment
                    push();
                    return;
                }
            }
            // Quoted string
            if (c === '"') {
                read(++i);
                while (i < columnStr.length) {
                    if (c === '"') {
                        break;
                    }
                    token += c;
                    read(++i);
                }
            }
            else if (c === itemDelimiter) {
                push();
                // Actual column data
            }
            else {
                token += c;
            }
        }
        push();
    };
    /**
     * Internal method that guesses the delimiter from the first
     * 13 lines of the CSV
     * @param {Array<string>} lines
     * The CSV, split into lines
     */
    CSVConverter.prototype.guessDelimiter = function (lines) {
        var points = 0,
            commas = 0,
            guessed;
        var potDelimiters = {
                ',': 0,
                ';': 0,
                '\t': 0
            }, linesCount = lines.length;
        for (var i = 0; i < linesCount; i++) {
            var inStr = false,
                c = void 0,
                cn = void 0,
                cl = void 0,
                token = '';
            // We should be able to detect dateformats within 13 rows
            if (i > 13) {
                break;
            }
            var columnStr = lines[i];
            for (var j = 0; j < columnStr.length; j++) {
                c = columnStr[j];
                cn = columnStr[j + 1];
                cl = columnStr[j - 1];
                if (c === '#') {
                    // Skip the rest of the line - it's a comment
                    break;
                }
                if (c === '"') {
                    if (inStr) {
                        if (cl !== '"' && cn !== '"') {
                            while (cn === ' ' && j < columnStr.length) {
                                cn = columnStr[++j];
                            }
                            // After parsing a string, the next non-blank
                            // should be a delimiter if the CSV is properly
                            // formed.
                            if (typeof potDelimiters[cn] !== 'undefined') {
                                potDelimiters[cn]++;
                            }
                            inStr = false;
                        }
                    }
                    else {
                        inStr = true;
                    }
                }
                else if (typeof potDelimiters[c] !== 'undefined') {
                    token = token.trim();
                    if (!isNaN(Date.parse(token))) {
                        potDelimiters[c]++;
                    }
                    else if (isNaN(Number(token)) ||
                        !isFinite(Number(token))) {
                        potDelimiters[c]++;
                    }
                    token = '';
                }
                else {
                    token += c;
                }
                if (c === ',') {
                    commas++;
                }
                if (c === '.') {
                    points++;
                }
            }
        }
        // Count the potential delimiters.
        // This could be improved by checking if the number of delimiters
        // equals the number of columns - 1
        if (potDelimiters[';'] > potDelimiters[',']) {
            guessed = ';';
        }
        else if (potDelimiters[','] > potDelimiters[';']) {
            guessed = ',';
        }
        else {
            // No good guess could be made..
            guessed = ',';
        }
        // Try to deduce the decimal point if it's not explicitly set.
        // If both commas or points is > 0 there is likely an issue
        if (points > commas) {
            this.guessedDecimalPoint = '.';
        }
        else {
            this.guessedDecimalPoint = ',';
        }
        return guessed;
    };
    /**
     * Handles converting the parsed data to a table.
     *
     * @return {DataTable}
     * Table from the parsed CSV.
     */
    CSVConverter.prototype.getTable = function () {
        return Converters_DataConverter.getTableFromColumns(this.columns, this.headers);
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options
     */
    CSVConverter.defaultOptions = CSVConverter_assign(CSVConverter_assign({}, Converters_DataConverter.defaultOptions), { lineDelimiter: '\n' });
    return CSVConverter;
}(Converters_DataConverter));
Converters_DataConverter.registerType('CSV', CSVConverter);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Converters_CSVConverter = (CSVConverter);

;// ./code/es5/es-modules/Data/Connectors/CSVConnector.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Torstein Hønsi
 *  - Christer Vasseng
 *  - Gøran Slettemark
 *  - Sophie Bremer
 *
 * */

var CSVConnector_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var CSVConnector_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge, CSVConnector_defined = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).defined;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that handles creating a DataConnector from CSV
 *
 * @private
 */
var CSVConnector = /** @class */ (function (_super) {
    CSVConnector_extends(CSVConnector, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of CSVConnector.
     *
     * @param {CSVConnector.UserOptions} [options]
     * Options for the connector and converter.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     *
     */
    function CSVConnector(options, dataTables) {
        var _this = this;
        var mergedOptions = CSVConnector_merge(CSVConnector.defaultOptions,
            options);
        _this = _super.call(this, mergedOptions, dataTables) || this;
        _this.options = CSVConnector_defined(dataTables) ?
            CSVConnector_merge(mergedOptions, { dataTables: dataTables }) : mergedOptions;
        if (mergedOptions.enablePolling) {
            _this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
        }
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initiates the loading of the CSV source to the connector
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits CSVConnector#load
     * @emits CSVConnector#afterLoad
     */
    CSVConnector.prototype.load = function (eventDetail) {
        var _this = this;
        var _a;
        var connector = this,
            tables = connector.dataTables,
            _b = connector.options,
            csv = _b.csv,
            csvURL = _b.csvURL,
            dataModifier = _b.dataModifier,
            dataTables = _b.dataTables;
        connector.emit({
            type: 'load',
            csv: csv,
            detail: eventDetail,
            tables: tables
        });
        return Promise
            .resolve(csvURL ?
            fetch(csvURL, {
                signal: (_a = connector === null || connector === void 0 ? void 0 : connector.pollingController) === null || _a === void 0 ? void 0 : _a.signal
            }).then(function (response) { return response.text(); }) :
            csv || '')
            .then(function (csv) {
            if (csv) {
                _this.initConverters(csv, function (key) {
                    var _a,
                        _b;
                    var options = _this.options;
                    var tableOptions = dataTables === null || dataTables === void 0 ? void 0 : dataTables.find(function (dataTable) { return dataTable.key === key; });
                    // Takes over the connector default options.
                    var mergedTableOptions = {
                            dataTableKey: key,
                            firstRowAsNames: (_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.firstRowAsNames) !== null && _a !== void 0 ? _a : options.firstRowAsNames,
                            beforeParse: (_b = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.beforeParse) !== null && _b !== void 0 ? _b : options.beforeParse
                        };
                    return new Converters_CSVConverter(CSVConnector_merge(_this.options, mergedTableOptions));
                }, function (converter, data) {
                    converter.parse({ csv: data });
                });
            }
            return connector
                .setModifierOptions(dataModifier, dataTables)
                .then(function () { return csv; });
        })
            .then(function (csv) {
            connector.emit({
                type: 'afterLoad',
                csv: csv,
                detail: eventDetail,
                tables: tables
            });
            return connector;
        })['catch'](function (error) {
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error: error,
                tables: tables
            });
            throw error;
        });
    };
    /* *
     *
     *  Static Properties
     *
     * */
    CSVConnector.defaultOptions = {
        csv: '',
        csvURL: '',
        enablePolling: false,
        dataRefreshRate: 1,
        firstRowAsNames: true
    };
    return CSVConnector;
}(Connectors_DataConnector));
Connectors_DataConnector.registerType('CSV', CSVConnector);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Connectors_CSVConnector = ((/* unused pure expression or super */ null && (CSVConnector)));

;// ./code/es5/es-modules/Data/Converters/JSONConverter.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Lysy
 *
 * */

var JSONConverter_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var JSONConverter_assign = (undefined && undefined.__assign) || function () {
    JSONConverter_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return JSONConverter_assign.apply(this, arguments);
};



var error = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).error, isArray = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).isArray, JSONConverter_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge, JSONConverter_objectEach = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).objectEach;
/* *
 *
 *  Class
 *
 * */
/**
 * Handles parsing and transforming JSON to a table.
 *
 * @private
 */
var JSONConverter = /** @class */ (function (_super) {
    JSONConverter_extends(JSONConverter, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the JSON parser.
     *
     * @param {JSONConverter.UserOptions} [options]
     * Options for the JSON parser.
     */
    function JSONConverter(options) {
        var _this = this;
        var mergedOptions = JSONConverter_merge(JSONConverter.defaultOptions,
            options);
        _this = _super.call(this, mergedOptions) || this;
        /* *
         *
         *  Properties
         *
         * */
        _this.columns = [];
        _this.headers = [];
        _this.options = mergedOptions;
        _this.table = new Data_DataTable();
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initiates parsing of JSON structure.
     *
     * @param {JSONConverter.UserOptions}[options]
     * Options for the parser
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits JSONConverter#parse
     * @emits JSONConverter#afterParse
     */
    JSONConverter.prototype.parse = function (options, eventDetail) {
        var converter = this;
        options = JSONConverter_merge(converter.options, options);
        var beforeParse = options.beforeParse,
            orientation = options.orientation,
            firstRowAsNames = options.firstRowAsNames,
            columnNames = options.columnNames;
        var data = options.data;
        if (!data) {
            return;
        }
        converter.columns = [];
        converter.emit({
            type: 'parse',
            columns: converter.columns,
            detail: eventDetail,
            headers: converter.headers
        });
        if (beforeParse) {
            data = beforeParse(data);
        }
        data = data.slice();
        if (orientation === 'columns') {
            for (var i = 0, iEnd = data.length; i < iEnd; i++) {
                var item = data[i];
                if (!(item instanceof Array)) {
                    return;
                }
                if (converter.headers instanceof Array) {
                    if (firstRowAsNames) {
                        converter.headers.push("".concat(item.shift()));
                    }
                    else if (columnNames && columnNames instanceof Array) {
                        converter.headers.push(columnNames[i]);
                    }
                    converter.table.setColumn(converter.headers[i] || i.toString(), item);
                }
                else {
                    error('JSONConverter: Invalid `columnNames` option.', false);
                }
            }
        }
        else if (orientation === 'rows') {
            if (firstRowAsNames) {
                converter.headers = data.shift();
            }
            else if (columnNames) {
                converter.headers = columnNames;
            }
            var _loop_1 = function (rowIndex,
                iEnd) {
                    var row = data[rowIndex];
                if (isArray(row)) {
                    for (var columnIndex = 0, jEnd = row.length; columnIndex < jEnd; columnIndex++) {
                        if (converter.columns.length < columnIndex + 1) {
                            converter.columns.push([]);
                        }
                        converter.columns[columnIndex].push(row[columnIndex]);
                        if (converter.headers instanceof Array) {
                            this_1.table.setColumn(converter.headers[columnIndex] ||
                                columnIndex.toString(), converter.columns[columnIndex]);
                        }
                        else {
                            error('JSONConverter: Invalid `columnNames` option.', false);
                        }
                    }
                }
                else {
                    var columnNames_1 = converter.headers;
                    if (columnNames_1 && !(columnNames_1 instanceof Array)) {
                        var newRow_1 = {};
                        JSONConverter_objectEach(columnNames_1, function (arrayWithPath, name) {
                            newRow_1[name] = arrayWithPath.reduce(function (acc, key) {
                                return acc[key];
                            }, row);
                        });
                        row = newRow_1;
                    }
                    this_1.table.setRows([row], rowIndex);
                }
            };
            var this_1 = this;
            for (var rowIndex = 0, iEnd = data.length; rowIndex < iEnd; rowIndex++) {
                _loop_1(rowIndex, iEnd);
            }
        }
        converter.emit({
            type: 'afterParse',
            columns: converter.columns,
            detail: eventDetail,
            headers: converter.headers
        });
    };
    /**
     * Handles converting the parsed data to a table.
     *
     * @return {DataTable}
     * Table from the parsed CSV.
     */
    JSONConverter.prototype.getTable = function () {
        return this.table;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options
     */
    JSONConverter.defaultOptions = JSONConverter_assign(JSONConverter_assign({}, Converters_DataConverter.defaultOptions), { data: [], orientation: 'rows' });
    return JSONConverter;
}(Converters_DataConverter));
Converters_DataConverter.registerType('JSON', JSONConverter);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Converters_JSONConverter = (JSONConverter);

;// ./code/es5/es-modules/Data/Connectors/JSONConnector.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Lysy
 *
 * */

var JSONConnector_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var JSONConnector_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge, JSONConnector_defined = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).defined;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that handles creating a DataConnector from JSON structure
 *
 * @private
 */
var JSONConnector = /** @class */ (function (_super) {
    JSONConnector_extends(JSONConnector, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of JSONConnector.
     *
     * @param {JSONConnector.UserOptions} [options]
     * Options for the connector and converter.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     */
    function JSONConnector(options, dataTables) {
        var _this = this;
        var mergedOptions = JSONConnector_merge(JSONConnector.defaultOptions,
            options);
        _this = _super.call(this, mergedOptions, dataTables) || this;
        _this.options = JSONConnector_defined(dataTables) ?
            JSONConnector_merge(mergedOptions, { dataTables: dataTables }) : mergedOptions;
        if (mergedOptions.enablePolling) {
            _this.startPolling(Math.max(mergedOptions.dataRefreshRate || 0, 1) * 1000);
        }
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initiates the loading of the JSON source to the connector
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits JSONConnector#load
     * @emits JSONConnector#afterLoad
     */
    JSONConnector.prototype.load = function (eventDetail) {
        var _this = this;
        var _a;
        var connector = this,
            tables = connector.dataTables,
            _b = connector.options,
            data = _b.data,
            dataUrl = _b.dataUrl,
            dataModifier = _b.dataModifier,
            dataTables = _b.dataTables;
        connector.emit({
            type: 'load',
            data: data,
            detail: eventDetail,
            tables: tables
        });
        return Promise
            .resolve(dataUrl ?
            fetch(dataUrl, {
                signal: (_a = connector === null || connector === void 0 ? void 0 : connector.pollingController) === null || _a === void 0 ? void 0 : _a.signal
            }).then(function (response) { return response.json(); })['catch'](function (error) {
                connector.emit({
                    type: 'loadError',
                    detail: eventDetail,
                    error: error,
                    tables: tables
                });
                console.warn("Unable to fetch data from ".concat(dataUrl, ".")); // eslint-disable-line no-console
            }) :
            data || [])
            .then(function (data) {
            if (data) {
                _this.initConverters(data, function (key) {
                    var _a,
                        _b,
                        _c,
                        _d;
                    var options = _this.options;
                    var tableOptions = dataTables === null || dataTables === void 0 ? void 0 : dataTables.find(function (dataTable) { return dataTable.key === key; });
                    // Takes over the connector default options.
                    var mergedTableOptions = {
                            dataTableKey: key,
                            columnNames: (_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.columnNames) !== null && _a !== void 0 ? _a : options.columnNames,
                            firstRowAsNames: (_b = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.firstRowAsNames) !== null && _b !== void 0 ? _b : options.firstRowAsNames,
                            orientation: (_c = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.orientation) !== null && _c !== void 0 ? _c : options.orientation,
                            beforeParse: (_d = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.beforeParse) !== null && _d !== void 0 ? _d : options.beforeParse
                        };
                    return new Converters_JSONConverter(JSONConnector_merge(_this.options, mergedTableOptions));
                }, function (converter, data) {
                    converter.parse({ data: data });
                });
            }
            return connector.setModifierOptions(dataModifier, dataTables)
                .then(function () { return data; });
        })
            .then(function (data) {
            connector.emit({
                type: 'afterLoad',
                data: data,
                detail: eventDetail,
                tables: tables
            });
            return connector;
        })['catch'](function (error) {
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error: error,
                tables: tables
            });
            throw error;
        });
    };
    /* *
     *
     *  Static Properties
     *
     * */
    JSONConnector.defaultOptions = {
        data: [],
        enablePolling: false,
        dataRefreshRate: 0,
        firstRowAsNames: true,
        orientation: 'rows'
    };
    return JSONConnector;
}(Connectors_DataConnector));
Connectors_DataConnector.registerType('JSON', JSONConnector);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Connectors_JSONConnector = ((/* unused pure expression or super */ null && (JSONConnector)));

;// ./code/es5/es-modules/Data/Converters/GoogleSheetsConverter.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Torstein Hønsi
 *  - Gøran Slettemark
 *  - Wojciech Chmiel
 *  - Sophie Bremer
 *
 * */

var GoogleSheetsConverter_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GoogleSheetsConverter_assign = (undefined && undefined.__assign) || function () {
    GoogleSheetsConverter_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return GoogleSheetsConverter_assign.apply(this, arguments);
};


var GoogleSheetsConverter_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge, GoogleSheetsConverter_uniqueKey = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).uniqueKey;
/* *
 *
 *  Class
 *
 * */
/**
 * Handles parsing and transformation of an Google Sheets to a table.
 *
 * @private
 */
var GoogleSheetsConverter = /** @class */ (function (_super) {
    GoogleSheetsConverter_extends(GoogleSheetsConverter, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the GoogleSheetsConverter.
     *
     * @param {GoogleSheetsConverter.UserOptions} [options]
     * Options for the GoogleSheetsConverter.
     */
    function GoogleSheetsConverter(options) {
        var _this = this;
        var mergedOptions = GoogleSheetsConverter_merge(GoogleSheetsConverter.defaultOptions,
            options);
        _this = _super.call(this, mergedOptions) || this;
        _this.columns = [];
        _this.header = [];
        _this.options = mergedOptions;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initiates the parsing of the Google Sheet
     *
     * @param {GoogleSheetsConverter.UserOptions}[options]
     * Options for the parser
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits GoogleSheetsParser#parse
     * @emits GoogleSheetsParser#afterParse
     */
    GoogleSheetsConverter.prototype.parse = function (options, eventDetail) {
        var _a;
        var converter = this,
            parseOptions = GoogleSheetsConverter_merge(converter.options,
            options);
        var columns = (((_a = parseOptions.json) === null || _a === void 0 ? void 0 : _a.values) || []).map(function (column) { return column.slice(); });
        if (columns.length === 0) {
            return false;
        }
        converter.header = [];
        converter.columns = [];
        converter.emit({
            type: 'parse',
            columns: converter.columns,
            detail: eventDetail,
            headers: converter.header
        });
        // If beforeParse is defined, use it to modify the data
        var beforeParse = parseOptions.beforeParse,
            json = parseOptions.json;
        if (beforeParse && json) {
            columns = beforeParse(json.values);
        }
        var column;
        converter.columns = columns;
        for (var i = 0, iEnd = columns.length; i < iEnd; i++) {
            column = columns[i];
            converter.header[i] = (parseOptions.firstRowAsNames ?
                "".concat(column.shift()) :
                GoogleSheetsConverter_uniqueKey());
            for (var j = 0, jEnd = column.length; j < jEnd; ++j) {
                if (column[j] && typeof column[j] === 'string') {
                    var cellValue = converter.asGuessedType(column[j]);
                    if (cellValue instanceof Date) {
                        cellValue = cellValue.getTime();
                    }
                    converter.columns[i][j] = cellValue;
                }
            }
        }
        converter.emit({
            type: 'afterParse',
            columns: converter.columns,
            detail: eventDetail,
            headers: converter.header
        });
    };
    /**
     * Handles converting the parsed data to a table.
     *
     * @return {DataTable}
     * Table from the parsed Google Sheet
     */
    GoogleSheetsConverter.prototype.getTable = function () {
        return Converters_DataConverter.getTableFromColumns(this.columns, this.header);
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options
     */
    GoogleSheetsConverter.defaultOptions = GoogleSheetsConverter_assign({}, Converters_DataConverter.defaultOptions);
    return GoogleSheetsConverter;
}(Converters_DataConverter));
Converters_DataConverter.registerType('GoogleSheets', GoogleSheetsConverter);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Converters_GoogleSheetsConverter = (GoogleSheetsConverter);

;// ./code/es5/es-modules/Data/Connectors/GoogleSheetsConnector.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Torstein Hønsi
 *  - Gøran Slettemark
 *  - Wojciech Chmiel
 *  - Sophie Bremer
 *  - Jomar Hønsi
 *
 * */

var GoogleSheetsConnector_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var GoogleSheetsConnector_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge, GoogleSheetsConnector_pick = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).pick, GoogleSheetsConnector_defined = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).defined;
/* *
 *
 *  Functions
 *
 * */
/**
 * Tests Google's response for error.
 * @private
 */
function isGoogleError(json) {
    return (typeof json === 'object' && json &&
        typeof json.error === 'object' && json.error &&
        typeof json.error.code === 'number' &&
        typeof json.error.message === 'string' &&
        typeof json.error.status === 'string');
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @todo implement save, requires oauth2
 */
var GoogleSheetsConnector = /** @class */ (function (_super) {
    GoogleSheetsConnector_extends(GoogleSheetsConnector, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of GoogleSheetsConnector
     *
     * @param {GoogleSheetsConnector.UserOptions} [options]
     * Options for the connector and converter.
     *
     * @param {Array<DataTableOptions>} [dataTables]
     * Multiple connector data tables options.
     *
     */
    function GoogleSheetsConnector(options, dataTables) {
        var _this = this;
        var mergedOptions = GoogleSheetsConnector_merge(GoogleSheetsConnector.defaultOptions,
            options);
        _this = _super.call(this, mergedOptions, dataTables) || this;
        _this.options = GoogleSheetsConnector_defined(dataTables) ?
            GoogleSheetsConnector_merge(mergedOptions, { dataTables: dataTables }) : mergedOptions;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Loads data from a Google Spreadsheet.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<this>}
     * Same connector instance with modified table.
     */
    GoogleSheetsConnector.prototype.load = function (eventDetail) {
        var _this = this;
        var _a;
        var connector = this,
            tables = connector.dataTables,
            _b = connector.options,
            dataModifier = _b.dataModifier,
            dataRefreshRate = _b.dataRefreshRate,
            enablePolling = _b.enablePolling,
            googleAPIKey = _b.googleAPIKey,
            googleSpreadsheetKey = _b.googleSpreadsheetKey,
            dataTables = _b.dataTables,
            url = GoogleSheetsConnector.buildFetchURL(googleAPIKey,
            googleSpreadsheetKey,
            connector.options);
        connector.emit({
            type: 'load',
            detail: eventDetail,
            tables: tables,
            url: url
        });
        if (!URL.canParse(url)) {
            throw new Error('Invalid URL: ' + url);
        }
        return fetch(url, { signal: (_a = connector === null || connector === void 0 ? void 0 : connector.pollingController) === null || _a === void 0 ? void 0 : _a.signal })
            .then(function (response) { return (response.json()); })
            .then(function (json) {
            if (isGoogleError(json)) {
                throw new Error(json.error.message);
            }
            _this.initConverters(json, function (key) {
                var _a,
                    _b;
                var options = _this.options;
                var tableOptions = dataTables === null || dataTables === void 0 ? void 0 : dataTables.find(function (dataTable) { return dataTable.key === key; });
                // Takes over the connector default options.
                var mergedTableOptions = {
                        dataTableKey: key,
                        firstRowAsNames: (_a = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.firstRowAsNames) !== null && _a !== void 0 ? _a : options.firstRowAsNames,
                        beforeParse: (_b = tableOptions === null || tableOptions === void 0 ? void 0 : tableOptions.beforeParse) !== null && _b !== void 0 ? _b : options.beforeParse
                    };
                return new Converters_GoogleSheetsConverter(GoogleSheetsConnector_merge(_this.options, mergedTableOptions));
            }, function (converter, data) {
                converter.parse({ json: data });
            });
            return connector.setModifierOptions(dataModifier, dataTables);
        })
            .then(function () {
            connector.emit({
                type: 'afterLoad',
                detail: eventDetail,
                tables: tables,
                url: url
            });
            // Polling
            if (enablePolling) {
                setTimeout(function () { return connector.load(); }, Math.max(dataRefreshRate || 0, 1) * 1000);
            }
            return connector;
        })['catch'](function (error) {
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error: error,
                tables: tables
            });
            throw error;
        });
    };
    /* *
     *
     *  Static Properties
     *
     * */
    GoogleSheetsConnector.defaultOptions = {
        googleAPIKey: '',
        googleSpreadsheetKey: '',
        enablePolling: false,
        dataRefreshRate: 2,
        firstRowAsNames: true
    };
    return GoogleSheetsConnector;
}(Connectors_DataConnector));
/* *
 *
 *  Class Namespace
 *
 * */
(function (GoogleSheetsConnector) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Creates GoogleSheets API v4 URL.
     * @private
     */
    function buildFetchURL(apiKey, sheetKey, options) {
        if (options === void 0) { options = {}; }
        var url = new URL("https://sheets.googleapis.com/v4/spreadsheets/".concat(sheetKey, "/values/"));
        var range = options.onlyColumnNames ?
                'A1:Z1' : buildQueryRange(options);
        url.pathname += range;
        var searchParams = url.searchParams;
        searchParams.set('alt', 'json');
        if (!options.onlyColumnNames) {
            searchParams.set('dateTimeRenderOption', 'FORMATTED_STRING');
            searchParams.set('majorDimension', 'COLUMNS');
            searchParams.set('valueRenderOption', 'UNFORMATTED_VALUE');
        }
        searchParams.set('prettyPrint', 'false');
        searchParams.set('key', apiKey);
        return url.href;
    }
    GoogleSheetsConnector.buildFetchURL = buildFetchURL;
    /**
     * Creates sheets range.
     * @private
     */
    function buildQueryRange(options) {
        if (options === void 0) { options = {}; }
        var endColumn = options.endColumn,
            endRow = options.endRow,
            googleSpreadsheetRange = options.googleSpreadsheetRange,
            startColumn = options.startColumn,
            startRow = options.startRow;
        return googleSpreadsheetRange || ((alphabet[startColumn || 0] || 'A') +
            (Math.max((startRow || 0), 0) + 1) +
            ':' +
            (alphabet[GoogleSheetsConnector_pick(endColumn, 25)] || 'Z') +
            (endRow ?
                Math.max(endRow, 0) :
                'Z'));
    }
    GoogleSheetsConnector.buildQueryRange = buildQueryRange;
})(GoogleSheetsConnector || (GoogleSheetsConnector = {}));
Connectors_DataConnector.registerType('GoogleSheets', GoogleSheetsConnector);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Connectors_GoogleSheetsConnector = ((/* unused pure expression or super */ null && (GoogleSheetsConnector)));

;// ./code/es5/es-modules/Data/Converters/HTMLTableConverter.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Torstein Hønsi
 *  - Gøran Slettemark
 *  - Wojciech Chmiel
 *  - Sophie Bremer
 *
 * */

var HTMLTableConverter_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HTMLTableConverter_assign = (undefined && undefined.__assign) || function () {
    HTMLTableConverter_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return HTMLTableConverter_assign.apply(this, arguments);
};


var HTMLTableConverter_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Functions
 *
 * */
/**
 * Row equal
 */
function isRowEqual(row1, row2) {
    var i = row1.length;
    if (row2.length === i) {
        while (--i) {
            if (row1[i] !== row2[i]) {
                return false;
            }
        }
    }
    else {
        return false;
    }
    return true;
}
/* *
 *
 *  Class
 *
 * */
/**
 * Handles parsing and transformation of an HTML table to a table.
 *
 * @private
 */
var HTMLTableConverter = /** @class */ (function (_super) {
    HTMLTableConverter_extends(HTMLTableConverter, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the HTMLTableConverter.
     *
     * @param {HTMLTableConverter.UserOptions} [options]
     * Options for the HTMLTableConverter.
     */
    function HTMLTableConverter(options) {
        var _this = this;
        var mergedOptions = HTMLTableConverter_merge(HTMLTableConverter.defaultOptions,
            options);
        _this = _super.call(this, mergedOptions) || this;
        _this.columns = [];
        _this.headers = [];
        _this.options = mergedOptions;
        if (mergedOptions.tableElement) {
            _this.tableElement = mergedOptions.tableElement;
            _this.tableElementID = mergedOptions.tableElement.id;
        }
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Exports the dataconnector as an HTML string, using the options
     * provided on import unless other options are provided.
     *
     * @param {DataConnector} connector
     * Connector instance to export from.
     *
     * @param {HTMLTableConnector.ExportOptions} [options]
     * Options that override default or existing export options.
     *
     * @return {string}
     * HTML from the current dataTable.
     */
    HTMLTableConverter.prototype.export = function (connector, options) {
        if (options === void 0) { options = this.options; }
        var exportNames = (options.firstRowAsNames !== false),
            useMultiLevelHeaders = options.useMultiLevelHeaders;
        var columns = connector.getSortedColumns(options.usePresentationOrder),
            columnNames = Object.keys(columns),
            htmlRows = [],
            columnsCount = columnNames.length;
        var rowArray = [];
        var tableHead = '';
        // Add the names as the first row if they should be exported
        if (exportNames) {
            var subcategories = [];
            // If using multilevel headers, the first value
            // of each column is a subcategory
            if (useMultiLevelHeaders) {
                for (var _i = 0, columnNames_1 = columnNames; _i < columnNames_1.length; _i++) {
                    var name_1 = columnNames_1[_i];
                    var column = columns[name_1];
                    if (!Array.isArray(column)) {
                        // Convert to conventional array from typed array
                        // if needed
                        column = Array.from(column);
                    }
                    var subhead = (column.shift() || '').toString();
                    columns[name_1] = column;
                    subcategories.push(subhead);
                }
                tableHead = this.getTableHeaderHTML(columnNames, subcategories, options);
            }
            else {
                tableHead = this.getTableHeaderHTML(void 0, columnNames, options);
            }
        }
        for (var columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
            var columnName = columnNames[columnIndex],
                column = columns[columnName],
                columnLength = column.length;
            for (var rowIndex = 0; rowIndex < columnLength; rowIndex++) {
                var cellValue = column[rowIndex];
                if (!rowArray[rowIndex]) {
                    rowArray[rowIndex] = [];
                }
                // Alternative: Datatype from HTML attribute with
                // connector.whatIs(columnName)
                if (!(typeof cellValue === 'string' ||
                    typeof cellValue === 'number' ||
                    typeof cellValue === 'undefined')) {
                    cellValue = (cellValue || '').toString();
                }
                rowArray[rowIndex][columnIndex] = this.getCellHTMLFromValue(columnIndex ? 'td' : 'th', null, columnIndex ? '' : 'scope="row"', cellValue);
                // On the final column, push the row to the array
                if (columnIndex === columnsCount - 1) {
                    htmlRows.push('<tr>' +
                        rowArray[rowIndex].join('') +
                        '</tr>');
                }
            }
        }
        var caption = '';
        // Add table caption
        // Current exportdata falls back to chart title
        // but that should probably be handled elsewhere?
        if (options.tableCaption) {
            caption = '<caption class="highcharts-table-caption">' +
                options.tableCaption +
                '</caption>';
        }
        return ('<table>' +
            caption +
            tableHead +
            '<tbody>' +
            htmlRows.join('') +
            '</tbody>' +
            '</table>');
    };
    /**
     * Get table cell markup from row data.
     */
    HTMLTableConverter.prototype.getCellHTMLFromValue = function (tag, classes, attrs, value, decimalPoint) {
        var val = value,
            className = 'text' + (classes ? ' ' + classes : '');
        // Convert to string if number
        if (typeof val === 'number') {
            val = val.toString();
            if (decimalPoint === ',') {
                val = val.replace('.', decimalPoint);
            }
            className = 'number';
        }
        else if (!value) {
            val = '';
            className = 'empty';
        }
        return '<' + tag + (attrs ? ' ' + attrs : '') +
            ' class="' + className + '">' +
            val + '</' + tag + '>';
    };
    /**
     * Get table header markup from row data.
     */
    HTMLTableConverter.prototype.getTableHeaderHTML = function (topheaders, subheaders, options) {
        if (topheaders === void 0) { topheaders = []; }
        if (subheaders === void 0) { subheaders = []; }
        if (options === void 0) { options = this.options; }
        var useMultiLevelHeaders = options.useMultiLevelHeaders,
            useRowspanHeaders = options.useRowspanHeaders;
        var html = '<thead>',
            i = 0,
            len = subheaders && subheaders.length,
            next,
            cur,
            curColspan = 0,
            rowspan;
        // Clean up multiple table headers. Exporting.getDataRows() returns two
        // levels of headers when using multilevel, not merged. We need to
        // merge identical headers, remove redundant headers, and keep it
        // all marked up nicely.
        if (useMultiLevelHeaders &&
            topheaders &&
            subheaders &&
            !isRowEqual(topheaders, subheaders)) {
            html += '<tr>';
            for (; i < len; ++i) {
                cur = topheaders[i];
                next = topheaders[i + 1];
                if (cur === next) {
                    ++curColspan;
                }
                else if (curColspan) {
                    // Ended colspan
                    // Add cur to HTML with colspan.
                    html += this.getCellHTMLFromValue('th', 'highcharts-table-topheading', 'scope="col" ' +
                        'colspan="' + (curColspan + 1) + '"', cur);
                    curColspan = 0;
                }
                else {
                    // Cur is standalone. If it is same as sublevel,
                    // remove sublevel and add just toplevel.
                    if (cur === subheaders[i]) {
                        if (useRowspanHeaders) {
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
                    html += this.getCellHTMLFromValue('th', 'highcharts-table-topheading', 'scope="col"' +
                        (rowspan > 1 ?
                            ' valign="top" rowspan="' + rowspan + '"' :
                            ''), cur);
                }
            }
            html += '</tr>';
        }
        // Add the subheaders (the only headers if not using multilevels)
        if (subheaders) {
            html += '<tr>';
            for (i = 0, len = subheaders.length; i < len; ++i) {
                if (typeof subheaders[i] !== 'undefined') {
                    html += this.getCellHTMLFromValue('th', null, 'scope="col"', subheaders[i]);
                }
            }
            html += '</tr>';
        }
        html += '</thead>';
        return html;
    };
    /**
     * Initiates the parsing of the HTML table
     *
     * @param {HTMLTableConverter.UserOptions}[options]
     * Options for the parser
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits CSVDataParser#parse
     * @emits CSVDataParser#afterParse
     * @emits HTMLTableParser#parseError
     */
    HTMLTableConverter.prototype.parse = function (options, eventDetail) {
        var converter = this,
            columns = [],
            headers = [],
            parseOptions = HTMLTableConverter_merge(converter.options,
            options),
            endRow = parseOptions.endRow,
            startColumn = parseOptions.startColumn,
            endColumn = parseOptions.endColumn,
            firstRowAsNames = parseOptions.firstRowAsNames,
            tableHTML = parseOptions.tableElement || this.tableElement;
        if (!(tableHTML instanceof HTMLElement)) {
            converter.emit({
                type: 'parseError',
                columns: columns,
                detail: eventDetail,
                headers: headers,
                error: 'Not a valid HTML Table'
            });
            return;
        }
        converter.tableElement = tableHTML;
        converter.tableElementID = tableHTML.id;
        this.emit({
            type: 'parse',
            columns: converter.columns,
            detail: eventDetail,
            headers: converter.headers
        });
        var rows = tableHTML.getElementsByTagName('tr'),
            rowsCount = rows.length;
        var rowIndex = 0,
            item,
            startRow = parseOptions.startRow;
        // Insert headers from the first row
        if (firstRowAsNames && rowsCount) {
            var items = rows[0].children,
                itemsLength = items.length;
            for (var i = startColumn; i < itemsLength; i++) {
                if (i > endColumn) {
                    break;
                }
                item = items[i];
                if (item.tagName === 'TD' ||
                    item.tagName === 'TH') {
                    headers.push(item.innerHTML);
                }
            }
            startRow++;
        }
        while (rowIndex < rowsCount) {
            if (rowIndex >= startRow && rowIndex <= endRow) {
                var columnsInRow = rows[rowIndex].children,
                    columnsInRowLength = columnsInRow.length;
                var columnIndex = 0;
                while (columnIndex < columnsInRowLength) {
                    var relativeColumnIndex = columnIndex - startColumn,
                        row = columns[relativeColumnIndex];
                    item = columnsInRow[columnIndex];
                    if ((item.tagName === 'TD' ||
                        item.tagName === 'TH') &&
                        (columnIndex >= startColumn &&
                            columnIndex <= endColumn)) {
                        if (!columns[relativeColumnIndex]) {
                            columns[relativeColumnIndex] = [];
                        }
                        var cellValue = converter.asGuessedType(item.innerHTML);
                        if (cellValue instanceof Date) {
                            cellValue = cellValue.getTime();
                        }
                        columns[relativeColumnIndex][rowIndex - startRow] = cellValue;
                        // Loop over all previous indices and make sure
                        // they are nulls, not undefined.
                        var i = 1;
                        while (rowIndex - startRow >= i &&
                            row[rowIndex - startRow - i] === void 0) {
                            row[rowIndex - startRow - i] = null;
                            i++;
                        }
                    }
                    columnIndex++;
                }
            }
            rowIndex++;
        }
        this.columns = columns;
        this.headers = headers;
        this.emit({
            type: 'afterParse',
            columns: columns,
            detail: eventDetail,
            headers: headers
        });
    };
    /**
     * Handles converting the parsed data to a table.
     *
     * @return {DataTable}
     * Table from the parsed HTML table
     */
    HTMLTableConverter.prototype.getTable = function () {
        return Converters_DataConverter.getTableFromColumns(this.columns, this.headers);
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options
     */
    HTMLTableConverter.defaultOptions = HTMLTableConverter_assign(HTMLTableConverter_assign({}, Converters_DataConverter.defaultOptions), { useRowspanHeaders: true, useMultiLevelHeaders: true });
    return HTMLTableConverter;
}(Converters_DataConverter));
Converters_DataConverter.registerType('HTMLTable', HTMLTableConverter);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Converters_HTMLTableConverter = (HTMLTableConverter);

;// ./code/es5/es-modules/Data/Connectors/HTMLTableConnector.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Torstein Hønsi
 *  - Gøran Slettemark
 *  - Wojciech Chmiel
 *  - Sophie Bremer
 *
 * */

var HTMLTableConnector_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var win = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).win;


var HTMLTableConnector_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Class that handles creating a data connector from an HTML table.
 *
 * @private
 */
var HTMLTableConnector = /** @class */ (function (_super) {
    HTMLTableConnector_extends(HTMLTableConnector, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of HTMLTableConnector.
     *
     * @param {HTMLTableConnector.UserOptions} [options]
     * Options for the connector and converter.
     */
    function HTMLTableConnector(options) {
        var _this = this;
        var mergedOptions = HTMLTableConnector_merge(HTMLTableConnector.defaultOptions,
            options);
        _this = _super.call(this, mergedOptions) || this;
        _this.converter = new Converters_HTMLTableConverter(mergedOptions);
        _this.options = mergedOptions;
        return _this;
    }
    /**
     * Initiates creating the dataconnector from the HTML table
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @emits HTMLTableConnector#load
     * @emits HTMLTableConnector#afterLoad
     * @emits HTMLTableConnector#loadError
     */
    HTMLTableConnector.prototype.load = function (eventDetail) {
        var connector = this,
            converter = connector.converter,
            table = connector.table,
            _a = connector.options,
            dataModifier = _a.dataModifier,
            tableHTML = _a.table;
        connector.emit({
            type: 'load',
            detail: eventDetail,
            tables: { table: table },
            tableElement: connector.tableElement
        });
        var tableElement;
        if (typeof tableHTML === 'string') {
            connector.tableID = tableHTML;
            tableElement = win.document.getElementById(tableHTML);
        }
        else {
            tableElement = tableHTML;
            connector.tableID = tableElement.id;
        }
        connector.tableElement = tableElement || void 0;
        if (!connector.tableElement) {
            var error = 'HTML table not provided, or element with ID not found';
            connector.emit({
                type: 'loadError',
                detail: eventDetail,
                error: error,
                tables: { table: table }
            });
            return Promise.reject(new Error(error));
        }
        converter.parse(HTMLTableConnector_merge({ tableElement: connector.tableElement }, connector.options), eventDetail);
        // If already loaded, clear the current rows
        table.deleteColumns();
        table.setColumns(converter.getTable().getColumns());
        return connector
            .setModifierOptions(dataModifier)
            .then(function () {
            connector.emit({
                type: 'afterLoad',
                detail: eventDetail,
                tables: { table: table },
                tableElement: connector.tableElement
            });
            return connector;
        });
    };
    /* *
     *
     *  Static Properties
     *
     * */
    HTMLTableConnector.defaultOptions = {
        table: ''
    };
    return HTMLTableConnector;
}(Connectors_DataConnector));
Connectors_DataConnector.registerType('HTMLTable', HTMLTableConnector);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Connectors_HTMLTableConnector = ((/* unused pure expression or super */ null && (HTMLTableConnector)));

;// ./code/es5/es-modules/Data/Modifiers/ChainModifier.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Dawid Dragula
 *
 * */

var ChainModifier_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ChainModifier_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ChainModifier_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0,
        sent: function() { if (t[0] & 1) throw t[1]; return t[1]; },
        trys: [],
        ops: [] },
        f,
        y,
        t,
        g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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


var ChainModifier_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Modifies a table with the help of modifiers in an ordered chain.
 *
 */
var ChainModifier = /** @class */ (function (_super) {
    ChainModifier_extends(ChainModifier, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the modifier chain.
     *
     * @param {Partial<ChainModifier.Options>} [options]
     * Options to configure the modifier chain.
     *
     * @param {...DataModifier} [chain]
     * Ordered chain of modifiers.
     */
    function ChainModifier(options) {
        var chain = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            chain[_i - 1] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.chain = chain;
        _this.options = ChainModifier_merge(ChainModifier.defaultOptions, options);
        var optionsChain = _this.options.chain || [];
        for (var i = 0, iEnd = optionsChain.length, modifierOptions = void 0, ModifierClass = void 0; i < iEnd; ++i) {
            modifierOptions = optionsChain[i];
            if (!modifierOptions.type) {
                continue;
            }
            ModifierClass = Modifiers_DataModifier.types[modifierOptions.type];
            if (ModifierClass) {
                chain.push(new ModifierClass(modifierOptions));
            }
        }
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Adds a configured modifier to the end of the modifier chain. Please note,
     * that the modifier can be added multiple times.
     *
     * @param {DataModifier} modifier
     * Configured modifier to add.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    ChainModifier.prototype.add = function (modifier, eventDetail) {
        this.emit({
            type: 'addModifier',
            detail: eventDetail,
            modifier: modifier
        });
        this.chain.push(modifier);
        this.emit({
            type: 'addModifier',
            detail: eventDetail,
            modifier: modifier
        });
    };
    /**
     * Clears all modifiers from the chain.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    ChainModifier.prototype.clear = function (eventDetail) {
        this.emit({
            type: 'clearChain',
            detail: eventDetail
        });
        this.chain.length = 0;
        this.emit({
            type: 'afterClearChain',
            detail: eventDetail
        });
    };
    /**
     * Applies several modifications to the table and returns a modified copy of
     * the given table.
     *
     * @param {Highcharts.DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Promise<Highcharts.DataTable>}
     * Table with `modified` property as a reference.
     */
    ChainModifier.prototype.modify = function (table, eventDetail) {
        return ChainModifier_awaiter(this, void 0, void 0, function () {
            var modifiers,
                modified,
                i,
                iEnd,
                error_1;
            return ChainModifier_generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        modifiers = (this.options.reverse ?
                            this.chain.slice().reverse() :
                            this.chain.slice());
                        if (table.modified === table) {
                            table.modified = table.clone(false, eventDetail);
                        }
                        modified = table;
                        i = 0, iEnd = modifiers.length;
                        _a.label = 1;
                    case 1:
                        if (!(i < iEnd)) return [3 /*break*/, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, modifiers[i].modify(modified, eventDetail)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        this.emit({
                            type: 'error',
                            detail: eventDetail,
                            table: table
                        });
                        throw error_1;
                    case 5:
                        modified = modified.modified;
                        _a.label = 6;
                    case 6:
                        ++i;
                        return [3 /*break*/, 1];
                    case 7:
                        table.modified = modified;
                        return [2 /*return*/, table];
                }
            });
        });
    };
    /**
     * Applies partial modifications of a cell change to the property `modified`
     * of the given modified table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {string} columnName
     * Column name of changed cell.
     *
     * @param {number|undefined} rowIndex
     * Row index of changed cell.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Changed cell value.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    ChainModifier.prototype.modifyCell = function (table, columnName, rowIndex, cellValue, eventDetail) {
        var modifiers = (this.options.reverse ?
                this.chain.reverse() :
                this.chain);
        if (modifiers.length) {
            var clone = table.clone();
            for (var i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                modifiers[i].modifyCell(clone, columnName, rowIndex, cellValue, eventDetail);
                clone = clone.modified;
            }
            table.modified = clone;
        }
        return table;
    };
    /**
     * Applies partial modifications of column changes to the property
     * `modified` of the given table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Changed columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex=0]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    ChainModifier.prototype.modifyColumns = function (table, columns, rowIndex, eventDetail) {
        var modifiers = (this.options.reverse ?
                this.chain.reverse() :
                this.chain.slice());
        if (modifiers.length) {
            var clone = table.clone();
            for (var i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                modifiers[i].modifyColumns(clone, columns, rowIndex, eventDetail);
                clone = clone.modified;
            }
            table.modified = clone;
        }
        return table;
    };
    /**
     * Applies partial modifications of row changes to the property `modified`
     * of the given table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
     * Changed rows.
     *
     * @param {number} [rowIndex]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    ChainModifier.prototype.modifyRows = function (table, rows, rowIndex, eventDetail) {
        var modifiers = (this.options.reverse ?
                this.chain.reverse() :
                this.chain.slice());
        if (modifiers.length) {
            var clone = table.clone();
            for (var i = 0, iEnd = modifiers.length; i < iEnd; ++i) {
                modifiers[i].modifyRows(clone, rows, rowIndex, eventDetail);
                clone = clone.modified;
            }
            table.modified = clone;
        }
        return table;
    };
    /**
     * Applies several modifications to the table.
     *
     * *Note:* The `modified` property of the table gets replaced.
     *
     * @param {DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table as a reference.
     *
     * @emits ChainDataModifier#execute
     * @emits ChainDataModifier#afterExecute
     */
    ChainModifier.prototype.modifyTable = function (table, eventDetail) {
        var chain = this;
        chain.emit({
            type: 'modify',
            detail: eventDetail,
            table: table
        });
        var modifiers = (chain.options.reverse ?
                chain.chain.reverse() :
                chain.chain.slice());
        var modified = table.modified;
        for (var i = 0, iEnd = modifiers.length, modifier = void 0; i < iEnd; ++i) {
            modifier = modifiers[i];
            modified = modifier.modifyTable(modified, eventDetail).modified;
        }
        table.modified = modified;
        chain.emit({
            type: 'afterModify',
            detail: eventDetail,
            table: table
        });
        return table;
    };
    /**
     * Removes a configured modifier from all positions in the modifier chain.
     *
     * @param {DataModifier} modifier
     * Configured modifier to remove.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     */
    ChainModifier.prototype.remove = function (modifier, eventDetail) {
        var modifiers = this.chain;
        this.emit({
            type: 'removeModifier',
            detail: eventDetail,
            modifier: modifier
        });
        modifiers.splice(modifiers.indexOf(modifier), 1);
        this.emit({
            type: 'afterRemoveModifier',
            detail: eventDetail,
            modifier: modifier
        });
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default option for the ordered modifier chain.
     */
    ChainModifier.defaultOptions = {
        type: 'Chain'
    };
    return ChainModifier;
}(Modifiers_DataModifier));
Modifiers_DataModifier.registerType('Chain', ChainModifier);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Modifiers_ChainModifier = ((/* unused pure expression or super */ null && (ChainModifier)));

;// ./code/es5/es-modules/Data/Modifiers/InvertModifier.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Wojciech Chmiel
 *  - Sophie Bremer
 *
 * */

var InvertModifier_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var InvertModifier_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Inverts columns and rows in a table.
 *
 * @private
 */
var InvertModifier = /** @class */ (function (_super) {
    InvertModifier_extends(InvertModifier, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the invert modifier.
     *
     * @param {Partial<InvertModifier.Options>} [options]
     * Options to configure the invert modifier.
     */
    function InvertModifier(options) {
        var _this = _super.call(this) || this;
        _this.options = InvertModifier_merge(InvertModifier.defaultOptions, options);
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Applies partial modifications of a cell change to the property `modified`
     * of the given modified table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {string} columnName
     * Column name of changed cell.
     *
     * @param {number|undefined} rowIndex
     * Row index of changed cell.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Changed cell value.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    InvertModifier.prototype.modifyCell = function (table, columnName, rowIndex, cellValue, eventDetail) {
        var modified = table.modified,
            modifiedRowIndex = modified.getRowIndexBy('columnNames',
            columnName);
        if (typeof modifiedRowIndex === 'undefined') {
            modified.setColumns(this.modifyTable(table.clone()).getColumns(), void 0, eventDetail);
        }
        else {
            modified.setCell("".concat(rowIndex), modifiedRowIndex, cellValue, eventDetail);
        }
        return table;
    };
    /**
     * Applies partial modifications of column changes to the property
     * `modified` of the given table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Changed columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex=0]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    InvertModifier.prototype.modifyColumns = function (table, columns, rowIndex, eventDetail) {
        var modified = table.modified,
            modifiedColumnNames = (modified.getColumn('columnNames') || []);
        var columnNames = table.getColumnNames(),
            reset = (table.getRowCount() !== modifiedColumnNames.length);
        if (!reset) {
            for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                if (columnNames[i] !== modifiedColumnNames[i]) {
                    reset = true;
                    break;
                }
            }
        }
        if (reset) {
            return this.modifyTable(table, eventDetail);
        }
        columnNames = Object.keys(columns);
        for (var i = 0, iEnd = columnNames.length, column = void 0, columnName = void 0, modifiedRowIndex = void 0; i < iEnd; ++i) {
            columnName = columnNames[i];
            column = columns[columnName];
            modifiedRowIndex = (modified.getRowIndexBy('columnNames', columnName) ||
                modified.getRowCount());
            for (var j = 0, j2 = rowIndex, jEnd = column.length; j < jEnd; ++j, ++j2) {
                modified.setCell("".concat(j2), modifiedRowIndex, column[j], eventDetail);
            }
        }
        return table;
    };
    /**
     * Applies partial modifications of row changes to the property `modified`
     * of the given table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
     * Changed rows.
     *
     * @param {number} [rowIndex]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    InvertModifier.prototype.modifyRows = function (table, rows, rowIndex, eventDetail) {
        var columnNames = table.getColumnNames(),
            modified = table.modified,
            modifiedColumnNames = (modified.getColumn('columnNames') || []);
        var reset = (table.getRowCount() !== modifiedColumnNames.length);
        if (!reset) {
            for (var i = 0, iEnd = columnNames.length; i < iEnd; ++i) {
                if (columnNames[i] !== modifiedColumnNames[i]) {
                    reset = true;
                    break;
                }
            }
        }
        if (reset) {
            return this.modifyTable(table, eventDetail);
        }
        for (var i = 0, i2 = rowIndex, iEnd = rows.length, row = void 0; i < iEnd; ++i, ++i2) {
            row = rows[i];
            if (row instanceof Array) {
                modified.setColumn("".concat(i2), row);
            }
            else {
                for (var j = 0, jEnd = columnNames.length; j < jEnd; ++j) {
                    modified.setCell("".concat(i2), j, row[columnNames[j]], eventDetail);
                }
            }
        }
        return table;
    };
    /**
     * Inverts rows and columns in the table.
     *
     * @param {DataTable} table
     * Table to invert.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table with inverted `modified` property as a reference.
     */
    InvertModifier.prototype.modifyTable = function (table, eventDetail) {
        var modifier = this;
        modifier.emit({ type: 'modify', detail: eventDetail, table: table });
        var modified = table.modified;
        if (table.hasColumns(['columnNames'])) { // Inverted table
            var columnNamesColumn = ((table.deleteColumns(['columnNames']) || {})
                    .columnNames || []),
                columns = {},
                columnNames = [];
            for (var i = 0, iEnd = columnNamesColumn.length; i < iEnd; ++i) {
                columnNames.push('' + columnNamesColumn[i]);
            }
            for (var i = 0, iEnd = table.getRowCount(), row = void 0; i < iEnd; ++i) {
                row = table.getRow(i);
                if (row) {
                    columns[columnNames[i]] = row;
                }
            }
            modified.deleteColumns();
            modified.setColumns(columns);
        }
        else { // Regular table
            var columns = {};
            for (var i = 0, iEnd = table.getRowCount(), row = void 0; i < iEnd; ++i) {
                row = table.getRow(i);
                if (row) {
                    columns["".concat(i)] = row;
                }
            }
            columns.columnNames = table.getColumnNames();
            modified.deleteColumns();
            modified.setColumns(columns);
        }
        modifier.emit({ type: 'afterModify', detail: eventDetail, table: table });
        return table;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options for the invert modifier.
     */
    InvertModifier.defaultOptions = {
        type: 'Invert'
    };
    return InvertModifier;
}(Modifiers_DataModifier));
Modifiers_DataModifier.registerType('Invert', InvertModifier);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Modifiers_InvertModifier = ((/* unused pure expression or super */ null && (InvertModifier)));

;// ./code/es5/es-modules/Data/Modifiers/MathModifier.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */

var MathModifier_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MathModifier_assign = (undefined && undefined.__assign) || function () {
    MathModifier_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return MathModifier_assign.apply(this, arguments);
};



/* *
 *
 *  Class
 *
 * */
/**
 * Replaces formula strings in a table with calculated values.
 *
 * @class
 * @name Highcharts.DataModifier.types.MathModifier
 * @augments Highcharts.DataModifier
 */
var MathModifier = /** @class */ (function (_super) {
    MathModifier_extends(MathModifier, _super);
    /* *
     *
     *  Constructor
     *
     * */
    function MathModifier(options) {
        var _this = _super.call(this) || this;
        _this.options = MathModifier_assign(MathModifier_assign({}, MathModifier.defaultOptions), options);
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    MathModifier.prototype.modifyTable = function (table, eventDetail) {
        var modifier = this;
        modifier.emit({ type: 'modify', detail: eventDetail, table: table });
        var alternativeSeparators = modifier.options.alternativeSeparators,
            formulaColumns = (modifier.options.formulaColumns ||
                table.getColumnNames()),
            modified = table.modified;
        for (var i = 0, iEnd = formulaColumns.length, columnName = void 0; i < iEnd; ++i) {
            columnName = formulaColumns[i];
            if (formulaColumns.indexOf(columnName) >= 0) {
                modified.setColumn(columnName, modifier.processColumn(table, columnName));
            }
        }
        var columnFormulas = (modifier.options.columnFormulas || []);
        for (var i = 0, iEnd = columnFormulas.length, columnFormula = void 0, formula = void 0; i < iEnd; ++i) {
            columnFormula = columnFormulas[i];
            formula = Formula_FormulaParser.parseFormula(columnFormula.formula, alternativeSeparators);
            modified.setColumn(columnFormula.column, modifier.processColumnFormula(formula, table, columnFormula.rowStart, columnFormula.rowEnd));
        }
        modifier.emit({ type: 'afterModify', detail: eventDetail, table: table });
        return table;
    };
    /**
     * Process a column by replacing formula strings with calculated values.
     *
     * @private
     *
     * @param {Highcharts.DataTable} table
     * Table to extract column from and use as reference.
     *
     * @param {string} columnName
     * Name of column to process.
     *
     * @param {number} rowIndex
     * Row index to start the replacing process from.
     *
     * @return {Highcharts.DataTableColumn}
     * Returns the processed table column.
     */
    MathModifier.prototype.processColumn = function (table, columnName, rowIndex) {
        if (rowIndex === void 0) { rowIndex = 0; }
        var alternativeSeparators = this.options.alternativeSeparators,
            column = (table.getColumn(columnName,
            true) || [])
                .slice(rowIndex > 0 ? rowIndex : 0);
        for (var i = 0, iEnd = column.length, cacheFormula = [], cacheString = '', cell = void 0; i < iEnd; ++i) {
            cell = column[i];
            if (typeof cell === 'string' &&
                cell[0] === '=') {
                try {
                    // Use cache while formula string is repetitive
                    cacheFormula = (cacheString === cell ?
                        cacheFormula :
                        Formula_FormulaParser.parseFormula(cell.substring(1), alternativeSeparators));
                    // Process parsed formula string
                    column[i] =
                        Formula_FormulaProcessor.processFormula(cacheFormula, table);
                }
                catch (_a) {
                    column[i] = NaN;
                }
            }
        }
        return column;
    };
    /**
     * Process a column by replacing cell values with calculated values from a
     * given formula.
     *
     * @private
     *
     * @param {Highcharts.Formula} formula
     * Formula to use for processing.
     *
     * @param {Highcharts.DataTable} table
     * Table to extract column from and use as reference.
     *
     * @param {number} rowStart
     * Row index to start the replacing process from.
     *
     * @param {number} rowEnd
     * Row index to end the replacing process.
     *
     * @return {Highcharts.DataTableColumn}
     * Returns the processed table column.
     */
    MathModifier.prototype.processColumnFormula = function (formula, table, rowStart, rowEnd) {
        if (rowStart === void 0) { rowStart = 0; }
        if (rowEnd === void 0) { rowEnd = table.getRowCount(); }
        rowStart = rowStart >= 0 ? rowStart : 0;
        rowEnd = rowEnd >= 0 ? rowEnd : table.getRowCount() + rowEnd;
        var column = [],
            modified = table.modified;
        for (var i = 0, iEnd = (rowEnd - rowStart); i < iEnd; ++i) {
            try {
                column[i] = Formula_FormulaProcessor.processFormula(formula, modified);
            }
            catch (_a) {
                column[i] = NaN;
            }
            finally {
                formula = Formula_FormulaProcessor.translateReferences(formula, 0, 1);
            }
        }
        return column;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options of MathModifier.
     * @private
     */
    MathModifier.defaultOptions = {
        type: 'Math',
        alternativeSeparators: false
    };
    return MathModifier;
}(Modifiers_DataModifier));
Modifiers_DataModifier.registerType('Math', MathModifier);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Modifiers_MathModifier = ((/* unused pure expression or super */ null && (MathModifier)));

;// ./code/es5/es-modules/Data/Modifiers/RangeModifier.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Dawid Dragula
 *
 * */

var RangeModifier_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var RangeModifier_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Filters out table rows with a specific value range.
 *
 */
var RangeModifier = /** @class */ (function (_super) {
    RangeModifier_extends(RangeModifier, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the range modifier.
     *
     * @param {Partial<RangeModifier.Options>} [options]
     * Options to configure the range modifier.
     */
    function RangeModifier(options) {
        var _this = _super.call(this) || this;
        _this.options = RangeModifier_merge(RangeModifier.defaultOptions, options);
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Replaces table rows with filtered rows.
     *
     * @param {DataTable} table
     * Table to modify.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table with `modified` property as a reference.
     */
    RangeModifier.prototype.modifyTable = function (table, eventDetail) {
        var modifier = this;
        modifier.emit({ type: 'modify', detail: eventDetail, table: table });
        var indexes = [];
        var _a = modifier.options,
            additive = _a.additive,
            ranges = _a.ranges,
            strict = _a.strict;
        if (ranges.length) {
            var modified = table.modified;
            var columns = table.getColumns(),
                rows = [];
            for (var i = 0, iEnd = ranges.length, range = void 0, rangeColumn = void 0; i < iEnd; ++i) {
                range = ranges[i];
                if (strict &&
                    typeof range.minValue !== typeof range.maxValue) {
                    continue;
                }
                if (i > 0 && !additive) {
                    modified.deleteRows();
                    modified.setRows(rows);
                    modified.setOriginalRowIndexes(indexes, true);
                    columns = modified.getColumns();
                    rows = [];
                    indexes = [];
                }
                rangeColumn = (columns[range.column] || []);
                for (var j = 0, jEnd = rangeColumn.length, cell = void 0, row = void 0, originalRowIndex = void 0; j < jEnd; ++j) {
                    cell = rangeColumn[j];
                    switch (typeof cell) {
                        default:
                            continue;
                        case 'boolean':
                        case 'number':
                        case 'string':
                            break;
                    }
                    if (strict &&
                        typeof cell !== typeof range.minValue) {
                        continue;
                    }
                    if (cell >= range.minValue &&
                        cell <= range.maxValue) {
                        if (additive) {
                            row = table.getRow(j);
                            originalRowIndex = table.getOriginalRowIndex(j);
                        }
                        else {
                            row = modified.getRow(j);
                            originalRowIndex = modified.getOriginalRowIndex(j);
                        }
                        if (row) {
                            rows.push(row);
                            indexes.push(originalRowIndex);
                        }
                    }
                }
            }
            modified.deleteRows();
            modified.setRows(rows);
            modified.setOriginalRowIndexes(indexes);
        }
        modifier.emit({ type: 'afterModify', detail: eventDetail, table: table });
        return table;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options for the range modifier.
     */
    RangeModifier.defaultOptions = {
        type: 'Range',
        ranges: []
    };
    return RangeModifier;
}(Modifiers_DataModifier));
Modifiers_DataModifier.registerType('Range', RangeModifier);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Modifiers_RangeModifier = ((/* unused pure expression or super */ null && (RangeModifier)));

;// ./code/es5/es-modules/Data/Modifiers/SortModifier.js
/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *  - Dawid Dragula
 *
 * */

var SortModifier_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d,
        b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d,
        b) { d.__proto__ = b; }) ||
                function (d,
        b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b,
        p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SortModifier_merge = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()).merge;
/* *
 *
 *  Class
 *
 * */
/**
 * Sort table rows according to values of a column.
 *
 */
var SortModifier = /** @class */ (function (_super) {
    SortModifier_extends(SortModifier, _super);
    /* *
     *
     *  Constructor
     *
     * */
    /**
     * Constructs an instance of the range modifier.
     *
     * @param {Partial<RangeDataModifier.Options>} [options]
     * Options to configure the range modifier.
     */
    function SortModifier(options) {
        var _this = _super.call(this) || this;
        _this.options = SortModifier_merge(SortModifier.defaultOptions, options);
        return _this;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    SortModifier.ascending = function (a, b) {
        return ((a || 0) < (b || 0) ? -1 :
            (a || 0) > (b || 0) ? 1 :
                0);
    };
    SortModifier.descending = function (a, b) {
        return ((b || 0) < (a || 0) ? -1 :
            (b || 0) > (a || 0) ? 1 :
                0);
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Returns index and row for sort reference.
     *
     * @private
     *
     * @param {Highcharts.DataTable} table
     * Table with rows to reference.
     *
     * @return {Array<SortModifier.RowReference>}
     * Array of row references.
     */
    SortModifier.prototype.getRowReferences = function (table) {
        var rows = table.getRows(),
            rowReferences = [];
        for (var i = 0, iEnd = rows.length; i < iEnd; ++i) {
            rowReferences.push({
                index: i,
                row: rows[i]
            });
        }
        return rowReferences;
    };
    /**
     * Applies partial modifications of a cell change to the property `modified`
     * of the given modified table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {string} columnName
     * Column name of changed cell.
     *
     * @param {number|undefined} rowIndex
     * Row index of changed cell.
     *
     * @param {Highcharts.DataTableCellType} cellValue
     * Changed cell value.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    SortModifier.prototype.modifyCell = function (table, columnName, rowIndex, cellValue, eventDetail) {
        var modifier = this,
            _a = modifier.options,
            orderByColumn = _a.orderByColumn,
            orderInColumn = _a.orderInColumn;
        if (columnName === orderByColumn) {
            if (orderInColumn) {
                table.modified.setCell(columnName, rowIndex, cellValue);
                table.modified.setColumn(orderInColumn, modifier
                    .modifyTable(new Data_DataTable({
                    columns: table
                        .getColumns([orderByColumn, orderInColumn])
                }))
                    .modified
                    .getColumn(orderInColumn));
            }
            else {
                modifier.modifyTable(table, eventDetail);
            }
        }
        return table;
    };
    /**
     * Applies partial modifications of column changes to the property
     * `modified` of the given table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Highcharts.DataTableColumnCollection} columns
     * Changed columns as a collection, where the keys are the column names.
     *
     * @param {number} [rowIndex=0]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    SortModifier.prototype.modifyColumns = function (table, columns, rowIndex, eventDetail) {
        var modifier = this,
            _a = modifier.options,
            orderByColumn = _a.orderByColumn,
            orderInColumn = _a.orderInColumn,
            columnNames = Object.keys(columns);
        if (columnNames.indexOf(orderByColumn) > -1) {
            if (orderInColumn &&
                columns[columnNames[0]].length) {
                table.modified.setColumns(columns, rowIndex);
                table.modified.setColumn(orderInColumn, modifier
                    .modifyTable(new Data_DataTable({
                    columns: table
                        .getColumns([orderByColumn, orderInColumn])
                }))
                    .modified
                    .getColumn(orderInColumn));
            }
            else {
                modifier.modifyTable(table, eventDetail);
            }
        }
        return table;
    };
    /**
     * Applies partial modifications of row changes to the property `modified`
     * of the given table.
     *
     * @param {Highcharts.DataTable} table
     * Modified table.
     *
     * @param {Array<(Highcharts.DataTableRow|Highcharts.DataTableRowObject)>} rows
     * Changed rows.
     *
     * @param {number} [rowIndex]
     * Index of the first changed row.
     *
     * @param {Highcharts.DataTableEventDetail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {Highcharts.DataTable}
     * Table with `modified` property as a reference.
     */
    SortModifier.prototype.modifyRows = function (table, rows, rowIndex, eventDetail) {
        var modifier = this,
            _a = modifier.options,
            orderByColumn = _a.orderByColumn,
            orderInColumn = _a.orderInColumn;
        if (orderInColumn &&
            rows.length) {
            table.modified.setRows(rows, rowIndex);
            table.modified.setColumn(orderInColumn, modifier
                .modifyTable(new Data_DataTable({
                columns: table
                    .getColumns([orderByColumn, orderInColumn])
            }))
                .modified
                .getColumn(orderInColumn));
        }
        else {
            modifier.modifyTable(table, eventDetail);
        }
        return table;
    };
    /**
     * Sorts rows in the table.
     *
     * @param {DataTable} table
     * Table to sort in.
     *
     * @param {DataEvent.Detail} [eventDetail]
     * Custom information for pending events.
     *
     * @return {DataTable}
     * Table with `modified` property as a reference.
     */
    SortModifier.prototype.modifyTable = function (table, eventDetail) {
        var _a;
        var modifier = this;
        modifier.emit({ type: 'modify', detail: eventDetail, table: table });
        var columnNames = table.getColumnNames(),
            rowCount = table.getRowCount(),
            rowReferences = this.getRowReferences(table),
            _b = modifier.options,
            direction = _b.direction,
            orderByColumn = _b.orderByColumn,
            orderInColumn = _b.orderInColumn,
            compare = (direction === 'asc' ?
                SortModifier.ascending :
                SortModifier.descending),
            orderByColumnIndex = columnNames.indexOf(orderByColumn),
            modified = table.modified;
        if (orderByColumnIndex !== -1) {
            rowReferences.sort(function (a, b) { return compare(a.row[orderByColumnIndex], b.row[orderByColumnIndex]); });
        }
        if (orderInColumn) {
            var column = [];
            for (var i = 0; i < rowCount; ++i) {
                column[rowReferences[i].index] = i;
            }
            modified.setColumns((_a = {}, _a[orderInColumn] = column, _a));
        }
        else {
            var originalIndexes = [];
            var rows = [];
            var rowReference = void 0;
            for (var i = 0; i < rowCount; ++i) {
                rowReference = rowReferences[i];
                originalIndexes.push(modified.getOriginalRowIndex(rowReference.index));
                rows.push(rowReference.row);
            }
            modified.setRows(rows, 0);
            modified.setOriginalRowIndexes(originalIndexes);
        }
        modifier.emit({ type: 'afterModify', detail: eventDetail, table: table });
        return table;
    };
    /* *
     *
     *  Static Properties
     *
     * */
    /**
     * Default options to group table rows.
     */
    SortModifier.defaultOptions = {
        type: 'Sort',
        direction: 'desc',
        orderByColumn: 'y'
    };
    return SortModifier;
}(Modifiers_DataModifier));
Modifiers_DataModifier.registerType('Sort', SortModifier);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ var Modifiers_SortModifier = ((/* unused pure expression or super */ null && (SortModifier)));

;// ./code/es5/es-modules/masters/modules/data-tools.src.js



















var G = (highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default());
G.DataConnector = G.DataConnector || Connectors_DataConnector;
G.DataConverter = G.DataConverter || Converters_DataConverter;
G.DataCursor = G.DataCursor || Data_DataCursor;
G.DataModifier = G.DataModifier || Modifiers_DataModifier;
G.DataPool = G.DataPool || Data_DataPool;
G.DataTable = G.DataTable || Data_DataTable;
G.Formula = G.Formula || Formula_Formula;
/* harmony default export */ var data_tools_src = ((highcharts_commonjs_highcharts_commonjs2_highcharts_root_Highcharts_default()));

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});