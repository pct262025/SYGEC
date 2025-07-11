/* *
 *
 *  (c) 2009-2025 Øystein Moseng
 *
 *  Accessibility component for exporting menu.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
import U from '../../Core/Utilities.js';
var attr = U.attr;
import AccessibilityComponent from '../AccessibilityComponent.js';
import KeyboardNavigationHandler from '../KeyboardNavigationHandler.js';
import ChartUtilities from '../Utils/ChartUtilities.js';
var getChartTitle = ChartUtilities.getChartTitle, unhideChartElementFromAT = ChartUtilities.unhideChartElementFromAT;
import HTMLUtilities from '../Utils/HTMLUtilities.js';
var getFakeMouseEvent = HTMLUtilities.getFakeMouseEvent;
/* *
 *
 *  Functions
 *
 * */
/**
 * Get the wrapped export button element of a chart.
 * @private
 */
function getExportMenuButtonElement(chart) {
    var _a, _b;
    return (_b = (_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.svgElements) === null || _b === void 0 ? void 0 : _b[0];
}
/**
 * @private
 */
function exportingShouldHaveA11y(chart) {
    var exportingOpts = chart.options.exporting, exportButton = getExportMenuButtonElement(chart);
    return !!(exportingOpts &&
        exportingOpts.enabled !== false &&
        exportingOpts.accessibility &&
        exportingOpts.accessibility.enabled &&
        exportButton &&
        exportButton.element);
}
/* *
 *
 *  Class
 *
 * */
/**
 * The MenuComponent class
 *
 * @private
 * @class
 * @name Highcharts.MenuComponent
 */
var MenuComponent = /** @class */ (function (_super) {
    __extends(MenuComponent, _super);
    function MenuComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Init the component
     */
    MenuComponent.prototype.init = function () {
        var chart = this.chart, component = this;
        this.addEvent(chart, 'exportMenuShown', function () {
            component.onMenuShown();
        });
        this.addEvent(chart, 'exportMenuHidden', function () {
            component.onMenuHidden();
        });
        this.createProxyGroup();
    };
    /**
     * @private
     */
    MenuComponent.prototype.onMenuHidden = function () {
        var _a;
        var menu = (_a = this.chart.exporting) === null || _a === void 0 ? void 0 : _a.contextMenuEl;
        if (menu) {
            menu.setAttribute('aria-hidden', 'true');
        }
        this.setExportButtonExpandedState('false');
    };
    /**
     * @private
     */
    MenuComponent.prototype.onMenuShown = function () {
        var _a;
        var chart = this.chart, menu = (_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.contextMenuEl;
        if (menu) {
            this.addAccessibleContextMenuAttribs();
            unhideChartElementFromAT(chart, menu);
        }
        this.setExportButtonExpandedState('true');
    };
    /**
     * @private
     * @param {string} stateStr
     */
    MenuComponent.prototype.setExportButtonExpandedState = function (stateStr) {
        if (this.exportButtonProxy) {
            this.exportButtonProxy.innerElement.setAttribute('aria-expanded', stateStr);
        }
    };
    /**
     * Called on each render of the chart. We need to update positioning of the
     * proxy overlay.
     */
    MenuComponent.prototype.onChartRender = function () {
        var _a;
        var chart = this.chart, focusEl = chart.focusElement, a11y = chart.accessibility;
        this.proxyProvider.clearGroup('chartMenu');
        this.proxyMenuButton();
        if (this.exportButtonProxy &&
            focusEl &&
            focusEl === ((_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.group)) {
            if (focusEl.focusBorder) {
                chart.setFocusToElement(focusEl, this.exportButtonProxy.innerElement);
            }
            else if (a11y) {
                a11y.keyboardNavigation.tabindexContainer.focus();
            }
        }
    };
    /**
     * @private
     */
    MenuComponent.prototype.proxyMenuButton = function () {
        var chart = this.chart;
        var proxyProvider = this.proxyProvider;
        var buttonEl = getExportMenuButtonElement(chart);
        if (exportingShouldHaveA11y(chart) && buttonEl) {
            this.exportButtonProxy = proxyProvider.addProxyElement('chartMenu', { click: buttonEl }, 'button', {
                'aria-label': chart.langFormat('accessibility.exporting.menuButtonLabel', {
                    chart: chart,
                    chartTitle: getChartTitle(chart)
                }),
                'aria-expanded': false,
                title: chart.options.lang.contextButtonTitle || null
            });
        }
    };
    /**
     * @private
     */
    MenuComponent.prototype.createProxyGroup = function () {
        var chart = this.chart;
        if (chart && this.proxyProvider) {
            this.proxyProvider.addGroup('chartMenu');
        }
    };
    /**
     * @private
     */
    MenuComponent.prototype.addAccessibleContextMenuAttribs = function () {
        var _a;
        var chart = this.chart, exportList = (_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.divElements;
        if (exportList && exportList.length) {
            // Set tabindex on the menu items to allow focusing by script
            // Set role to give screen readers a chance to pick up the contents
            exportList.forEach(function (item) {
                if (item) {
                    if (item.tagName === 'LI' &&
                        !(item.children && item.children.length)) {
                        item.setAttribute('tabindex', -1);
                    }
                    else {
                        item.setAttribute('aria-hidden', 'true');
                    }
                }
            });
            // Set accessibility properties on parent div
            var parentDiv = (exportList[0] && exportList[0].parentNode);
            if (parentDiv) {
                attr(parentDiv, {
                    'aria-hidden': void 0,
                    'aria-label': chart.langFormat('accessibility.exporting.chartMenuLabel', { chart: chart }),
                    role: 'list' // Needed for webkit/VO
                });
            }
        }
    };
    /**
     * Get keyboard navigation handler for this component.
     * @private
     */
    MenuComponent.prototype.getKeyboardNavigation = function () {
        var keys = this.keyCodes, chart = this.chart, component = this;
        return new KeyboardNavigationHandler(chart, {
            keyCodeMap: [
                // Arrow prev handler
                [
                    [keys.left, keys.up],
                    function () {
                        return component.onKbdPrevious(this);
                    }
                ],
                // Arrow next handler
                [
                    [keys.right, keys.down],
                    function () {
                        return component.onKbdNext(this);
                    }
                ],
                // Click handler
                [
                    [keys.enter, keys.space],
                    function () {
                        return component.onKbdClick(this);
                    }
                ]
            ],
            // Only run exporting navigation if exporting support exists and is
            // enabled on chart
            validate: function () {
                var _a, _b, _c;
                return !!chart.exporting &&
                    ((_b = (_a = chart
                        .options
                        .exporting) === null || _a === void 0 ? void 0 : _a.buttons) === null || _b === void 0 ? void 0 : _b.contextButton.enabled) !== false &&
                    chart.options.exporting.enabled !== false &&
                    (((_c = chart.options.exporting.accessibility) === null || _c === void 0 ? void 0 : _c.enabled) || false) !== false;
            },
            // Focus export menu button
            init: function () {
                var _a;
                var proxy = component.exportButtonProxy;
                var svgEl = (_a = component.chart.exporting) === null || _a === void 0 ? void 0 : _a.group;
                if (proxy && svgEl) {
                    chart.setFocusToElement(svgEl, proxy.innerElement);
                }
            },
            // Hide the menu
            terminate: function () {
                chart.hideExportMenu();
            }
        });
    };
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    MenuComponent.prototype.onKbdPrevious = function (keyboardNavigationHandler) {
        var chart = this.chart;
        var a11yOptions = chart.options.accessibility;
        var response = keyboardNavigationHandler.response;
        // Try to highlight prev item in list. Highlighting e.g.
        // separators will fail.
        var i = chart.highlightedExportItemIx || 0;
        while (i--) {
            if (chart.highlightExportItem(i)) {
                return response.success;
            }
        }
        // We failed, so wrap around or move to prev module
        if (a11yOptions.keyboardNavigation.wrapAround) {
            chart.highlightLastExportItem();
            return response.success;
        }
        return response.prev;
    };
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    MenuComponent.prototype.onKbdNext = function (keyboardNavigationHandler) {
        var _a, _b;
        var chart = this.chart;
        var a11yOptions = chart.options.accessibility;
        var response = keyboardNavigationHandler.response;
        // Try to highlight next item in list. Highlighting e.g.
        // separators will fail.
        for (var i = (chart.highlightedExportItemIx || 0) + 1; i < (((_b = (_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.divElements) === null || _b === void 0 ? void 0 : _b.length) || 0); ++i) {
            if (chart.highlightExportItem(i)) {
                return response.success;
            }
        }
        // We failed, so wrap around or move to next module
        if (a11yOptions.keyboardNavigation.wrapAround) {
            chart.highlightExportItem(0);
            return response.success;
        }
        return response.next;
    };
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} keyboardNavigationHandler
     * @return {number} Response code
     */
    MenuComponent.prototype.onKbdClick = function (keyboardNavigationHandler) {
        var _a, _b, _c, _d;
        var chart = this.chart;
        var curHighlightedItem = chart.highlightedExportItemIx !== void 0 &&
            ((_b = (_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.divElements) === null || _b === void 0 ? void 0 : _b[chart.highlightedExportItemIx]);
        var exportButtonElement = (_c = getExportMenuButtonElement(chart)) === null || _c === void 0 ? void 0 : _c.element;
        if ((_d = chart.exporting) === null || _d === void 0 ? void 0 : _d.openMenu) {
            curHighlightedItem && this.fakeClickEvent(curHighlightedItem);
        }
        else {
            exportButtonElement && this.fakeClickEvent(exportButtonElement);
            chart.highlightExportItem(0);
        }
        return keyboardNavigationHandler.response.success;
    };
    return MenuComponent;
}(AccessibilityComponent));
/* *
 *
 *  Class Namespace
 *
 * */
(function (MenuComponent) {
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
     * @private
     */
    function compose(ChartClass) {
        var chartProto = ChartClass.prototype;
        if (!chartProto.hideExportMenu) {
            chartProto.hideExportMenu = chartHideExportMenu;
            chartProto.highlightExportItem = chartHighlightExportItem;
            chartProto.highlightLastExportItem = chartHighlightLastExportItem;
            chartProto.showExportMenu = chartShowExportMenu;
        }
    }
    MenuComponent.compose = compose;
    /**
     * Show the export menu and focus the first item (if exists).
     *
     * @private
     * @function Highcharts.Chart#showExportMenu
     */
    function chartShowExportMenu() {
        var exportButton = getExportMenuButtonElement(this);
        if (exportButton) {
            var el = exportButton.element;
            if (el.onclick) {
                el.onclick(getFakeMouseEvent('click'));
            }
        }
    }
    /**
     * @private
     * @function Highcharts.Chart#hideExportMenu
     */
    function chartHideExportMenu() {
        var _a, _b, _c;
        var chart = this, exportList = (_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.divElements;
        if (exportList &&
            ((_b = chart.exporting) === null || _b === void 0 ? void 0 : _b.contextMenuEl) &&
            ((_c = chart.exporting) === null || _c === void 0 ? void 0 : _c.openMenu)) {
            // Reset hover states etc.
            exportList.forEach(function (el) {
                if (el &&
                    el.className === 'highcharts-menu-item' &&
                    el.onmouseout) {
                    el.onmouseout(getFakeMouseEvent('mouseout'));
                }
            });
            chart.highlightedExportItemIx = 0;
            // Hide the menu div
            chart.exporting.contextMenuEl.hideMenu();
            // Make sure the chart has focus and can capture keyboard events
            chart.container.focus();
        }
    }
    /**
     * Highlight export menu item by index.
     *
     * @private
     * @function Highcharts.Chart#highlightExportItem
     */
    function chartHighlightExportItem(ix) {
        var _a, _b, _c, _d;
        var listItem = (_b = (_a = this.exporting) === null || _a === void 0 ? void 0 : _a.divElements) === null || _b === void 0 ? void 0 : _b[ix], curHighlighted = this.highlightedExportItemIx !== void 0 &&
            ((_d = (_c = this.exporting) === null || _c === void 0 ? void 0 : _c.divElements) === null || _d === void 0 ? void 0 : _d[this.highlightedExportItemIx]);
        if (listItem &&
            listItem.tagName === 'LI' &&
            !(listItem.children && listItem.children.length)) {
            // Test if we have focus support for SVG elements
            var hasSVGFocusSupport = !!(this.renderTo.getElementsByTagName('g')[0] || {}).focus;
            // Only focus if we can set focus back to the elements after
            // destroying the menu (#7422)
            if (listItem.focus && hasSVGFocusSupport) {
                listItem.focus();
            }
            if (curHighlighted && curHighlighted.onmouseout) {
                curHighlighted.onmouseout(getFakeMouseEvent('mouseout'));
            }
            if (listItem.onmouseover) {
                listItem.onmouseover(getFakeMouseEvent('mouseover'));
            }
            this.highlightedExportItemIx = ix;
            return true;
        }
        return false;
    }
    /**
     * Try to highlight the last valid export menu item.
     *
     * @private
     * @function Highcharts.Chart#highlightLastExportItem
     */
    function chartHighlightLastExportItem() {
        var _a, _b;
        var chart = this;
        if ((_a = chart.exporting) === null || _a === void 0 ? void 0 : _a.divElements) {
            var i = (_b = chart.exporting) === null || _b === void 0 ? void 0 : _b.divElements.length;
            while (i--) {
                if (chart.highlightExportItem(i)) {
                    return true;
                }
            }
        }
        return false;
    }
})(MenuComponent || (MenuComponent = {}));
/* *
 *
 *  Default Export
 *
 * */
export default MenuComponent;
