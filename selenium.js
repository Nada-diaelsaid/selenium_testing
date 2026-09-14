// Import the Builder class from the selenium-webdriver package
const { Builder } = require('selenium-webdriver');

// Function to open up Google in Chrome.
async function openGoogleInChrome() {
    // Create w new Chrome browser instance
    let driver = await new Builder().forBrowser('chrome').build();

    // navigate to Google's homepage using the driver.

    await driver.get('https://www.google.com');
    
    // Make the browser window full screen
    await driver.manage().window().maximize();

    // We will do nothing,
    // The url will just open in the browser for 3 seconds and close again..
    await driver.sleep(3000);

    // close the driver
    await driver.quit()
}

openGoogleInChrome();

// To run the script, use the command: node selenium.js