all: db.sqlite

db.sqlite: schema/schema.sql
	sqlite3 $@ < $<

clean:
	rm -f db.sqlite

check:
	jshint public/js/app.js app.js lib/

.PHONY: clean check