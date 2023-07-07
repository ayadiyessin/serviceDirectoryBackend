const express = require('express');
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'opportunite',
  password: '20055401',
  port: 5432,
})
module.exports=pool ;

  const getMediaById_offer = (request, response) => {
    const id_offer = parseInt(request.params.id)
  
    pool.query('SELECT * FROM media WHERE id_offer = $1', [id_offer], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createMedia = (request, response) => {
    const { id_offer,name } = request.body;
    //const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO media (id_offer,name) VALUES ($1, $2) RETURNING id',
      [id_offer,name],
      (error, results) => {
        if (error) {
          throw error;
        }
        const mediaId = results.rows[0].id;
        response.status(201).send(`media added with ID: ${mediaId}`);
      }
    );
  };
  
  
  module.exports = {

    getMediaById_offer,
    createMedia,
    
  }

