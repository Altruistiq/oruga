'use strict';

var vue = require('vue');
var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-ad9d4622.js');
var Icon = require('./Icon-2d2f61db.js');
var FormElementMixin = require('./FormElementMixin-c6174120.js');
var Input = require('./Input-603d10ec.js');
var MatchMediaMixin = require('./MatchMediaMixin-f86285f0.js');
var DropdownItem = require('./DropdownItem-e038b170.js');
var Select = require('./Select-a608f870.js');

const AM = 'AM';
const PM = 'PM';
const HOUR_FORMAT_24 = '24';
const HOUR_FORMAT_12 = '12';
const defaultTimeFormatter = (date, vm) => {
    return vm.dtf.format(date);
};
const defaultTimeParser = (timeString, vm) => {
    if (timeString) {
        let d = null;
        if (vm.computedValue && !isNaN(vm.computedValue)) {
            d = new Date(vm.computedValue);
        }
        else {
            d = vm.timeCreator();
            d.setMilliseconds(0);
        }
        if (vm.dtf.formatToParts && typeof vm.dtf.formatToParts === 'function') {
            const formatRegex = vm.dtf
                .formatToParts(d).map((part) => {
                if (part.type === 'literal') {
                    return part.value.replace(/ /g, '\\s?');
                }
                else if (part.type === 'dayPeriod') {
                    return `((?!=<${part.type}>)(${vm.amString}|${vm.pmString}|${AM}|${PM}|${AM.toLowerCase()}|${PM.toLowerCase()})?)`;
                }
                return `((?!=<${part.type}>)\\d+)`;
            }).join('');
            const timeGroups = helpers.matchWithGroups(formatRegex, timeString);
            // We do a simple validation for the group.
            // If it is not valid, it will fallback to Date.parse below
            timeGroups.hour = timeGroups.hour ? parseInt(timeGroups.hour, 10) : null;
            timeGroups.minute = timeGroups.minute ? parseInt(timeGroups.minute, 10) : null;
            timeGroups.second = timeGroups.second ? parseInt(timeGroups.second, 10) : null;
            if (timeGroups.hour &&
                timeGroups.hour >= 0 &&
                timeGroups.hour < 24 &&
                timeGroups.minute &&
                timeGroups.minute >= 0 &&
                timeGroups.minute < 59) {
                if (timeGroups.dayPeriod &&
                    (timeGroups.dayPeriod.toLowerCase() === vm.pmString.toLowerCase() ||
                        timeGroups.dayPeriod.toLowerCase() === PM.toLowerCase()) &&
                    timeGroups.hour < 12) {
                    timeGroups.hour += 12;
                }
                d.setHours(timeGroups.hour);
                d.setMinutes(timeGroups.minute);
                d.setSeconds(timeGroups.second || 0);
                return d;
            }
        }
        // Fallback if formatToParts is not supported or if we were not able to parse a valid date
        let am = false;
        if (vm.hourFormat === HOUR_FORMAT_12) {
            const dateString12 = timeString.split(' ');
            timeString = dateString12[0];
            am = (dateString12[1] === vm.amString || dateString12[1] === AM);
        }
        const time = timeString.split(':');
        let hours = parseInt(time[0], 10);
        const minutes = parseInt(time[1], 10);
        const seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;
        if (isNaN(hours) || hours < 0 || hours > 23 ||
            (vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12)) ||
            isNaN(minutes) || minutes < 0 || minutes > 59) {
            return null;
        }
        d.setSeconds(seconds);
        d.setMinutes(minutes);
        if (vm.hourFormat === HOUR_FORMAT_12) {
            if (am && hours === 12) {
                hours = 0;
            }
            else if (!am && hours !== 12) {
                hours += 12;
            }
        }
        d.setHours(hours);
        return new Date(d.getTime());
    }
    return null;
};
var TimepickerMixin = {
    mixins: [FormElementMixin.FormElementMixin],
    inheritAttrs: false,
    props: {
        /** @model */
        modelValue: Date,
        inline: Boolean,
        minTime: Date,
        maxTime: Date,
        placeholder: String,
        editable: Boolean,
        disabled: Boolean,
        /**
         * Size of button, optional
         * @values small, medium, large
         */
        size: String,
        hourFormat: {
            type: String,
            validator: (value) => {
                return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
            }
        },
        incrementHours: {
            type: Number,
            default: 1
        },
        incrementMinutes: {
            type: Number,
            default: 1
        },
        incrementSeconds: {
            type: Number,
            default: 1
        },
        timeFormatter: {
            type: Function,
            default: (date, vm) => {
                const timeFormatter = helpers.getValueByPath(config.getOptions(), 'timepicker.timeFormatter', undefined);
                if (typeof timeFormatter === 'function') {
                    return timeFormatter(date);
                }
                else {
                    return defaultTimeFormatter(date, vm);
                }
            }
        },
        timeParser: {
            type: Function,
            default: (date, vm) => {
                const timeParser = helpers.getValueByPath(config.getOptions(), 'timepicker.timeParser', undefined);
                if (typeof timeParser === 'function') {
                    return timeParser(date);
                }
                else {
                    return defaultTimeParser(date, vm);
                }
            }
        },
        mobileNative: {
            type: Boolean,
            default: () => {
                return helpers.getValueByPath(config.getOptions(), 'timepicker.mobileNative', true);
            }
        },
        timeCreator: {
            type: Function,
            default: () => {
                const timeCreator = helpers.getValueByPath(config.getOptions(), 'timepicker.timeCreator', undefined);
                if (typeof timeCreator === 'function') {
                    return timeCreator();
                }
                else {
                    return new Date();
                }
            }
        },
        position: String,
        unselectableTimes: Array,
        openOnFocus: Boolean,
        enableSeconds: Boolean,
        defaultMinutes: Number,
        defaultSeconds: Number,
        appendToBody: Boolean,
        resetOnMeridianChange: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dateSelected: this.modelValue,
            hoursSelected: null,
            minutesSelected: null,
            secondsSelected: null,
            meridienSelected: null,
            _elementRef: 'input'
        };
    },
    computed: {
        computedValue: {
            get() {
                return this.dateSelected;
            },
            set(value) {
                this.dateSelected = value;
                this.$emit('update:modelValue', this.dateSelected);
            }
        },
        localeOptions() {
            return new Intl.DateTimeFormat(this.locale, {
                hour: 'numeric',
                minute: 'numeric',
                second: this.enableSeconds ? 'numeric' : undefined
            }).resolvedOptions();
        },
        dtf() {
            return new Intl.DateTimeFormat(this.locale, {
                hour: this.localeOptions.hour || 'numeric',
                minute: this.localeOptions.minute || 'numeric',
                second: this.enableSeconds ? this.localeOptions.second || 'numeric' : undefined,
                // @ts-ignore to update types
                hourCycle: !this.isHourFormat24 ? 'h12' : 'h23'
            });
        },
        newHourFormat() {
            return this.hourFormat || (this.localeOptions.hour12 ? HOUR_FORMAT_12 : HOUR_FORMAT_24);
        },
        sampleTime() {
            let d = this.timeCreator();
            d.setHours(10);
            d.setSeconds(0);
            d.setMinutes(0);
            d.setMilliseconds(0);
            return d;
        },
        hourLiteral() {
            if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
                let d = this.sampleTime;
                const parts = this.dtf.formatToParts(d);
                const literal = parts.find((part, idx) => (idx > 0 && parts[idx - 1].type === 'hour'));
                if (literal) {
                    return literal.value;
                }
            }
            return ':';
        },
        minuteLiteral() {
            if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
                let d = this.sampleTime;
                const parts = this.dtf.formatToParts(d);
                const literal = parts.find((part, idx) => (idx > 0 && parts[idx - 1].type === 'minute'));
                if (literal) {
                    return literal.value;
                }
            }
            return ':';
        },
        secondLiteral() {
            if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
                let d = this.sampleTime;
                const parts = this.dtf.formatToParts(d);
                const literal = parts.find((part, idx) => (idx > 0 && parts[idx - 1].type === 'second'));
                if (literal) {
                    return literal.value;
                }
            }
        },
        amString() {
            if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
                let d = this.sampleTime;
                d.setHours(10);
                const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === 'dayPeriod');
                if (dayPeriod) {
                    return dayPeriod.value;
                }
            }
            return AM;
        },
        pmString() {
            if (this.dtf.formatToParts && typeof this.dtf.formatToParts === 'function') {
                let d = this.sampleTime;
                d.setHours(20);
                const dayPeriod = this.dtf.formatToParts(d).find((part) => part.type === 'dayPeriod');
                if (dayPeriod) {
                    return dayPeriod.value;
                }
            }
            return PM;
        },
        hours() {
            if (!this.incrementHours || this.incrementHours < 1)
                throw new Error('Hour increment cannot be null or less than 1.');
            const hours = [];
            const numberOfHours = this.isHourFormat24 ? 24 : 12;
            for (let i = 0; i < numberOfHours; i += this.incrementHours) {
                let value = i;
                let label = value;
                if (!this.isHourFormat24) {
                    value = (i + 1);
                    label = value;
                    if (this.meridienSelected === this.amString) {
                        if (value === 12) {
                            value = 0;
                        }
                    }
                    else if (this.meridienSelected === this.pmString) {
                        if (value !== 12) {
                            value += 12;
                        }
                    }
                }
                hours.push({
                    label: this.formatNumber(label),
                    value: value
                });
            }
            return hours;
        },
        minutes() {
            if (!this.incrementMinutes || this.incrementMinutes < 1)
                throw new Error('Minute increment cannot be null or less than 1.');
            const minutes = [];
            for (let i = 0; i < 60; i += this.incrementMinutes) {
                minutes.push({
                    label: this.formatNumber(i, true),
                    value: i
                });
            }
            return minutes;
        },
        seconds() {
            if (!this.incrementSeconds || this.incrementSeconds < 1)
                throw new Error('Second increment cannot be null or less than 1.');
            const seconds = [];
            for (let i = 0; i < 60; i += this.incrementSeconds) {
                seconds.push({
                    label: this.formatNumber(i, true),
                    value: i
                });
            }
            return seconds;
        },
        meridiens() {
            return [this.amString, this.pmString];
        },
        isMobile() {
            return this.mobileNative && helpers.isMobile.any();
        },
        isHourFormat24() {
            return this.newHourFormat === HOUR_FORMAT_24;
        }
    },
    watch: {
        hourFormat() {
            if (this.hoursSelected !== null) {
                this.meridienSelected = this.hoursSelected >= 12 ? this.pmString : this.amString;
            }
        },
        locale() {
            // see updateInternalState default
            if (!this.value) {
                this.meridienSelected = this.amString;
            }
        },
        /**
         * When v-model is changed:
         *   1. Update internal value.
         *   2. If it's invalid, validate again.
         */
        modelValue: {
            handler(value) {
                this.updateInternalState(value);
                !this.isValid && this.$refs.input.checkHtml5Validity();
            },
            immediate: true
        }
    },
    methods: {
        onMeridienChange(value) {
            if (this.hoursSelected !== null && this.resetOnMeridianChange) {
                this.hoursSelected = null;
                this.minutesSelected = null;
                this.secondsSelected = null;
                this.computedValue = null;
            }
            else if (this.hoursSelected !== null) {
                if (value === this.pmString) {
                    this.hoursSelected += 12;
                }
                else if (value === this.amString) {
                    this.hoursSelected -= 12;
                }
            }
            this.updateDateSelected(this.hoursSelected, this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, value);
        },
        onHoursChange(value) {
            if (!this.minutesSelected && typeof this.defaultMinutes !== 'undefined') {
                this.minutesSelected = this.defaultMinutes;
            }
            if (!this.secondsSelected && typeof this.defaultSeconds !== 'undefined') {
                this.secondsSelected = this.defaultSeconds;
            }
            this.updateDateSelected(parseInt(value, 10), this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
        },
        onMinutesChange(value) {
            if (!this.secondsSelected && this.defaultSeconds) {
                this.secondsSelected = this.defaultSeconds;
            }
            this.updateDateSelected(this.hoursSelected, parseInt(value, 10), this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
        },
        onSecondsChange(value) {
            this.updateDateSelected(this.hoursSelected, this.minutesSelected, parseInt(value, 10), this.meridienSelected);
        },
        updateDateSelected(hours, minutes, seconds, meridiens) {
            if (hours != null && minutes != null &&
                ((!this.isHourFormat24 && meridiens !== null) || this.isHourFormat24)) {
                let time = null;
                if (this.computedValue && !isNaN(this.computedValue)) {
                    time = new Date(this.computedValue);
                }
                else {
                    time = this.timeCreator();
                    time.setMilliseconds(0);
                }
                time.setHours(hours);
                time.setMinutes(minutes);
                time.setSeconds(seconds);
                if (!isNaN(time.getTime())) {
                    this.computedValue = new Date(time.getTime());
                }
            }
        },
        updateInternalState(value) {
            if (value) {
                this.hoursSelected = value.getHours();
                this.minutesSelected = value.getMinutes();
                this.secondsSelected = value.getSeconds();
                this.meridienSelected = value.getHours() >= 12 ? this.pmString : this.amString;
            }
            else {
                this.hoursSelected = null;
                this.minutesSelected = null;
                this.secondsSelected = null;
                this.meridienSelected = this.amString;
            }
            this.dateSelected = value;
        },
        isHourDisabled(hour) {
            let disabled = false;
            if (this.minTime) {
                const minHours = this.minTime.getHours();
                const noMinutesAvailable = this.minutes.every((minute) => {
                    return this.isMinuteDisabledForHour(hour, minute.value);
                });
                disabled = hour < minHours || noMinutesAvailable;
            }
            if (this.maxTime) {
                if (!disabled) {
                    const maxHours = this.maxTime.getHours();
                    disabled = hour > maxHours;
                }
            }
            if (this.unselectableTimes) {
                if (!disabled) {
                    const unselectable = this.unselectableTimes.filter((time) => {
                        if (this.enableSeconds && this.secondsSelected !== null) {
                            return time.getHours() === hour &&
                                time.getMinutes() === this.minutesSelected &&
                                time.getSeconds() === this.secondsSelected;
                        }
                        else if (this.minutesSelected !== null) {
                            return time.getHours() === hour &&
                                time.getMinutes() === this.minutesSelected;
                        }
                        return false;
                    });
                    if (unselectable.length > 0) {
                        disabled = true;
                    }
                    else {
                        disabled = this.minutes.every((minute) => {
                            return this.unselectableTimes.filter((time) => {
                                return time.getHours() === hour &&
                                    time.getMinutes() === minute.value;
                            }).length > 0;
                        });
                    }
                }
            }
            return disabled;
        },
        isMinuteDisabledForHour(hour, minute) {
            let disabled = false;
            if (this.minTime) {
                const minHours = this.minTime.getHours();
                const minMinutes = this.minTime.getMinutes();
                disabled = hour === minHours && minute < minMinutes;
            }
            if (this.maxTime) {
                if (!disabled) {
                    const maxHours = this.maxTime.getHours();
                    const maxMinutes = this.maxTime.getMinutes();
                    disabled = hour === maxHours && minute > maxMinutes;
                }
            }
            return disabled;
        },
        isMinuteDisabled(minute) {
            let disabled = false;
            if (this.hoursSelected !== null) {
                if (this.isHourDisabled(this.hoursSelected)) {
                    disabled = true;
                }
                else {
                    disabled = this.isMinuteDisabledForHour(this.hoursSelected, minute);
                }
                if (this.unselectableTimes) {
                    if (!disabled) {
                        const unselectable = this.unselectableTimes.filter((time) => {
                            if (this.enableSeconds && this.secondsSelected !== null) {
                                return time.getHours() === this.hoursSelected &&
                                    time.getMinutes() === minute &&
                                    time.getSeconds() === this.secondsSelected;
                            }
                            else {
                                return time.getHours() === this.hoursSelected &&
                                    time.getMinutes() === minute;
                            }
                        });
                        disabled = unselectable.length > 0;
                    }
                }
            }
            return disabled;
        },
        isSecondDisabled(second) {
            let disabled = false;
            if (this.minutesSelected !== null) {
                if (this.isMinuteDisabled(this.minutesSelected)) {
                    disabled = true;
                }
                else {
                    if (this.minTime) {
                        const minHours = this.minTime.getHours();
                        const minMinutes = this.minTime.getMinutes();
                        const minSeconds = this.minTime.getSeconds();
                        disabled = this.hoursSelected === minHours &&
                            this.minutesSelected === minMinutes &&
                            second < minSeconds;
                    }
                    if (this.maxTime) {
                        if (!disabled) {
                            const maxHours = this.maxTime.getHours();
                            const maxMinutes = this.maxTime.getMinutes();
                            const maxSeconds = this.maxTime.getSeconds();
                            disabled = this.hoursSelected === maxHours &&
                                this.minutesSelected === maxMinutes &&
                                second > maxSeconds;
                        }
                    }
                }
                if (this.unselectableTimes) {
                    if (!disabled) {
                        const unselectable = this.unselectableTimes.filter((time) => {
                            return time.getHours() === this.hoursSelected &&
                                time.getMinutes() === this.minutesSelected &&
                                time.getSeconds() === second;
                        });
                        disabled = unselectable.length > 0;
                    }
                }
            }
            return disabled;
        },
        /*
         * Parse string into date
         */
        onChange(value) {
            const date = this.timeParser(value, this);
            this.updateInternalState(date);
            if (date && !isNaN(date)) {
                this.computedValue = date;
            }
            else {
                // Force refresh input value when not valid date
                this.computedValue = null;
                this.$refs.input.newValue = this.computedValue;
            }
        },
        /*
         * Toggle timepicker
         */
        toggle(active) {
            if (this.$refs.dropdown) {
                this.$refs.dropdown.isActive = typeof active === 'boolean'
                    ? active
                    : !this.$refs.dropdown.isActive;
            }
        },
        /*
         * Close timepicker
         */
        close() {
            this.toggle(false);
        },
        /*
         * Call default onFocus method and show timepicker
         */
        handleOnFocus() {
            this.onFocus();
            if (this.openOnFocus) {
                this.toggle(true);
            }
        },
        /*
         * Format date into string 'HH-MM-SS'
         */
        formatHHMMSS(value) {
            const date = new Date(value);
            if (value && !isNaN(date.getTime())) {
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();
                return this.formatNumber(hours, true) + ':' +
                    this.formatNumber(minutes, true) + ':' +
                    this.formatNumber(seconds, true);
            }
            return '';
        },
        /*
         * Parse time from string
         */
        onChangeNativePicker(event) {
            const date = event.target.value;
            if (date) {
                let time = null;
                if (this.computedValue && !isNaN(this.computedValue)) {
                    time = new Date(this.computedValue);
                }
                else {
                    time = new Date();
                    time.setMilliseconds(0);
                }
                const t = date.split(':');
                time.setHours(parseInt(t[0], 10));
                time.setMinutes(parseInt(t[1], 10));
                time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
                this.computedValue = new Date(time.getTime());
            }
            else {
                this.computedValue = null;
            }
        },
        formatNumber(value, prependZero) {
            return this.isHourFormat24 || prependZero
                ? this.pad(value)
                : value;
        },
        pad(value) {
            return (value < 10 ? '0' : '') + value;
        },
        /*
         * Format date into string
         */
        formatValue(date) {
            if (date && !isNaN(date)) {
                return this.timeFormatter(date, this);
            }
            else {
                return null;
            }
        },
        /**
         * Keypress event that is bound to the document.
         */
        keyPress({ key }) {
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && (key === 'Escape' || key === 'Esc')) {
                this.toggle(false);
            }
        },
        /**
         * Emit 'blur' event on dropdown is not active (closed)
         */
        onActiveChange(value) {
            if (!value) {
                this.onBlur();
            }
        }
    },
    created() {
        if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
        }
    },
    beforeUnmount() {
        if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
        }
    }
};

