const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) =>{

const token = req.cookies.jwt;

//check if the token cookie is present
if(token){
        jwt.verify(token, 'I couldn not sleep well last night', (err, decodedToken)=>{
            if(err){
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
}
else{
    res.redirect('/login');
}
    next();
}

module.exports = { requireAuth};