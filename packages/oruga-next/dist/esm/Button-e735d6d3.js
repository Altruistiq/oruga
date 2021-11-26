import { defineComponent, resolveComponent, openBlock, createBlock, resolveDynamicComponent, mergeProps, withCtx, createVNode, createCommentVNode, toDisplayString, renderSlot } from 'vue';
import { getValueByPath } from './helpers.js';
import { getOptions } from './config.js';
import { B as BaseComponentMixin } from './plugins-627fff4f.js';
import { s as script$1 } from './Icon-4d79248a.js';

/**
 * The classic button, in different colors, sizes, and states
 * @displayName Button
 * @example ./examples/Button.md
 * @style _button.scss
 */
var script = defineComponent({
    name: 'OButton',
    components: {
        [script$1.name]: script$1
    },
    configField: 'button',
    mixins: [BaseComponentMixin],
    inheritAttrs: false,
    props: {
        /**
        * Color of the control, optional
        * @values primary, info, success, warning, danger, and any other custom color
        */
        variant: [String, Object],
        /**
         * Size of button, optional
         * @values small, medium, large
         */
        size: String,
        /**
         * Button label, optional when default slot
         */
        label: String,
        /**
         * Icon pack to use
         * @values mdi, fa, fas and any other custom icon pack
         */
        iconPack: String,
        /**
         * Icon name to show on the left
         */
        iconLeft: String,
        /**
         * Icon name to show on the right
         */
        iconRight: String,
        /**
         * Rounded style
         */
        rounded: {
            type: Boolean,
            default: () => { return getValueByPath(getOptions(), 'button.rounded', false); }
        },
        /**
         * Outlined style
         */
        outlined: Boolean,
        /**
         * Button will be expanded (full-width)
         */
        expanded: Boolean,
        inverted: Boolean,
        /**
         * Button type, like native
         */
        nativeType: {
            type: String,
            default: 'button',
            validator: (value) => {
                return [
                    'button',
                    'submit',
                    'reset'
                ].indexOf(value) >= 0;
            }
        },
        /**
         * Button tag name
         * @values button, a, input, router-link, nuxt-link (or other nuxt alias)
         */
        tag: {
            type: String,
            default: 'button'
        },
        /**
         * Button will be disabled
         */
        disabled: Boolean,
        /**  @ignore */
        iconBoth: Boolean,
        elementsWrapperClass: [String, Function, Array],
        rootClass: [String, Function, Array],
        outlinedClass: [String, Function, Array],
        invertedClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        roundedClass: [String, Function, Array],
        disabledClass: [String, Function, Array],
        iconClass: [String, Function, Array],
        iconLeftClass: [String, Function, Array],
        iconRightClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        variantClass: [String, Function, Array]
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-btn'),
                { [this.computedClass('sizeClass', 'o-btn--', this.size)]: this.size },
                { [this.computedClass('variantClass', 'o-btn--', this.variant)]: this.variant },
                { [this.computedClass('outlinedClass', 'o-btn--outlined')]: this.outlined && !this.variant },
                { [this.computedClass('invertedClass', 'o-btn--inverted')]: this.inverted && !this.variant },
                { [this.computedClass('outlinedClass', 'o-btn--outlined-', this.variant)]: this.outlined && this.variant },
                { [this.computedClass('invertedClass', 'o-btn--inverted-', this.variant)]: this.inverted && this.variant },
                { [this.computedClass('expandedClass', 'o-btn--expanded')]: this.expanded },
                { [this.computedClass('roundedClass', 'o-btn--rounded')]: this.rounded },
                { [this.computedClass('disabledClass', 'o-btn--disabled')]: this.disabled },
            ];
        },
        iconClasses() {
            return [
                this.computedClass('iconClass', 'o-btn__icon'),
            ];
        },
        iconLeftClasses() {
            return [
                this.computedClass('iconClass', 'o-btn__icon'),
                this.computedClass('iconLeftClass', 'o-btn__icon-left')
            ];
        },
        iconRightClasses() {
            return [
                this.computedClass('iconClass', 'o-btn__icon'),
                this.computedClass('iconRightClass', 'o-btn__icon-right')
            ];
        },
        elementsWrapperClasses() {
            return [
                this.computedClass('elementsWrapperClass', 'o-btn__wrapper'),
            ];
        },
        computedTag() {
            if (typeof this.disabled !== 'undefined' && this.disabled !== false) {
                return 'button';
            }
            return this.tag;
        },
        computedNativeType() {
            if (this.tag === 'button' || this.tag === 'input') {
                return this.nativeType;
            }
            return null;
        },
        computedDisabled() {
            if (this.disabled)
                return true;
            return null;
        }
    }
});

const _hoisted_1 = {
  key: 1
};
const _hoisted_2 = {
  key: 2
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");

  return openBlock(), createBlock(resolveDynamicComponent(_ctx.computedTag), mergeProps(_ctx.$attrs, {
    disabled: _ctx.computedDisabled,
    type: _ctx.computedNativeType,
    class: _ctx.rootClasses
  }), {
    default: withCtx(() => [createVNode("span", {
      class: _ctx.elementsWrapperClasses
    }, [_ctx.iconLeft ? createVNode(_component_o_icon, {
      key: 0,
      pack: _ctx.iconPack,
      icon: _ctx.iconLeft,
      size: _ctx.size,
      both: _ctx.iconBoth,
      class: _ctx.iconLeftClasses
    }, null, 8
    /* PROPS */
    , ["pack", "icon", "size", "both", "class"]) : createCommentVNode("v-if", true), _ctx.label ? (openBlock(), createBlock("span", _hoisted_1, toDisplayString(_ctx.label), 1
    /* TEXT */
    )) : _ctx.$slots.default ? (openBlock(), createBlock("span", _hoisted_2, [renderSlot(_ctx.$slots, "default")])) : createCommentVNode("v-if", true), _ctx.iconRight ? createVNode(_component_o_icon, {
      key: 3,
      pack: _ctx.iconPack,
      icon: _ctx.iconRight,
      size: _ctx.size,
      both: _ctx.iconBoth,
      class: _ctx.iconRightClasses
    }, null, 8
    /* PROPS */
    , ["pack", "icon", "size", "both", "class"]) : createCommentVNode("v-if", true)], 2
    /* CLASS */
    )]),
    _: 1
  }, 16
  /* FULL_PROPS */
  , ["disabled", "type", "class"]);
}

script.render = render;
script.__file = "src/components/button/Button.vue";

export { script as s };
