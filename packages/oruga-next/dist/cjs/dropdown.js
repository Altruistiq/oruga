'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./MatchMediaMixin-f86285f0.js');
require('./trapFocus-cf475da4.js');
var DropdownItem = require('./DropdownItem-e038b170.js');

var index = {
    install(app) {
        plugins.registerComponent(app, DropdownItem.script);
        plugins.registerComponent(app, DropdownItem.script$1);
    }
};

exports.ODropdown = DropdownItem.script;
exports.ODropdownItem = DropdownItem.script$1;
exports.default = index;
