/* *
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
import Annotation from '../Annotation.js';
import ControlPoint from '../ControlPoint.js';
import CrookedLine from './CrookedLine.js';
import D from '../../../Core/Defaults.js';
var defaultOptions = D.defaultOptions;
import MockPoint from '../MockPoint.js';
import U from '../../../Core/Utilities.js';
var merge = U.merge;
if (defaultOptions.annotations) {
    defaultOptions.annotations.types.tunnel = merge(defaultOptions.annotations.types.crookedLine, 
    /**
     * Options for the tunnel annotation type.
     *
     * @extends annotations.types.crookedLine
     * @sample highcharts/annotations-advanced/tunnel/
     *         Tunnel
     * @product highstock
     * @optionparent annotations.types.tunnel
     */
    {
        typeOptions: {
            /**
             * Background options.
             *
             * @type {Object}
             * @excluding height, point, points, r, type, width, markerEnd,
             *            markerStart
             */
            background: {
                fill: 'rgba(130, 170, 255, 0.4)',
                strokeWidth: 0
            },
            line: {
                strokeWidth: 1
            },
            /**
             * The height of the annotation in terms of yAxis.
             */
            height: -2,
            /**
             * Options for the control point which controls
             * the annotation's height.
             *
             * @extends annotations.types.crookedLine.controlPointOptions
             * @excluding positioner, events
             */
            heightControlPoint: {
                positioner: function (target) {
                    var startXY = MockPoint.pointToPixels(target.points[2]), endXY = MockPoint.pointToPixels(target.points[3]), x = (startXY.x + endXY.x) / 2;
                    return {
                        x: x - (this.graphic.width || 0) / 2,
                        y: getSecondCoordinate(startXY, endXY, x) -
                            (this.graphic.height || 0) / 2
                    };
                },
                events: {
                    drag: function (e, target) {
                        if (target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                            visiblePlotOnly: true
                        })) {
                            target.translateHeight(this.mouseMoveToTranslation(e).y);
                            target.redraw(false);
                        }
                    }
                }
            }
        },
        /**
         * @extends annotations.types.crookedLine.controlPointOptions
         * @excluding positioner, events
         */
        controlPointOptions: {
            events: {
                drag: function (e, target) {
                    if (target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                        visiblePlotOnly: true
                    })) {
                        var translation = this.mouseMoveToTranslation(e);
                        target.translateSide(translation.x, translation.y, !!this.index);
                        target.redraw(false);
                    }
                }
            }
        }
    });
}
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function getSecondCoordinate(p1, p2, x) {
    return (p2.y - p1.y) / (p2.x - p1.x) * (x - p1.x) + p1.y;
}
/* *
 *
 *  Class
 *
 * */
var Tunnel = /** @class */ (function (_super) {
    __extends(Tunnel, _super);
    function Tunnel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* *
     *
     * Functions
     *
     * */
    Tunnel.prototype.getPointsOptions = function () {
        var pointsOptions = CrookedLine.prototype.getPointsOptions.call(this), yAxisIndex = this.options.typeOptions.yAxis || 0, yAxis = this.chart.yAxis[yAxisIndex];
        pointsOptions[2] = this.heightPointOptions(pointsOptions[1]);
        pointsOptions[3] = this.heightPointOptions(pointsOptions[0]);
        // In case of log axis, translate the bottom left point again, #16769
        if (yAxis && yAxis.logarithmic) {
            // Get the height in pixels
            var h = yAxis.toPixels(pointsOptions[2].y) -
                yAxis.toPixels(pointsOptions[1].y), 
            // Get the pixel position of the last point
            y3 = yAxis.toPixels(pointsOptions[0].y) + h;
            // Set the new value
            pointsOptions[3].y = yAxis.toValue(y3);
        }
        return pointsOptions;
    };
    Tunnel.prototype.getControlPointsOptions = function () {
        return this.getPointsOptions().slice(0, 2);
    };
    Tunnel.prototype.heightPointOptions = function (pointOptions) {
        var heightPointOptions = merge(pointOptions), typeOptions = this.options.typeOptions;
        heightPointOptions.y += typeOptions.height;
        return heightPointOptions;
    };
    Tunnel.prototype.addControlPoints = function () {
        CrookedLine.prototype.addControlPoints.call(this);
        var options = this.options, typeOptions = options.typeOptions, controlPoint = new ControlPoint(this.chart, this, merge(options.controlPointOptions, typeOptions.heightControlPoint), 2);
        this.controlPoints.push(controlPoint);
        typeOptions.heightControlPoint = controlPoint.options;
    };
    Tunnel.prototype.addShapes = function () {
        this.addLine();
        this.addBackground();
    };
    Tunnel.prototype.addLine = function () {
        var line = this.initShape(merge(this.options.typeOptions.line, {
            type: 'path',
            points: [
                this.points[0],
                this.points[1],
                function (target) {
                    var pointOptions = MockPoint.pointToOptions(target.annotation.points[2]);
                    pointOptions.command = 'M';
                    return pointOptions;
                },
                this.points[3]
            ],
            className: 'highcharts-tunnel-lines'
        }), 0);
        this.options.typeOptions.line = line.options;
    };
    Tunnel.prototype.addBackground = function () {
        var background = this.initShape(merge(this.options.typeOptions.background, {
            type: 'path',
            points: this.points.slice(),
            className: 'highcharts-tunnel-background'
        }), 1);
        this.options.typeOptions.background = background.options;
    };
    /**
     * Translate start or end ("left" or "right") side of the tunnel.
     * @private
     * @param {number} dx
     * the amount of x translation
     * @param {number} dy
     * the amount of y translation
     * @param {boolean} [end]
     * whether to translate start or end side
     */
    Tunnel.prototype.translateSide = function (dx, dy, end) {
        var topIndex = Number(end), bottomIndex = topIndex === 0 ? 3 : 2;
        this.translatePoint(dx, dy, topIndex);
        this.translatePoint(dx, dy, bottomIndex);
    };
    /**
     * Translate height of the tunnel.
     * @private
     * @param {number} dh
     * the amount of height translation
     */
    Tunnel.prototype.translateHeight = function (dh) {
        this.translatePoint(0, dh, 2);
        this.translatePoint(0, dh, 3);
        this.options.typeOptions.height = this.points[3].y -
            this.points[0].y;
        this.userOptions.typeOptions.height = this.options.typeOptions.height;
    };
    return Tunnel;
}(CrookedLine));
Annotation.types.tunnel = Tunnel;
/* *
 *
 *  Default Export
 *
 * */
export default Tunnel;
