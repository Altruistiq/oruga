'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
var Icon = require('./Icon-2d2f61db.js');

var MessageMixin = {
    components: {
        [Icon.script.name]: Icon.script
    },
    props: {
        /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
        active: {
            type: Boolean,
            default: true
        },
        /** Adds an 'X' button that closes the notification. */
        closable: {
            type: Boolean,
            default: false
        },
        /** Message text (can contain HTML). */
        message: String,
        /** Type (color) of the notification, optional. */
        type: String,
        /** Adds an icon on the left side depending on the type (or the icon prop if defined). */
        hasIcon: Boolean,
        /** Icon name to use with has-icon. */
        icon: String,
        /** Icon pack to use. */
        iconPack: String,
        /** Icon size */
        iconSize: {
            type: String,
            default: 'large'
        },
        /** Hide notification after duration only not programmatic. */
        autoClose: {
            type: Boolean,
            default: false
        },
        /** Visibility duration in miliseconds. */
        duration: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            isActive: this.active
        };
    },
    watch: {
        active(value) {
            this.isActive = value;
        },
        isActive(value) {
            if (value) {
                this.setAutoClose();
            }
            else {
                if (this.timer) {
                    clearTimeout(this.timer);
                }
            }
        }
    },
    computed: {
        /**
         * Icon name (MDI) based on type.
         */
        computedIcon() {
            if (this.icon) {
                return this.icon;
            }
            switch (this.type) {
                case 'info':
                    return 'information';
                case 'success':
                    return 'check-circle';
                case 'warning':
                    return 'alert';
                case 'danger':
                    return 'alert-circle';
                default:
                    return null;
            }
        }
    },
    methods: {
        /**
         * Close the Message and emit events.
         */
        close() {
            this.isActive = false;
            this.$emit('close');
            this.$emit('update:active', false);
        },
        /**
         * Set timer to auto close message
         */
        setAutoClose() {
            if (this.autoClose) {
                this.timer = setTimeout(() => {
                    if (this.isActive) {
                        this.close();
                    }
                }, this.duration);
            }
        }
    },
    mounted() {
        this.setAutoClose();
    }
};

/**
 * Bold notification blocks to alert your users of something
 * @displayName Notification
 * @requires ./NotificationNotice.vue
 * @example ./examples/Notification.md
 * @style _notification.scss
 */

var script = {
  name: 'ONotification',
  configField: 'notification',
  mixins: [plugins.BaseComponentMixin, MessageMixin],
  emits: ['update:active', 'close'],
  props: {
    /**
    * Which position the notification will appear when programmatically
    * @values top-right, top, top-left, bottom-right, bottom, bottom-left
    */
    position: String,

    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],

    /**
     * Label for the close button, to be read by accessibility screenreaders.
     */
    ariaCloseLabel: String,

    /**
     * Custom animation (transition name).
     */
    animation: {
      type: String,
      default: 'fade'
    },

    /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
    component: [Object, Function],

    /** Props to be binded to the injected component */
    props: Object,

    /** Events to be binded to the injected component */
    events: {
      type: Object,
      default: {}
    },

    /** Close icon name */
    closeIcon: {
      type: String,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'notification.closeIcon', 'times');
      }
    },
    rootClass: [String, Function, Array],
    closeClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    wrapperClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-notification'), {
        [this.computedClass('variantClass', 'o-notification--', this.variant)]: this.variant
      }, {
        [this.computedClass('positionClass', 'o-notification--', this.position)]: this.position
      }];
    },

    wrapperClasses() {
      return [this.computedClass('wrapperClass', 'o-notification__wrapper')];
    },

    iconClasses() {
      return [this.computedClass('iconClass', 'o-notification__icon')];
    },

    contentClasses() {
      return [this.computedClass('contentClass', 'o-notification__content')];
    },

    closeClasses() {
      return [this.computedClass('closeClass', 'o-notification__close')];
    }

  }
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_icon = vue.resolveComponent("o-icon");

  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: $props.animation
  }, {
    default: vue.withCtx(() => [vue.withDirectives(vue.createVNode("article", {
      class: $options.rootClasses
    }, [_ctx.closable ? (vue.openBlock(), vue.createBlock("button", {
      key: 0,
      class: $options.closeClasses,
      type: "button",
      onClick: _cache[1] || (_cache[1] = (...args) => _ctx.close(...args)),
      "aria-label": $props.ariaCloseLabel
    }, [vue.createVNode(_component_o_icon, {
      clickable: "",
      icon: $props.closeIcon,
      size: "small"
    }, null, 8
    /* PROPS */
    , ["icon"])], 10
    /* CLASS, PROPS */
    , ["aria-label"])) : vue.createCommentVNode("v-if", true), $props.component ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent($props.component), vue.mergeProps({
      key: 1
    }, $props.props, vue.toHandlers($props.events), {
      onClose: _ctx.close
    }), null, 16
    /* FULL_PROPS */
    , ["onClose"])) : vue.createCommentVNode("v-if", true), _ctx.$slots.default || _ctx.message ? (vue.openBlock(), vue.createBlock("div", {
      key: 2,
      class: $options.wrapperClasses
    }, [_ctx.computedIcon ? vue.createVNode(_component_o_icon, {
      key: 0,
      icon: _ctx.computedIcon,
      pack: _ctx.iconPack,
      class: $options.iconClasses,
      both: "",
      size: _ctx.iconSize,
      "aria-hidden": ""
    }, null, 8
    /* PROPS */
    , ["icon", "pack", "class", "size"]) : vue.createCommentVNode("v-if", true), vue.createVNode("div", {
      class: $options.contentClasses
    }, [_ctx.message ? (vue.openBlock(), vue.createBlock("span", {
      key: 0,
      innerHTML: _ctx.message
    }, null, 8
    /* PROPS */
    , ["innerHTML"])) : vue.renderSlot(_ctx.$slots, "default", {
      key: 1,
      closeNotification: _ctx.close
    })], 2
    /* CLASS */
    )], 2
    /* CLASS */
    )) : vue.createCommentVNode("v-if", true)], 2
    /* CLASS */
    ), [[vue.vShow, _ctx.isActive]])]),
    _: 1
  }, 8
  /* PROPS */
  , ["name"]);
}

