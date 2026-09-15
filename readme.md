## This a project for using Selenium to test on Chrome.
To download Chrome driver visit: https://www.chromedriverdownload.com/
Choose according to your chrome browser version.
In this project we will use Javascript as the language for testing on Selenium.

To getting stated with Selenium:
https://www.selenium.dev/documentation/webdriver/getting_started/

## setup project:
npm init -y # will create package.json file
npm install selenium-webdriver


## Difference between CSS selectors and XPath:
CSS selectors use the syntax of cascading stylesheets to select elements based on attributes ​like ID, classes, and relationships in the HTML structure.

XPath is a language that navigates through elements and attributes in XML documents, ​allowing for complex queries by traversing the DOM, both forward and backwards.

## What is DOM you say?
​The DOM or *Document Object Model* is a programming interface in HTML and XML documents. ​It represents the page as a tree structure of nodes, enabling programs to manipulate ​the content, structure, and style of a website.

**​The main difference between CSS selectors and XPath:**
| XPath | CSS selectors |
|---------------|-------------------|
| Allows bi-directional navigation | Offers faster performance and simple syntax |
| Enables selection of elements based on text context | Allows forward DOM traversal only |

​Choosing between them depends on the specific need of your test case and the complexity ​of the element selections required.

For more info about selectors: https://www.guru99.com/xpath-selenium.html