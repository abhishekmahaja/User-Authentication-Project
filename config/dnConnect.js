const mongoose = require("mongoose");
const db = () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`connection established successfully`);
    })
    .catch(() => {
      console.log(`error occur during connection `);
      process.exit(1);
    });
};
module.exports = db;