script.render = render;
script.__file = "src/components/notification/Notification.vue";

var NoticeMixin = {
    props: {
        /** Type (color) of the notification, optional. */
        type: {
            type: String,
        },
        /** Message text (can contain HTML). */
        message: [String, Array],
        /** Visibility duration in miliseconds. */
        duration: {
            type: Number
        },
        /** If should queue with others notices (snackbar/toast/notification). */
        queue: {
            type: Boolean,
            default: undefined
        },
        /** Show the Notification indefinitely until it is dismissed when programmatically. */
        indefinite: {
            type: Boolean,
            default: false
        },
        /** Which position the notification will appear when programmatically. */
        position: {
            type: String,
            default: 'top',
            validator(value) {
                return [
                    'top-right',
                    'top',
                    'top-left',
                    'bottom-right',
                    'bottom',
                    'bottom-left'
                ].indexOf(value) > -1;
            }
        },
        /** DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. */
        container: String,
        /** Callback function to call after close (programmatically close or user canceled) */
        onClose: {
            type: Function,
            default: () => { }
        }
    },
    data() {
        return {
            isActive: false,
            parentTop: null,
            parentBottom: null,
            newContainer: this.container || helpers.getValueByPath(config.getOptions(), 'notification.defaultContainerElement', undefined)
        };
    },
    computed: {
        correctParent() {
            switch (this.position) {
                case 'top-right':
                case 'top':
                case 'top-left':
                    return this.parentTop;
                case 'bottom-right':
                case 'bottom':
                case 'bottom-left':
                    return this.parentBottom;
            }
        },
        transition() {
            switch (this.position) {
                case 'top-right':
                case 'top':
                case 'top-left':
                    return {
                        enter: 'fadeInDown',
                        leave: 'fadeOut'
                    };
                case 'bottom-right':
                case 'bottom':
                case 'bottom-left':
                    return {
                        enter: 'fadeInUp',
                        leave: 'fadeOut'
                    };
            }
        }
    },
    methods: {
        shouldQueue() {
            const queue = this.queue !== undefined
                ? this.queue
                : helpers.getValueByPath(config.getOptions(), 'notification.defaultNoticeQueue', undefined);
            if (!queue)
                return false;
            return (this.parentTop.childElementCount > 0 ||
                this.parentBottom.childElementCount > 0);
        },
        close() {
            clearTimeout(this.timer);
            this.isActive = false;
            this.$emit('close');
            this.onClose.apply(null, arguments);
            // Timeout for the animation complete before destroying
            setTimeout(() => {
                helpers.removeElement(this.$el);
            }, 150);
        },
        showNotice() {
            if (this.shouldQueue()) {
                // Call recursively if should queue
                setTimeout(() => this.showNotice(), 250);
                return;
            }
            this.correctParent.insertAdjacentElement('afterbegin', this.$el);
            this.isActive = true;
            if (!this.indefinite) {
                this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration);
            }
        },
        setupContainer() {
            this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + `>.${this.rootClasses().join('.')}.${this.positionClasses('top').join('.')}`);
            this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + `>.${this.rootClasses().join('.')}.${this.positionClasses('bottom').join('.')}`);
            if (this.parentTop && this.parentBottom)
                return;
            if (!this.parentTop) {
                this.parentTop = document.createElement('div');
                this.parentTop.className = `${this.rootClasses().join(' ')} ${this.positionClasses('top').join(' ')}`;
            }
            if (!this.parentBottom) {
                this.parentBottom = document.createElement('div');
                this.parentBottom.className = `${this.rootClasses().join(' ')} ${this.positionClasses('bottom').join(' ')}`;
            }
            const container = document.querySelector(this.newContainer) || document.body;
            container.appendChild(this.parentTop);
            container.appendChild(this.parentBottom);
            if (this.newContainer) {
                this.parentTop.classList.add('has-custom-container');
                this.parentBottom.classList.add('has-custom-container');
            }
        },
        timeoutCallback() {
            return this.close();
        }
    },
    beforeMount() {
        this.setupContainer();
    },
    mounted() {
        this.showNotice();
    }
};

