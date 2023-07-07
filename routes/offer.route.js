module.exports = (app) => {
    const db = require('../models/offer.models')

app.get('/offer', db.getOffer)
app.get('/offer/:id', db.getOfferById)
app.post('/offer', db.createOffer)
app.put('/offer/:id', db.updateOffer)
app.delete('/offer/:id', db.deleteOffer)   
    
}