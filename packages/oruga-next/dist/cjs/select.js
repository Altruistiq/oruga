'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
require('./FormElementMixin-c6174120.js');
var Select = require('./Select-a608f870.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Select.script);
    }
};

exports.OSelect = Select.script;
exports.default = index;
