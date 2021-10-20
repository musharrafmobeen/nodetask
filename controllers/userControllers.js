const {connectToServer} = require('../dbConneciton');
const {sendEmailConfirmation, emailVerification} = require('../utils/emailConfirmation');
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt'); 


const registerUser = async(req,reply)=>{
        let verificationId = uuidv4(); 
        const {email,password} = req.body;
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err)  {
                return {message:"Error Occured",statusCode:201}
            } 
            else {
                const db = await connectToServer;
                const collection = await db.collection('userVerification');
                await collection.insertOne({email,hash,verificationId});
            }
        });
            emailVerification(email,verificationId);
            return {message:"User Has Been Reistered",statusCode:201};
        
}


const verifyUser = async(req,reply)=>{
        const {verificarionId} = req.params;
        const db = await connectToServer;
        const userVerificationCollection = await db.collection('userVeriication');
        const user =  await userVerificationCollection.findOne({verificarionId});
        const collection = await db.collection('users');
        await collection.insertOne({email,password});
        sendEmailConfirmation(email,"New User","Your Account Has Been Registered");
        return {message:"User Has Been Reistered",statusCode:201};
}

const userLogin = async(req,reply)=>{
    const {email,password} = req.body;
    const db = await connectToServer;
    const collection = await db.collection('users');
    const user  = await collection.findOne({email});

    console.log(user);
    return user;
}

const getAllUsers = async(req,reply)=>{
    let data = [];
    const db = await connectToServer;
    const collection = await db.collection('users');
    const searchCursor = await collection.find();
    while(await searchCursor.hasNext()){
        data.push(await searchCursor.next());
    }
    return data;
}

module.exports = {
    registerUser,
    userLogin,
    getAllUsers,
    verifyUser
}