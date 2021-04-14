const mongoose = require("mongoose");

const connectDatabase = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  console.log("MongoDb servidor Atlas conectado", connection.connection.host);
};

module.exports = connectDatabase;
