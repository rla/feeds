all: db.sqlite

db.sqlite: schema/schema.sql
	sqlite3 $@ < $<
	sqlite3 $@ < schema/migrations/001_add_gplussed_column.sql

clean:
	rm -f db.sqlite

check:
	jshint public/js/app.js app.js lib/

.PHONY: clean check