'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
require('./MatchMediaMixin-f86285f0.js');
var Pagination = require('./Pagination-6f66edae.js');

var index = {
    install(app) {
        plugins.registerComponent(app, Pagination.script);
        plugins.registerComponent(app, Pagination.script$1);
    }
};

exports.OPagination = Pagination.script;
exports.OPaginationButton = Pagination.script$1;
exports.default = index;
