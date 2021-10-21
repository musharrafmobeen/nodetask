const {addBook,userLogin,getAllBooks,verifyUser,forgotPassword,updatePassword} = require('../controllers/booksControllers');
const mongodb = require('mongodb');


const addBookOptions = {
    schema:{
        body:{
            type:'object',
            required:['name','author'],
            properties:{
                name: {type:'string'},
                author: {type:'string'}
            }
        },
        response:{
            201:{
                type:'object',
                properties:{
                    name: {type:'string'},
                    author: {type:'string'}
                }
            }
        }
    },
    handler:addBook
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


const getBooksOptions = {
    schema:{
        response:{
            200:{
                type:'array',
                users:{
                    type : 'object',
                    properties:{
                        _id : {type:mongodb.ObjectId},
                        name:{type:'string'},
                        author:{type:'string'}
                    }
                }
            }
        }
    },
    handler:getAllBooks
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
            required:['password'],
            properties:{
                password: {type:'string'}
            }
        },
        response:{
           200:{
                type : 'object',
                properties:{
                    _id : {type:"string"},
                    email:{type:'string'},
                    password:{type:'string'}
                }
                
            }
        }
    },
    handler: updatePassword
}

module.exports = {
    addBookOptions,
    getBooksOptions,
    userLoginOptions,
    verifyUserOptions,
    forgotPasswordOptions,
    updatePasswordOptions
}