/**
 * @displayName Notification Notice
 */

var script$1 = {
  name: 'ONotificationNotice',
  configField: 'notification',
  mixins: [plugins.BaseComponentMixin, NoticeMixin],
  emits: ['update:active', 'close'],
  props: {
    propsNotification: Object
  },

  data() {
    return {
      newDuration: this.duration || helpers.getValueByPath(config.getOptions(), 'notification.duration', 1000)
    };
  },

  methods: {
    rootClasses() {
      return [this.computedClass('noticeClass', 'o-notices')];
    },

    positionClasses(position) {
      return [this.computedClass('noticePositionClass', 'o-notices--', position)];
    },

    timeoutCallback() {
      return this.$refs.notification.close();
    }

  }
};

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_notification = vue.resolveComponent("o-notification");

  return vue.openBlock(), vue.createBlock(_component_o_notification, vue.mergeProps($props.propsNotification, {
    ref: "notification",
    onClose: _ctx.close
  }), {
    default: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "default")]),
    _: 3
  }, 16
  /* FULL_PROPS */
  , ["onClose"]);
}

script$1.render = render$1;
script$1.__file = "src/components/notification/NotificationNotice.vue";

let localVueInstance;
const NotificationProgrammatic = {
    open(params) {
        let parent;
        let newParams;
        if (typeof params === 'string') {
            newParams = {
                message: params
            };
        }
        else {
            newParams = params;
        }
        const defaultParam = {
            programmatic: true,
            position: helpers.getValueByPath(config.getOptions(), 'notification.position', 'top-right'),
            closable: params.closable || helpers.getValueByPath(config.getOptions(), 'notification.closable', false)
        };
        if (newParams.parent) {
            parent = params.parent;
            delete params.parent;
        }
        let slot;
        if (Array.isArray(newParams.message)) {
            slot = newParams.message;
            delete newParams.message;
        }
        newParams.active = true;
        const propsData = helpers.merge(defaultParam, newParams);
        const app = localVueInstance || config.VueInstance;
        propsData.propsNotification = Object.assign({}, propsData);
        propsData.propsNotification.isActive = true;
        const defaultSlot = () => { return newParams.message; };
        const vnode = vue.createVNode(script$1, propsData, defaultSlot);
        vnode.appContext = app._context;
        return vue.render(vnode, document.createElement('div'));
    }
};
var index = {
    install(app) {
        localVueInstance = app;
        plugins.registerComponent(app, script);
        plugins.registerComponentProgrammatic(app, 'notification', NotificationProgrammatic);
    }
};

exports.NotificationProgrammatic = NotificationProgrammatic;
exports.ONotification = script;
exports.default = index;
