const extend = require('defaulty');
const dateFormat = require('dateformat');
const isError = require('is-error');
const stringify = require('stringme');

/**
 * @typedef SEPARATOR
 * @type {string}
 * @ignore
 */
const SEPARATOR = '\n\n---------------------------------------------------------------------------------------\n\n';

/**
 * @class
 */
class Iog {

    /**
     * Iog instance
     * @param {string} contextName es. your-module-name
     * @param {object} [opts] options
     * @param {string} [opts.path=] log path
     * @param {boolean} [opts.pretty=false] Pretty format
     * @param {boolean} [opts.enableDate=false] Enable date
     * @param {string} [opts.separator=---] log separator
     */
    constructor(contextName, opts = {}) {

        if (typeof contextName === 'undefined')
            throw new TypeError('context name is required');

        this.contextName = contextName;
        this.opts = extend(opts, {
            separator: SEPARATOR,
            pretty: false,
            upperCase: true,
            enableDate: false,
        });

        if(this.opts.upperCase)
            this.contextName = this.contextName.toUpperCase();

        this._paused = false;

    }

    /**
     * Pause log writing
     * @returns {Iog}
     */
    pause() {
        this._paused = true;
        return this;
    }

    /**
     * Resume log writing
     * @returns {Iog}
     */
    resume() {
        this._paused = false;
        return this;
    }

    /**
     * Write log
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     * @param {string} [type=log] any type that you want like: log, info, error, trace, warn also custom
     */
    write(msg = '', type = 'log') {

        if (this._paused) return;

        const _console = console[type in console ? type : 'log'];
        const now = new Date();
        const date = dateFormat(now, 'yyyy-mm-dd HH:MM:ss:l');
        let date1 = '';
        let date2 = '';

        if(this.opts.upperCase)
            type = type.toUpperCase();

        if (this.opts.enableDate) {
            date1 = `DATE: ${date}\\n`;
            date2 = `[${date}]`;
        }

        if (this.opts.pretty) {
            if (typeof msg === 'object' && !isError(msg))
                msg = stringify(msg, {replace: null, space: 2});

            const body = `CONTEXT: ${this.contextName}\n${date1}TYPE: ${type}\nBODY:\n\n${msg}${this.opts.separator}`;

            _console(body);

        } else {
            _console(`[${this.contextName}][${type}]${date2}`, msg);
        }

    }

    /**
     * A wrapper of write that set type to "error"
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     */
    error(msg = '') {
        this.write(msg, 'error');
    }

    /**
     * A wrapper of write that set type to "warn"
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     */
    warn(msg = '') {
        this.write(msg, 'warn');
    }

    /**
     * A wrapper of write that set type to "info"
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     */
    info(msg = '') {
        this.write(msg, 'info');
    }

    /**
     * A wrapper of write that set type to "trace"
     * @param {string|object} msg message log, you can pass also an object with custom params, in this case remember that Error must be get in this way error.message
     */
    trace(msg = '') {
        this.write(msg, 'trace');
    }
}


module.exports = Iog;