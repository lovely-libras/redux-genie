const chalk = require('chalk');

const prompt = `\nUsage: genie <command>\n\n\t<help>, <h>\t\t\tCalls the help prompt.\n\t<gen>, <g>\t\t\tGenerates a store in the root directory by reading the lamp.config.yml file.\n\t<sample>, <s>\t\t\tGenerates a sample lamp.config.yml configuration file.\n\t<list>,<ls>\t\t\tPrints a copy of the store directory from the root directory after generation.\n\t<del>, <d>\t\t\tDeletes the store directory, its subdirectories, and all associated files.\n\t<update>, <u>\t\t\tUpdates a previously generated store with changes made in lamp.config.yml.\n\t<add>, <a>\t\t\tAdds a new model, or adds actions and/or thunks to an existing model.\n\t\t\t\t\t\t- <add> [-M] model_name\t\tCreates a new model with the model_name.\n\t\t\t\t\t\t- <add> [-m] model_name\t\tWill make changes to an existing model with model_name.\n\t\t\t\t\t\t- ... [-a] action_name\t\tAdds actions with supplied action_name to model.\n\t\t\t\t\t\t- ... [-t] thunk_name\t\tAdds thunks with supplied action_name to model.\n\t\t\t\t\t\t- ... [--noCRUD]\t\tCreates a new model without CRUD.\n\nFor more information, please visit us at ${chalk.cyan(
  'https://redux-genie.herokuapp.com'
)}`;

const help = () => {
  console.log(prompt);
};

help();