/**
 * An input with a simple dropdown/modal for selecting a time, uses native timepicker for mobile
 * @displayName Timepicker
 * @example ./examples/Timepicker.md
 * @style _timepicker.scss
 */
var script = vue.defineComponent({
    name: 'OTimepicker',
    components: {
        [Input.script.name]: Input.script,
        [Select.script.name]: Select.script,
        [Icon.script.name]: Icon.script,
        [DropdownItem.script.name]: DropdownItem.script,
        [DropdownItem.script$1.name]: DropdownItem.script$1
    },
    configField: 'timepicker',
    mixins: [plugins.BaseComponentMixin, TimepickerMixin, MatchMediaMixin.MatchMediaMixin],
    inheritAttrs: false,
    props: {
        rootClass: [String, Function, Array],
        sizeClass: [String, Function, Array],
        boxClass: [String, Function, Array],
        separatorClass: [String, Function, Array],
        footerClass: [String, Function, Array],
        inputClasses: {
            type: Object,
            default: () => {
                return helpers.getValueByPath(config.getOptions(), 'timepicker.inputClasses', {});
            }
        },
        dropdownClasses: {
            type: Object,
            default: () => {
                return helpers.getValueByPath(config.getOptions(), 'timepicker.dropdownClasses', {});
            }
        },
        selectClasses: {
            type: Object,
            default: () => {
                return helpers.getValueByPath(config.getOptions(), 'timepicker.selectClasses', {});
            }
        }
    },
    computed: {
        inputBind() {
            return {
                ...this.$attrs,
                ...this.inputClasses
            };
        },
        dropdownBind() {
            return {
                'root-class': this.computedClass('dropdownClasses.rootClass', 'o-tpck__dropdown'),
                ...this.dropdownClasses
            };
        },
        selectBind() {
            return {
                'select-class': this.computedClass('selectClasses.selectClass', 'o-tpck__select'),
                'placeholder-class': this.computedClass('selectClasses.placeholderClass', 'o-tpck__select-placeholder'),
                ...this.selectClasses
            };
        },
        rootClasses() {
            return [
                this.computedClass('rootClass', 'o-tpck'),
                { [this.computedClass('sizeClass', 'o-tpck--', this.size)]: this.size },
                { [this.computedClass('mobileClass', 'o-tpck--mobile')]: this.isMatchMedia },
            ];
        },
        boxClasses() {
            return [
                this.computedClass('boxClass', 'o-tpck__box')
            ];
        },
        separatorClasses() {
            return [
                this.computedClass('separatorClass', 'o-tpck__separator')
            ];
        },
        footerClasses() {
            return [
                this.computedClass('footerClass', 'o-tpck__footer')
            ];
        },
        nativeStep() {
            if (this.enableSeconds)
                return '1';
            return null;
        }
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_o_input = vue.resolveComponent("o-input");

  const _component_o_select = vue.resolveComponent("o-select");

  const _component_o_dropdown_item = vue.resolveComponent("o-dropdown-item");

  const _component_o_dropdown = vue.resolveComponent("o-dropdown");

  return vue.openBlock(), vue.createBlock("div", {
    class: _ctx.rootClasses
  }, [!_ctx.isMobile || _ctx.inline ? vue.createVNode(_component_o_dropdown, vue.mergeProps({
    key: 0,
    ref: "dropdown"
  }, _ctx.dropdownBind, {
    position: _ctx.position,
    disabled: _ctx.disabled,
    inline: _ctx.inline,
    "append-to-body": _ctx.appendToBody,
    "append-to-body-copy-parent": "",
    "onActive-change": _ctx.onActiveChange
  }), vue.createSlots({
    default: vue.withCtx(() => [vue.createVNode(_component_o_dropdown_item, {
      override: "",
      tag: "div",
      "item-class": _ctx.boxClasses,
      disabled: _ctx.disabled,
      clickable: false
    }, {
      default: vue.withCtx(() => [vue.createVNode(_component_o_select, vue.mergeProps({
        override: ""
      }, _ctx.selectBind, {
        modelValue: _ctx.hoursSelected,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => _ctx.hoursSelected = $event),
        onChange: _cache[4] || (_cache[4] = $event => _ctx.onHoursChange($event.target.value)),
        disabled: _ctx.disabled,
        placeholder: "00"
      }), {
        default: vue.withCtx(() => [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.hours, hour => {
          return vue.openBlock(), vue.createBlock("option", {
            value: hour.value,
            key: hour.value,
            disabled: _ctx.isHourDisabled(hour.value)
          }, vue.toDisplayString(hour.label), 9
          /* TEXT, PROPS */
          , ["value", "disabled"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))]),
        _: 1
      }, 16
      /* FULL_PROPS */
      , ["modelValue", "disabled"]), vue.createVNode("span", {
        class: _ctx.separatorClasses
      }, vue.toDisplayString(_ctx.hourLiteral), 3
      /* TEXT, CLASS */
      ), vue.createVNode(_component_o_select, vue.mergeProps({
        override: ""
      }, _ctx.selectBind, {
        modelValue: _ctx.minutesSelected,
        "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => _ctx.minutesSelected = $event),
        onChange: _cache[6] || (_cache[6] = $event => _ctx.onMinutesChange($event.target.value)),
        disabled: _ctx.disabled,
        placeholder: "00"
      }), {
        default: vue.withCtx(() => [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.minutes, minute => {
          return vue.openBlock(), vue.createBlock("option", {
            value: minute.value,
            key: minute.value,
            disabled: _ctx.isMinuteDisabled(minute.value)
          }, vue.toDisplayString(minute.label), 9
          /* TEXT, PROPS */
          , ["value", "disabled"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))]),
        _: 1
      }, 16
      /* FULL_PROPS */
      , ["modelValue", "disabled"]), _ctx.enableSeconds ? (vue.openBlock(), vue.createBlock(vue.Fragment, {
        key: 0
      }, [vue.createVNode("span", {
        class: _ctx.separatorClasses
      }, vue.toDisplayString(_ctx.minuteLiteral), 3
      /* TEXT, CLASS */
      ), vue.createVNode(_component_o_select, vue.mergeProps({
        override: ""
      }, _ctx.selectBind, {
        modelValue: _ctx.secondsSelected,
        "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => _ctx.secondsSelected = $event),
        onChange: _cache[8] || (_cache[8] = $event => _ctx.onSecondsChange($event.target.value)),
        disabled: _ctx.disabled,
        placeholder: "00"
      }), {
        default: vue.withCtx(() => [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.seconds, second => {
          return vue.openBlock(), vue.createBlock("option", {
            value: second.value,
            key: second.value,
            disabled: _ctx.isSecondDisabled(second.value)
          }, vue.toDisplayString(second.label), 9
          /* TEXT, PROPS */
          , ["value", "disabled"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))]),
        _: 1
      }, 16
      /* FULL_PROPS */
      , ["modelValue", "disabled"]), vue.createVNode("span", {
        class: _ctx.separatorClasses
      }, vue.toDisplayString(_ctx.secondLiteral), 3
      /* TEXT, CLASS */
      )], 64
      /* STABLE_FRAGMENT */
      )) : vue.createCommentVNode("v-if", true), !_ctx.isHourFormat24 ? vue.createVNode(_component_o_select, vue.mergeProps({
        key: 1,
        override: ""
      }, _ctx.selectBind, {
        modelValue: _ctx.meridienSelected,
        "onUpdate:modelValue": _cache[9] || (_cache[9] = $event => _ctx.meridienSelected = $event),
        onChange: _cache[10] || (_cache[10] = $event => _ctx.onMeridienChange($event.target.value)),
        disabled: _ctx.disabled
      }), {
        default: vue.withCtx(() => [(vue.openBlock(true), vue.createBlock(vue.Fragment, null, vue.renderList(_ctx.meridiens, meridien => {
          return vue.openBlock(), vue.createBlock("option", {
            value: meridien,
            key: meridien
          }, vue.toDisplayString(meridien), 9
          /* TEXT, PROPS */
          , ["value"]);
        }), 128
        /* KEYED_FRAGMENT */
        ))]),
        _: 1
      }, 16
      /* FULL_PROPS */
      , ["modelValue", "disabled"]) : vue.createCommentVNode("v-if", true), _ctx.$slots.default !== undefined ? (vue.openBlock(), vue.createBlock("footer", {
        key: 2,
        class: _ctx.footerClasses
      }, [vue.renderSlot(_ctx.$slots, "default")], 2
      /* CLASS */
      )) : vue.createCommentVNode("v-if", true)]),
      _: 1
    }, 8
    /* PROPS */
    , ["item-class", "disabled"])]),
    _: 2
  }, [!_ctx.inline ? {
    name: "trigger",
    fn: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "trigger", {}, () => [vue.createVNode(_component_o_input, vue.mergeProps({
      ref: "input"
    }, _ctx.inputBind, {
      autocomplete: "off",
      value: _ctx.formatValue(_ctx.computedValue),
      placeholder: _ctx.placeholder,
      size: _ctx.size,
      icon: _ctx.icon,
      "icon-pack": _ctx.iconPack,
      disabled: _ctx.disabled,
      readonly: !_ctx.editable,
      rounded: _ctx.rounded,
      "use-html5-validation": _ctx.useHtml5Validation,
      onKeyup: _cache[1] || (_cache[1] = vue.withKeys($event => _ctx.toggle(true), ["enter"])),
      onChange: _cache[2] || (_cache[2] = $event => _ctx.onChange($event.target.value)),
      onFocus: _ctx.handleOnFocus
    }), null, 16
    /* FULL_PROPS */
    , ["value", "placeholder", "size", "icon", "icon-pack", "disabled", "readonly", "rounded", "use-html5-validation", "onFocus"])])])
  } : undefined]), 1040
  /* FULL_PROPS, DYNAMIC_SLOTS */
  , ["position", "disabled", "inline", "append-to-body", "onActive-change"]) : vue.createVNode(_component_o_input, vue.mergeProps({
    key: 1,
    ref: "input"
  }, _ctx.inputBind, {
    type: "time",
    step: _ctx.nativeStep,
    autocomplete: "off",
    value: _ctx.formatHHMMSS(_ctx.computedValue),
    placeholder: _ctx.placeholder,
    size: _ctx.size,
    icon: _ctx.icon,
    "icon-pack": _ctx.iconPack,
    rounded: _ctx.rounded,
    max: _ctx.formatHHMMSS(_ctx.maxTime),
    min: _ctx.formatHHMMSS(_ctx.minTime),
    disabled: _ctx.disabled,
    readonly: false,
    "use-html5-validation": _ctx.useHtml5Validation,
    onChange: _cache[11] || (_cache[11] = $event => _ctx.onChange($event.target.value)),
    onFocus: _ctx.handleOnFocus,
    onBlur: _cache[12] || (_cache[12] = $event => _ctx.onBlur() && _ctx.checkHtml5Validity())
  }), null, 16
  /* FULL_PROPS */
  , ["step", "value", "placeholder", "size", "icon", "icon-pack", "rounded", "max", "min", "disabled", "use-html5-validation", "onFocus"])], 2
  /* CLASS */
  );
}

script.render = render;
script.__file = "src/components/timepicker/Timepicker.vue";

exports.script = script;
