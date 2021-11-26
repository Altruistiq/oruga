'use strict';

var vue = require('vue');
var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
var Icon = require('./Icon-2d2f61db.js');
var ssr = require('./ssr-4e5033ea.js');

/**
 * A simple loading overlay
 * @displayName Loading
 * @example ./examples/Loading.md
 * @style _loading.scss
 */
var script = vue.defineComponent({
    name: 'OLoading',
    components: {
        [Icon.script.name]: Icon.script
    },
    mixins: [plugins.BaseComponentMixin],
    configField: 'loading',
    emits: ['update:active', 'close', 'update:full-page'],
    props: {
        /** Whether modal is active or not,  use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: Boolean,
        programmatic: Boolean,
        container: [Object, Function, ssr.HTMLElement],
        /** Loader will overlay the full page */
        fullPage: {
            type: Boolean,
            default: true
        },
        /* Custom animation (transition name) */
        animation: {
            type: String,
            default: () => { return helpers.getValueByPath(config.getOptions(), 'loading.animation', 'fade'); }
        },
        /** Can close Loading by pressing escape or clicking outside */
        canCancel: {
            type: Boolean,
            default: false
        },
        /** Callback function to call after user canceled (pressed escape / clicked outside) */
        onCancel: {
            type: Function,
            default: () => { }
        },
        /** Icon name */
        icon: {
            type: String,
            default: () => { return helpers.getValueByPath(config.getOptions(), 'loading.icon', 'loading'); }
        },
        /** Enable spin effect on icon */
        iconSpin: {
            type: Boolean,
            default: true
        },
        iconSize: {
            type: String,
            default: 'medium'
        },
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        iconClass: [String, Function, Array],
        fullPageClass: [String, Function, Array]
    },
    data() {
        return {
            isActive: this.active || false,
            displayInFullPage: this.fullPage
        };
    },
    watch: {
        active(value) {
            this.isActive = value;
        },
        fullPage(value) {
            this.displayInFullPage = value;
        }
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-load'),
                { [this.computedClass('fullPageClass', 'o-load--fullpage')]: this.displayInFullPage }
            ];
        },
        overlayClasses() {
            return [
                this.computedClass('overlayClass', 'o-load__overlay')
            ];
        },
        iconClasses() {
            return [
                this.computedClass('iconClass', 'o-load__icon')
            ];
        }
    },
    methods: {
        /**
        * Close the Modal if canCancel.
        */
        cancel() {
            if (!this.canCancel || !this.isActive)
                return;
            this.close();
        },
        /**
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.onCancel.apply(null, arguments);
            this.$emit('close');
            this.$emit('update:active', false);
            // Timeout for the animation complete before destroying
            if (this.programmatic) {
                this.isActive = false;
                setTimeout(() => {
                    this.$destroy();
                    helpers.removeElement(this.$el);
                }, 150);
            }
        },
        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (key === 'Escape' || key === 'Esc')
                this.cancel();
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    mounted() {
        // Insert the Loading component in body tag
        // only if it's programmatic
        if (this.programmatic) {
            if (!this.container) {
                document.body.appendChild(this.$el);
            }
            else {
                this.displayInFullPage = false;
                this.$emit('update:full-page', false);
                this.container.appendChild(this.$el);
            }
            this.isActive = true;
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
        }
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = vue.resolveComponent("o-icon");

  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: _ctx.animation
  }, {
    default: vue.withCtx(() => [_ctx.isActive ? (vue.openBlock(), vue.createBlock("div", {
      key: 0,
      class: _ctx.rootClasses
    }, [vue.createVNode("div", {
      class: _ctx.overlayClasses,
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.cancel(...args))
    }, null, 2
    /* CLASS */
    ), vue.renderSlot(_ctx.$slots, "default", {}, () => [vue.createVNode(_component_o_icon, {
      icon: _ctx.icon,
      spin: _ctx.iconSpin,
      size: _ctx.iconSize,
      class: _ctx.iconClasses,
      both: ""
    }, null, 8
    /* PROPS */
    , ["icon", "spin", "size", "class"])])], 2
    /* CLASS */
    )) : vue.createCommentVNode("v-if", true)]),
    _: 1
  }, 8
  /* PROPS */
  , ["name"]);
}

script.render = render;
script.__file = "src/components/loading/Loading.vue";

exports.script = script;
