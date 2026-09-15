const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function scrapeBooks()
{
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get('https://books.toscrape.com/');

        // Arrays to store titles and prices:
        let titles = [];
        let prices = [];

        // Loop through first 2 pages:
        for(let page =1; page <= 2; page++)
        {
            await driver.sleep(2000);
            // Find all books in this page:
            let books = await driver.findElements(By.css('article.product_pod'));
            console.log(`Found ${books.length} books on page ${page}`);
            // Extract title and price for each book:
            for(let book of books)
            {
                let titleElement = await book.findElement(By.css('h3 > a'));
                let title = await titleElement.getAttribute('title');
                
                let priceElement = await book.findElement(By.css('p.price_color'));
                let price = await priceElement.getText();

                titles.push(title);
                prices.push(price);

            }
            // Navigate to next page:
            if(page < 2)
            {
                let nextButton = await driver.findElement(By.css('li.next > a'));
                // console.log('Clicking next button', nextButton);
                await nextButton.click();
            }
            // console.log('Titles:', titles);
            // console.log('Prices:', prices);
            // print the result into .csv file:
            let csvFile = 'books.csv';
            let csvContent = `Title,Price\n`;
            for(let i = 0; i < titles.length; i++)
            {
                console.log(`${titles[i]},${prices[i]}`);
                csvContent += `${titles[i]},${prices[i]}\n`;
            }
            fs.writeFileSync(csvFile, csvContent);
            console.log(`Saved ${titles.length} books to ${csvFile}`);
        }

        console.log('Scraping completed successfully');
    }
    catch (error) {
        console.error('Error: ', error.message);
    }
    finally {
        await driver.quit();
    }
})();