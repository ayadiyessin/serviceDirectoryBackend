const express = require('express');
const app = express();
// Middleware to parse JSON requests
app.use(express.json());

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