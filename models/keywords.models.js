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

  const getKeywordsById_offer = (request, response) => {
    const id_offer = parseInt(request.params.id)
  
    pool.query('SELECT * FROM keywords WHERE id_offer = $1', [id_offer], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createKeywords = (request, response) => {
    const { id_offer,name_keywords } = request.body;
    //const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO keywords (id_offer,name_keywords) VALUES ($1, $2) RETURNING id',
      [id_offer,name_keywords],
      (error, results) => {
        if (error) {
          throw error;
        }
        const keywordsId = results.rows[0].id;
        response.status(201).send(`keywords added with ID: ${keywordsId}`);
      }
    );
  };
  
  
  module.exports = {

    getKeywordsById_offer,
    createKeywords,
    
  }

