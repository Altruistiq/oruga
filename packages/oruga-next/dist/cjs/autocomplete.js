'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
require('./FormElementMixin-c6174120.js');
require('./Input-603d10ec.js');
var Autocomplete = require('./Autocomplete-c38776f5.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Autocomplete.script);
    }
};

exports.OAutocomplete = Autocomplete.script;
exports.default = index;
