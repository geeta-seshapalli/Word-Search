const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');

async function testDictionaryApp() {
    // Start a new browser session
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Open the dictionary app
        await driver.get('file:///C:/Users/geeta/OneDrive/Desktop/WordSearch/index.html');

        // Find the input element and submit a word
        await driver.findElement(By.css('input[type="text"]')).sendKeys('example');
        await driver.findElement(By.css('button[type="submit"]')).click();

        // Wait for the result to load
        const resultDiv = await driver.wait(until.elementLocated(By.css('.result')), 10000);
        await driver.sleep(2000);

        // Take a screenshot after the result is loaded
        let screenshot = await driver.takeScreenshot();
        fs.writeFileSync('result_screenshot.png', screenshot, 'base64');

        // Get the text of the result and assert that the word is fetched
        const resultText = await resultDiv.getText();
        console.log('Result Text:', resultText);
        assert(resultText.includes('Word: example'), 'The word is not fetched correctly.');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        // Quit the driver
        await driver.quit();
    }
}

// Run the test
testDictionaryApp();
