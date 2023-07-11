const jwt = require('jsonwebtoken');
const isAuth = async(req)=>{
    const { authorization } = req.headers;
    if(!authorization){
        return false;
    }
    const token = authorization.split(' ')[1];
    try {
        const jt = await jwt.verify(token, 'your_secret_key');
        return true ;
        //do something
    } catch (error) {
        console.log(error)
         return false ;
     }
    
}
module.exports={
    isAuth
}

