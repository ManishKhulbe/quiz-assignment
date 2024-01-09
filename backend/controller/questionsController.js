const fs = require("fs").promises;
const path = require("path");

async function getQuestions(language) {
  try {
    const filePath = path.join(__dirname, "../data/Questions.json");
    const question = await fs.readFile(filePath, "utf-8");

    const parsedQuestion = JSON.parse(question);
    const filteredQuestion = parsedQuestion.questions.filter(
      (item) => item.language === language
    );
    return filteredQuestion;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error; // Propagate the error
  }
}

module.exports = {
  getQuestions,
};
