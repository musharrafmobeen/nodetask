const {registerUser,userLogin,getAllUsers,verifyUser,forgotPassword,updatePassword} = require('../controllers/userControllers');
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
                    user:{
                    type : 'object',
                        properties:{
                            _id : {type:"string"},
                            email:{type:'string'},
                            password:{type:'string'}
                        }
                    },
                    token:{type:'string'}
                }
            }
        }
    },
    handler: userLogin
}

const forgotPasswordOptions = {
    schema:{
        body:{
            type:'object',
            required:['email'],
            properties:{
                email: {type:'string'}
            }
        },
        response:{
            200:{
                type:'object',
                properties:{
                    message:{type:'string'},
                    statusCode:{type:'number'}
                }
            }
        }
    },
    handler: forgotPassword
}

const updatePasswordOptions = {
    schema:{
        body:{
            type:'object',
            required:['email'],
            properties:{
                email: {type:'string'}
            }
        },
        response:{
            200:{
                type:'object',
                properties:{
                    message:{type:'string'},
                    statusCode:{type:'number'}
                }
            }
        }
    },
    handler: updatePassword
}

module.exports = {
    registerUserOptions,
    getUserOptions,
    userLoginOptions,
    verifyUserOptions
}