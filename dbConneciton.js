const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://musharrafmobeen:Blackviking125@cluster0.hzdwn.mongodb.net/nodeTask?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


const dbConnection = new Promise((resolve, reject) => {
     client.connect(err => {
        try {
            const _db = client.db("nodeTask");
            console.log("Connected successfully to server");   
            resolve(_db);
        }catch (error) {
            reject(error);
        }
    })
});



module.exports = {
  connectToServer: dbConnection 
};


