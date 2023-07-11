const express = require('express');
const app = express();
const url = require('url');
// Middleware to parse JSON requests
app.use(express.json());
const {isAuth} = require('./utile/util');
app.use(async function  (req, res, next) {
  const path = url.parse(req.url).pathname;
  if (path.includes('register') || path.includes('login') || path.includes('verify') ) {
    return next();
  }else{
    const auth = await isAuth(req)
    console.log(auth)
    if (auth) {
        return next();
    }
  }
  res.status(403).send("invalid token");
});

const authRoutes = require('./models/user.models');
require('./routes/offer.route')(app) ;
require('./routes/media.route')(app);
require('./routes/keywords.route')(app);
require('./routes/category.route')(app) ;
// Routes
app.use('/auth', authRoutes);
app.use('/public',express.static('public'));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});