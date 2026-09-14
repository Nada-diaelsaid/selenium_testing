// Import the Builder class from the selenium-webdriver package
const { Builder, until } = require('selenium-webdriver');

/* 
    Test 1 Positive test:
    - Login with valid credentials
    - Verify the success message is displayed
    - Close the driver
*/
async function formSubmissionTest() {
    // Create a new Chrome browser instance
    let driver = await new Builder().forBrowser('chrome').build();

    // navigate to Form Authentication page using the driver.
    await driver.get('https://the-internet.herokuapp.com/login');
    
    // Make the browser window full screen
    await driver.manage().window().maximize();

    // Fill in the username and password fields
    await driver.findElement({css: '#username'}).sendKeys('tomsmith');
    await driver.findElement({css: '#password'}).sendKeys('SuperSecretPassword!');

    // Click the login button
    await driver.findElement({css: 'button[type="submit"]'}).click();

    //// TODO:
    // Confirm that the page iredirected successfully first before verifying the success message.
    // getCurrentUrl is not very accurate as it can return the previous page if the page is not fully loaded.

    // Verify the success message is displayed
    // When pressing login, we will redirect to a new page.
    // We will wait for the new page to load and then verify the success message.
    let currentUrl = await driver.getCurrentUrl();
    console.log('Current URL:', currentUrl);
    if (currentUrl !== 'https://the-internet.herokuapp.com/secure') {
        console.error('Login failed');
    }
    else {
        let successMessage = await driver.findElement({xpath: './/*[@id="flash-messages"]'});
        await driver.wait(until.elementIsVisible(successMessage), 2000);

        console.log('Login successful', await successMessage.getText());
        // Press logout button
        await driver.findElement({xpath: '//*[@id="content"]/div/a'}).click();
    
    }
    
    // close the driver
    await driver.quit();
}

// Run the function
formSubmissionTest();
