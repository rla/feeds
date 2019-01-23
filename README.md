# feeds

My personal web-based replacement for Google Reader and other feed readers. It tracks
seen/read/important articles and is built for speed. I currently follow
about 600 feeds and some readers had trouble coping with this amount of feeds.

## How does it work



## How is it built

The application runs on NodeJS. Feeds are parsed with [fast-feed](https://github.com/rla/fast-feed)
which uses [RapidXML](http://rapidxml.sourceforge.net/) internally to parse the feed and extract
the interesting data.

The user interface uses a (custom) [Bootstrap](http://twitter.github.io/bootstrap/) stylesheet. I only
selected the parts of Bootstrap that I needed. SQLite is used as the database on the server side.

Since 2017-07-01, the user interface has been rewritten in React. There is no difference
in functionality compared to the previous versions, however. The previous user interface
was developed with Knockout.js.

My live app is running at [http://feeds.rlaanemets.com/](http://feeds.rlaanemets.com/).

## Installing

 1. First install dependencies using `npm install --production`.
 2. Then create database using `make db.sqlite`.
 3. Then copy `config.example.json` to `config.json`.
 4. Run app with `NODE_ENV=production node dist`.

## Importing feed addresses

Use the textarea on top of the "Feeds" list to enter a list of urls.
Invalid urls and feeds will later be shown under "Invalid". The urls have to point
directly to newsfeeds. The newsfeed urls are currently not extracted from
site urls!

## Technology

The project has become my personal playground to test various frontent (mostly) libraries.
The whole project is type-checked and compiled by TypeScript. This has made it easier to
refactor although it causes some friction with libraries that have no types available or
are very dynamic to have useful types.

### Architecture

The application is built as a Single Page Application (SPA) with a server-side
backend. The backend manages the database, fetches newsfeeds periodically, and
provides a REST API for the frontend.

Backend:

 * [Express][express] web framework.
 * SQLite database.
   - Uses package `node-sqlite` for Promise-based access.
   - Custom transaction manager in `src/lib/db`.
 * [Fast-feed][fast-feed] RSS/Atom parser.
   - This package was developed for this application although
     it has been used by others too.

[express]: https://expressjs.com/
[fast-feed]: https://github.com/rla/fast-feed

Backend files:

 * `src` - source tree (TypeScript).
 * `src/index.ts` - application entrypoint.
 * `Makefile` - helper to create an initial database state.
 * `schema/schema.sql` - database schema.
 * `schema/migrations` - migrations applied after the initial schema.

Frontend:

 * React view library.
 * Redux state store.
   - Uses package `redux-thunk` for async actions.
   - Typesafe actions, reducers, and state with TypeScript.
 * Typesafe REST API with shared types between frontend and backend.
 * Compiled and bundled through Webpack.
   - Separated external libraries bundle.
 * UI elements use Bootstrap 2 default styles.
   - It should be upgraded but I have not decided yet what to use.
   - There is an opportunity to use CSS-in-JS approach. This approach
     must support style sharing between global (h1, a, etc) elements
     and between specific classes. I tried to use Typestyle for this
     but it has no sharing support.
   - Developing a custom design from scratch is a lot of work.

Frontend files:

 * `public/js/app` - SPA source (TypeScript).

### Code style

Source code style is checked by [TSLint][tslint] with minimal
customization of the default rules.

[tslint]: https://palantir.github.io/tslint/

### Building

Build backend:

```
npm run backend-compile
```

This creates `dist` directory. The backend code is ran by running:

```
node dist
```

Build frontend (production bundle):

```
npm run frontend-compile-production
```

or (development bundle in watch mode):

```
npm run frontend-compile-development
```

This will create either files `X.production.bundle.js` or `X.development.bundle.js`.
The right file is selected by the bootstrapping HTML view which uses NODE_ENV
environment variable provided to the backend node process. The production bundle is
checked into git.

### Testing

Unit testing for frontend is implemented using [jest][jest].

[jest]: https://jestjs.io/

Running frontend tests:

```sh
npm run frontend-test
```

Running backend tests:

```sh
npm run backend-test
```

What is tested?

 * Redux reducers. It is checked that the state is correctly
   transformed according to the dispatched actions.
 * Redux actions including async actions. Api is mocked and
   actions are checked to create correct actions.
 * Shallow rendering of React components to catch potential crashes.
 * Some backend functionality is unit-tested.
 * More cases can be easily added to the existing tests.

### Toolset configuration

The project contains the following toolset configuration files (as
a future reference for a similar project):

 * `package.json` - standard NPM configuration for the project.
 * `jest.backend.config.js` - Jest configuration for the backend tests.
 * `jest.frontend.config.js` - Jest configuration for the frontend tests. Differs
   by the TypeScript configuration file location and some plugins.
 * `tslint.json` - TSLint configuration.
 * `src/tsconfig.json` - TypeScript configuration for the backend.
 * `public/js/app/tsconfig.json` - TypeScript configuration for the frontend. Has support
   for JSX.
 * `webpack.config.js` - Webpack configuration for the frontend.

## Changelog

2019-01-22: Port to TypeScript + Redux. Unit tests.

2017-07-01: UI rewrite to React.

2016-12-30: Upgrading to version 0.2.0 requires a migration, run with:

    sqlite3 db.sqlite < schema/migrations/004_add_article_rowid.sql

## Debugging

To start fetching of feeds immediately, start the app with `-f` switch:

    node dist -f

TODO: debug package.

## Misc

App's favicon is from [favicon.cc](http://www.favicon.cc/?action=icon&file_id=360427), made by Jason.

## License

The MIT License.

```
Copyright (c) 2013-2019 Raivo Laanemets

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software,
and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
```
