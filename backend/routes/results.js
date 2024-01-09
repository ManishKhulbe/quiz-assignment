const express = require("express");
const router = express.Router();
const middleware = require("../middleware/index");
const {
    addResult,getResult,resetResult
} = require("../controller/resultController");

router.post(
  "/addResult",
  middleware.authenticate.verifyUsrToken,
  function (req, res, next) {

    addResult(req.body ,req.payload)
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

router.get(
  "/getResult",
  middleware.authenticate.verifyUsrToken,
  function (req, res, next) {
    getResult(req.query ,req.payload )
      .then((result) => {
        res.send({data : result});
      })
      .catch((err) => {
        res.send({
          Message: "Something went wrong",
          "Error message ": err,
        });
      });
  }
);



router.delete(
  "/resetResult",
  middleware.authenticate.verifyUsrToken,
  function (req, res, next) {
    resetResult(req.payload )
      .then((result) => {
        res.send({data : result});
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
