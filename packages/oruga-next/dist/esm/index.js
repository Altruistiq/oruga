import 'vue';
import { merge } from './helpers.js';
import { setVueInstance, setOptions, Programmatic, getOptions } from './config.js';
export { Plugin as Config, Programmatic as ConfigProgrammatic } from './config.js';
import { r as registerPlugin, a as registerComponentProgrammatic } from './plugins-627fff4f.js';
export { u as useProgrammatic } from './plugins-627fff4f.js';
import './Icon-4d79248a.js';
import './FormElementMixin-6fb41465.js';
import './Input-e60c6f10.js';
import './Autocomplete-aa443bda.js';
import index from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import './Button-e735d6d3.js';
import index$1 from './button.js';
export { default as Button } from './button.js';
import './CheckRadioMixin-fb381976.js';
import './Checkbox-a9872ef3.js';
import index$2 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import index$3 from './collapse.js';
export { default as Collapse } from './collapse.js';
import './MatchMediaMixin-651dc617.js';
import './trapFocus-e25a0553.js';
import './DropdownItem-bda90e75.js';
import './Field-000cb4ba.js';
import './Select-1c139c60.js';
import './Datepicker-316f3f38.js';
import index$4 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import './Timepicker-0c19a5a5.js';
import index$5 from './datetimepicker.js';
export { default as Datetimepicker } from './datetimepicker.js';
import index$6 from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import index$7 from './field.js';
export { default as Field } from './field.js';
import index$8 from './icon.js';
export { default as Icon } from './icon.js';
import index$9 from './input.js';
export { default as Input } from './input.js';
import index$a from './inputitems.js';
export { default as Inputitems } from './inputitems.js';
import './ssr-d2f8ac69.js';
import './Loading-b4f1c8f7.js';
import index$b from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import index$c from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import index$d from './notification.js';
export { default as Notification, NotificationProgrammatic } from './notification.js';
import './Pagination-7e518236.js';
import index$e from './pagination.js';
export { default as Pagination } from './pagination.js';
import index$f from './radio.js';
export { default as Radio } from './radio.js';
import index$g from './select.js';
export { default as Select } from './select.js';
import index$h from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import index$i from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import './Tooltip-ab751fb0.js';
import index$j from './slider.js';
export { default as Slider } from './slider.js';
import './SlotComponent-25f89430.js';
import './TabbedChildMixin-a153b5a5.js';
import index$k from './steps.js';
export { default as Steps } from './steps.js';
import index$l from './switch.js';
export { default as Switch } from './switch.js';
import index$m from './table.js';
export { default as Table } from './table.js';
import index$n from './tabs.js';
export { default as Tabs } from './tabs.js';
import index$o from './timepicker.js';
export { default as Timepicker } from './timepicker.js';
import index$p from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import index$q from './upload.js';
export { default as Upload } from './upload.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: index,
    Button: index$1,
    Checkbox: index$2,
    Collapse: index$3,
    Datepicker: index$4,
    Datetimepicker: index$5,
    Dropdown: index$6,
    Field: index$7,
    Icon: index$8,
    Input: index$9,
    Inputitems: index$a,
    Loading: index$b,
    Modal: index$c,
    Notification: index$d,
    Pagination: index$e,
    Radio: index$f,
    Select: index$g,
    Skeleton: index$h,
    Sidebar: index$i,
    Slider: index$j,
    Steps: index$k,
    Switch: index$l,
    Table: index$m,
    Tabs: index$n,
    Timepicker: index$o,
    Tooltip: index$p,
    Upload: index$q
});

const Oruga = {
    install(app, options = {}) {
        setVueInstance(app);
        // Options
        const defaultConfig = getOptions();
        setOptions(merge(defaultConfig, options, true));
        // Components
        for (const componentKey in components) {
            registerPlugin(app, components[componentKey]);
        }
        // Config component
        registerComponentProgrammatic(app, 'config', Programmatic);
    }
};

export default Oruga;
