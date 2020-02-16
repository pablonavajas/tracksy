# How to run

## Create a new react app

Run `npx create-react-app .` in the project folder

## Used dependencies

- materialize-css
- react-materialize
- react-moment (provides time-stamps for when a USER has finished interaction with a component)
- moment
- redux (state-management)
- react-router-dom (to enable routing between pages)
- react-redux
- redux-thunk (piece of middleware for redux, allows making async functions inside functions)
- redux-devtools-extension (redux dev tools for chrome)

## Used dev dependencies

- [json-server](https://github.com/typicode/json-server) (development back-end / fake REST API)
- concurrently (run back-end and front-end server at the same time)

## Possible other dependencies

- nodemon (utility that will monitor for any changes in your source and automatically restart your server)
- config (for global variables)
- express-validator (validate any body data that is coming in)
- mongoose (abstraction layer for adding data, deleting data, etc.)

## Possible to use security dependencies

- bcryptjs (will handle hashing of passwords)
- jsonwebtoken (creates a jwt that is being sent back and forth and allows accessing protected routes on our server)

## How to install dependencies

For any dependency: `npm i <name of dependency>`

For development dependencies: `npm i -D <name of dependency>`

Add a `-g` flag if dependency should be installed globaly.

## Files

`db.json` - file that has the data stored using json-server

## Modifications in `package.json`

Create new scripts:

- `"json-server" : "json-server --watch db.json --port 5000"`
- `"dev" : "concurrently \"npm start\" \"npm run json-server\""`

Add proxy:

- `"proxy": "http://localhost:5000"`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
