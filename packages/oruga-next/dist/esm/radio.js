import { defineComponent, resolveComponent, openBlock, createBlock, withModifiers, withKeys, createVNode, createCommentVNode, withDirectives, vModelRadio, renderSlot } from 'vue';
import { getValueByPath } from './helpers.js';
import { getOptions } from './config.js';
import { B as BaseComponentMixin, b as registerComponent } from './plugins-627fff4f.js';
import { s as script$1 } from './Icon-4d79248a.js';
import { C as CheckRadioMixin } from './CheckRadioMixin-fb381976.js';

/**
 * Select an option from a set
 * @displayName Radio
 * @example ./examples/Radio.md
 * @style _radio.scss
 */
var script = defineComponent({
    name: 'ORadio',
    components: {
        [script$1.name]: script$1
    },
    mixins: [BaseComponentMixin, CheckRadioMixin],
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
            default: () => { return getValueByPath(getOptions(), 'radio.iconPack', undefined); }
        },
        iconCheck: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'radio.iconCheck', undefined); }
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
  const _component_o_icon = resolveComponent("o-icon");

  return openBlock(), createBlock("label", {
    class: _ctx.rootClasses,
    ref: "label",
    onClick: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.focus(...args), ["stop"])),
    onKeydown: _cache[4] || (_cache[4] = withKeys(withModifiers($event => _ctx.$refs.label.click(), ["prevent"]), ["enter"]))
  }, [_ctx.iconCheck ? createVNode(_component_o_icon, {
    key: 0,
    icon: _ctx.iconCheck,
    pack: _ctx.iconPack,
    size: _ctx.size,
    class: _ctx.iconCheckClasses
  }, null, 8
  /* PROPS */
  , ["icon", "pack", "size", "class"]) : createCommentVNode("v-if", true), withDirectives(createVNode("input", {
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => _ctx.computedValue = $event),
    type: "radio",
    ref: "input",
    onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
    class: _ctx.checkClasses,
    disabled: _ctx.disabled,
    required: _ctx.required,
    name: _ctx.name,
    value: _ctx.nativeValue
  }, null, 10
  /* CLASS, PROPS */
  , ["disabled", "required", "name", "value"]), [[vModelRadio, _ctx.computedValue]]), createVNode("span", {
    class: _ctx.labelClasses
  }, [renderSlot(_ctx.$slots, "default")], 2
  /* CLASS */
  )], 34
  /* CLASS, HYDRATE_EVENTS */
  );
}

script.render = render;
script.__file = "src/components/radio/Radio.vue";

var index = {
    install(app) {
        registerComponent(app, script);
    }
};

export default index;
export { script as ORadio };
