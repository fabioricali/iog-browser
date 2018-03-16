const be = require('bejs');
const Iog = require('../dist/iog');

describe('iog', function () {

    describe('write', function () {
        it('should be ok with string message', async function () {
            let log = new Iog('a-context');
            log.write('my log');
        });
        it('should be ok with error', async function () {
            let log = new Iog('a-context', {
                path: __dirname
            });
            try {
                undefine.param = 'hello';
            } catch(e) {
                log.write(e);
            }

        });
        it('should be ok passing an object', async function () {
            let log = new Iog('a-context');
            try {
                undefine.param = 'hello';
            } catch(e) {
                log.write({
                    error: e.message,
                    other: {
                        meta: 'a meta'
                    }
                });
            }

        });
    });
});