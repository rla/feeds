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

Log into the app and obtain the auth token from `/token`.

Then do a POST request to `/import` with a list of URLs. Example with curl:

    curl -X POST --data-binary @list.txt \
        http://localhost:3330/import?auth=ctmzgmjaxbasklhntwvh \
        --header 'Content-Type: text/plain'

Where `list.txt` is the file containing URLs and `ctmzgmjaxbasklhntwvh` is your auth token obtained in
the previous step.

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
Copyright (c) 2013-2017 Raivo Laanemets

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
