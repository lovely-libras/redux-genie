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
  },

  specifyStructure: () => {
    const questions = [
      {
        name: "structure",
        type: "input",
        message: "Specify preferred file structure: 'rails, domain, or duck'",
        validate: function(value) {
          value = `'${value}'`
          let acceptable = ['rails', 'domain', 'duck']
          if (!acceptable.includes(value)) {
            return true;
          } else {
            return "Please enter rails, domain, or duck";
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },

  specifyFeatures: () => {
    const questions = [
      {
        name: "features",
        type: "input",
        message: "Specify features:",
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
