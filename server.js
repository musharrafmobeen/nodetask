const fastify = require('fastify')({logger:true});
const PORT = process.env.PORT || 5000;


fastify.register(require('./routes/usersRoutes'));

fastify.addHook('onError', async (request, reply, error) => {
  return {error};
})

const start = async() => {
    try {
        await fastify.listen(PORT,()=>console.log(`server is listening on port : ${PORT}`))
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
};

start();
