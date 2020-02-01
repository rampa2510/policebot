const { MongoClient } = require("mongodb");

let connection = null;

const option = { useNewUrlParser: true, useUnifiedTopology: true };
// mongodb://localhost:27017

/**
 * @description This will be used to connect to the db at the app start
 *
 * @author      Ram Pandey
 */
module.exports.connect = () =>
  new Promise((resolve, reject) => {
    MongoClient.connect("mongodb+srv://admin:admin@cluster0-rxslv.mongodb.net/test?retryWrites=true&w=majority", option, (err, client) => {
      if (err) {
        reject(err);
        console.log(err)
        return;
      }
      const db = client.db('sih');
      resolve(db);
      connection = db;
    });
  });

/**
 * @description This method will be used to a connection to the db
 *
 * @returns     A connection object of mongodb
 *
 * @author      Ram Pandey
 */
module.exports.getConn = () => {
  if (!connection) {
    throw new Error("Call connect first!");
  }

  return connection;
};
