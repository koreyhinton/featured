const { versionAssert } = require('./global');

module.exports = {
    onlyFeaturedInVersionsAssert: function(start, end, assertionCallback) {
        const sutVersion = require('fs').readFileSync('./sut.version', 'utf-8').trim();
        let trueForCurrentVersion = false;

        try {
            assertionCallback(); // Try running the assertion callback
            trueForCurrentVersion = true;
        } catch (err) {
            // If assertion fails, ignore silently
        }

        const isFeaturedInCurrentVersion = (sutVersion >= start || sutVersion === null) && (sutVersion <= end || sutVersion === null);

        assert.equal(
            (trueForCurrentVersion && isFeaturedInCurrentVersion) || (!trueForCurrentVersion && !isFeaturedInCurrentVersion),
            true
        ); // Assert that the condition holds
    }
};
