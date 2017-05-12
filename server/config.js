const passport = require('passport');
const app = require('./index.js');
const auth = require('./auth.js')
const session = require('express-session');

app.use(passport.initialize());
app.use(passport.session());


passport.use(auth.facebookStrategy('/auth/facebook/return'));

passport.use(auth.googleStrategy('/auth/google/return'));

passport.use(auth.githubStrategy('/auth/github/return'));

passport.use(auth.localStrategy());

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/google', passport.authenticate('google', {
  scope: [ 'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profile.emails.read' ]
}));

app.get('/login/github', passport.authenticate('github'));

app.get('/login/local', passport.authenticate('local'));

app.get('/auth/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/#/login/facebook' }),
  function(req, res) {
    req.session.regenerate((err) => {
      if (err) {
        console.error(err);
      }
    })
    res.redirect('/#/');
  });

app.get('/auth/google/return',
  passport.authenticate('google', { failureRedirect: '/login/google' }),
  function(req, res) {
    req.session.regenerate((err) => {
      if (err) {
        console.error(err);
      }
    })
    res.redirect('/#/');
  });

app.get('/auth/github/return',
  passport.authenticate('github', { failureRedirect: '/login/github' }),
  function(req, res) {
    req.session.regenerate((err) => {
      if (err) {
        console.error(err);
      }
    })
    res.redirect('/#/');
  });

app.post('/login/local', 
  passport.authenticate('local', { failureRedirect: '/login/local' }),
  function(req, res) {
    req.session.regenerate((err) => {
      if (err) {
        console.error(err);
      }
    })
    res.send('validPassword');
  });