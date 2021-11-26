'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
var Icon = require('./Icon-2d2f61db.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Icon.script);
    }
};

exports.OIcon = Icon.script;
exports.default = index;
