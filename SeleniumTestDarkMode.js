const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');

async function testDarkMode() {
    // Start a new browser session
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open the dictionary app
        await driver.get('file:///C:/Users/geeta/OneDrive/Desktop/WordSearch/index.html');

        // Get the initial background color before toggling dark mode
        let initialBackgroundColor = await driver.executeScript('return window.getComputedStyle(document.body).backgroundColor');
        console.log('Initial Background Color:', initialBackgroundColor);

        // Click the dark mode toggle button
        await driver.findElement(By.id('toggleDarkMode')).click();

        // Wait for a short time for the dark mode styles to apply
        await driver.sleep(1000);

        // Get the background color of the body after dark mode is applied
        let darkModeBackgroundColor = await driver.executeScript('return window.getComputedStyle(document.body).backgroundColor');
        console.log('Dark Mode Background Color:', darkModeBackgroundColor);

        // Assert that the background color has changed to reflect dark mode
        assert.notEqual(initialBackgroundColor, darkModeBackgroundColor, 'Dark mode is not toggled correctly.');

        // Optionally, verify if the dark mode class is added to the body
        let bodyClass = await driver.findElement(By.tagName('body')).getAttribute('class');
        assert(bodyClass.includes('dark-mode'), 'Dark mode class is not added to body element.');

        // Take a screenshot after toggling dark mode
        let screenshot = await driver.takeScreenshot();
        fs.writeFileSync('dark_mode_screenshot.png', screenshot, 'base64');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

// Run the dark mode test
testDarkMode();
