const mongoose = require ("mongoose");

// function connectToMongo(){
//     mongoose.connect("mongodb://localhost/inotebook",()=>{
//         console.log("Connected to mongoose successfully");
//     });
// }

function connectToMongo(){
    mongoose.connect("mongodb://localhost/inotebook");
    mongoose.connection
        .once('open',()=>{
            console.log("Connected to mongoose successfully");
        })
        .on('errot',(error)=>{
            console.log(`Sorry Can't Connected to MongoDB, Error is : ${error}`);
        })
}

module.exports = connectToMongo;
