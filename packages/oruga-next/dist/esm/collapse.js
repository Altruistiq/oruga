import { defineComponent, h, Transition, withDirectives, vShow } from 'vue';
import { getValueByPath } from './helpers.js';
import { getOptions } from './config.js';
import { B as BaseComponentMixin, b as registerComponent } from './plugins-627fff4f.js';

/**
 * An easy way to toggle what you want
 * @displayName Collapse
 * @example ./examples/Collapse.md
 * @style _collapse.scss
 */
var script = defineComponent({
    name: 'OCollapse',
    mixins: [BaseComponentMixin],
    configField: 'collapse',
    emits: ['update:open', 'open', 'close'],
    props: {
        /**
         * Whether collapse is open or not, use the .sync modifier (Vue 2.x) or v-model:open (Vue 3.x) to make it two-way binding
         */
        open: {
            type: Boolean,
            default: true
        },
        /**
         * Custom animation (transition name)
         */
        animation: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'collapse.animation', 'fade');
            }
        },
        ariaId: {
            type: String,
            default: ''
        },
        /**
         * Trigger position
         * @values top, bottom
         */
        position: {
            type: String,
            default: 'top',
            validator: (value) => {
                return [
                    'top',
                    'bottom'
                ].indexOf(value) > -1;
            }
        },
        rootClass: [String, Function, Array],
        triggerClass: [String, Function, Array],
        contentClass: [String, Function, Array]
    },
    data() {
        return {
            isOpen: this.open
        };
    },
    watch: {
        open(value) {
            this.isOpen = value;
        }
    },
    methods: {
        /**
        * Toggle and emit events
        */
        toggle() {
            this.isOpen = !this.isOpen;
            this.$emit('update:open', this.isOpen);
            this.$emit(this.isOpen ? 'open' : 'close');
        }
    },
    render() {
        const trigger = h('div', {
            class: this.computedClass('triggerClass', 'o-clps__trigger'),
            onClick: this.toggle
        }, this.$slots.trigger({ open: this.isOpen }));
        const content = h(Transition, { name: this.animation }, () => withDirectives(h('div', {
            class: this.computedClass('contentClass', 'o-clps__content'),
            'id': this.ariaId,
            'aria-expanded': this.isOpen
        }, this.$slots.default()), [[vShow, this.isOpen]]));
        return h('div', { class: this.computedClass('rootClass', 'o-clps') }, (this.position === 'top' ? [trigger, content] : [content, trigger]));
    }
});

script.__file = "src/components/collapse/Collapse.vue";

var index = {
    install(app) {
        registerComponent(app, script);
    }
};

export default index;
export { script as OCollapse };
