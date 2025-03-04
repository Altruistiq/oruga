/**
 * +/- function to native math sign
 */
function signPoly(value) {
    if (value < 0)
        return -1;
    return value > 0 ? 1 : 0;
}
const sign = Math.sign || signPoly;
/**
 * Checks if the flag is set
 * @param val
 * @param flag
 * @returns {boolean}
 */
function hasFlag(val, flag) {
    return (val & flag) === flag;
}
/**
 * Native modulo bug with negative numbers
 * @param n
 * @param mod
 * @returns {number}
 */
function mod(n, mod) {
    return ((n % mod) + mod) % mod;
}
/**
 * Asserts a value is beetween min and max
 * @param val
 * @param min
 * @param max
 * @returns {number}
 */
function bound(val, min, max) {
    return Math.max(min, Math.min(max, val));
}
/**
 * Get value of an object property/path even if it's nested
 */
function getValueByPath(obj, path, defaultValue = undefined) {
    const value = path.split('.').reduce((o, i) => typeof o !== 'undefined' ? o[i] : undefined, obj);
    return typeof value !== 'undefined' ? value : defaultValue;
}
/**
 * Extension of indexOf method by equality function if specified
 */
function indexOf(array, obj, fn) {
    if (!array)
        return -1;
    if (!fn || typeof fn !== 'function')
        return array.indexOf(obj);
    for (let i = 0; i < array.length; i++) {
        if (fn(array[i], obj)) {
            return i;
        }
    }
    return -1;
}
/**
 * Merge function to replace Object.assign with deep merging possibility
 */
const isObject = (item) => typeof item === 'object' && !Array.isArray(item);
const mergeFn = (target, source, deep = false) => {
    if (deep || !Object.assign) {
        const isDeep = (prop) => isObject(source[prop]) &&
            target !== null &&
            Object.prototype.hasOwnProperty.call(target, prop) &&
            isObject(target[prop]);
        let replaced;
        if (source === null || typeof source === 'undefined') {
            replaced = false;
        }
        else {
            replaced = Object.getOwnPropertyNames(source)
                .map((prop) => ({ [prop]: isDeep(prop)
                    ? mergeFn(target[prop], source[prop], deep)
                    : source[prop] }))
                .reduce((a, b) => ({ ...a, ...b }), {});
        }
        return {
            ...target,
            ...replaced
        };
    }
    else {
        return Object.assign(target, source);
    }
};
const merge = mergeFn;
/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 */
const isMobile = {
    Android: function () {
        return (typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/Android/i));
    },
    BlackBerry: function () {
        return (typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/BlackBerry/i));
    },
    iOS: function () {
        return (typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/iPhone|iPad|iPod/i));
    },
    Opera: function () {
        return (typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/Opera Mini/i));
    },
    Windows: function () {
        return (typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/IEMobile/i));
    },
    any: function () {
        return (isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};
function removeElement(el) {
    if (typeof el.remove !== 'undefined') {
        el.remove();
    }
    else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
        el.parentNode.removeChild(el);
    }
}
function createAbsoluteElement(el) {
    const root = document.createElement('div');
    root.style.position = 'absolute';
    root.style.left = '0px';
    root.style.top = '0px';
    const wrapper = document.createElement('div');
    root.appendChild(wrapper);
    wrapper.appendChild(el);
    document.body.appendChild(root);
    return root;
}
/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 */
function escapeRegExpChars(value) {
    if (!value)
        return value;
    // eslint-disable-next-line
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
function multiColumnSort(inputArray, sortingPriority) {
    // clone it to prevent the any watchers from triggering every sorting iteration
    const array = JSON.parse(JSON.stringify(inputArray));
    const fieldSorter = (fields) => (a, b) => fields.map((o) => {
        let dir = 1;
        if (o[0] === '-') {
            dir = -1;
            o = o.substring(1);
        }
        const aValue = getValueByPath(a, o);
        const bValue = getValueByPath(b, o);
        return aValue > bValue ? dir : aValue < bValue ? -(dir) : 0;
    }).reduce((p, n) => p || n, 0);
    return array.sort(fieldSorter(sortingPriority));
}
function createNewEvent(eventName) {
    let event;
    if (typeof Event === 'function') {
        event = new Event(eventName);
    }
    else {
        event = document.createEvent('Event');
        event.initEvent(eventName, true, true);
    }
    return event;
}
function toCssDimension(width) {
    return width === undefined ? null : (isNaN(width) ? width : width + 'px');
}
function blankIfUndefined(value) {
    return typeof value !== 'undefined' && value !== null ? value : '';
}
function defaultIfUndefined(value, defaultValue) {
    return typeof value !== 'undefined' && value !== null ? value : defaultValue;
}
/**
 * Return month names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
 * @return {Array<String>} An array of month names
 */
function getMonthNames(locale = undefined, format = 'long') {
    const dates = [];
    for (let i = 0; i < 12; i++) {
        dates.push(new Date(2000, i, 15));
    }
    const dtf = new Intl.DateTimeFormat(locale, {
        month: format,
    });
    return dates.map((d) => dtf.format(d));
}
/**
 * Return weekday names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {Number} first day of week index
 * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
 * @return {Array<String>} An array of weekday names
 */
function getWeekdayNames(locale = undefined, firstDayOfWeek = 0, format = 'narrow') {
    const dates = [];
    for (let i = 1, j = 0; j < 7; i++) {
        const d = new Date(2000, 0, i);
        const day = d.getDay();
        if (day === firstDayOfWeek || j > 0) {
            dates.push(d);
            j++;
        }
    }
    const dtf = new Intl.DateTimeFormat(locale, {
        weekday: format,
    });
    return dates.map((d) => dtf.format(d));
}
/**
 * Accept a regex with group names and return an object
 * ex. matchWithGroups(/((?!=<year>)\d+)\/((?!=<month>)\d+)\/((?!=<day>)\d+)/, '2000/12/25')
 * will return { year: 2000, month: 12, day: 25 }
 * @param  {String} includes injections of (?!={groupname}) for each group
 * @param  {String} the string to run regex
 * @return {Object} an object with a property for each group having the group's match as the value
 */
function matchWithGroups(pattern, str) {
    const matches = str.match(pattern);
    return pattern
        // get the pattern as a string
        .toString()
        // suss out the groups
        .match(/<(.+?)>/g)
        // remove the braces
        .map((group) => {
        const groupMatches = group.match(/<(.+)>/);
        if (!groupMatches || groupMatches.length <= 0) {
            return null;
        }
        return group.match(/<(.+)>/)[1];
    })
        // create an object with a property for each group having the group's match as the value
        .reduce((acc, curr, index) => {
        if (matches && matches.length > index) {
            acc[curr] = matches[index + 1];
        }
        else {
            acc[curr] = null;
        }
        return acc;
    }, {});
}
function getStyleValue(value) {
    if (typeof value === 'object') {
        for (const key in value) {
            if (value[key])
                return key;
        }
        return '';
    }
    return value;
}
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

export { blankIfUndefined, bound, createAbsoluteElement, createNewEvent, debounce, defaultIfUndefined, endsWith, escapeRegExpChars, getMonthNames, getStyleValue, getValueByPath, getWeekdayNames, hasFlag, indexOf, isMobile, matchWithGroups, merge, mod, multiColumnSort, removeElement, sign, toCssDimension };
