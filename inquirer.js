var inquirer = require("inquirer");

module.exports = {
  addModel: () => {
    const questions = [
      {
        name: "model",
        type: "input",
        message: "Enter your model name:",
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return "Please enter your model name";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  }
};
