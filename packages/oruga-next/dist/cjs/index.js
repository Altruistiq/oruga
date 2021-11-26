'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('vue');
var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
require('./FormElementMixin-c6174120.js');
require('./Input-603d10ec.js');
require('./Autocomplete-c38776f5.js');
var autocomplete = require('./autocomplete.js');
require('./Button-4a163880.js');
var button = require('./button.js');
require('./CheckRadioMixin-2a894e60.js');
require('./Checkbox-8573b8e4.js');
var checkbox = require('./checkbox.js');
var collapse = require('./collapse.js');
require('./MatchMediaMixin-f86285f0.js');
require('./trapFocus-cf475da4.js');
require('./DropdownItem-e038b170.js');
require('./Field-f5aea857.js');
require('./Select-a608f870.js');
require('./Datepicker-ed601f74.js');
var datepicker = require('./datepicker.js');
require('./Timepicker-a9c5798f.js');
var datetimepicker = require('./datetimepicker.js');
var dropdown = require('./dropdown.js');
var field = require('./field.js');
var icon = require('./icon.js');
var input = require('./input.js');
var inputitems = require('./inputitems.js');
require('./ssr-4e5033ea.js');
require('./Loading-1a77e608.js');
var loading = require('./loading.js');
var modal = require('./modal.js');
var notification = require('./notification.js');
require('./Pagination-6f66edae.js');
var pagination = require('./pagination.js');
var radio = require('./radio.js');
var select = require('./select.js');
var skeleton = require('./skeleton.js');
var sidebar = require('./sidebar.js');
require('./Tooltip-86219144.js');
var slider = require('./slider.js');
require('./SlotComponent-b10f11e8.js');
require('./TabbedChildMixin-51ad9b8e.js');
var steps = require('./steps.js');
var _switch = require('./switch.js');
var table = require('./table.js');
var tabs = require('./tabs.js');
var timepicker = require('./timepicker.js');
var tooltip = require('./tooltip.js');
var upload = require('./upload.js');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: autocomplete.default,
    Button: button.default,
    Checkbox: checkbox.default,
    Collapse: collapse.default,
    Datepicker: datepicker.default,
    Datetimepicker: datetimepicker.default,
    Dropdown: dropdown.default,
    Field: field.default,
    Icon: icon.default,
    Input: input.default,
    Inputitems: inputitems.default,
    Loading: loading.default,
    Modal: modal.default,
    Notification: notification.default,
    Pagination: pagination.default,
    Radio: radio.default,
    Select: select.default,
    Skeleton: skeleton.default,
    Sidebar: sidebar.default,
    Slider: slider.default,
    Steps: steps.default,
    Switch: _switch.default,
    Table: table.default,
    Tabs: tabs.default,
    Timepicker: timepicker.default,
    Tooltip: tooltip.default,
    Upload: upload.default
});

const Oruga = {
    install(app, options = {}) {
        config.setVueInstance(app);
        // Options
        const defaultConfig = config.getOptions();
        config.setOptions(helpers.merge(defaultConfig, options, true));
        // Components
        for (const componentKey in components) {
            plugins.registerPlugin(app, components[componentKey]);
        }
        // Config component
        plugins.registerComponentProgrammatic(app, 'config', config.Programmatic);
    }
};

exports.Config = config.Plugin;
exports.ConfigProgrammatic = config.Programmatic;
exports.useProgrammatic = plugins.useProgrammatic;
exports.Autocomplete = autocomplete.default;
exports.Button = button.default;
exports.Checkbox = checkbox.default;
exports.Collapse = collapse.default;
exports.Datepicker = datepicker.default;
exports.Datetimepicker = datetimepicker.default;
exports.Dropdown = dropdown.default;
exports.Field = field.default;
exports.Icon = icon.default;
exports.Input = input.default;
exports.Inputitems = inputitems.default;
exports.Loading = loading.default;
exports.LoadingProgrammatic = loading.LoadingProgrammatic;
exports.Modal = modal.default;
exports.ModalProgrammatic = modal.ModalProgrammatic;
exports.Notification = notification.default;
exports.NotificationProgrammatic = notification.NotificationProgrammatic;
exports.Pagination = pagination.default;
exports.Radio = radio.default;
exports.Select = select.default;
exports.Skeleton = skeleton.default;
exports.Sidebar = sidebar.default;
exports.Slider = slider.default;
exports.Steps = steps.default;
exports.Switch = _switch.default;
exports.Table = table.default;
exports.Tabs = tabs.default;
exports.Timepicker = timepicker.default;
exports.Tooltip = tooltip.default;
exports.Upload = upload.default;
exports.default = Oruga;
