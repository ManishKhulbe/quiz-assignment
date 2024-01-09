const mongoose = require('mongoose')



const connectDb = async () => {
    await mongoose.connect(process.env.DB_URL).then(() => {
        console.log(`mongodb connection successfull .`);
    }).catch((err) => {
        console.log(err);
    })
}


module.exports = {
    connectDb
};