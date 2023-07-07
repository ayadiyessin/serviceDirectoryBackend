module.exports = (app) => {
    const db = require('../models/media.models')


app.get('/media/:id', db.getMediaById_offer)
app.post('/media', db.createMedia)
   
    
}