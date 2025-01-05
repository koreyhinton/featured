//const { versionAssert } = require('./global');
//const assert = require('assert');

module.exports = {
    versionAssert: {
            onlyFeaturedInVersionsAssert: function(expect, start, end, assertionCallback) {
            const sutVersion = require('fs').readFileSync('./sut.version', 'utf-8').trim();
            let trueForCurrentVersion = false;

            try {
                assertionCallback(); // Try running the assertion callback
                trueForCurrentVersion = true;
            } catch (err) {
                // If assertion fails, ignore silently
            }

            const isFeaturedInCurrentVersion = (sutVersion >= start || sutVersion === null) && (sutVersion <= end || sutVersion === null);

            expect(
                (trueForCurrentVersion && isFeaturedInCurrentVersion) || (!trueForCurrentVersion && !isFeaturedInCurrentVersion)
            ).toBe(true); // Assert that the condition holds
        }
    }
};
