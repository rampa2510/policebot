//========================================================================================
/*                                                                                      *
 *                          ALl the imports                                             *
 *                                                                                      */
//========================================================================================
// make sure to pass the NODE_ENV variable alongwith the command
const dotEnvConfig = { path: `.env.${process.env.NODE_ENV}` };

require("dotenv").config(dotEnvConfig);
const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("./Database/conn");
const logger = require("morgan");
const cors = require('cors');
//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                All the configurations                                *
 *                                                                                      */
//========================================================================================
const app = express();

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
if (process.env.NODE_ENV !== "production") app.use(logger("dev"));

app.use(require('./Middleware/verifyToken.middleware'))

app.use("/", require("./routes"));

//########################################################################################

//========================================================================================
/*                                                                                      *
 *                                   Start the server                                   *
 *                                                                                      */
//========================================================================================

// middleware to send error messages
app.use((error, req, res) => {

  if (error.joi) {
    // console.log(error)
    return res.status(400).json({ error: error.joi.message });
  }
  // console.log(error)
  // return res.status(500).json({error:error.message});
});

app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);

  // connect to mongodb
  try {
    await connect();
  } catch (error) {
    console.log(error);
  }
});
//########################################################################################
