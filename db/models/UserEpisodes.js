const knex = require('../db.js');
const VerifySession = require('./VerifySession.js')
const bookshelf = require('bookshelf')(knex);

const UserEpisodes = bookshelf.Model.extend({
  tableName: 'user_episodes'
});

const insertTime = (options, cb) => {
    UserEpisodes
    .forge(options)
    .save()
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      return cb(err);
    });
};

const fetchTime = (options, cb) => {
  UserEpisodes
    .forge()
    .orderBy('created_at', 'DESC')
    .where('podcast_id', podcastId)
    .fetchAll()
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      return cb(err);
    });
};

const lastPlayed = () => {
  
}

var testOption = {
  user_id: 1,
  episode_id: 'www.url.something',
  time: 120,
}

/*
    knex.schema.createTable('user_episodes', (table) => {
      table.increments('id').primary();
      table.integer('user_id');
      table.string('episode_id');
      table.integer('time');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      */

module.exports.UserEpisodes = UserEpisodes;
module.exports.fetchTime = fetchTime;
module.exports.insertTime = insertTime;


