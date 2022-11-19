// MongoDB Connection
const mongoose = require("mongoose");

const connectMongoDb = async () => {
      await mongoose.connect(process.env.MONGO_URL, {
             useNewUrlParser: true, 
             useUnifiedTopology: true,
             dbName: "youtube", 
      })
      .then(()=> {console.log("MongoDB database connection successful.")})
      .catch((err)=> {console.log(err)})
};

module.exports = {
      connectMongoDb
};