const passport = require('passport');

module.exports = app => {


  app.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email'] }
  ));
  app.get('/auth/callback', passport.authenticate('google'), (req, res) => {
    console.log('callback called');
    res.redirect("/folder_list")
  });


  app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
  app.get('/api/user', (req, res) => {
    res.send(req.user);
  });
};
