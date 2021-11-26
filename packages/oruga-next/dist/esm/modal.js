import { defineComponent, resolveComponent, resolveDirective, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, resolveDynamicComponent, mergeProps, toHandlers, toDisplayString, renderSlot, vShow, createCommentVNode, render as render$1 } from 'vue';
import { getValueByPath, toCssDimension, removeElement, merge } from './helpers.js';
import { getOptions, VueInstance } from './config.js';
import { B as BaseComponentMixin, b as registerComponent, a as registerComponentProgrammatic } from './plugins-627fff4f.js';
import { s as script$1 } from './Icon-4d79248a.js';
import { M as MatchMediaMixin } from './MatchMediaMixin-651dc617.js';
import { d as directive } from './trapFocus-e25a0553.js';

/**
 * Classic modal overlay to include any content you may need
 * @displayName Modal
 * @example ./examples/Modal.md
 * @style _modal.scss
 */
var script = defineComponent({
    name: 'OModal',
    components: {
        [script$1.name]: script$1
    },
    configField: 'modal',
    directives: {
        trapFocus: directive
    },
    mixins: [BaseComponentMixin, MatchMediaMixin],
    emits: ['update:active', 'close'],
    props: {
        /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: Boolean,
        /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
        component: [Object, Function],
        /** Text content */
        content: String,
        /** Close button text content */
        closeButtonContent: {
            type: String,
            default: '✕'
        },
        programmatic: Boolean,
        /** Props to be binded to the injected component */
        props: Object,
        /** Events to be binded to the injected component */
        events: Object,
        /** Width of the Modal */
        width: {
            type: [String, Number],
            default: () => {
                return getValueByPath(getOptions(), 'modal.width', 960);
            }
        },
        /** Enable custom style on modal content */
        custom: Boolean,
        /** Custom animation (transition name) */
        animation: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'modal.animation', 'zoom-out');
            }
        },
        /**
         * Can close Modal by clicking 'X', pressing escape or clicking outside
         * @values escape, x, outside, button
         */
        canCancel: {
            type: [Array, Boolean],
            default: () => {
                return getValueByPath(getOptions(), 'modal.canCancel', ['escape', 'x', 'outside', 'button']);
            }
        },
        /** Callback function to call after user canceled (clicked 'X' / pressed escape / clicked outside) */
        onCancel: {
            type: Function,
            default: () => { }
        },
        /** Callback function to call after close (programmatically close or user canceled) */
        onClose: {
            type: Function,
            default: () => { }
        },
        /**
         * clip to remove the body scrollbar, keep to have a non scrollable scrollbar to avoid shifting background, but will set body to position fixed, might break some layouts
         * @values keep, clip
         */
        scroll: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'modal.scroll', 'keep');
            }
        },
        /** Display modal as full screen */
        fullScreen: Boolean,
        /** Trap focus inside the modal. */
        trapFocus: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'modal.trapFocus', true);
            }
        },
        ariaRole: {
            type: String,
            validator: (value) => {
                return ['dialog', 'alertdialog'].indexOf(value) >= 0;
            }
        },
        ariaModal: Boolean,
        ariaLabel: String,
        /** Destroy modal on hide */
        destroyOnHide: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'modal.destroyOnHide', true);
            }
        },
        /** Automatically focus modal when active */
        autoFocus: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'modal.autoFocus', true);
            }
        },
        /** Icon name */
        closeIcon: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'modal.closeIcon', 'times');
            }
        },
        closeIconSize: {
            type: String,
            default: 'medium'
        },
        rootClass: [String, Function, Array],
        overlayClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        closeClass: [String, Function, Array],
        fullScreenClass: [String, Function, Array],
        mobileClass: [String, Function, Array],
    },
    data() {
        return {
            isActive: this.active || false,
            savedScrollTop: null,
            newWidth: toCssDimension(this.width),
            animating: !this.active,
            destroyed: !this.active
        };
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-modal'),
                { [this.computedClass('mobileClass', 'o-modal--mobile')]: this.isMatchMedia },
            ];
        },
        overlayClasses() {
            return [
                this.computedClass('overlayClass', 'o-modal__overlay')
            ];
        },
        contentClasses() {
            return [
                { [this.computedClass('contentClass', 'o-modal__content')]: !this.custom },
                { [this.computedClass('fullScreenClass', 'o-modal__content--fullscreen')]: this.fullScreen }
            ];
        },
        closeClasses() {
            return [
                this.computedClass('closeClass', 'o-modal__close')
            ];
        },
        cancelOptions() {
            return typeof this.canCancel === 'boolean'
                ? this.canCancel
                    ? getValueByPath(getOptions(), 'modal.canCancel', ['escape', 'x', 'outside', 'button'])
                    : []
                : this.canCancel;
        },
        showX() {
            return this.cancelOptions.indexOf('x') >= 0;
        },
        customStyle() {
            if (!this.fullScreen) {
                return { maxWidth: this.newWidth };
            }
            return null;
        }
    },
    watch: {
        active(value) {
            this.isActive = value;
        },
        isActive(value) {
            if (value)
                this.destroyed = false;
            this.handleScroll();
            this.$nextTick(() => {
                if (value && this.$el && this.$el.focus && this.autoFocus) {
                    this.$el.focus();
                }
            });
        }
    },
    methods: {
        handleScroll() {
            if (typeof window === 'undefined')
                return;
            if (this.scroll === 'clip') {
                if (this.isActive) {
                    document.documentElement.classList.add('o-clipped');
                }
                else {
                    document.documentElement.classList.remove('o-clipped');
                }
                return;
            }
            this.savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop;
            if (this.isActive) {
                document.body.classList.add('o-noscroll');
            }
            else {
                document.body.classList.remove('o-noscroll');
            }
            if (this.isActive) {
                document.body.style.top = `-${this.savedScrollTop}px`;
                return;
            }
            document.documentElement.scrollTop = this.savedScrollTop;
            document.body.style.top = null;
            this.savedScrollTop = null;
        },
        /**
        * Close the Modal if canCancel and call the onCancel prop (function).
        */
        cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0)
                return;
            this.onCancel.apply(null, arguments);
            this.close();
        },
        /**
        * Emit events, and destroy modal if it's programmatic.
        */
        close() {
            this.isActive = false;
            if (this.destroyOnHide) {
                this.destroyed = true;
            }
            this.$emit('close');
            this.$emit('update:active', false);
            this.onClose.apply(null, arguments);
            // Waiting for the animation complete before destroying
            if (this.programmatic) {
                window.requestAnimationFrame(() => {
                    removeElement(this.$el);
                });
            }
        },
        /**
        * Keypress event that is bound to the document.
        */
        keyPress({ key }) {
            if (this.isActive && (key === 'Escape' || key === 'Esc'))
                this.cancel('escape');
        },
        /**
        * Transition after-enter hook
        */
        afterEnter() {
            this.animating = false;
        },
        /**
        * Transition before-leave hook
        */
        beforeLeave() {
            this.animating = true;
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    mounted() {
        // Insert the Modal component in body tag
        // only if it's programmatic
        if (this.programmatic) {
            document.body.appendChild(this.$el);
            this.isActive = true;
        }
        else if (this.isActive)
            this.handleScroll();
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
            // reset scroll
            document.documentElement.classList.remove('o-clipped');
            const savedScrollTop = !this.savedScrollTop
                ? document.documentElement.scrollTop
                : this.savedScrollTop;
            document.body.classList.remove('o-noscroll');
            document.documentElement.scrollTop = savedScrollTop;
            document.body.style.top = null;
        }
    }
});

