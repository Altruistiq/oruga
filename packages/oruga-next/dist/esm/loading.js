import { createVNode, render } from 'vue';
import { merge } from './helpers.js';
import { VueInstance } from './config.js';
import { b as registerComponent, a as registerComponentProgrammatic } from './plugins-627fff4f.js';
import './Icon-4d79248a.js';
import './ssr-d2f8ac69.js';
import { s as script } from './Loading-b4f1c8f7.js';
export { s as OLoading } from './Loading-b4f1c8f7.js';

let localVueInstance;
const LoadingProgrammatic = {
    open(params) {
        const defaultParam = {
            programmatic: true
        };
        const propsData = merge(defaultParam, params);
        const app = localVueInstance || VueInstance;
        const vnode = createVNode(script, propsData);
        vnode.appContext = app._context;
        return render(vnode, document.createElement('div'));
    }
};
var index = {
    install(app) {
        localVueInstance = app;
        registerComponent(app, script);
        registerComponentProgrammatic(app, 'loading', LoadingProgrammatic);
    }
};

export default index;
export { LoadingProgrammatic };
