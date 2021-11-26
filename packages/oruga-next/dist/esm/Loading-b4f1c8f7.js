import { defineComponent, resolveComponent, openBlock, createBlock, Transition, withCtx, createVNode, renderSlot, createCommentVNode } from 'vue';
import { getValueByPath, removeElement } from './helpers.js';
import { getOptions } from './config.js';
import { B as BaseComponentMixin } from './plugins-627fff4f.js';
import { s as script$1 } from './Icon-4d79248a.js';
import { H as HTMLElement } from './ssr-d2f8ac69.js';

/**
 * A simple loading overlay
 * @displayName Loading
 * @example ./examples/Loading.md
 * @style _loading.scss
 */
var script = defineComponent({
    name: 'OLoading',
    components: {
        [script$1.name]: script$1
    },
    mixins: [BaseComponentMixin],
    configField: 'loading',
    emits: ['update:active', 'close', 'update:full-page'],
    props: {
        /** Whether modal is active or not,  use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: Boolean,
        programmatic: Boolean,
        container: [Object, Function, HTMLElement],
        /** Loader will overlay the full page */
        fullPage: {
            type: Boolean,
            default: true
        },
        /* Custom animation (transition name) */
        animation: {
            type: String,
            default: () => { return getValueByPath(getOptions(), 'loading.animation', 'fade'); }
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
            default: () => { return getValueByPath(getOptions(), 'loading.icon', 'loading'); }
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
                    removeElement(this.$el);
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
  const _component_o_icon = resolveComponent("o-icon");

  return openBlock(), createBlock(Transition, {
    name: _ctx.animation
  }, {
    default: withCtx(() => [_ctx.isActive ? (openBlock(), createBlock("div", {
      key: 0,
      class: _ctx.rootClasses
    }, [createVNode("div", {
      class: _ctx.overlayClasses,
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.cancel(...args))
    }, null, 2
    /* CLASS */
    ), renderSlot(_ctx.$slots, "default", {}, () => [createVNode(_component_o_icon, {
      icon: _ctx.icon,
      spin: _ctx.iconSpin,
      size: _ctx.iconSize,
      class: _ctx.iconClasses,
      both: ""
    }, null, 8
    /* PROPS */
    , ["icon", "spin", "size", "class"])])], 2
    /* CLASS */
    )) : createCommentVNode("v-if", true)]),
    _: 1
  }, 8
  /* PROPS */
  , ["name"]);
}

script.render = render;
script.__file = "src/components/loading/Loading.vue";

export { script as s };
