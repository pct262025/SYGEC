/**
 * @license Highstock JS v@product.version@ (@product.date@)
 * @module highcharts/indicators/indicators-all
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * All technical indicators for Highcharts Stock
 *
 * (c) 2010-2025 Pawel Fus
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import '../../Stock/Indicators/SMA/SMAIndicator.js';
import '../../Stock/Indicators/EMA/EMAIndicator.js';
import '../../Stock/Indicators/AD/ADIndicator.js';
import '../../Stock/Indicators/AO/AOIndicator.js';
import '../../Stock/Indicators/Aroon/AroonIndicator.js';
import '../../Stock/Indicators/AroonOscillator/AroonOscillatorIndicator.js';
import '../../Stock/Indicators/ATR/ATRIndicator.js';
import '../../Stock/Indicators/BB/BBIndicator.js';
import '../../Stock/Indicators/CCI/CCIIndicator.js';
import '../../Stock/Indicators/CMF/CMFIndicator.js';
import '../../Stock/Indicators/DMI/DMIIndicator.js';
import '../../Stock/Indicators/DPO/DPOIndicator.js';
import '../../Stock/Indicators/Chaikin/ChaikinIndicator.js';
import '../../Stock/Indicators/CMO/CMOIndicator.js';
import '../../Stock/Indicators/DEMA/DEMAIndicator.js';
import '../../Stock/Indicators/TEMA/TEMAIndicator.js';
import '../../Stock/Indicators/TRIX/TRIXIndicator.js';
import '../../Stock/Indicators/APO/APOIndicator.js';
import '../../Stock/Indicators/IKH/IKHIndicator.js';
import '../../Stock/Indicators/KeltnerChannels/KeltnerChannelsIndicator.js';
import '../../Stock/Indicators/Klinger/KlingerIndicator.js';
import '../../Stock/Indicators/MACD/MACDIndicator.js';
import '../../Stock/Indicators/MFI/MFIIndicator.js';
import '../../Stock/Indicators/Momentum/MomentumIndicator.js';
import '../../Stock/Indicators/NATR/NATRIndicator.js';
import '../../Stock/Indicators/OBV/OBVIndicator.js';
import '../../Stock/Indicators/PivotPoints/PivotPointsIndicator.js';
import '../../Stock/Indicators/PPO/PPOIndicator.js';
import '../../Stock/Indicators/PC/PCIndicator.js';
import '../../Stock/Indicators/PriceEnvelopes/PriceEnvelopesIndicator.js';
import '../../Stock/Indicators/PSAR/PSARIndicator.js';
import '../../Stock/Indicators/ROC/ROCIndicator.js';
import '../../Stock/Indicators/RSI/RSIIndicator.js';
import '../../Stock/Indicators/Stochastic/StochasticIndicator.js';
import '../../Stock/Indicators/SlowStochastic/SlowStochasticIndicator.js';
import '../../Stock/Indicators/Supertrend/SupertrendIndicator.js';
import '../../Stock/Indicators/VBP/VBPIndicator.js';
import '../../Stock/Indicators/VWAP/VWAPIndicator.js';
import '../../Stock/Indicators/WilliamsR/WilliamsRIndicator.js';
import '../../Stock/Indicators/WMA/WMAIndicator.js';
import '../../Stock/Indicators/Zigzag/ZigzagIndicator.js';
import '../../Stock/Indicators/LinearRegression/LinearRegressionIndicator.js';
import '../../Stock/Indicators/LinearRegressionSlopes/LinearRegressionSlopesIndicator.js';
import '../../Stock/Indicators/LinearRegressionIntercept/LinearRegressionInterceptIndicator.js';
import '../../Stock/Indicators/LinearRegressionAngle/LinearRegressionAngleIndicator.js';
import '../../Stock/Indicators/ABands/ABandsIndicator.js';
import '../../Stock/Indicators/TrendLine/TrendLineIndicator.js';
import '../../Stock/Indicators/DisparityIndex/DisparityIndexIndicator.js';
import MultipleLinesComposition from '../../Stock/Indicators/MultipleLinesComposition.js';
var G = Highcharts;
G.MultipleLinesComposition =
    G.MultipleLinesComposition || MultipleLinesComposition;
export default Highcharts;
