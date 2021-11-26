import { defineComponent, h, Comment, Text, resolveComponent, openBlock, createBlock, renderSlot, Fragment, createTextVNode, toDisplayString, createCommentVNode, createVNode, withCtx } from 'vue';
import { B as BaseComponentMixin } from './plugins-627fff4f.js';
import { M as MatchMediaMixin } from './MatchMediaMixin-651dc617.js';

var script = defineComponent({
    name: 'OFieldBody',
    inject: ['$field'],
    configField: 'field',
    computed: {
        parent() {
            return this.$field;
        }
    },
    render() {
        let first = true;
        const slot = this.$slots.default();
        const children = slot.length === 1 && Array.isArray(slot[0].children) ? slot[0].children : slot;
        return h('div', { class: this.parent.bodyHorizontalClasses }, children.map((element) => {
            let message;
            if (element.type === Comment || element.type === Text) {
                return element;
            }
            if (first) {
                message = this.parent.newMessage;
                first = false;
            }
            // @ts-ignore (Why props null ??)
            return h(resolveComponent('OField'), { variant: this.parent.newVariant, message }, () => [element]);
        }));
    }
});

script.__file = "src/components/field/FieldBody.vue";

/**
 * Fields are used to add functionality to controls and to attach/group components and elements together
 * @displayName Field
 * @example ./examples/Field.md
 * @style _field.scss
 */
