const resultDao = require("../Dao/resultDao");

async function addResult(data, userData) {
  const insertData = {
    userId: userData.id,
    points: data.points,
    maxPossiblePoints: data.maxPossiblePoints,
    percentage: data.percentage,
    language: data.examLang,
  };
  const result = await resultDao.addResult(insertData);
  return result;
}

async function getResult(data, userData ) {
  const result = await resultDao.getResult(data ,userData);
  return result;
}

async function resetResult(userData ) {
  const result = await resultDao.resetResult(userData);
  return result;
}

module.exports = {
  addResult,
  getResult,
  resetResult
};
