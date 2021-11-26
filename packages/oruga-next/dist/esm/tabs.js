import { defineComponent, resolveComponent, openBlock, createBlock, createVNode, Fragment, renderList, withDirectives, resolveDynamicComponent, withCtx, createCommentVNode, toDisplayString, vShow, renderSlot } from 'vue';
import { getValueByPath } from './helpers.js';
import { getOptions } from './config.js';
import { B as BaseComponentMixin, b as registerComponent } from './plugins-627fff4f.js';
import './Icon-4d79248a.js';
import './SlotComponent-25f89430.js';
import { T as TabbedMixin, a as TabbedChildMixin } from './TabbedChildMixin-a153b5a5.js';

/**
 * Responsive horizontal navigation tabs, switch between contents with ease
 * @displayName Tabs
 * @requires ./TabItem.vue
 * @example ./examples/Tabs.md
 * @style _tabs.scss
 */
var script = defineComponent({
    name: 'OTabs',
    mixins: [BaseComponentMixin, TabbedMixin('tab')],
    configField: 'tabs',
    props: {
        /**
         * Tab type
         * @values boxed, toggle
         */
        type: {
            type: String,
            default: 'default'
        },
        /**
        * Tabs will be expanded (full-width)
        */
        expanded: Boolean,
        /** Tab will have an animation */
        animated: {
            type: Boolean,
            default: () => {
                return getValueByPath(getOptions(), 'tabs.animated', true);
            }
        },
        /** Show tab items multiline when there is no space */
        multiline: Boolean,
        rootClass: [String, Function, Array],
        positionClass: [String, Function, Array],
        expandedClass: [String, Function, Array],
        verticalClass: [String, Function, Array],
        multilineClass: [String, Function, Array],
        navTabsClass: [String, Function, Array],
        navSizeClass: [String, Function, Array],
        navPositionClass: [String, Function, Array],
        contentClass: [String, Function, Array],
        transitioningClass: [String, Function, Array],
        tabItemWrapperClass: [String, Function, Array],
    },
    computed: {
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-tabs'),
                { [this.computedClass('positionClass', 'o-tabs--', this.position)]: this.position && this.vertical },
                { [this.computedClass('expandedClass', 'o-tabs--fullwidth')]: this.expanded },
                { [this.computedClass('verticalClass', 'o-tabs--vertical')]: this.vertical },
                { [this.computedClass('multilineClass', 'o-tabs--multiline')]: this.multiline }
            ];
        },
        itemWrapperClasses() {
            return [
                this.computedClass('tabItemWrapperClass', 'o-tabs__nav-item-wrapper'),
            ];
        },
        navClasses() {
            return [
                this.computedClass('navTabsClass', 'o-tabs__nav'),
                { [this.computedClass('navSizeClass', 'o-tabs__nav--', this.size)]: this.size },
                { [this.computedClass('navPositionClass', 'o-tabs__nav--', this.position)]: this.position && !this.vertical },
            ];
        },
        contentClasses() {
            return [
                this.computedClass('contentClass', 'o-tabs__content'),
                { [this.computedClass('transitioningClass', 'o-tabs__content--transitioning')]: this.isTransitioning }
            ];
        }
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_slot_component = resolveComponent("o-slot-component");

  const _component_o_icon = resolveComponent("o-icon");

  return openBlock(), createBlock("div", {
    class: _ctx.rootClasses
  }, [createVNode("nav", {
    class: _ctx.navClasses
  }, [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, childItem => {
    return withDirectives((openBlock(), createBlock("div", {
      key: childItem.newValue,
      class: _ctx.itemWrapperClasses
    }, [childItem.$slots.header ? createVNode(_component_o_slot_component, {
      key: 0,
      component: childItem,
      tag: childItem.tag,
      name: "header",
      onClick: $event => _ctx.childClick(childItem),
      class: childItem.headerClasses
    }, null, 8
    /* PROPS */
    , ["component", "tag", "onClick", "class"]) : (openBlock(), createBlock(resolveDynamicComponent(childItem.tag), {
      key: 1,
      onClick: $event => _ctx.childClick(childItem),
      class: childItem.headerClasses
    }, {
      default: withCtx(() => [childItem.icon ? createVNode(_component_o_icon, {
        key: 0,
        rootClass: childItem.headerIconClasses,
        icon: childItem.icon,
        pack: childItem.iconPack,
        size: _ctx.size
      }, null, 8
      /* PROPS */
      , ["rootClass", "icon", "pack", "size"]) : createCommentVNode("v-if", true), createVNode("span", {
        class: childItem.headerTextClasses
      }, toDisplayString(childItem.label), 3
      /* TEXT, CLASS */
      )]),
      _: 2
    }, 1032
    /* PROPS, DYNAMIC_SLOTS */
    , ["onClick", "class"]))], 2
    /* CLASS */
    )), [[vShow, childItem.visible]]);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 2
  /* CLASS */
  ), createVNode("section", {
    class: _ctx.contentClasses
  }, [renderSlot(_ctx.$slots, "default")], 2
  /* CLASS */
  )], 2
  /* CLASS */
  );
}

script.render = render;
script.__file = "src/components/tabs/Tabs.vue";

/**
 * @displayName Tab Item
 */
var script$1 = defineComponent({
    name: 'OTabItem',
    mixins: [BaseComponentMixin, TabbedChildMixin('tab')],
    configField: 'tabs',
    props: {
        /** Item will be disabled */
        disabled: Boolean,
        /**
         * Tabs item tag name
         */
        tag: {
            type: String,
            default: () => {
                return getValueByPath(getOptions(), 'tabs.itemTag', 'button');
            }
        },
        itemClass: [String, Function, Array],
        itemHeaderClass: [String, Function, Array],
        itemHeaderActiveClass: [String, Function, Array],
        itemHeaderDisabledClass: [String, Function, Array],
        itemHeaderTypeClass: [String, Function, Array],
        itemHeaderIconClass: [String, Function, Array],
        itemHeaderTextClass: [String, Function, Array]
    },
    computed: {
        elementClasses() {
            return [
                this.computedClass('itemClass', 'o-tab-item__content')
            ];
        },
        headerClasses() {
            return [
                this.computedClass('itemHeaderClass', 'o-tabs__nav-item'),
                { [this.computedClass('itemHeaderActiveClass', 'o-tabs__nav-item-{*}--active', this.parent.type)]: this.isActive },
                { [this.computedClass('itemHeaderDisabledClass', 'o-tabs__nav-item-{*}--disabled', this.parent.type)]: this.disabled },
                { [this.computedClass('itemHeaderTypeClass', 'o-tabs__nav-item-', this.parent.type)]: this.parent.type },
            ];
        },
        headerIconClasses() {
            return [
                this.computedClass('itemHeaderIconClass', 'o-tabs__nav-item-icon')
            ];
        },
        headerTextClasses() {
            return [
                this.computedClass('itemHeaderTextClass', 'o-tabs__nav-item-text')
            ];
        }
    }
});

script$1.__file = "src/components/tabs/TabItem.vue";

var index = {
    install(app) {
        registerComponent(app, script);
        registerComponent(app, script$1);
    }
};

export default index;
export { script$1 as OTabItem, script as OTabs };
