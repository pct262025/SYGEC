/* *
 *
 *  (c) 2016 Highsoft AS
 *  Authors: Jon Arild Nygard
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../../Utilities.js';
var addEvent = U.addEvent, removeEvent = U.removeEvent, isObject = U.isObject, isNumber = U.isNumber, pick = U.pick, wrap = U.wrap;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function onTickInit() {
    var tick = this;
    if (!tick.treeGrid) {
        tick.treeGrid = new TreeGridTickAdditions(tick);
    }
}
/**
 * @private
 */
function onTickHover(label) {
    label.addClass('highcharts-treegrid-node-active');
    if (!label.renderer.styledMode) {
        label.css({
            textDecoration: 'underline'
        });
    }
}
/**
 * @private
 */
function onTickHoverExit(label, options) {
    var css = isObject(options.style) ? options.style : {};
    label.removeClass('highcharts-treegrid-node-active');
    if (!label.renderer.styledMode) {
        label.css({ textDecoration: (css.textDecoration || 'none') });
    }
}
/**
 * @private
 */
function renderLabelIcon(tick, params) {
    var _a;
    var treeGrid = tick.treeGrid, isNew = !treeGrid.labelIcon, renderer = params.renderer, labelBox = params.xy, options = params.options, width = options.width || 0, height = options.height || 0, padding = ((_a = options.padding) !== null && _a !== void 0 ? _a : tick.axis.linkedParent) ? 0 : 5, iconCenter = {
        x: labelBox.x - (width / 2) - padding,
        y: labelBox.y - (height / 2)
    }, rotation = params.collapsed ? 90 : 180, shouldRender = params.show && isNumber(iconCenter.y);
    var icon = treeGrid.labelIcon;
    if (!icon) {
        treeGrid.labelIcon = icon = renderer
            .path(renderer.symbols[options.type](options.x || 0, options.y || 0, width, height))
            .addClass('highcharts-label-icon')
            .add(params.group);
    }
    // Set the new position, and show or hide
    icon[shouldRender ? 'show' : 'hide'](); // #14904, #1338
    // Presentational attributes
    if (!renderer.styledMode) {
        icon
            .attr({
            cursor: 'pointer',
            'fill': pick(params.color, "#666666" /* Palette.neutralColor60 */),
            'stroke-width': 1,
            stroke: options.lineColor,
            strokeWidth: options.lineWidth || 0
        });
    }
    // Update the icon positions
    icon[isNew ? 'attr' : 'animate']({
        translateX: iconCenter.x,
        translateY: iconCenter.y,
        rotation: rotation
    });
}
/**
 * @private
 */
function wrapGetLabelPosition(proceed, x, y, label, horiz, labelOptions, tickmarkOffset, index, step) {
    var _a;
    var tick = this, lbOptions = pick((_a = tick.options) === null || _a === void 0 ? void 0 : _a.labels, labelOptions), pos = tick.pos, axis = tick.axis, isTreeGrid = axis.type === 'treegrid', result = proceed.apply(tick, [x, y, label, horiz, lbOptions, tickmarkOffset, index, step]);
    var mapOfPosToGridNode, node, level;
    if (isTreeGrid) {
        var _b = (lbOptions && isObject(lbOptions.symbol, true) ?
            lbOptions.symbol :
            {}), _c = _b.width, width = _c === void 0 ? 0 : _c, _d = _b.padding, padding = _d === void 0 ? axis.linkedParent ? 0 : 5 : _d, indentation = (lbOptions && isNumber(lbOptions.indentation) ?
            lbOptions.indentation :
            0);
        mapOfPosToGridNode = axis.treeGrid.mapOfPosToGridNode;
        node = mapOfPosToGridNode === null || mapOfPosToGridNode === void 0 ? void 0 : mapOfPosToGridNode[pos];
        level = (node === null || node === void 0 ? void 0 : node.depth) || 1;
        result.x += (
        // Add space for symbols
        (width + (padding * 2)) +
            // Apply indentation
            ((level - 1) * indentation));
    }
    return result;
}
/**
 * @private
 */
