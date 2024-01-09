const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index");
const {
  getQuestions,
} = require("../controller/questionsController");

router.get(
  "/getQuestions",
  middleware.authenticate.verifyUsrToken,
  function (req, res, next) {

    getQuestions(req.query.Language)
      .then((result) => {
        res.send({result});
      })
      .catch((err) => {
        res.send({
          Message: "Something went wrong",
          "Error message ": err,
        });
      });
  }
);

module.exports = router;
