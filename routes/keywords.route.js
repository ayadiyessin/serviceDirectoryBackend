module.exports = (app) => {
    const db = require('../models/keywords.models')


app.get('/keywords/:id', db.getKeywordsById_offer)
app.post('/keywords', db.createKeywords)
   
    
}