# Tracksy Application

This application is developed for relationship management of Venture Capital (VC) Funds and the Portfolio Companies (PC)s that they have invested in. The application allows for VCs to track their current investment portfolio as well as metadata submitted by the PCs on a regular basis. The application is built in django, with front-end handled by ReactJS.

## Installing dependencies

**From root directory run the following:**\
`pip3 install pipenv` - installs pipenv for creation of virtual environments \
`pipenv shell` - creates a virtual environment and creates a Pipfile \
`pipenv install django djangorestframework django-rest-knox` - installs django dependencies (django-rest-knox for token authentication) \
`pipenv install pylint-django` - this is optional, but it enables static checking of django code without actually running it (useful for some editors like VSCode)

**From first level trakcsy directory run:**\
`python manage.py makemigrations` - creates db migrations \
`python manage.py migrate` - puts the table and columns into database:
`npm install` - installs all the frontend/react dependencies

## Running the project locally

**From first level trakcsy directory run:**\
`python manage.py runserver` - server should now be running on a localhost (the link can now be used in the browser)

## Using the Chrome Extension
1. Run project locally and **register a user**
1. Open Google Chrome
1. Navigate to Chrome Extensions: `chrome://extensions/`
1. Enable **Developer Mode**
1. Click **Load Unpacked**
1. Select `chrome-ext/main/` folder
1. Enable the loaded extension

## Root File Structure

**The file structure of the root directory is explained below.**\
`chrome-ext` - chrome extension which allows extracting personal connections from a given LinkedIn account\
`tracksy` - django project folder (first level directory that is called tracksy)\
[`babel.config.js`](https://babeljs.io/) - contains configuration for JavaScript transcompiler that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript that can be run by older JavaScript engines \
[`webpack.config.js`](https://webpack.js.org/) - contains configuration for webpack module bundler which bundles JavaScript modules with dependencies and generates static assets representing those modules\
`jest.config.js` - is the jest configuration file, with ModuleNameMapper spcifying how to interpret the .css files\
`Pipfile` - contains information for the python/django dependencies of the project \
`package.json` - contains information for the ReacJS dependencies of the project\
`.pylintrc` - configuration file for static code checker (useful for VSCode)\
`package-lock.json` - automatically generated file that describes the exact node_modules tree or package.json configuration, such that installs from another system are able to generate the same tree, regardless of intermediate dependency updates\
`Pipfile.lock` - specifies, based on the packages present in Pipfile, which versions of those should be used, maintaining the consistency in the dependency tree even if installed from another system

## Tracksy Project File Structure

`accounts` - backend accounts app folder (used for backend authentication management)\
`frontend` - frontend app folder (used for ReactJS frontend application) \
`startups` - backend startups folder (used for startups models and APIs)\
`tracksy` - main application folder (which combines all the applications listed above into one project running on one host)\
`db.sqlite3` - local sqlite database (default with django)\
`manage.py` - python file that allows to run administrative tasks

## Front-end development instructions

**From root run :**\
`npm run dev` - compiles the fron-end code into a single javascript file, namely `main.js`.

When making changes in ReactJS, the the whole application has to be rebuilt, otherwise the `main.js` will not change, and therefore changes will not be applied to the version running on a given host. `--watch` flag in `package.json` for the `npm run dev` command allows it to run everytime a change in files has occured, therefore recompiling the application and showing it in the browser straight away (with no manual re-run of the command).

**From first level trakcsy directory run:**\
`python manage.py runserver` allows the server to be running continuosly on the localhost

Both commands above have to be run simultaneously from two different terminal windows, which allows for continuous development, without having to restart the server or manually recompile/rebundle the code.

## Front-end Unit Tests 

**From root run:**\
`npm run test` - runs all the test suites created\
`npm run coverage` - runs the test suites and displays the coverage of the frontend codebase

If major changes made to the testing setup or project structure, run `jest --clearCache` or `yarn jest --clearCache` if yarn package manager is installed.

## Back-end Tests
### Unit Tests
**From first level tracksy directory run:**
`python manage.py test`
### Integration Test / Database filling
**From first level tracksy directory run:** \
`python manage.py runserver` - runs the server on the local host\
`python pre_fill.py` - fills the database with dummy data by sending requests to the APIs\

## Chrome Extension Unit Tests
**Frome `chrome-ext` folder run:**
`npm test`

## Selenium Tests
**From root run :**\
`pipenv install selenium` - installs Selenium dependencies\
`Install web driver according to your personal system`
- Tested using Chromedriver version 81.0.4044.138:(available at https://chromedriver.chromium.org/downloads) 
`python3 RegisterTest.py`
`python3 LoginTest.py`
`python3 AddingStartupTest.py`

