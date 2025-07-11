/**
 * Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/indicators/trix
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Indicator series type for Highcharts Stock
 *
 * (c) 2010-2025 Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */import*as e from"../highcharts.js";import"../modules/stock.js";var r={};r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r);let t=e.default;var s=r.n(t);r.d({},{});let l=e.default.SeriesRegistry;var a=r.n(l);let{tema:o}=a().seriesTypes,{correctFloat:i,merge:n}=s();class p extends o{getTemaPoint(e,r,t,s){if(s>r)return[e[s-3],0!==t.prevLevel3?i(t.level3-t.prevLevel3)/t.prevLevel3*100:null]}}p.defaultOptions=n(o.defaultOptions),a().registerSeriesType("trix",p);let d=s();export{d as default};