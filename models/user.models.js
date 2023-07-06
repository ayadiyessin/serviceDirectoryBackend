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



// User login
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Retrieve the user from the database
      console.log(req.body)
      console.log("hethaa name",username);
      const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = result.rows[0];
      console.log("hethaa",user);
  
      // Check if the user exists and verify the password
      if (!user || !(await bcrypt.compare(password, user.password))) {
        console.log(username,password);
        res.status(401).json({ error: 'Invalid username or password' });
      } else {
        // Generate a JWT
        const token = jwt.sign({ userId: user.id }, 'your_secret_key');
  
        res.status(200).json({ token });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: 'failed',
        message:' erreur description'
        } );
    }
  });
  
  module.exports = router;