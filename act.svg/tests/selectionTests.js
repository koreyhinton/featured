const { versionAssert } = require('../global');

describe('Diagram Selection Tests', function() {
    it('should select rectangle', function(browser) {
        const start = 1;
        const end = null;

        versionAssert.onlyFeaturedInVersionsAssert(start, end, function() {
            browser.assert.attributeContains('rect', /\#caffb5/i); // Case-insensitive regex
        });
        browser.end();
    });
});
