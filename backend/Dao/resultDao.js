"use strict";

const Result = require("../model/resultModal");

//========================== Load Modules End ==============================================

async function addResult(data) {
  let result = new Result(data);
  const res = await result.save();
  return res;
}

function getResult(data, userData) {
 let findQuery 
  if(data.Language){
    findQuery = { language: data.Language }
  }else{
    findQuery = { userId: userData.id }
  }
  return new Promise((resolve, reject) => {
    Result.find(findQuery)
      .populate("userId", "UserName")
      .sort({ createdAt: -1 })
      .exec((err, results) => {
        if (err) {
          reject(err);
        } else {
          const transformedResults = results.map((result) => {
            return {
              userId: result.userId._id,
              userName: result.userId.UserName,
              points: result.points,
              maxPossiblePoints: result.maxPossiblePoints,
              percentage: result.percentage,
              language: result.language,
              createdAt: result.createdAt,
            };
          });
          resolve(transformedResults);
        }
      });
  });
}


function resetResult(userData) {
  return new Promise((resolve, reject) => {
    Result.deleteMany({ userId: userData.id }, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}
//========================== Export Module Start ==============================

module.exports = {
  addResult,
  getResult,
  resetResult
};

//========================== Export Module End ===============================
