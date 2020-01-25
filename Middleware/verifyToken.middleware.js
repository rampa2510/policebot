const verifyToken = require('../Helpers/verifyToken')

module.exports = (req,res,next)=>{
  // the conditions for if statement iclude if a citizen wants to register
  // or login for the first part and the next one if admin wants to register

  if(req.originalUrl!=="/api/register" && req.originalUrl!=="/api/verify" && req.originalUrl!=="/api/login" && req.originalUrl!=="/api/webhooks" && req.originalUrl.includes('/api')){
    if(req.headers.authorization){
      try {
        const resp = verifyToken(req.headers.authorization);

        if (typeof resp === "string") {
          res.status(401).json({ error: "You are not authorized to view this data" });
          return;
        }

        res.locals.data = resp
        next()
      } catch (error) {
        res.status(401).json({ error: "You are not authorized to view this data" });
        return;
      }

    }else res.status(401).json({error:"You are not authorized to view this data"})

  }else next()
}