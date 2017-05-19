const knex = require('../db.js');
const bookshelf = require('bookshelf')(knex);

const Review = bookshelf.Model.extend({
  tableName: 'reviews'
});

const insertOne = (options, cb) => {
    Review
    .forge(options)
    .save()
    .then((data) => {
      return cb(data);
    })
    .catch((err) => {
      return cb(err);
    });
};

const fetchReviews = (podcastId, cb) => {
  Review
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



module.exports.Review = Review;
module.exports.insertOne = insertOne;
module.exports.fetch = fetchReviews;


