//========================================================================================
/*                                                                                      *
 *                                import helper functions                               *
 *                                                                                      */
//========================================================================================
const { getConn } = require("../Database/conn");
//########################################################################################

    /**
   * @description This function is an abstraction of mongoDB insertOne
   *
   * @params      collection = the collection in the db on which you want to perform query
   *              query = the query you want to perform
   *
   * @return      if err it will thow the err object otherwise response
   *
   * @author      Ram Pandey
   */

const insertOne = (collection, query) => {
  return new Promise((resolve, reject) => {
    const DB = getConn();

    DB.collection(collection).insertOne(query, (err, resp) => {
      if (err) {
        reject(err);
      }

      resolve(resp.ops[0]);
    });
  });
}

module.exports = {
  /**
   * @description This function is an abstraction of mongoDB findOne
   *
   * @params      collection = the collection in the db on which you want to perform query
   *              query = the query you want to perform
   *
   * @return      if err it will thow the err object otherwise response
   *
   * @author      Ram Pandey
   */
  findOne: (collection, query) => {
    return new Promise((resolve, reject) => {
      const DB = getConn();

      DB.collection(collection).findOne(query, (err, resp) => {
        if (err) {
          reject(err);
        }

        resolve(resp);
      });
    });
  },

  findAll: (collection, query) => {
    return new Promise((resolve, reject) => {
      const DB = getConn();

      DB.collection(collection).find(query,(err, resp) => {
        if (err) {
          reject(err);
        }
        resolve(resp.toArray());
      });
    });
  },

  insertOne,

      /**
   * @description This function will help in incrementing case no
   *              When a new case is registered
   * 
   *
   * @return      if err it will thow the err object otherwise response which consists of the case no
   *
   * @author      Ram Pandey
   */
  incrementCounter:()=>{
    return new Promise((resolve,reject)=>{
      const DB = getConn();

      DB.collection('crimeCase').findOneAndUpdate(
      {},
      { $inc: { count: 1 } },
      { upsert: true },
      (err, resp) => {
        if (err) return reject(err);
        // console.log(resp);
        resolve(resp.value.count);
        return resp;
      }
    );

    })
  },

/**
   * @description   This function is an abstraction of mongodb findOneUpdate
   * 
   * @param collection {String} The collection on which you want to run the query
   * 
   * @param query {Object} The query you want to run for finding data
   * 
   * @parmam updateObj {Object} The new data you want to set for the document
   * 
   * @return      if err it will thow the err object otherwise response 
   *
   * @author      Ram Pandey
   */
  findOneUpdate: (collection, query,updateObj) => {
    return new Promise((resolve, reject) => {
      const DB = getConn();

      DB.collection(collection).findOneAndUpdate(
        query,
        updateObj,
        { upsert: true },
        (err, resp) => {
          if (err) return reject(err);
          // console.log(resp);
          resolve(true);
          return resp;
        }
      );
    });
  },

  /**
   * @description   This function is an abstraction of mongodb findOneUpdate
   * 
   * @param collection {String} The collection on which you want to run the query
   * 
   * @param query {Object} The query you want to run for finding data
   * 
   * @parmam updateObj {Object} The new data you want to set for the document
   * 
   * @return      if err it will thow the err object otherwise response 
   *
   * @author      Ram Pandey
   */
  updateOne:(collection,query,updateObj)=>{
    const DB = getConn();
    return new Promise((resolve,reject)=>{
      DB.collection(collection).updateOne(query,updateObj,(err,resp)=>{
        // console.log(err)
        if(err) return reject(err);

        resolve(true);
        return true;  
      })
    })
  },

    /**
   * @description   This function is an abstraction of mongodb findOneUpdate
   * 
   * @param collection {String} The collection on which you want to run the delete query
   * 
   * @param query {Object} The query you want to run for deleting the matching data
   * 
   * @return      if err it will thow the err object otherwise response 
   *
   * @author      Ram Pandey
   */
  deleteOne:(collection,query)=>{
    const DB = getConn();

    return new Promise((resolve,reject)=>{
      DB.collection(collection).deleteOne(query,(err,res)=>{
        if(err) return reject(err);
        // console.log(res)
        resolve(true);
        return true;
      })
    })
  },

      /**
   * @description   This function will be used to add updates to the array
   * 
   * @param query {Object} The query you want to run for deleting the matching data
   * 
   * @param update {Object} The update data you want to push to the array
   * 
   * @return      if err it will thow the err object otherwise true 
   *
   * @author      Ram Pandey
   */
  updateDetails:(query,update)=>{
    const DB = getConn();

    return new Promise((resolve,reject)=>{
      DB.collection('crimeRegister').update(query,{$push:{updates:update}},(err,resp)=>{
        if(err) return reject(err);
        // console.log(resp)
        resolve(true);
        return true;
      })
    })
  },
  /**
   * @description   This function will be used to genrate a random otp and insert otp in db
   * 
   * @param username {string} The user who requested the otp and who will be verified
   * 
   * 
   * @return      if err it will thow the err object otherwise the otp generated 
   *
   * @author      Ram Pandey
   */
  generateOtp:async (username)=>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    try {
      await insertOne('otps',{otp,username});
      return otp;
    } catch (error) {
      console.log(error)
      throw new Error("")
    }
  }
};

