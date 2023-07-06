const express = require('express');
const app = express();
const authRoutes = require('./models/user.models');

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});