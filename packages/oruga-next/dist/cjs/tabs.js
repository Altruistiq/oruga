'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
require('./Icon-2d2f61db.js');
require('./SlotComponent-b10f11e8.js');
var TabbedChildMixin = require('./TabbedChildMixin-51ad9b8e.js');

/**
 * Responsive horizontal navigation tabs, switch between contents with ease
 * @displayName Tabs
 * @requires ./TabItem.vue
 * @example ./examples/Tabs.md
 * @style _tabs.scss
 */
var script = vue.defineComponent({
    name: 'OTabs',
    mixins: [plugins.BaseComponentMixin, TabbedChildMixin.TabbedMixin('tab')],
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
                return helpers.getValueByPath(config.getOptions(), 'tabs.animated', true);
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
  const _component_o_slot_component = vue.resolveComponent("o-slot-component");

  const _component_o_icon = vue.resolveComponent("o-icon");

  return vue.openBlock(), vue.createBlock("div", {
    class: _ctx.rootClasses
  }, [vue.createVNode("nav", {
    class: _ctx.navClasses
  }, [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.items, childItem => {
    return vue.withDirectives((vue.openBlock(), vue.createBlock("div", {
      key: childItem.newValue,
      class: _ctx.itemWrapperClasses
    }, [childItem.$slots.header ? vue.createVNode(_component_o_slot_component, {
      key: 0,
      component: childItem,
      tag: childItem.tag,
      name: "header",
      onClick: $event => _ctx.childClick(childItem),
      class: childItem.headerClasses
    }, null, 8
    /* PROPS */
    , ["component", "tag", "onClick", "class"]) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(childItem.tag), {
      key: 1,
      onClick: $event => _ctx.childClick(childItem),
      class: childItem.headerClasses
    }, {
      default: vue.withCtx(() => [childItem.icon ? vue.createVNode(_component_o_icon, {
        key: 0,
        rootClass: childItem.headerIconClasses,
        icon: childItem.icon,
        pack: childItem.iconPack,
        size: _ctx.size
      }, null, 8
      /* PROPS */
      , ["rootClass", "icon", "pack", "size"]) : vue.createCommentVNode("v-if", true), vue.createVNode("span", {
        class: childItem.headerTextClasses
      }, vue.toDisplayString(childItem.label), 3
      /* TEXT, CLASS */
      )]),
      _: 2
    }, 1032
    /* PROPS, DYNAMIC_SLOTS */
    , ["onClick", "class"]))], 2
    /* CLASS */
    )), [[vue.vShow, childItem.visible]]);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 2
  /* CLASS */
  ), vue.createVNode("section", {
    class: _ctx.contentClasses
  }, [vue.renderSlot(_ctx.$slots, "default")], 2
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
var script$1 = vue.defineComponent({
    name: 'OTabItem',
    mixins: [plugins.BaseComponentMixin, TabbedChildMixin.TabbedChildMixin('tab')],
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
                return helpers.getValueByPath(config.getOptions(), 'tabs.itemTag', 'button');
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
        plugins.registerComponent(app, script);
        plugins.registerComponent(app, script$1);
    }
};

exports.OTabItem = script$1;
exports.OTabs = script;
exports.default = index;
