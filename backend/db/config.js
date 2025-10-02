const mongoose = require('mongoose')
const url=process.env.MONGO_URI;
async function connectDB(){
      mongoose.connect(url,{
        dbName:"auth"
      })
}


mongoose.connection.on('connected',()=>{console.log('connnected mongodb')})
mongoose.connection.on('disconnected',()=>{console.log('got disconnected from mongodb')})

module.exports = {connectDB}