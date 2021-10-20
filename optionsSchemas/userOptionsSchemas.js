const {registerUser,userLogin,getAllUsers,verifyUser} = require('../controllers/userControllers');
const mongodb = require('mongodb');


const registerUserOptions = {
    schema:{
        body:{
            type:'object',
            required:['email','password'],
            properties:{
                email: {type:'string'},
                password: {type:'string'},
                verificationId:{type:'string'}
            }
        },
        response:{
            201:{
                type:'object',
                properties:{
                    message:{type:'string'},
                    statusCode:{type:'number'}
                }
            }
        }
    },
    handler:registerUser
}


const verifyUserOptions = {
    schema:{
        body:{
            type:'object',
            required:['email','password'],
            properties:{
                email: {type:'string'},
                password: {type:'string'}
            }
        },
        response:{
            201:{
                type:'object',
                properties:{
                    message:{type:'string'},
                    statusCode:{type:'number'}
                }
            }
        }
    },
    handler:verifyUser
}


const getUserOptions = {
    schema:{
        response:{
            200:{
                type:'array',
                users:{
                    type : 'object',
                    properties:{
                        _id : {type:mongodb.ObjectId},
                        email:{type:'string'},
                        password:{type:'string'}
                    }
                }
            }
        }
    },
    handler:getAllUsers
}

const userLoginOptions = {
    schema:{
        body:{
            type:'object',
            required:['email','password'],
            properties:{
                email: {type:'string'},
                password: {type:'string'}
            }
        },
        response:{
            200:{
                type : 'object',
                properties:{
                    _id : {type:'string'},
                    email:{type:'string'},
                    password:{type:'string'}
                }
            }
        }
    },
    handler: userLogin
}


module.exports = {
    registerUserOptions,
    getUserOptions,
    userLoginOptions
}