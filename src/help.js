const chalk = require('chalk');

const prompt = `\nUsage: genie command\n\nhelp\t\tCalls the help prompt.\ngen\t\tGenerates a store in the root directory by reading the lamp.config.yml file.\nsample\t\tGenerates a sample lamp.config.yml configuration file.\nls\t\tPrints a copy of the store directory from the root directory after generation.\ndel\t\tDeletes the store directory, its subdirectories, and all associated files.\nupdate\t\tUpdates a previously generated store with changes made in lamp.config.yml.\nadd\t\tAdds a new model, or adds actions and/or thunks to an existing model.\n\t\t\t- add -M model_name\tCreates a new model with the model_name.\n\t\t\t- add -m model_name\tMakes changes to an existing model with model_name.\n\t\t\t- ... -a action_name\tAdds actions with supplied action_name to model.\n\t\t\t- ... -t thunk_name\tAdds thunks with supplied action_name to model.\n\t\t\t- ... --noCRUD\t\tCreates a new model without CRUD.\n\nFor more information, please visit us at ${chalk.cyan(
  'https://redux-genie.herokuapp.com'
)}`;

const help = () => {
  console.log(prompt);
};

help();
