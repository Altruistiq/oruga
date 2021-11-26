import { defineComponent, resolveComponent, openBlock, createBlock, withModifiers, withKeys, createVNode, createCommentVNode, withDirectives, vModelCheckbox, renderSlot } from 'vue';
import { getValueByPath } from './helpers.js';
import { getOptions } from './config.js';
import { B as BaseComponentMixin } from './plugins-627fff4f.js';
import { s as script$1 } from './Icon-4d79248a.js';
import { C as CheckRadioMixin } from './CheckRadioMixin-fb381976.js';

/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @example ./examples/Checkbox.md
 * @style _checkbox.scss
 */
var script = defineComponent({
    name: 'OCheckbox',
    components: {
        [script$1.name]: script$1
    },
    mixins: [BaseComponentMixin, CheckRadioMixin],
    configField: 'checkbox',
    emits: [
        'input'
    ],
    props: {
        /**
         * Same as native indeterminate
         */
        indeterminate: {
            type: Boolean,
            default: false
        },
        /**
         * Overrides the returned value when it's checked
         */
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        /**
         * Overrides the returned value when it's not checked
         */
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'checkbox.iconPack', undefined); }
        },
        /** Icon for checkbox (optional)  */
        iconCheck: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'checkbox.iconCheck', undefined); }
        },
        /** Accessibility label to establish relationship between the checkbox and control label */
        ariaLabelledby: String,
        /* Same as native autocomplete */
        autocomplete: String,
        rootClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        checkClass: [String, Function, Array],
        checkCheckedClass: [String, Function, Array],
        checkIndeterminateClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        iconCheckClass: [String, Function, Array],
        iconCheckCheckedClass: [String, Function, Array]
    },
    watch: {
        indeterminate: {
            handler(val) {
                this.isIndeterminate = val;
            },
            immediate: true,
        },
    },
    computed: {
        isChecked() {
            return this.computedValue === this.trueValue
                || Array.isArray(this.computedValue) && this.computedValue.indexOf(this.nativeValue) !== -1;
        },
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-chk'),
                { [this.computedClass('checkedClass', 'o-chk--checked')]: this.isChecked },
                { [this.computedClass('sizeClass', 'o-chk--', this.size)]: this.size },
                { [this.computedClass('disabledClass', 'o-chk--disabled')]: this.disabled },
                { [this.computedClass('variantClass', 'o-chk--', this.variant)]: this.variant }
            ];
        },
        checkClasses() {
            return [
                this.computedClass('checkClass', 'o-chk__check'),
                { [this.computedClass('checkCheckedClass', 'o-chk__check--checked')]: this.isChecked },
                { [this.computedClass('checkIndeterminateClass', 'o-chk__check--indeterminate')]: this.isIndeterminate },
            ];
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-chk__label')
            ];
        },
        iconCheckClasses() {
            return [
                this.computedClass('iconCheckClass', 'o-chk__icon'),
                { [this.computedClass('iconCheckCheckedClass', 'o-chk__icon--checked')]: this.isChecked },
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
    indeterminate: _ctx.indeterminate,
    type: "checkbox",
    ref: "input",
    onClick: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
    class: _ctx.checkClasses,
    disabled: _ctx.disabled,
    required: _ctx.required,
    name: _ctx.name,
    autocomplete: _ctx.autocomplete,
    value: _ctx.nativeValue,
    "true-value": _ctx.trueValue,
    "false-value": _ctx.falseValue,
    "aria-labelledby": _ctx.ariaLabelledby
  }, null, 10
  /* CLASS, PROPS */
  , ["indeterminate", "disabled", "required", "name", "autocomplete", "value", "true-value", "false-value", "aria-labelledby"]), [[vModelCheckbox, _ctx.computedValue]]), createVNode("span", {
    id: _ctx.ariaLabelledby,
    class: _ctx.labelClasses
  }, [renderSlot(_ctx.$slots, "default")], 10
  /* CLASS, PROPS */
  , ["id"])], 34
  /* CLASS, HYDRATE_EVENTS */
  );
}

script.render = render;
script.__file = "src/components/checkbox/Checkbox.vue";

export { script as s };
