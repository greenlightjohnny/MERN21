const Joi = require('@hapi/joi'),

/////Validation, could use Mongoose but here we are with Joi yet again...

///Register validation 
const regValidation = (data) => {
    const schema =  Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(4).max(70).required().email(),
        password: Joi.string().min(6).max(1000).required(),
      });
    
     return schema.validate(data);
}


const loginValidation = (data) => {
    const schema = Joi.object({
        
        email: Joi.string().min(4).max(70).required().email(),
        password: Joi.string().min(6).max(1000).required(),
      });

     return schema.validate(data);
}



module.exports.regValidation = regValidation;
module.exports.loginValidation = loginValidation;