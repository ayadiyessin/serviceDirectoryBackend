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
// photo
const multer=require ('multer');
  const storage = multer.diskStorage({
      destination: (request, file, cb) => {
          
          cb(null,'images');
      },
      filename: (request, file, cb) => {
         const fileName = file.originalname.toLowerCase().split(' ').join('-');
         cb(null, fileName)
         return file.originalname;
      }
  });
  const delate= async(req , res)=>{

    // delte image 
    var fs = require('fs');
      const id = parseInt(req.params.id);
   
      const media= await pool.query(
        'select * from  media WHERE  id = $1',
        [id],)
        if(media.rowCount>0){
          const photo=media.rows[0].photo;
          var filePath = './public/'+photo; 
          if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            
          }
         
        }
        else{
          res.status(404).send('media not founds');
        }
        // delate image

    const url = req.protocol + '://' + req.get('host') 
    
   
    const {photo}= req.body;
    console.log(photo);
   
    pool.query(
      'DELETE FROM media WHERE id = $1',
      [id],
      (error, results) => {
        
        if (error) {
          console.log(photo);
          throw error;
        }
       
        res.status(201).send('media delete with ID: ${id}');
      }
    );
    
    
    }; 

    //

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
    //const url = request.protocol + '://' + req.get('host') 
    
  
    pool.query(
      'INSERT INTO media (id_offer,name) VALUES ($1, $2) RETURNING id',
      [id_offer,request.file.filename],
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
    delate
    
  }

