const knex = require('../db.js');
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

module.exports.UserEpisodes = UserEpisodes;
module.exports.insertOne = insertOne;
module.exports.fetch = fetchReviews;


