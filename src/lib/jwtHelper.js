var jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");

exports.decodeHelper = async (req) => {
  let token = req.headers["x-access-token"];  
  const options = {
    ignoreExpiration: true
  }

  console.log('decode helper');
  console.log(token)

  if (token === undefined || token === "undefined"){
    return {
      success: false,
      userId: null
    }
  }
  if (token === ""){
    return {
      success: false,
      userId: null
    }
  }

  if (!token){
    return {
      success: false,
      userId: null
    }
  }

  console.log('pass this..??', token);

  const verifyPromise = () => new Promise(function(resolve, reject){
    jwt.verify(token, config.secret, options, function(err, decoded){
      if (err){
        reject(err)
        return  
      }
      resolve(decoded)
    })
  })

  const decoded = await verifyPromise();

  console.log('000000000000');
  console.log(decoded);
  const userId = decoded.id;

  return {
    success: true,
    userId: userId
  }  
}