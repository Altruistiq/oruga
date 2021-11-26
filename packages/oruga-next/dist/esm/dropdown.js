import 'vue';
import './helpers.js';
import './config.js';
import { b as registerComponent } from './plugins-627fff4f.js';
import './MatchMediaMixin-651dc617.js';
import './trapFocus-e25a0553.js';
import { s as script, a as script$1 } from './DropdownItem-bda90e75.js';
export { s as ODropdown, a as ODropdownItem } from './DropdownItem-bda90e75.js';

var index = {
    install(app) {
        registerComponent(app, script);
        registerComponent(app, script$1);
    }
};

export default index;
