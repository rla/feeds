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

$(bundle): $(bundle_deps)
	browserify --outfile $@ \
		--entry public/js/app.js \
		--require ./$(js)/knockout.js:knockout \
		--require ./$(js)/knockout.mapping.js:knockout.mapping

$(bundle_debug): $(bundle_deps)
	browserify --debug --outfile $@ \
		--entry public/js/app.js \
		--require ./$(js)/knockout.js:knockout \
		--require ./$(js)/knockout.mapping.js:knockout.mapping

$(bundle_min): $(bundle)
	uglifyjs $(bundle) -c -m > $@

clean:
	rm -f $(bundle)

check:
	jshint public/js/app.js app.js lib/

.PHONY: clean check