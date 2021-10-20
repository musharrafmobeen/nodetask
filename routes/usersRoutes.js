const {getUserOptions, registerUserOptions, userLoginOptions} = require('../optionsSchemas/userOptionsSchemas');



const userRoutes = (fastify,options,done) => {
    //get All Users
    fastify.get('/users', getUserOptions)


    //Login A User
    fastify.post('/user', userLoginOptions)


    //Register A User
    fastify.post('/users', registerUserOptions);

    //
    // fastify.get('/userVerification/:verificarionId', );



    done();
}

module.exports = userRoutes;