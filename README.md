# feeds

My personal web-based replacement for Google Reader and other feed readers. It tracks
seen/read/important articles and is built for speed. I currently follow
about 400 feeds and some readers had trouble coping with this amount of feeds.

## How is it built

The application runs on NodeJS. Feeds are parsed with [fast-feed](https://github.com/rla/fast-feed)
which uses [RapidXML](http://rapidxml.sourceforge.net/) internally to parse the feed and extract
the interesting data.

The user interface uses the (custom) [Bootstrap](http://twitter.github.io/bootstrap/) stylesheet. I only
selected the parts of Bootstrap that I needed. The UI is built as a single-page app on the
[KnockoutJS](http://knockoutjs.com/) framework. It uses two additional small libs for routing
and XHR handling. SQLite is used as database on the server side.

My live app is running at [http://feeds.rlaanemets.com/](http://feeds.rlaanemets.com/).
Warning: it might not work with old browsers. IE8 is certanly old by my definition :).

## License

The MIT License.

```
Copyright (c) 2013 Raivo Laanemets

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
