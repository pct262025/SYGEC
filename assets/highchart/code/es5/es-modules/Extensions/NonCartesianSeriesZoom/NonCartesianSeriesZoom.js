/* *
 *
 *  (c) 2024 Hubert Kozik
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../Core/Globals.js';
var composed = H.composed;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, pushUnique = U.pushUnique;
/* /* *
 *
 *  Functions
 *
 * */
/**
 * Logic for non-cartesian series zooming and panning
 * @private
 */
function onTransform(params) {
    var chart = this, trigger = params.trigger, selection = params.selection, reset = params.reset, _a = params.from, from = _a === void 0 ? {} : _a, _b = params.to, to = _b === void 0 ? {} : _b, type = chart.zooming.type;
    if (type !== 'xy') {
        return;
    }
    if (trigger === 'mousewheel' ||
        trigger === 'pan' ||
        selection ||
        reset) {
        chart.series.forEach(function (series) {
            var _a, _b, _c, _d, _e;
            if (!series.isCartesian && series.options.zoomEnabled !== false) {
                series.isDirty = true;
                chart.isDirtyBox = true;
                params.hasZoomed = true;
                var _f = chart.plotSizeX, plotSizeX = _f === void 0 ? 0 : _f, _g = chart.plotSizeY, plotSizeY = _g === void 0 ? 0 : _g;
                if (trigger === 'pan' && series.zooming) {
                    series.zooming.panX -= (to.x || 0) / plotSizeX;
                    series.zooming.panY -= (to.y || 0) / plotSizeY;
                }
                else {
                    if (Object.keys(from).length) {
                        var _h = to.width, toWidth = _h === void 0 ? 1 : _h, _j = to.height, toHeight = _j === void 0 ? 1 : _j, currentScale = Math.abs(((_a = series.group) === null || _a === void 0 ? void 0 : _a.scaleX) || 1);
                        var _k = from.x, zoomX = _k === void 0 ? 0 : _k, _l = from.y, zoomY = _l === void 0 ? 0 : _l, _m = from.width, fromWidth = _m === void 0 ? 1 : _m, _o = from.height, fromHeight = _o === void 0 ? 1 : _o, x = zoomX, y = zoomY, scale = ((_b = series.zooming) === null || _b === void 0 ? void 0 : _b.scale) ||
                            ((_c = series.group) === null || _c === void 0 ? void 0 : _c.scaleX) ||
                            1, width = (((_d = series.zooming) === null || _d === void 0 ? void 0 : _d.width) || 1) * plotSizeX, height = (((_e = series.zooming) === null || _e === void 0 ? void 0 : _e.height) || 1) * plotSizeY;
                        if (Object.keys(to).length) {
                            width = width * (fromWidth / toWidth);
                            height = height * (fromWidth / toHeight);
                            zoomX -= chart.plotLeft;
                            zoomY -= chart.plotTop;
                            x = zoomX - width / 2;
                            y = zoomY - height / 2;
                            scale =
                                Math.min(plotSizeX / width, plotSizeY / height);
                            // Uncomment this block to visualize the zooming
                            // bounding box and the point, which is normalized
                            // position to zoom-in
                            // chart.renderer.circle(
                            //    zoomX + chart.plotLeft,
                            //    zoomY + chart.plotTop,
                            //    2
                            // ).attr({ stroke: 'blue' }).add();
                            // chart.renderer.rect(
                            //    x + chart.plotLeft,
                            //    y + chart.plotTop,
                            //    width,
                            //    height,
                            //    0,
                            //    2
                            // ).attr({ stroke: 'red' }).add();
                            // chart.renderer.circle(
                            //    chart.plotLeft + x + width / 2,
                            //    chart.plotTop + y + height / 2,
                            //    2
                            // ).attr({ stroke: 'blue' }).add();
                        }
                        else {
                            fromWidth /= currentScale;
                            fromHeight /= currentScale;
                            scale = Math.min(plotSizeX / fromWidth, plotSizeY / fromHeight);
                            var prevX = 0, prevY = 0;
                            if (series.zooming) {
                                prevX = series.zooming.x * plotSizeX;
                                prevY = series.zooming.y * plotSizeY;
                            }
                            // Calculate the normalized coefficients of the
                            // rectangle center position
                            var factorX = (zoomX - chart.plotLeft) /
                                ((plotSizeX - fromWidth * currentScale) ||
                                    1), factorY = (zoomY - chart.plotTop) /
                                ((plotSizeY - fromHeight * currentScale) ||
                                    1);
                            width = fromWidth;
                            height = fromHeight;
                            zoomX -= chart.plotLeft;
                            zoomY -= chart.plotTop;
                            zoomX /= currentScale;
                            zoomY /= currentScale;
                            zoomX += prevX + (fromWidth) * factorX;
                            zoomY += prevY + (fromHeight) * factorY;
                            x -= chart.plotLeft;
                            y -= chart.plotTop;
                            x /= currentScale;
                            y /= currentScale;
                            x += prevX;
                            y += prevY;
                            // Uncomment this block to visualize the zooming
                            // bounding box and the point, which is normalized
                            // position to zoom-in
                            // chart.renderer.rect(
                            //    x + chart.plotLeft,
                            //    y + chart.plotTop,
                            //    fromWidth,
                            //    fromHeight,
                            //    0,
                            //    2
                            // ).attr({ stroke: 'red' }).add();
                            // chart.renderer.circle(
                            //    zoomX + chart.plotLeft,
                            //    zoomY + chart.plotTop,
                            //    2
                            // ).attr({ stroke: 'blue' }).add();
                        }
                        series.zooming = {
                            x: x / plotSizeX,
                            y: y / plotSizeY,
                            zoomX: zoomX / plotSizeX,
                            zoomY: zoomY / plotSizeY,
                            width: width / plotSizeX,
                            height: height / plotSizeY,
                            scale: scale,
                            panX: 0,
                            panY: 0
                        };
                        if (scale < 1) {
                            delete series.zooming;
                        }
                    }
                    else {
                        delete series.zooming;
                    }
                }
            }
        });
    }
}
/**
 * Apply zoom into series plot box
 * @private
 */
