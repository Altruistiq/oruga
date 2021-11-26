'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
var Icon = require('./Icon-2d2f61db.js');
var CheckRadioMixin = require('./CheckRadioMixin-2a894e60.js');

/**
 * Select an option from a set
 * @displayName Radio
 * @example ./examples/Radio.md
 * @style _radio.scss
 */
var script = vue.defineComponent({
    name: 'ORadio',
    components: {
        [Icon.script.name]: Icon.script
    },
    mixins: [plugins.BaseComponentMixin, CheckRadioMixin.CheckRadioMixin],
    configField: 'radio',
    emits: [
        'input'
    ],
    props: {
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: {
            type: String,
            default: () => { return helpers.getValueByPath(config.getOptions(), 'radio.iconPack', undefined); }
        },
        iconCheck: {
            type: String,
            default: () => { return helpers.getValueByPath(config.getOptions(), 'radio.iconCheck', undefined); }
        },
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        iconCheckClass: [String, Function, Array],
        iconCheckCheckedClass: [String, Function, Array]
    },
    computed: {
        isChecked() {
            return this.modelValue === this.nativeValue;
        },
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-radio'),
                { [this.computedClass('checkedClass', 'o-radio--checked')]: this.isChecked },
                { [this.computedClass('sizeClass', 'o-radio--', this.size)]: this.size },
                { [this.computedClass('disabledClass', 'o-radio--disabled')]: this.disabled },
                { [this.computedClass('variantClass', 'o-radio--', this.variant)]: this.variant }
            ];
        },
        checkClasses() {
            return [
                this.computedClass('checkClass', 'o-radio__check'),
                { [this.computedClass('checkCheckedClass', 'o-radio__check--checked')]: this.isChecked },
            ];
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-radio__label')
            ];
        },
        iconCheckClasses() {
            return [
                this.computedClass('iconCheckClass', 'o-radio__icon'),
                { [this.computedClass('iconCheckCheckedClass', 'o-radio__icon--checked')]: this.isChecked },
            ];
        }
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = vue.resolveComponent("o-icon");

  return vue.openBlock(), vue.createBlock("label", {
    class: _ctx.rootClasses,
    ref: "label",
    onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.focus(...args), ["stop"])),
    onKeydown: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers($event => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
  }, [_ctx.iconCheck ? vue.createVNode(_component_o_icon, {
    key: 0,
    icon: _ctx.iconCheck,
    pack: _ctx.iconPack,
    size: _ctx.size,
    class: _ctx.iconCheckClasses
  }, null, 8
  /* PROPS */
  , ["icon", "pack", "size", "class"]) : vue.createCommentVNode("v-if", true), vue.withDirectives(vue.createVNode("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.computedValue = $event),
    type: "radio",
    ref: "input",
    onClick: _cache[2] || (_cache[2] = vue.withModifiers(() => {}, ["stop"])),
    class: _ctx.checkClasses,
    disabled: _ctx.disabled,
    required: _ctx.required,
    name: _ctx.name,
    value: _ctx.nativeValue
  }, null, 10
  /* CLASS, PROPS */
  , ["disabled", "required", "name", "value"]), [[vue.vModelRadio, _ctx.computedValue]]), vue.createVNode("span", {
    class: _ctx.labelClasses
  }, [vue.renderSlot(_ctx.$slots, "default")], 2
  /* CLASS */
  )], 34
  /* CLASS, HYDRATE_EVENTS */
  );
}

script.render = render;
script.__file = "src/components/radio/Radio.vue";

var index = {
    install(app) {
        plugins.registerComponent(app, script);
    }
};

exports.ORadio = script;
exports.default = index;
