const { versionAssert } = require('../../global');
const assert = require('assert');

function ensureOptionalClick(browser, selector, timeout) {

    browser
        .pause(timeout)
        .isVisible({ selector: selector, suppressNotFoundErrors: true}, function(result) {
            if (result.value) {
                browser.click(selector, () => {});
            }
        });
}

module.exports = {
    beforeEach: function(browser) {
        browser.url(browser.launchUrl);
        ensureOptionalClick(browser, 'button#buttonStart', 1000);
        browser.pause(1000); // ensures 'rect' is onscreen
    },
    afterEach: function(browser, done) {
        done();
    }
};

var rectSvg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="750" height="750" viewBox="0,0,750,750">
    <rect rx="10" ry="10" x="325" y="112" width="100" height="50" stroke="black" fill="transparent" stroke-width="1"/>
</svg>
`;

describe('Diagram Selection Tests', function() {
    it('should select rectangle', function(browser) {
        const start = 0;
        const end = null;

        browser
            .perform(function() {
                const actions = this.actions({async: false});
                return actions
                    .click(browser.element.find('rect'))
                    .perform(); // Perform all actions
            });

        versionAssert.onlyFeaturedInVersionsAssert(browser, start, end, () => {
            browser.assert.attributeContains('rect', 'stroke', '#CAFFB5');
        });

        browser
            .pause(2000)
            .end();

    });
});
