const User = require('../models/Users');
const jwt = require('jsonwebtoken');


// HANDLE ERRORS
const handleErrors = (err) =>{
   // console.log(err.message, err.code);
    let error = { email : '', password: ''};

    //validation errors
    if(err.message.includes('user validation failed')){
        console.log(err);
    }
}
// JwT handler   
     const maxAge = 3* 24 *60 *60;

const createToken = (id) =>{
    return jwt.sign({id}, 'I couldn not sleep well last night', {
        expiresIn: maxAge
    } );
}





module.exports.signup_get = (req, res)=>{
        res.render("signup");
}
module.exports.login_get = (req, res)=>{
    res.render("login");
}
module.exports.signup_post =async (req, res)=>{
    // const { email , password} = req.body;
    const {email, password} = req.body.email;
    try{
        const user = await User.create({ email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
        res.status(201).json({user: user._id});
    }
    catch (err){ 
        handleErrors(err);
        res.status(400).send(' oops a error , user not created,'+ err)
    }
}
module.exports.login_post = async (req, res)=>{
    const { email, password} = req.body;
try {
    const user= await User.login(email, password)
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
    res.status(201).json({user: user._id});
      
} catch (error) {
    res.status(400).json({error})
};
}