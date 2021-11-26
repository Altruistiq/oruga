'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
var Tooltip = require('./Tooltip-86219144.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Tooltip.script);
    }
};

exports.OTooltip = Tooltip.script;
exports.default = index;
