const mongoose = require('mongoose');
const { isEmail } = require( 'validator');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    email: {
        type: String, 
         required: [true, 'Please Enter a  Email'], 
         unique: true , 
         lowercase: true, 
        //  validate: [isEmail, 'Please enter a valid email'] 
    }, 
    password: {
        type: String, 
        required:  [true, 'Please Enter Password'], 
        minlength: [6, 'Minimum length must be  6 characters']
        
}}); 

userSchema.pre('save', async function( next ){
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);
    next();
})


//static method to log in a user

userSchema.statics.login = async function( email, password){
    const user = await this.findOne({email});
    if(user){
     const auth = await  bcrypt.compare(password, user.password);
     if (auth){
        return user;
     }
     throw Error('incorrect password, Oops');
    }
    throw Error('incorrect email');
}

const User = new mongoose.model('user', userSchema);

module.exports = User; 



