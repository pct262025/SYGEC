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
'use strict';
import FormulaProcessor from '../FormulaProcessor.js';
var getArgumentsValues = FormulaProcessor.getArgumentsValues;
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
    var values = getArgumentsValues(args, table);
    var result = 1, calculated = false;
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
FormulaProcessor.registerProcessorFunction('PRODUCT', PRODUCT);
/* *
 *
 *  Default Export
 *
 * */
export default PRODUCT;
