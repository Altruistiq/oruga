'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
require('./ssr-4e5033ea.js');
var Loading = require('./Loading-1a77e608.js');

let localVueInstance;
const LoadingProgrammatic = {
    open(params) {
        const defaultParam = {
            programmatic: true
        };
        const propsData = helpers.merge(defaultParam, params);
        const app = localVueInstance || config.VueInstance;
        const vnode = vue.createVNode(Loading.script, propsData);
        vnode.appContext = app._context;
        return vue.render(vnode, document.createElement('div'));
    }
};
var index = {
    install(app) {
        localVueInstance = app;
        plugins.registerComponent(app, Loading.script);
        plugins.registerComponentProgrammatic(app, 'loading', LoadingProgrammatic);
    }
};

exports.OLoading = Loading.script;
exports.LoadingProgrammatic = LoadingProgrammatic;
exports.default = index;
