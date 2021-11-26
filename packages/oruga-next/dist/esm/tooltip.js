import 'vue';
import './helpers.js';
import './config.js';
import { b as registerComponent } from './plugins-627fff4f.js';
import { s as script } from './Tooltip-ab751fb0.js';
export { s as OTooltip } from './Tooltip-ab751fb0.js';

var index = {
    install(app) {
        registerComponent(app, script);
    }
};

export default index;
