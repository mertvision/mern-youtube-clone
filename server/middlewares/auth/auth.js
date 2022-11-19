// JSON Web Token and Custom Error
const jwt = require("jsonwebtoken");
const CustomError = require("../../helpers/error/CustomError.js");

/* User authentication is done here. 
After the user is authenticated, the user can perform "user" actions.
*/
const getAccessToRoute = (req, res, next) => {
  // The token is taken from the cookie.
  const token = req.cookies.access_token;

  // If the token doesn't exist
  if (!token) {
    return next(new CustomError("You are not authenticated.", 401));
  };

  /* Just because the token exists doesn't mean it's true. 
    The token must be decoded. The jwt.verify() function decodes the current token and returns the "err" and "dec" parameters. 
    "err" occurs when an error occurs. If there is no error, the encrypted user information in the token is returned as the "dec" parameter. 
    If the user information is returned, the user's information is given to this object by calling "req.user".
  */
  const { JWT_SECRET_KEY } = process.env;
  jwt.verify(token, JWT_SECRET_KEY, (err, dec) => {
    if (err) {
      return next(new CustomError("You are not authorized", 403));
    }

    req.user = {
      id: dec.id,
      name: dec.name,
    };
    // Next function
    next();
  });
};

module.exports = {
  getAccessToRoute,
};
