
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('googleId');
      table.string('facebookId');
      table.string('githubId');
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.boolean('admin').notNullable().defaultTo(false);
      table.timestamp('created_at', true).defaultTo(knex.raw('now()')).notNullable();
    }),

    knex.schema.createTable('podcasts', (table) => {
      table.increments('collectionId').primary().unique();
      table.string('collectionName');
      table.string('feedUrl');
      table.string('artistName');
    }),

    knex.schema.createTable('episodes', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('url');
      table.string('duration');
      table.string('pubDate');
      table.integer('collectionId');
    }),

    knex.schema.createTable('user_episodes', (table) => {
      table.increments('id').primary();
      table.integer('user_id');
      table.integer('podcast_id');
      table.integer('time');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('sessions', (table) => {
      table.string('sid').notNullable().collate('default');
      table.json('sess').notNullable();
      table.timestamp('expired').notNullable();

    }),

    knex.schema.createTable('user_sessions', (table) => {
      table.increments('id').primary();
      table.integer('user_id');
      table.string('sid');
    }),

    knex.schema.createTable('user_podcast', (table) => {
      table.increments('id').primary();
      table.integer('user_id');
      table.integer('podcast_id');
      table.integer('rating');
      table.boolean('favorite');
    }),

    knex.schema.createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('user_id');
      table.string('username');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.integer('podcast_id');
      table.string('summary',500);
      table.string('review', 2000);
    }),

    knex.schema.createTable('user_favorite_podcasts', (table) => {
      table.increments('id').primary();
      table.integer('user_id');
      table.string('feedUrl');
      table.string('collectionId').unique();
      table.string('artworkUrl100');
      table.string('collectionName');
      table.string('artistName');
    }),

    knex.schema.createTableIfNotExists('top_ten', (table) => {
      table.increments('id').primary();
      table.string('results', 5000);
    })

  ]);
};

exports.down = function(knex, Promise) {
   return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('podcasts'),
        knex.schema.dropTable('episodes'),
        knex.schema.dropTable('user_episodes'),
        knex.schema.dropTable('sessions'),
        knex.schema.dropTable('user_podcast'),
        knex.schema.dropTable('user_favorite_podcasts'),
        knex.schema.dropTable('reviews'),
        knex.schema.dropTable('top_ten')
    ])
};
