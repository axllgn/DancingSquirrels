const knex = require('../db.js');
const bookshelf = require('bookshelf')(knex);

const Session = bookshelf.Model.extend({
  tableName: 'sessions'
});


const verifySession = (sid, cb) => {
  console.log(sid)
    Session
    .forge()
    .where('sid', sid)
    .fetchAll()
    .then((data) => {
      if(data.length === 1){
        return cb(JSON.parse(JSON.stringify(data.models[0])).sess.passport.user)
      } else {
        return cb(null);
      }
    })
    .catch((err) => {
      return cb(err);
    });
};


module.exports.verifySession = verifySession;