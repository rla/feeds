# feeds

My personal web-based replacement for Google Reader and other feed readers. It tracks
seen/read/important articles and is built for speed. I currently follow
about 600 feeds and some readers had trouble coping with this amount of feeds.

## How is it built

The application runs on NodeJS. Feeds are parsed with [fast-feed](https://github.com/rla/fast-feed)
which uses [RapidXML](http://rapidxml.sourceforge.net/) internally to parse the feed and extract
the interesting data.

The user interface uses the (custom) [Bootstrap](http://twitter.github.io/bootstrap/) stylesheet. I only
selected the parts of Bootstrap that I needed. The UI is built as a single-page app on the
[KnockoutJS](http://knockoutjs.com/) framework. It uses two additional small libs for routing
and XHR handling. SQLite is used as database on the server side.

Since 01-07-2017 the user interface has been rewritten in React. There is no difference
in functionality, however.

My live app is running at [http://feeds.rlaanemets.com/](http://feeds.rlaanemets.com/).

## Installing

 1. First install dependencies using `npm install --production`.
 2. Then create database using `make db.sqlite`.
 3. Then copy `config.example.json` to `config.json`.
 4. Run app with `NODE_ENV=production node app.js`.

## Importing feed addresses

Use the textarea on top of the "Feeds" list to enter a list of urls.
Invalid urls and feeds will later be shown under "Invalid".

## Technology

The project has become my personal playground to test various frontent (mostly) libraries.
The whole project is type-checked and compiled by TypeScript. This has made it easier to
refactor although it causes some friction with libraries that have no types available or
are very dynamic to have useful types.

### Architecture

Backend:

 * SQLite database.
   - Uses package `node-sqlite` for Promise-based access.
   - Custom transaction manager in `src/lib/db`.

Frontend:

 * React view library.
 * Redux state store.
   - Uses package `redux-thunk` for async actions.
   - Typesafe actions, reducers, and state with TypeScript.
 * Typesafe REST API with shared types between frontend and backend.
 * Compiled and bundled through Webpack.
   - Separated external libraries.

### Testing

Testing for frontend is implemented using [jest][jest].

Running frontend tests:

```sh
npm run test-frontend
```

What is tested?

 * Shallow rendering of React components to catch potential crashes.
 * More cases can be easily added to the existing tests.

## Changelog

2017-07-01: UI rewrite to React.

2016-12-30: Upgrading to version 0.2.0 requires a migration, run with:

    sqlite3 db.sqlite < schema/migrations/004_add_article_rowid.sql

## Debugging

To start fetching of feeds immediately, start the app with `-f` switch:

    node app.js -f

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
