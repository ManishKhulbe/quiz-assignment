const jwt = require("../service/jwthandler");

var verifyUsrToken = async function (req, res, next) {
  try {
    const payload = jwt.verifyToken(
      req.headers.accesstoken.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );

    if (payload) {
      req.payload = payload;
      next();
    } else {
      res.send({
        "Error Field": "Access Token",
        Error: "Your Session is Expired",
      });
    }
  } catch (error) {
    res.send({
      "Error Field": "Access Token",
      Error: "Please Enter correct accessToken ",
    });
  }
};

module.exports = {
  verifyUsrToken,
};