function onGetPlotBox(e) {
    var _a;
    var _b = this, chart = _b.chart, group = _b.group, zooming = _b.zooming;
    var _c = chart.plotSizeX, plotSizeX = _c === void 0 ? 0 : _c, _d = chart.plotSizeY, plotSizeY = _d === void 0 ? 0 : _d, scale = e.scale, translateX = e.translateX, translateY = e.translateY, name = e.name, left = 0, top = 0;
    var initLeft = translateX, initTop = translateY;
    if (chart.inverted) {
        _a = [plotSizeY, plotSizeX], plotSizeX = _a[0], plotSizeY = _a[1];
    }
    if (group && zooming) {
        scale = zooming.scale;
        left = zooming.zoomX * plotSizeX *
            (scale - (Math.abs(group.scaleX || 1)));
        top = zooming.zoomY * plotSizeY *
            (scale - (Math.abs(group.scaleY || 1)));
        if (name === 'series') {
            zooming.x = Math.max(0, Math.min(1 - zooming.width, zooming.x + (zooming.panX / scale)));
            left += zooming.panX * plotSizeX;
            zooming.panX = 0;
            zooming.y = Math.max(0, Math.min(1 - zooming.height, zooming.y + (zooming.panY / scale)));
            top += zooming.panY * plotSizeY;
            zooming.panY = 0;
        }
        translateX = (group.translateX || initLeft) - left;
        translateY = (group.translateY || initTop) - top;
        // Do not allow to move outside the chart
        // Vertical lock
        if (translateY > initTop) {
            translateY = initTop;
        }
        else if ((group.translateY || initTop) - top <
            (plotSizeY * (1 - scale) + initTop)) {
            translateY = (plotSizeY * (1 - scale)) + initTop;
        }
        // Horizontal lock
        if (translateX > initLeft) {
            translateX = initLeft;
        }
        else if (translateX < (plotSizeX * (1 - scale) + initLeft)) {
            translateX = (plotSizeX * (1 - scale)) + initLeft;
        }
        e.scale = scale;
        e.translateX = translateX;
        e.translateY = translateY;
    }
}
/**
 * Clip series and data labels group with zoom rect
 * @private
 */
