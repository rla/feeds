db.sqlite: schema/schema.sql
	sqlite3 $@ < $<
	sqlite3 $@ < schema/migrations/001_add_gplussed_column.sql
	sqlite3 $@ < schema/migrations/002_add_error_column.sql
	sqlite3 $@ < schema/migrations/003_published_index.sql
	sqlite3 $@ < schema/migrations/004_add_article_rowid.sql
