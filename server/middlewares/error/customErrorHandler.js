// Custom Error
const CustomError = require("../../helpers/error/CustomError.js");

/* Custom Error Handler is an error catcher middleware. The "err" parameter holds the error, the "next" handles the error. 
We can return a response from the new error class according to the error types.*/
const CustomErrorHandler = (err, req, res, next) => {
      let customerror = err;

      if(err.name === "SyntaxError") {
        customerror = new CustomError("Unexpected Syntax", 400);
      };

      if(err.name === "ValidationError") {
        customerror = new CustomError(err.message, 400);
      };

      if(err.code === 11000) {
        customerror = new CustomError("Check Your Inputs, Duplicate Key Found", 400);
      };

      res.status(customerror.status || 500).json({
        success: false,
        message: customerror.message || "A error, please try again."
      });
}

module.exports = CustomErrorHandler;