js = public/js
bundle = $(js)/bundle/all.js
bundle_min = $(js)/bundle/all.min.js
bundle_debug = $(js)/bundle/all.debug.js
bundle_deps = $(js)/app.js

all: $(bundle) $(bundle_min) $(bundle_debug)

db.sqlite: schema/schema.sql
	sqlite3 $@ < $<
	sqlite3 $@ < schema/migrations/001_add_gplussed_column.sql
	sqlite3 $@ < schema/migrations/002_add_error_column.sql
	sqlite3 $@ < schema/migrations/003_published_index.sql
	sqlite3 $@ < schema/migrations/004_add_article_rowid.sql

$(bundle): $(bundle_deps)
	node_modules/.bin/browserify --outfile $@ \
		--entry public/js/app.js \
		--require ./$(js)/knockout.js:knockout \
		--require ./$(js)/knockout.mapping.js:knockout.mapping

$(bundle_debug): $(bundle_deps)
	node_modules/.bin/browserify --debug --outfile $@ \
		--entry public/js/app.js \
		--require ./$(js)/knockout.js:knockout \
		--require ./$(js)/knockout.mapping.js:knockout.mapping

$(bundle_min): $(bundle)
	node_modules/.bin/uglifyjs $(bundle) -c -m > $@

clean:
	rm -f $(bundle)

.PHONY: clean