function onAfterDrawChartBox() {
    var _a, _b;
    var chart = this;
    var clipRect;
    if (chart.series.find(function (series) { return !!series.zooming; })) {
        chart.zoomClipRect || (chart.zoomClipRect = chart.renderer.clipRect());
        chart.zoomClipRect.attr({
            x: chart.plotLeft,
            y: chart.plotTop,
            width: chart.inverted ? chart.clipBox.height :
                chart.clipBox.width,
            height: chart.inverted ? chart.clipBox.width :
                chart.clipBox.height
        });
        clipRect = chart.zoomClipRect;
    }
    (_a = chart.seriesGroup) === null || _a === void 0 ? void 0 : _a.clip(clipRect);
    (_b = chart.dataLabelsGroup) === null || _b === void 0 ? void 0 : _b.clip(clipRect);
}
/**
 * Adjust tooltip position to scaled series group
 * @private
 */
function onGetAnchor(params) {
    if (params.point.series &&
        !params.point.series.isCartesian &&
        params.point.series.group &&
        params.point.series.zooming) {
        var chart = params.point.series.chart, scale = params.point.series.zooming.scale, left = (params.point.series.group.translateX || 0), top_1 = (params.point.series.group.translateY || 0);
        params.ret[0] = (params.ret[0] * scale) + left - chart.plotLeft;
        params.ret[1] = (params.ret[1] * scale) + top_1 - chart.plotTop;
    }
}
function onAfterSetChartSize(params) {
    if (params.skipAxes) {
        this.series.forEach(function (series) {
            if (series.group && series.zooming) {
                series.group.attr({
                    translateX: 0,
                    translateY: 0,
                    scaleX: 1,
                    scaleY: 1
                });
            }
        });
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * The series type
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.tiledwebmap
 *
 * @augments Highcharts.Series
 */
var NonCartesianSeriesZoom = /** @class */ (function () {
    function NonCartesianSeriesZoom() {
    }
    /* *
     *
     *  Static Functions
     *
     * */
    NonCartesianSeriesZoom.compose = function (ChartClass, SeriesClass, TooltipClass) {
        if (pushUnique(composed, 'NonCartesianSeriesZoom')) {
            addEvent(ChartClass, 'afterDrawChartBox', onAfterDrawChartBox);
            addEvent(ChartClass, 'transform', onTransform);
            addEvent(ChartClass, 'afterSetChartSize', onAfterSetChartSize);
            addEvent(SeriesClass, 'getPlotBox', onGetPlotBox);
            addEvent(TooltipClass, 'getAnchor', onGetAnchor);
        }
    };
    return NonCartesianSeriesZoom;
}());
/* *
 *
 *  Default Export
 *
 * */
export default NonCartesianSeriesZoom;
/* *
 *
 *  API Options
 *
 * */
/**
 * Whether to zoom non-cartesian series. If `chart.zooming` is set, the option
 * allows to disable zooming on an individual non-cartesian series. By default
 * zooming is enabled for all series.
 *
 * Note: This option works only for non-cartesian series.
 *
 * @type      {boolean}
 * @since 12.3.0
 * @apioption plotOptions.series.zoomEnabled
 */
/**
 * Whether to zoom non-cartesian series. If `chart.zooming` is set, the option
 * allows to disable zooming on an individual non-cartesian series. By default
 * zooming is enabled for all series.
 *
 * Note: This option works only for non-cartesian series.
 *
 * @type      {boolean}
 * @since 12.3.0
 * @apioption series.zoomEnabled
 */
(''); // Keeps doclets above in JS file
