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
const getOffer = (request, response) => {
    pool.query('SELECT * FROM offer ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const getOfferById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM offer WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const updateOffer = (request, response) => {
    const id = parseInt(request.params.id)

    const { name,title,description,shortdescription,url,type,expiration,keywords } = request.body;
    const updated_at = new Date(); // Get the current date and time
  
    pool.query(
      'UPDATE offer SET name=$1,title=$2,description=$3,shortdescription=$4,url=$5,type=$6,expiration=$7,updated_at=$8 , keywords=$9 WHERE id = $10',
      [name,title,description,shortdescription,url,type,expiration,updated_at,keywords,id],
      (error, results) => {
        if (error) {
          throw error;
        }
       
        response.status(201).send(`offer updated with ID: ${id}`);
      }
    );
  };
  
  const createOffer = (request, response) => {
    const { name,title,description,shortdescription,url,type,expiration,keywords } = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO offer (name,title,description,shortdescription,url,type,creation,updated_at,expiration,keywords) VALUES ($1, $2, $3, $4, $5, $6, $7, $7, $8, $9) RETURNING id',
      [name,title,description,shortdescription,url,type,created_at,expiration,keywords],
      (error, results) => {
        if (error) {
          throw error;
        }
        const offerId = results.rows[0].id;
        response.status(201).send(`offer added with ID: ${offerId}`);
      }
    );
  };
  const deleteOffer = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM offer WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`offer deleted with ID: ${id}`)
    })
  };
  
  module.exports = {
    getOffer,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer

  }

