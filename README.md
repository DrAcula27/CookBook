<h1 align="center">Welcome to My Cook Book Recipe Saver!</h1>

> A fully functional web application that allows users to search for, view, and save recipes. The application also supports searching for a recipe by name or filtering recipes by multiple criteria.

## Features

- Anyone not logged in can:
  - Search for recipes using multiple criteria including:
    - Area, i.e. what country the recipe is from (e.g. American)
    - Category, i.e. what type of dish it is (e.g. Breakfast or Vegetarian)
    - Ingredient, i.e. an ingredient in the recipe
  - Create an account or log in.
- Logged in users can perform all of the above _plus_:
  - Save recipes for future reference.
  - View saved recipes on their profile page.

## Demo

### Live Link

[My Cook Book Recipe Saver](https://cook-book-g2cf.onrender.com/)

## Screenshots

### Home

<kbd>
  <img src="./src/assets/img/screenshot-home.png" />
</kbd>

### View One or More Recipes

<kbd>
  <img src="./src/assets/img/screenshot-view_recipes.png" />
</kbd>

### View A Recipe's Details

<kbd>
  <img src="./src/assets/img/screenshot-view_recipe_details.png" />
</kbd>

### User Profile

<kbd>
  <img src="./src/assets/img/screenshot-profile.png" />
</kbd>

## Installation

To run the app locally:

1. Clone the repository.
1. Navigate to the root directory.
1. Install dependencies using `npm install`.
1. Create an account with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
1. Create a collection called "CookBookData.
1. Create a `.env` file in the root directory and set the following environment variables:
   - `MONGOUSERNAME`
   - `MONGOPASSWORD`
   - `SESSION_SECRET`

## Technologies Used

This project uses the MERN stack.

- <img src="https://raw.githubusercontent.com/mongodb/mongo/master/docs/leaf.svg" width="20" height="20" /> [MongoDB](https://www.mongodb.com/)
- <img src="https://raw.githubusercontent.com/expressjs/expressjs.com/gh-pages/images/favicon.png" width="20" height="20" /> [Express](https://expressjs.com/)
- <img src="https://raw.githubusercontent.com/facebook/react/main/fixtures/attribute-behavior/public/favicon.ico" width="20" height="20" /> [React](https://reactjs.org/)
- <img src="https://1.bp.blogspot.com/-sqAjIvOtpXI/XYoCmqOyMwI/AAAAAAAAJig/CowR8wgEauEs-RXN2IPmLYkC7NHoHuA3gCLcBGAsYHQ/s1600/node-js-logo.png" width="20" height="20" /> [Node](https://nodejs.org/en/)

Other technologies used include:
| Auth | Styling | Search/Filter |
| --- | --- | --- |
| Passport | Skeleton.css | Axios |
| Express-session | Custom CSS | React-Select |
| Bcrypt | FontAwesome Icons | TheMealDB API |

## Author

👤 **Danielle Andrews**

- Github: [@DrAcula27](https://github.com/DrAcula27)
- LinkedIn: [@daniellerandrews](https://linkedin.com/in/daniellerandrews)

## Available Scripts

**This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).**

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Future Work

- [ ] Incorporate an e-commerce aspect to the application where:
  - [ ] users can add recipe ingredients to a shopping cart and
  - [ ] email a shopping list or "purchase" the ingredients.
- [ ] Add ability to allow users to manage their account. This includes:
  - [ ] updating their email and/or password and
  - [ ] deleting their account.
- [ ] Add ability for logged-in users to create, read, update, and delete (CRUD) their own recipes.
  - _User-generated recipes will only be viewable by users that are logged-in and on their profile page._

## Attributions

- Inspiration for this project was twofold:
  1. Dealing with all the annoyances of current recipe blogs that need to tell the life story of the author before getting to the recipe.
  1. Not being able to have a central location for all the recipes I like, plus the ones handed down from my family.
- Cookbook icon is created by Flat Icons - [flaticon](https://www.flaticon.com/free-icons/recipe).
- All other icons are from [FontAwesome](https://fontawesome.com/).
- CSS boilerplate is from [Skeleton](http://getskeleton.com/).

## Show Your Support

Give a ⭐️ if you liked this project!
