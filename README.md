### About the App

This website was developed for Capital One's Software Engineering Summit Challenge
and can be accessed at [https://rachelluuu.github.io/jeopardy](https://rachelluuu.github.io/jeopardy). The code repository is hosted at [https://github.com/rachelluuu/jeopardy​] (https://github.com/rachelluuu/jeopardy​).​ 

Using the [jService API](http://jservice.io), the main features of the app are Search and Play. This project was built as a Single Page Application with React/Redux, and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). With a responsive UI design that accommodates different screen sizes, the website is mobile and web friendly.

### Search
The web app can search previous Jeopardy! questions based on category, difficulty (value) and/or date aired. The website will display up to 100 search results , and an additional 100 results, if they exist, can be viewed by clicking the 'More ..." button at the bottom of the page. To search the date aired, users can either type in the date or select the day on the dropdown calendar. The Search button is disabled until a new search query is selected to minimize redundant API calls.

![Example Search Result](./public/assets/images/search.png)

During development, I noticed two problems in the API:
1. Invalid data. For example, searching through all the results, I discovered that 14 of the first 100 questions either had no questions and/or no values.
2. Incorrect results if only min_date or max_date are searched in the URL. However, if both are included, results perform as expected. For example, if this [min_date in 1986](http://jservice.io/api/clues?category=16&min_date=02/03/1986) is searched using the API, the results include a result that aired during 1984. I wrote a workaround for this issue in redux/ActionCreators.js after realizing that the problem was that the min_date parameter was queried as the max_date, and vice versa.

### Play
As an additional feature, under the 'Play' tab, a new Jeopardy! game board is generated after each refresh. The point value can be clicked to view the answer, and users can use the browser's back button to return to their same board. Since different rounds of Jeopardy use different values, I chose to standardize the board to have values of 200, 400, 600, 800, and 1000, thus avoiding the issue of having different categories being weighted differently.

![Example Play Result](./public/assets/images/play.png)

Given additional time, further improvements to the app would be dedicated to making the Play board into an  interactive multiplayer simulation of a Jeopardy! game.

### Running The App
To run the app in the development mode, run 'npm start' and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To build the app for production, run 'npm run deploy' and open [https://rachelluuu.github.io/jeopardy](https://rachelluuu.github.io/jeopardy) to view it in the browser.
