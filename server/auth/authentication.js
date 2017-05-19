const passport = require('passport');
const app = require('../index.js');
const strategies = require('./strategies.js')
const session = require('express-session');
const authHelpers = require('./authHelpers.js');

app.use(passport.initialize());
app.use(passport.session());


passport.use(strategies.facebookStrategy('/auth/facebook/return'));

passport.use(strategies.googleStrategy('/auth/google/return'));

passport.use(strategies.githubStrategy('/auth/github/return'));

passport.use(strategies.localStrategy());

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

app.get('/loginLocal', passport.authenticate('local'));

app.get('/auth/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login/facebook' }),
  (req, res) => {
    authHelpers.sessionHandler(req);
    res.redirect(`/${req.session.passport.user}`);  
  });

app.get('/auth/google/return',
  passport.authenticate('google', { failureRedirect: '/login/google' }),
  (req, res) => {
  authHelpers.sessionHandler(req);
    res.redirect(`/${req.session.passport.user}`);
  });

app.get('/auth/github/return',
  passport.authenticate('github', { failureRedirect: '/login/github' }),
  (req, res) => {
    authHelpers.sessionHandler(req);
    res.redirect(`/${req.session.passport.user}`);
  });

app.post('/loginLocal', 
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    authHelpers.sessionHandler(req);
    res.send({ user: req.session.passport.user });
  });