const _hoisted_1 = {
  key: 1
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = resolveComponent("o-icon");

  const _directive_trap_focus = resolveDirective("trap-focus");

  return openBlock(), createBlock(Transition, {
    name: _ctx.animation,
    "onAfter-enter": _ctx.afterEnter,
    "onBefore-leave": _ctx.beforeLeave
  }, {
    default: withCtx(() => [!_ctx.destroyed ? withDirectives((openBlock(), createBlock("div", {
      key: 0,
      class: _ctx.rootClasses,
      tabindex: "-1",
      role: _ctx.ariaRole,
      "aria-label": _ctx.ariaLabel,
      "aria-modal": _ctx.ariaModal
    }, [createVNode("div", {
      class: _ctx.overlayClasses,
      onClick: _cache[1] || (_cache[1] = $event => _ctx.cancel('outside'))
    }, null, 2
    /* CLASS */
    ), createVNode("div", {
      class: _ctx.contentClasses,
      style: _ctx.customStyle
    }, [_ctx.component ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.component), mergeProps({
      key: 0
    }, _ctx.props, toHandlers(_ctx.events || {}), {
      onClose: _ctx.close
    }), null, 16
    /* FULL_PROPS */
    , ["onClose"])) : _ctx.content ? (openBlock(), createBlock("div", _hoisted_1, toDisplayString(_ctx.content), 1
    /* TEXT */
    )) : renderSlot(_ctx.$slots, "default", {
      key: 2
    }), _ctx.showX ? withDirectives(createVNode(_component_o_icon, {
      key: 3,
      clickable: "",
      both: "",
      class: _ctx.closeClasses,
      icon: _ctx.closeIcon,
      size: _ctx.closeIconSize,
      onClick: _cache[2] || (_cache[2] = $event => _ctx.cancel('x'))
    }, null, 8
    /* PROPS */
    , ["class", "icon", "size"]), [[vShow, !_ctx.animating]]) : createCommentVNode("v-if", true)], 6
    /* CLASS, STYLE */
    )], 10
    /* CLASS, PROPS */
    , ["role", "aria-label", "aria-modal"])), [[vShow, _ctx.isActive], [_directive_trap_focus, _ctx.trapFocus]]) : createCommentVNode("v-if", true)]),
    _: 1
  }, 8
  /* PROPS */
  , ["name", "onAfter-enter", "onBefore-leave"]);
}

script.render = render;
script.__file = "src/components/modal/Modal.vue";

let localVueInstance;
const ModalProgrammatic = {
    open(params) {
        let parent;
        let newParams;
        if (typeof params === 'string') {
            newParams = {
                content: params
            };
        }
        else {
            newParams = params;
        }
        const defaultParam = {
            programmatic: true
        };
        if (newParams.parent) {
            parent = newParams.parent;
            delete newParams.parent;
        }
        let slot;
        if (Array.isArray(newParams.content)) {
            slot = newParams.content;
            delete newParams.content;
        }
        const propsData = merge(defaultParam, newParams);
        const app = localVueInstance || VueInstance;
        /*
        const instance = new ModalComponent({
            parent,
            el: document.createElement('div'),
            propsData
        })
        if (slot) {
            instance.$slots.default = slot
        }
        return instance
        */
        const vnode = createVNode(script, propsData);
        vnode.appContext = app._context;
        return render$1(vnode, document.createElement('div'));
    }
};
var index = {
    install(app) {
        localVueInstance = app;
        registerComponent(app, script);
        registerComponentProgrammatic(app, 'modal', ModalProgrammatic);
    }
};

export default index;
export { ModalProgrammatic, script as OModal };