var script$1 = defineComponent({
    name: 'OField',
    components: {
        [script.name]: script
    },
    configField: 'field',
    mixins: [BaseComponentMixin, MatchMediaMixin],
    provide() {
        return {
            $field: this
        };
    },
    inject: {
        $field: { from: '$field', default: false }
    },
    props: {
        /**
         * 	Color of the field and help message, also adds a matching icon, optional. Used by Input, Select and Autocomplete
         *  @values primary, info, success, warning, danger, and any other custom color
         */
        variant: [String, Object],
        /**
         * Field label
         */
        label: String,
        /**
         * Same as native for set on the label
         */
        labelFor: String,
        /**
         * Help message text
         */
        message: String,
        /**
         * Direct child components/elements of Field will be grouped horizontally (see which ones at the top of the page)
         */
        grouped: Boolean,
        /**
         * Allow controls to fill up multiple lines, making it responsive
         */
        groupMultiline: Boolean,
        /**
         * Group label and control on the same line for horizontal forms
         */
        horizontal: Boolean,
        /**
         * Field automatically attach controls together
         */
        addons: {
            type: Boolean,
            default: true
        },
        /**
        * Vertical size of input, optional
        * @values small, medium, large
        */
        labelSize: String,
        rootClass: [String, Function, Array],
        horizontalClass: [String, Function, Array],
        groupedClass: [String, Function, Array],
        groupMultilineClass: [String, Function, Array],
        labelClass: [String, Function, Array],
        labelSizeClass: [String, Function, Array],
        labelHorizontalClass: [String, Function, Array],
        bodyClass: [String, Function, Array],
        bodyHorizontalClass: [String, Function, Array],
        addonsClass: [String, Function, Array],
        messageClass: [String, Function, Array],
        variantClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
        focusedClass: [String, Function, Array],
        filledClass: [String, Function, Array]
    },
    data() {
        return {
            newVariant: this.variant,
            newMessage: this.message,
            isFocused: false,
            isFilled: false
        };
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-field'),
                { [this.computedClass('horizontalClass', 'o-field--horizontal')]: this.horizontal },
                { [this.computedClass('mobileClass', 'o-field--mobile')]: this.isMatchMedia },
                { [this.computedClass('focusedClass', 'o-field--focused')]: this.isFocused },
                { [this.computedClass('filledClass', 'o-field--filled')]: this.isFilled }
            ];
        },
        messageClasses() {
            return [
                this.computedClass('messageClass', 'o-field__message'),
                { [this.computedClass('variantClass', 'o-field__message-', this.newVariant)]: this.newVariant }
            ];
        },
        labelClasses() {
            return [
                this.computedClass('labelClass', 'o-field__label'),
                { [this.computedClass('labelSizeClass', 'o-field__label-', this.labelSize)]: this.labelSize }
            ];
        },
        labelHorizontalClasses() {
            return [
                this.computedClass('labelHorizontalClass', 'o-field__horizontal-label')
            ];
        },
        bodyClasses() {
            return [
                this.computedClass('bodyClass', 'o-field__body')
            ];
        },
        bodyHorizontalClasses() {
            return [
                this.computedClass('bodyHorizontalClass', 'o-field__horizontal-body')
            ];
        },
        innerFieldClasses() {
            return [
                { [this.computedClass('groupMultilineClass', 'o-field--grouped-multiline')]: this.groupMultiline },
                { [this.computedClass('groupedClass', 'o-field--grouped')]: this.grouped },
                { [this.computedClass('addonsClass', 'o-field--addons')]: !this.grouped && this.hasAddons() },
            ];
        },
        parent() {
            return this.$field;
        },
        hasLabelSlot() {
            return this.$slots.label;
        },
        hasMessageSlot() {
            return this.$slots.message;
        },
        hasLabel() {
            return this.label || this.hasLabelSlot;
        },
        hasMessage() {
            return ((!this.parent || !this.parent.hasInnerField) && this.newMessage) || this.hasMessageSlot;
        },
        hasInnerField() {
            return this.grouped || this.groupMultiline || this.hasAddons();
        }
    },
    watch: {
        /**
        * Set internal variant when prop change.
        */
        variant(value) {
            this.newVariant = value;
        },
        /**
        * Set internal message when prop change.
        */
        message(value) {
            this.newMessage = value;
        },
        /**
        * Set parent message if we use Field in Field.
        */
        newMessage(value) {
            if (this.parent && this.parent.hasInnerField) {
                if (!this.parent.variant) {
                    this.parent.newVariant = this.newVariant;
                }
                if (!this.parent.message) {
                    this.parent.newMessage = value;
                }
            }
        }
    },
    methods: {
        hasAddons() {
            let renderedNode = 0;
            const slot = this.$slots.default();
            if (slot) {
                const children = slot.length === 1 && Array.isArray(slot[0].children) ? slot[0].children : slot;
                renderedNode = children.reduce((i, node) => node ? i + 1 : i, 0);
            }
            return renderedNode > 1 && this.addons && !this.horizontal;
        }
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_field_body = resolveComponent("o-field-body");

  const _component_o_field = resolveComponent("o-field");

  return openBlock(), createBlock("div", {
    class: _ctx.rootClasses
  }, [_ctx.horizontal ? (openBlock(), createBlock("div", {
    key: 0,
    class: _ctx.labelHorizontalClasses
  }, [_ctx.hasLabel ? (openBlock(), createBlock("label", {
    key: 0,
    for: _ctx.labelFor,
    class: _ctx.labelClasses
  }, [_ctx.hasLabelSlot ? renderSlot(_ctx.$slots, "label", {
    key: 0
  }) : (openBlock(), createBlock(Fragment, {
    key: 1
  }, [createTextVNode(toDisplayString(_ctx.label), 1
  /* TEXT */
  )], 64
  /* STABLE_FRAGMENT */
  ))], 10
  /* CLASS, PROPS */
  , ["for"])) : createCommentVNode("v-if", true)], 2
  /* CLASS */
  )) : (openBlock(), createBlock(Fragment, {
    key: 1
  }, [_ctx.hasLabel ? (openBlock(), createBlock("label", {
    key: 0,
    for: _ctx.labelFor,
    class: _ctx.labelClasses
  }, [_ctx.hasLabelSlot ? renderSlot(_ctx.$slots, "label", {
    key: 0
  }) : (openBlock(), createBlock(Fragment, {
    key: 1
  }, [createTextVNode(toDisplayString(_ctx.label), 1
  /* TEXT */
  )], 64
  /* STABLE_FRAGMENT */
  ))], 10
  /* CLASS, PROPS */
  , ["for"])) : createCommentVNode("v-if", true)], 64
  /* STABLE_FRAGMENT */
  )), _ctx.horizontal ? createVNode(_component_o_field_body, {
    key: 2
  }, {
    default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
    _: 3
  }) : _ctx.hasInnerField ? (openBlock(), createBlock("div", {
    key: 3,
    class: _ctx.bodyClasses
  }, [createVNode(_component_o_field, {
    addons: false,
    class: _ctx.innerFieldClasses
  }, {
    default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
    _: 3
  }, 8
  /* PROPS */
  , ["class"])], 2
  /* CLASS */
  )) : renderSlot(_ctx.$slots, "default", {
    key: 4
  }), _ctx.hasMessage && !_ctx.horizontal ? (openBlock(), createBlock("p", {
    key: 5,
    class: _ctx.messageClasses
  }, [_ctx.hasMessageSlot ? renderSlot(_ctx.$slots, "message", {
    key: 0
  }) : (openBlock(), createBlock(Fragment, {
    key: 1
  }, [createTextVNode(toDisplayString(_ctx.newMessage), 1
  /* TEXT */
  )], 64
  /* STABLE_FRAGMENT */
  ))], 2
  /* CLASS */
  )) : createCommentVNode("v-if", true)], 2
  /* CLASS */
  );
}

script$1.render = render;
script$1.__file = "src/components/field/Field.vue";

export { script$1 as s };
