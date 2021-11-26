'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
require('./FormElementMixin-c6174120.js');
require('./Input-603d10ec.js');
require('./MatchMediaMixin-f86285f0.js');
require('./trapFocus-cf475da4.js');
require('./DropdownItem-e038b170.js');
require('./Select-a608f870.js');
var Timepicker = require('./Timepicker-a9c5798f.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Timepicker.script);
    }
};

exports.OTimepicker = Timepicker.script;
exports.default = index;
