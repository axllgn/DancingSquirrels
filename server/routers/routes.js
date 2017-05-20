const express = require('express');
const UserModel = require('../../db/models/User.js');
const UserPodcastModel = require('../../db/models/User_Podcast.js');
const UserEpisodesModel = require('../../db/models/UserEpisodes.js');
const UserFavoritePodcastModel = require('../../db/models/User_Favorite_Podcast.js');
const verifySession = require('../../db/models/VerifySession.js').verifySession;
const ReviewModel = require('../../db/models/Review.js');
const utils = require('../utils.js');
const session = require('express-session');
const passport = require('passport');
const authHelpers = require('../auth/authHelpers.js');
const sessionHelpers = require('../auth/sessionHelpers.js');
const SessionModel = require('../../db/models/Session.js');
const TopTenModel = require('../../db/models/TopTen.js');
const Promise = require('bluebird');
const path = require('path');
const router = express.Router();

// router.route('/')
//   .get((req, res) => {
//     console.log(":::::::::::::::THIS SHOUDNT SHOW:::::::::::::");
//     res.status(200).sendFile('/index.html');
//   });

router.route('/logout')
  .get((req, res) => {
    sessionHelpers.store.destroy(req.sessionID);
    req.session.destroy();
    res.redirect('/');
  })

router.route('/topTen')
  .get((req, res) => {
    TopTenModel.fetchCollection((collection) => {
      Promise.map(collection.models, (model) => {
        return JSON.parse(model.attributes.results);
      })
      .then((results) => {
        if (results.length === 0) {
          utils.fetchTopTen((err, topTen) => {
            res.send(topTen)
          })
        } else {
          res.send(results);
        }
      })
    })
  })

router.route('/favorite/:id')
  .delete((req, res) => {
    // console.log('req.params.id', req.params.id);
    UserFavoritePodcastModel.destroy(req.params.id, (result) => {
      res.send(result);
    });
  });

router.route('/favorite')
  .get((req, res) => {
    //console.log('testing cookie', req.query.username)
    verifySession(req.sessionID, function(dbUserName){
      //console.log('testing cookie ids', req.query.username, dbUserName)
      if(dbUserName === req.query.username){
        UserModel.fetch(req.query.username, (result) => {
          // console.log('favorite: ', result);
          UserFavoritePodcastModel.fetchFavoritePodcasts(result.id, (data) => {
            // console.log('data', data);
            console.log('testing cookie data')
            res.send(data);
          });
        });
      }
    })
  });

router.route('/favorite')
  .post((req, res) => {
    verifySession(req.sessionID, function(dbUserName){
      if(dbUserName === req.body.username){
        UserModel.fetch(req.body.username, (result) => {
          let options = {
            user_id: result.id,
            feedUrl: req.body.feedUrl,
            collectionId: req.body.collectionId,
            artworkUrl100: req.body.artworkUrl100,
            collectionName: req.body.collectionName,
            artistName: req.body.artistName
          };

          UserFavoritePodcastModel.insertOne(options, (data) => {
            res.send(data);
          });
        });
      } else {
        res.status(404).send()
      }
    })
  });

router.route('/signup')
  .post((req, res) => {
    UserModel.insertOne(req.body.username, req.body.password, (results)=> {
      if (results.name === 'error') {
        res.send('error');
      } else {
        res.send('success');
      }
    });
  });

router.route('/search')
  .post((req, res) => {
    //console.log('------------Search Query-----------:', req.body.search);
    let url = `https://itunes.apple.com/search?term=${req.body.search}&country=US&entity=podcast&media=podcast&limit=10`;
    utils.fetchCollections(url, (err, results) => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send('We are experiencing some technical difficulties...');
      }
    });
  });

  router.route('/menu')
  .post((req, res) => {
    let url = `https://itunes.apple.com/search?term=podcast&genreId=${req.body.menuItem}&limit=10`;
    utils.fetchCollections(url, (err, results) => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send('We are experiencing some technical difficulties...');
      }
    });
  });

router.route('/podcast')
  .post((req, res) => {
    let url = req.body.feedUrl;
    let collectionId = req.body.collectionId;
    utils.fetchEpisodes(url, collectionId, (err, results) => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send('Oopsies...seems we are down!');
      }
    });
  });

router.route('/search-rating')
 .get((req, res) => {
   UserPodcastModel.fetchAvgRating(req.query.collectionIds, results => {
     if (results) {
       res.status(200).send(results);
     } else {
       res.status(503).send('Service Unavailable');
     }
   });
 });

router.route('/addRating')
 .post((req, res) => {
   //console.log(req.sessionID);
   UserModel.fetch(req.body.username, (result) => {
    var dataToInsert = {
      podcast_id: req.body.collectionId,
      rating: parseInt(req.body.rating),
      user_id: result.id
   };
     UserPodcastModel.insertOne(dataToInsert, results => {
       //console.log(results);
       if (results) {
         res.status(200).send('success');
       } else {
         res.status(404).send('error');
       }
     });
   });
 });

router.route('/get-reviews')
 .get((req, res) => {
   ReviewModel.fetch(req.query.collectionId, results => {
     if (results) {
       res.status(200).send(results);
     } else {
       res.status(503).send('Service Unavailable');
     }
   });
 });

router.route('/post-review')
 .post((req, res) => {
   UserModel.fetch(req.body.username, (result) => {
    console.log('post review result', result)
    var dataToInsert = {
      podcast_id: req.body.collectionId,
       summary: req.body.summary,
       review: req.body.review,
       user_id: result.id,
       username: req.body.username
      };
     ReviewModel.insertOne(dataToInsert, results => {
       //console.log(results);
       if (results) {
         res.status(200).send('success');
       } else {
         res.status(404).send('error');
       }
     });
   });
 });

router.route('/getUser')
  .get((req, res) => {
    console.log('get user', req.session.passport, req.session.passport.user)
    if (req.session.passport && req.session.passport.user) {
      res.send({ user: req.session.passport.user });
    } else {
      res.send({ user: '' });
    }
  });

router.route('/played')
  .get((req, res) => {
    UserModel.fetch(req.query.username, (result)=>{
    var options = {
       user_id: result.id,
       episode_id: req.query.episode_id
      };
      UserEpisodesModel.fetchTime(options, (data)=>{
        var string = JSON.stringify(data)
        res.status(200).send(string);
      }) 
    })
  })

router.route('/played')
    // send update time to database
 .post((req, res) => {
  //console.log('req.body.username', req.body.username)
   UserModel.fetch(req.body.username, (result) => {
    var dataToInsert = {
       user_id: result.id,
       episode_id: req.body.episode_id,
       time: req.body.time
      };
     UserEpisodesModel.insertTime(dataToInsert, results => {
       //console.log(results);
       if (results) {
         res.sendStatus(200).send('success');
       } else {
         res.status(404).send('error');
       }
     });
   });
 });

router.route('/login')
  .get((req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/../../client/index.html'));
  })

router.route('/*')
  .get((req, res) => {
    verifySession(req.sessionID, function(dbUserName){
      //console.log('testing cookie ids', req.url.substring(1), dbUserName, req.sessionID);
      if(dbUserName === req.url.substring(1)){
        res.status(200).sendFile(path.join(__dirname + '/../../client/index.html'));
      }
      else {
        res.redirect('/login');
      }
    })
    //console.log('*********** star route **********');
  })


module.exports = router;
