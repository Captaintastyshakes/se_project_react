# WTWR (What to Wear?)

## About the project

The idea of the application is pretty simple - we make a call to an API, which then responds with the daily weather forecast. We collect the weather data, process it, and then based on the forecast, we recommend suitable clothing to the user. That clothing is 'made' and submitted by our users to then display in an appropriate gallery- "it's cold, how about a toque, sweater and boots?" etc.

That clothing info is stored in a now actually functional server, (well,just your local machine on a neighboring port,) with the backend code written from scratch using Node and Express. This server handles all the pertinent data the webpage needs to run- url's for the clothing images along with their names, background data like who 'owns' the item in question and who has liked it; user data generated from a fullstack registration process and the ability to like and keep track of items some particular user has liked. This add and remove functionality takes advantage of both basic server capabilities and more sophisticated react event handlers for the inputs.

This site is built from the ground up using React/JSX and the Vite quick start framework front end and the aforementioned Node and Express for the backend- this is an official Full Stack application! Components are written using jsx functional component approaches, including the use of useState and useEffect state manipulation. All component functionality is passed down from parent to child components, (either via drilling down or, more often, with context subscriptions,) and written with conditional logic where it applies.

The backend uses Express for handling the routing with a divestment of assigned controller functions to determine what happens when some particular request method goes to some route or another. The backend and frontend both exchange Json Web Tokens and verify their authenticity with the server to make sure authorizations are respected, parcel to which includes the hashing of passwords to ensure security- only logged in users can make cards/add to the gallery, and only a card's author/owner can delete it from the server.

The app now also utilizes routing to take you to different, "views," and a context object to update multiple components at once via a global state. (There's a temperature switch which tells multiple components at once whether to display info in celsius or fahrenheit, and user info is often required for multiple components at various depths of the application).

## Links

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

-[git@github.com:Captaintastyshakes/se_project_express.git](https://github.com/Captaintastyshakes/se_project_express.git)

This is my github link to the code I wrote for project 13, as in the backend.
If you run this on your machine all you should need to do, in terminal, is 'npm run dev' to initialize the server on your machine. (After you install the requirements, of course.)

The same applies to the front end- assuming all requirements are installed all you should need to do is type 'npm run dev' in terminal to load my page at which point they, the front and back end, should play nicely together.

Cheers m80s!
