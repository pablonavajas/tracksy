## Install All Dependencies for the app

All the dependencies needed for this application are listed in the `package.json` file.
So, run from the commandline the following command to install all of those automatically: `npm install`.

## Used dependencies in this project

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
- nock (allows HTTP Server mocking for manipulating and asserting on HTTP responses and requests)
- async-wait-until (ensures repeatable and deterministic behaviour when fetching data for tests)

## Testing dependencies

- jest (test runner)
- enzyme (test utility)
- react-test-renderer
- enzyme-adapter-react-16
- `brew install watchman` (on mac getting rid of the fsevents is not a function error in testing)
-

## Other useful npm packages

- nodemon (utility that will monitor for any changes in your source and automatically restart your server)
- config (for global variables)
- express-validator (validate any body data that is coming in)
- mongoose (abstraction layer for adding data, deleting data, etc.)

## Other useful security-related npm packages

- bcryptjs (will handle hashing of passwords)
- jsonwebtoken (creates a jwt that is being sent back and forth and allows accessing protected routes on our server)

## How to install dependencies / npm packages

For any dependency: `npm i --save <name of dependency>`\
For development dependencies: `npm i -D <name of dependency>`\
Flag `--save` stores writes the name of the package installed into `package.json`.
Add a `-g` flag if dependency should be installed globaly.

## Project Structure Description

`src` folder - contains all the react components that are needed for normal application functionality\
`public` folder - contains all the public files (most important `index.html`)

`db.json` - file that has the data stored using json-server\
`package.json` - file that contains a list of all libraries/packages used,
configured scripts that can be run from the command line and development dependencies
`jest.config.js` - file with configuration for jest test runner
`babel.config.js` - configuration for Babel which transpiles ES6 to ES5

## Modifications in `package.json`

Create new scripts:

- `"json-server" : "json-server --watch db.json --port 5000"`
- `"dev" : "concurrently \"npm start\" \"npm run json-server\""`

Add proxy:

- `"proxy": "http://localhost:5000"`

## Testing Strategy for Front-End React Components

Test Runner (runs tests and provides validation library)

- Jest is used as the test runner in this project

Testing Utilities (mounting to a non-existing DOM and then traversing the components)

- Enzyme will be used as the testing utility in this project

Don't test:

- libraries
- complex connections

Do test:

- isolated units
- conditional outputs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Create a new react app in existing folder

Run `npx create-react-app .` in the project folder.

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