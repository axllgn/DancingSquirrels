const knex = require('../db.js');
const bookshelf = require('bookshelf')(knex);

const UserPodcast = bookshelf.Model.extend({
  tableName: 'user_podcast'
});

const insertOne = (options, cb) => {
    UserPodcast
    .forge(options)
    .save()
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      return cb(err);
    });
};

const fetchPodcasts = (column, arr, cb) => {
  console.log('fetch podcast', column, arr, cb)
    UserPodcast
    .forge()
    .where(column, 'in', arr)
    .fetchAll()
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      return cb(err);
    });
};

const fetchAvgRating = (arr, cb) => {
  knex('user_podcast')
    .select(knex.raw('avg(rating) as rating, count(rating) as noofreviews, podcast_id'))
    .where(knex.raw('podcast_id in (' + arr.toString() + ')' ))
    .groupBy('podcast_id')
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      return cb(err);
    });
};

module.exports.UserPodcast = UserPodcast;
module.exports.insertOne = insertOne;
module.exports.fetch = fetchPodcasts;
module.exports.fetchAvgRating = fetchAvgRating;
