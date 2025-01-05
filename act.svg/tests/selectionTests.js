import { test, expect } from '@playwright/test';
// const { versionAssert } = require('../../global');
import { versionAssert } from '../../global';
// const assert = require('assert');
import { promises as fs } from 'fs';

async function ensureOptionalClick(page, selector) {
    const element = page.locator(selector);
    if (await element.isVisible()) {
        await element.click();
    }
}

var emptySvg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="750" height="750" viewBox="0,0,750,750">
</svg>
`;

async function ensureEmptySvg(page) {
    const sutVersion = (await fs.readFile('./sut.version', 'utf-8')).trim();
    if (sutVersion <= 2) {  // v0.1
        await page.locator('#svgFullTextarea').fill(emptySvg);
    } else {
        await page.mouse.move(751, 100);
        await page.mouse.down();
        await page.mouse.move(751+745, 100+725);
        await page.mouse.up();
        await page.keyboard.press('Control+x');
    }
}

var rectSvg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="750" height="750" viewBox="0,0,750,750">
    <rect rx="10" ry="10" x="325" y="112" width="100" height="50" stroke="black" fill="transparent" stroke-width="1"/>
</svg>
`;

async function ensureRect(page) {
    const element = page.locator("rect");
    if (await element.isVisible()) {
        return;
    }

    const sutVersion = (await fs.readFile('./sut.version', 'utf-8')).trim();
    await page.keyboard.press('4'); // rect mode
    if (sutVersion <= 1) {  // v0.0

        await page.mouse.move(751, 350);
        await page.mouse.down();
        await page.mouse.up();
        await page.mouse.move(800, 500);
        await page.mouse.down();
        await page.mouse.up();

    } else {
        await page.mouse.move(751, 350);
        await page.mouse.down();
        await page.mouse.move(800, 500);
        await page.mouse.up();
    }
    await page.keyboard.press('4'); // select mode
}


test.describe('Diagram Selection Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await ensureEmptySvg(page);
        await ensureOptionalClick(page, 'button#buttonStart');
    });


    test('should select rectangle', async ({page}) => {
        const start = 0;
        const end = null;

        await ensureRect(page);

        await page.locate('rect')
            .click();

        versionAssert.onlyFeaturedInVersionsAssert(expect, start, end, async () => {
            await expect(page.locate('rect'))
                .toHaveAttribute('stroke', '#CAFFB5')
        });
    });
});
