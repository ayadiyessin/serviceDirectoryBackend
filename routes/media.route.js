module.exports = (app) => {
    const db = require('../models/media.models')
//photo
const multer=require ('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null,'public');
    },
    filename: (req, file, cb) => {
        var crypto = require("crypto");
    var id = crypto.randomBytes(20).toString('hex');
       const fileName = id+file.originalname.toLowerCase().split(' ').join('-');
       cb(null, fileName)
       return fileName;
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("type image : ",file.originalname);
        
            
            
                cb(null, true);
                
                
            
     
    }
  
});

// module.exports = (app) => {

    
//    // app.get('/cms_users', db.getUsers);
//    // app.delete('/cms_users/:id',db.deleteUsers);
//     app.post('/media',upload.single('name'),db.createMedia);
//   //  app.delete('/cms_users/:id',db.deleteFileimages);

    
// }
app.post('/media',upload.single('name'),db.createMedia);
app.delete('/media/:id',db.delate);

// app.get('/media/:id', db.getMediaById_offer)
// app.post('/media', db.createMedia)
   
    
}