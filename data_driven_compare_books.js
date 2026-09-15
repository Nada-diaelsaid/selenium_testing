const fs = require('fs');
const csv = require('csv-parser'); // need to be installed: npm install csv-parser
const { Builder, By } = require('selenium-webdriver');

let savedData = [];

// Read data from csv file:
fs.createReadStream('books.csv')
   .pipe(csv())
   .on('data', (row) => {
        // console.log('Reading row:', row);
    savedData.push(row);
})
   .on('end', () => {
        console.log('Successfully reading csv file:', savedData);
        runPriceVerificationTest();
    })
    .on('error', (error) => {
        console.error('Error reading csv file:', error);
});


async function runPriceVerificationTest() {

    // Initialize Selenium WebDriver:
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        let currentData = [];

        // Loop through first 2 pages:
        for(let page =1; page <= 2; page++)
        {
            // Navigate to next page:
            if(page === 1)
                await driver.get('https://books.toscrape.com/');
            else
                await driver.get(`https://books.toscrape.com/catalogue/page-${page}.html`);

            // Give the page time to load:
            await driver.sleep(2000);

            // Find all books in this page:
            let books = await driver.findElements(By.css('article.product_pod'));

                        // Extract title and price for each book:
            for(let book of books)
            {
                let titleElement = await book.findElement(By.css('h3 > a'));
                let title = await titleElement.getAttribute('title');
                
                let priceElement = await book.findElement(By.css('p.price_color'));
                let price = await priceElement.getText();

                currentData.push({title, price});
            }
        }
        // compare saved and current data:
        compareData(savedData, currentData);

    } catch (error) {
        console.error('Error running price verification test:', error);
    } finally {
        await driver.quit();
    }
}

function compareData(savedData, currentData) {
    let discrepancies = [];

    for(let i = 0; i < savedData.length; i++) {
        let savedBook = savedData[i];
        let currentBook = currentData.find(book => book.title === savedBook.title);
        if(currentBook) {
            console.log(`Book: ${savedBook.title} - Saved Price: ${savedBook.price} - Current Price: ${currentBook.price}`);
            if(savedBook.price !== currentBook.price) {
                discrepancies.push({
                    title: savedBook.title,
                    savedPrice: savedBook.price,
                    currentPrice: currentBook.price});
            }
            else
            {
                console.log(`Book: ${savedBook.title} - Price is the same`);
            }
        } else {
            console.log(`Book: ${savedBook.title} - Not found in current data`);
        }
    }

    // Write discrepancies to csv file:
    if(discrepancies.length > 0) {
        let filename = 'discrepancies.csv';
        let csvContent = 'Title,Saved Price,Current Price\n';
        for(let item of discrepancies) {
            csvContent += `${item.title},${item.savedPrice},${item.currentPrice}\n`;
        }
        fs.writeFileSync(filename, csvContent);
        console.log(`Discrepancies written to csv file: ${filename}`);
    } else {
        console.log('No discrepancies found. All prices are the same.');
    }
}