function wrapRenderLabel(proceed) {
    var tick = this, pos = tick.pos, axis = tick.axis, label = tick.label, tickGrid = tick.treeGrid, tickOptions = tick.options, icon = tickGrid === null || tickGrid === void 0 ? void 0 : tickGrid.labelIcon, labelElement = label === null || label === void 0 ? void 0 : label.element, axisGrid = axis.treeGrid, axisOptions = axis.options, chart = axis.chart, tickPositions = axis.tickPositions, mapOfPosToGridNode = axisGrid.mapOfPosToGridNode, labelOptions = pick(tickOptions === null || tickOptions === void 0 ? void 0 : tickOptions.labels, axisOptions === null || axisOptions === void 0 ? void 0 : axisOptions.labels), symbolOptions = (labelOptions && isObject(labelOptions.symbol, true) ?
        labelOptions.symbol :
        {}), node = mapOfPosToGridNode === null || mapOfPosToGridNode === void 0 ? void 0 : mapOfPosToGridNode[pos], _a = node || {}, descendants = _a.descendants, depth = _a.depth, hasDescendants = node && descendants && descendants > 0, level = depth, isTreeGridElement = (axis.type === 'treegrid') && labelElement, shouldRender = tickPositions.indexOf(pos) > -1, prefixClassName = 'highcharts-treegrid-node-', prefixLevelClass = prefixClassName + 'level-', styledMode = chart.styledMode;
    var collapsed, addClassName, removeClassName;
    if (isTreeGridElement && node) {
        // Add class name for hierarchical styling.
        label
            .removeClass(new RegExp(prefixLevelClass + '.*'))
            .addClass(prefixLevelClass + level);
    }
    proceed.apply(tick, Array.prototype.slice.call(arguments, 1));
    if (isTreeGridElement && hasDescendants) {
        collapsed = axisGrid.isCollapsed(node);
        renderLabelIcon(tick, {
            color: (!styledMode &&
                label.styles.color ||
                ''),
            collapsed: collapsed,
            group: label.parentGroup,
            options: symbolOptions,
            renderer: label.renderer,
            show: shouldRender,
            xy: label.xy
        });
        // Add class name for the node.
        addClassName = prefixClassName +
            (collapsed ? 'collapsed' : 'expanded');
        removeClassName = prefixClassName +
            (collapsed ? 'expanded' : 'collapsed');
        label
            .addClass(addClassName)
            .removeClass(removeClassName);
        if (!styledMode) {
            label.css({
                cursor: 'pointer'
            });
        }
        // Add events to both label text and icon
        [label, icon].forEach(function (object) {
            if (object && !object.attachedTreeGridEvents) {
                // On hover
                addEvent(object.element, 'mouseover', function () {
                    onTickHover(label);
                });
                // On hover out
                addEvent(object.element, 'mouseout', function () {
                    onTickHoverExit(label, labelOptions);
                });
                addEvent(object.element, 'click', function () {
                    tickGrid.toggleCollapse();
                });
                object.attachedTreeGridEvents = true;
            }
        });
    }
    else if (icon) {
        removeEvent(labelElement);
        label === null || label === void 0 ? void 0 : label.css({ cursor: 'default' });
        icon.destroy();
    }
}
/* *
 *
 *  Classes
 *
 * */
/**
 * @private
 * @class
 */
var TreeGridTickAdditions = /** @class */ (function () {
    /* *
     *
     *  Constructors
     *
     * */
    /**
     * @private
     */
    function TreeGridTickAdditions(tick) {
        this.tick = tick;
    }
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    TreeGridTickAdditions.compose = function (TickClass) {
        var tickProto = TickClass.prototype;
        if (!tickProto.toggleCollapse) {
            addEvent(TickClass, 'init', onTickInit);
            wrap(tickProto, 'getLabelPosition', wrapGetLabelPosition);
            wrap(tickProto, 'renderLabel', wrapRenderLabel);
            // Backwards compatibility
            tickProto.collapse = function (redraw) {
                this.treeGrid.collapse(redraw);
            };
            tickProto.expand = function (redraw) {
                this.treeGrid.expand(redraw);
            };
            tickProto.toggleCollapse = function (redraw) {
                this.treeGrid.toggleCollapse(redraw);
            };
        }
    };
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Collapse the grid cell. Used when axis is of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#collapse
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    TreeGridTickAdditions.prototype.collapse = function (redraw) {
        var tick = this.tick, axis = tick.axis, brokenAxis = axis.brokenAxis;
        if (brokenAxis &&
            axis.treeGrid.mapOfPosToGridNode) {
            var pos = tick.pos, node = axis.treeGrid.mapOfPosToGridNode[pos], breaks = axis.treeGrid.collapse(node);
            brokenAxis.setBreaks(breaks, pick(redraw, true));
        }
    };
    /**
     * Destroy remaining labelIcon if exist.
     *
     * @private
     * @function Highcharts.Tick#destroy
     */
    TreeGridTickAdditions.prototype.destroy = function () {
        if (this.labelIcon) {
            this.labelIcon.destroy();
        }
    };
    /**
     * Expand the grid cell. Used when axis is of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#expand
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    TreeGridTickAdditions.prototype.expand = function (redraw) {
        var _a = this.tick, pos = _a.pos, axis = _a.axis, treeGrid = axis.treeGrid, brokenAxis = axis.brokenAxis, posMappedNodes = treeGrid.mapOfPosToGridNode;
        if (brokenAxis && posMappedNodes) {
            var node = posMappedNodes[pos], breaks = treeGrid.expand(node);
            brokenAxis.setBreaks(breaks, pick(redraw, true));
        }
    };
    /**
     * Toggle the collapse/expand state of the grid cell. Used when axis is
     * of type treegrid.
     *
     * @see gantt/treegrid-axis/collapsed-dynamically/demo.js
     *
     * @private
     * @function Highcharts.Tick#toggleCollapse
     *
     * @param {boolean} [redraw=true]
     * Whether to redraw the chart or wait for an explicit call to
     * {@link Highcharts.Chart#redraw}
     */
    TreeGridTickAdditions.prototype.toggleCollapse = function (redraw) {
        var tick = this.tick, axis = tick.axis, brokenAxis = axis.brokenAxis;
        if (brokenAxis &&
            axis.treeGrid.mapOfPosToGridNode) {
            var pos = tick.pos, node = axis.treeGrid.mapOfPosToGridNode[pos], breaks = axis.treeGrid.toggleCollapse(node);
            brokenAxis.setBreaks(breaks, pick(redraw, true));
        }
    };
    return TreeGridTickAdditions;
}());
/* *
 *
 *  Default Export
 *
 * */
export default TreeGridTickAdditions;
