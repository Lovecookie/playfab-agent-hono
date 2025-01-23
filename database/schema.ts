import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';



export const todos = sqliteTable('todos', {
	idx: integer('id', {mode: 'number'}).primaryKey({autoIncrement: true}),
	name: text('name'),
	isCompleted: integer('isCompleted', {mode: 'boolean'})
		.notNull()
		.default(false),
});