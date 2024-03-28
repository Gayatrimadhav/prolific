// const mongoose=require('mongoose');
// const mongoURI="mongodb://localhost:27017"
// const connectToMongo=()=>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected");
//     })
// }
// module.exports=connectToMongo;
const mongoose = require('mongoose');
const mongoURI = "mongodb://43.205.213.135:27017/load12"

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
