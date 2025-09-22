const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017/Office").then(() => {
        console.log("DB Connected");
        
    }).catch((err) => {
        console.log(err);
        
    });
}
 
module.exports = {connectDB};