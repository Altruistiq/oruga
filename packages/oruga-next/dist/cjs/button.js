'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
var Button = require('./Button-4a163880.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Button.script);
    }
};

exports.OButton = Button.script;
exports.default = index;
