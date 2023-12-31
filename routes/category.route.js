module.exports = (app) => {
    const db = require('../models/category.models')

app.get('/category', db.getCategory)
app.get('/category/:id', db.getCategoryById)
app.post('/category', db.createCategory)
app.post('/category/sub/:id', db.createSubCategory)
app.put('/category/:id', db.updateCategory)
app.delete('/category/:id', db.deleteCategory)   
    
}