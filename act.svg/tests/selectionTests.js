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

var emptySvg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="750" height="750" viewBox="0,0,750,750">
</svg>
`;

function ensureEmptySvg(browser) {
    const sutVersion = require('fs').readFileSync('./sut.version', 'utf-8').trim();
    if (sutVersion <= 2) {  // v0.1
        browser.setValue('#svgFullTextarea', emptySvg);
    } else {
        browser
            .perform(function() {
                const actions = this.actions({async: false});
                return actions
                    .move({x: 751, y: 100})
                    .press()
                    .move({x: 751+745, y: 100+725})
                    .release()
                    .perform()
            });
        browser.pause(1000);
        // browser.keys([browser.Keys.CONTROL, "x"]);
        browser.execute(`window.manageKeyDownEvent({key:'x',ctrlKey:true});`);
    }
    browser.pause(1000);
}

module.exports = {
    beforeEach: function(browser) {
        browser.url(browser.launchUrl);
        ensureEmptySvg(browser);
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

function ensureRect(browser) {
    browser.isVisible({ selector: "rect", suppressNotFoundErrors: true}, function(result) {
        if (result.value) return;
        const sutVersion = require('fs').readFileSync('./sut.version', 'utf-8').trim();
        if (sutVersion <= 1) {  // v0.0
            browser
                .sendKeys('body', '4') // draw rect mode
                .pause(1000)
                .perform(function() {
                    const actions = this.actions({async: false});
                    return actions
                        .click({x: 751, y: 350})
                        .click({x: 800, y: 500})
                        .perform();
                })
                .pause(1000)
                .sendKeys('body', '0') // back to selection mode
                .pause(1000);
        } else {
            browser
                .sendKeys('body', '4') // draw rect mode
                .pause(1000)
                .perform(function() {
                    const actions = this.actions({async: false});
                    return actions
                        .move({x: 751, y: 350})
                        .press()
                        .move({x: 800, y: 500})
                        .release()
                        .perform();
                })
                .pause(1000)
                .sendKeys('body', '0') // back to selection mode
                .pause(1000);
        }
    });
}

describe('Diagram Selection Tests', function() {
    it('should select rectangle', function(browser) {
        const start = 0;
        const end = null;

        ensureRect(browser);

        browser
            .perform(function() {
                const actions = this.actions({async: false});
                return actions
                    .click(browser.element.find('rect'))
                    .perform(); // Perform all actions
            })
            .pause(1000);

        versionAssert.onlyFeaturedInVersionsAssert(browser, start, end, () => {
            browser.assert.attributeContains('rect', 'stroke', '#CAFFB5');
        });

        browser
            .pause(2000)
            .end();

    });
});
