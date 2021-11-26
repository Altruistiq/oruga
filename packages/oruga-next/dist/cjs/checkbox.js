'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
require('./CheckRadioMixin-2a894e60.js');
var Checkbox = require('./Checkbox-8573b8e4.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Checkbox.script);
    }
};

exports.OCheckbox = Checkbox.script;
exports.default = index;
