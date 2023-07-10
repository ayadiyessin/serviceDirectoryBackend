const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'opportunite',
  password: '20055401',
  port: 5432,
})

module.exports = pool;
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const {username,password } = req.body;
    console.log("bd", req.body);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hash", hashedPassword);
    // Store the user in the database
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);


    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// User login
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Retrieve the user from the database
      const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = result.rows[0];
  
      // Check if the user exists and verify the password
      // || !(await bcrypt.compare(password, user.password))
      if (!user || !(await bcrypt.compare(password, user.password)) ) {
        console.log(username,password);
        res.status(401).json({ error: 'Invalid username or password' });
      } else {
        // Generate a JWT
        const token = jwt.sign({ userId: user.id }, 'your_secret_key');
        
  
        res.status(200).json({ token,user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 'failed',
        message:' erreur description'
        } );
    }
  });
  router.get('/verify', async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    try {
         const jt = await jwt.verify(token, 'your_secret_key');
         res.status(200).send(true);
         //do something
    } catch (error) {
         res.status(401).send("Unauthorized");
     }
     
})
  
  module.exports = router;