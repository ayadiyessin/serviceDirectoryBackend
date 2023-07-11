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
const getCategory = (request, response) => {
    pool.query('SELECT * FROM category ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const getCategoryById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM category WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const updateCategory = (request, response) => {
    const id = parseInt(request.params.id)

    const { name_cat,parent_id } = request.body;
   // const updated_at = new Date(); // Get the current date and time
  
    pool.query(
      'UPDATE category SET name_cat=$1,parent_id=$2 WHERE id = $3',
      [name_cat,parent_id,id],
      (error, results) => {
        if (error) {
          throw error;
        }
       
        response.status(201).send(`category updated with ID: ${id}`);
      }
    );
  };
  
  const createCategory = (request, response) => {
    const {name_cat,parent_id} = request.body;
    const created_at = new Date(); // Get the current date and time
  
    pool.query(
      'INSERT INTO category (name_cat,parent_id) VALUES ($1, $2) RETURNING id',
      [name_cat,parent_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        const categoryId = results.rows[0].id;
        response.status(201).send(`category added with ID: ${categoryId}`);
      }
    );
  };
  const deleteCategory = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM category WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`category deleted with ID: ${id}`)
    })
  };
  const createSubCategory = (request, response) => {
    const {name_cat} = request.body;
    const parent_id = parseInt(request.params.id)
        pool.query(
      'INSERT INTO category (name_cat,parent_id) VALUES ($1, $2) RETURNING id',
      [name_cat,parent_id],
      (error, results) => {
        if (error) {
          throw error;
        }
        const categoryId = results.rows[0].id;
        response.status(201).send(`category added with ID: ${categoryId}`);
      }
    );
  };

  
  module.exports = {
    getCategory,
    getCategoryById,
    createCategory,
    createSubCategory,
    updateCategory,
    deleteCategory,
    

  }

