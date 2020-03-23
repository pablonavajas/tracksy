# Tracksy Application

This application is developed for relationship management of Venture Capital (VC) Funds, which also allows tracking their current investment portfolio. The application is built in django, with front-end handled by ReactJS.

## Running the project locally

In the root directory run the following:\
`pip3 install pipenv` - installs pipenv for creation of virtual environments \
`pipenv shell` - creates a virtual environment and creates a Pipfile \
`pipenv install django djangorestframework django-rest-knox` - installs django dependencies (django-rest-knox for token authentication) \
`pipenv install pylint-django` - this is optional, but it enables static checking of django code without actiually running it (useful for some editors like VSCode)

Change to the trakcsy directory `(cd tracksy)` and run the following:\
`python manage.py makemigrations leads` - creates db migrations \
`python manage.py migrate` - puts the table and columns into database:

Change back to the root directory `(cd ..)` and run the following:\
`npm install` - installs all the frontend/react dependencies\
`npm run dev` - compiles the fron-end code into a single javascript file

Finally to run the project change to the tracksy project directory `(cd tracksy)` and run:
`python manage.py runserver` - server should now be running on a localhost (if this link is copied to the browser, this will make the whole application accessible)\

## Root File Structure

The old file structure contains a backend and client/frontend folders as well as chrome-ext folder, however once react and django are integrated the front-end application runs within the backend/django directory, therefore there is a new file structure.

The new file structure of the root directory is explained below.
`chrome-ext` - chrome extension which allows extracting personal connections from a given LinkedIn account
`tracksy` - django project folder\
[`.babelrc`](https://babeljs.io/) - contains configuration for JavaScript transcompiler that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript that can be run by older JavaScript engines \
[`webpack.config.js`](https://webpack.js.org/) - contains configuration for webpack module bundler which bundles JavaScript modules with dependencies and generates static assets representing those modules\
`Pipfile` - contains information for the python/django dependencies of the project \
`Package.json` - contains information for the ReacJS dependencies of the project\
`.pylintrc` - configuration file for static code checker

## Tracksy Project File Structure

`accounts` - backend accounts app folder (used for backend authentication management)\
`frontend` - frontend app folder (used for ReactJS development) \
`startups` - backend startups folder (used for startups models setup and manageing HTTP requests)\
`tracksy` - main application folder (which combines all the applications into one project)\
`db.sqlite3` - local sqlite database (default with django) / to be changed to an AWS ran database
`manage.py` - python file that allows to run administrative tasks

When making changes in ReactJS, the the whole application has to be rebuilt,
otherwise the `main.js` will not change, and therefore changes will not be applied to the version running on a given host. `--watch` in `package.json` allows for `npm run dev` to run, everytime a change in files has occured, therefore recompiling the application and showing it in the browser straight away (with no manual re-run of the command).

## Front-end development instructions

Run `python manage.py runserver` from the tracksy directory, and simultaneously in another terminal run `npm run dev` in the root directory, which allows for continuous development, without having to restart the server or manually recompile/rebundle the code.

## Miscellaneous

`python manage.py startapp <appName>` - creates a new app called leads
