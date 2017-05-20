const knex = require('../db.js');
const VerifySession = require('./VerifySession.js')
const bookshelf = require('bookshelf')(knex);

const UserEpisodes = bookshelf.Model.extend({
  tableName: 'user_episodes'
});

const insertTime = (options, cb) => {

  fetchTime(options, (result)=>{
    //console.log(result)
    if(result){
      console.log(typeof result)
      UserEpisodes
        .forge()
        .where({user_id: options.user_id, episode_id: options.episode_id})
        .save({time: options.time}, {patch: true})
        .then((data)=>{
          return cb(data)
        })
        .catch((err)=>{
        })
    } else {
      UserEpisodes
        .forge(options)
        .save()
        .then((data) => {
          return cb(data);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  })

};

const fetchTime = (options, cb) => {
  console.log('fetchTime', options.user_id, options.episode_id)
  UserEpisodes
  .where({user_id: options.user_id, episode_id: options.episode_id})
  .orderBy('created_at', 'DESC')
  .fetch()
  .then((data)=>{
    //console.log(JSON.parse(JSON.stringify(data)).time)
    cb(JSON.parse(JSON.stringify(data)).time)
  })
  .catch((err) =>{
    cb(null)
  })
    // .forge()
    // .orderBy('created_at', 'DESC')
    // .where('podcast_id', podcastId)
    // .fetchAll()
    // .then((data) => {
    //   console.log(data)
    //   return cb(data);
    // })
    // .catch((err) => {
    //   return cb(err);
    // });
};

//fetchTime({user_id:2, episode_id:'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/3afeec89-2f18-4cab-94d5-6947049365bf.mp3'}, ()=>{});
//insertTime({user_id:5, episode_id:'https://dts.podtrac.com/redirect.mp3/rss.art19.com/episodes/3afeec89-2f18-4cab-94d5-6947049365bf.mp3', time:125}, ()=>{})


const lastPlayed = () => {
  
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


