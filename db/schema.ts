import {sqliteTable, text, integer} from 'drizzle-orm/sqlite-core'

export const moviesTable = sqliteTable('movies', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    poster_path: text('poster_path').notNull(),
    vote_average: integer('vote_average').notNull(),
    release_date: text('release_date').notNull(),
})

export const trendingMoviesTable = sqliteTable('trending_movies', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    poster_url: text('poster_url').notNull(),
    index: integer('index').notNull(),
})

export const movieDetailsTable = sqliteTable('movie_details', {
    id: integer('id').primaryKey(),
    title: text('title').notNull(),
    release_date: text('release_date'),
    runtime: text('runtime'),
    vote_average: integer('vote_average').notNull(),
    vote_count: integer('vote_count').notNull(),
    overview: text('overview'),
    genres: text('genres'),
    budget: integer('budget'),
    revenue: integer('revenue'),
    production_companies: text('production_companies'),
})

