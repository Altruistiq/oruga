'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./MatchMediaMixin-f86285f0.js');
var Field = require('./Field-f5aea857.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Field.script);
    }
};

exports.OField = Field.script;
exports.default = index;
