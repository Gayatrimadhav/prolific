// const mongoose=require('mongoose');
// const mongoURI="mongodb://localhost:27017"
// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected");
//     })
// }
// module.exports=connectToMongo;
const mongoose = require('mongoose');
const mongoURI = "mongodb://44.210.140.4:27017/load13"

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected1')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;
