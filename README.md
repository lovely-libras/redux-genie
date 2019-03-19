this is the working readme that we can build on 

# redux-genie 

### cheat codes for redux

Redux Genie isn't a "starter kit" or a library of helper methods. It actually writes your Redux boilerplate code, either creating new files or injecting code into existing store files. This makes the writing process easier to start, easier to manage as you progress, and less error-prone, without abstracting over any functionality of Redux itself.

The genie can be comprehensive- generating the whole Redux store from the outset of a project- or granular- creating or operating on a specific slice of state for an existing project.

## Store Declaration at the beginning of a project

To generate a store, Redux Genie's configuration file- lamp.config.yml - will need define the total store structure. 

Define models and/or domains, and the genie automatically generates and configures all CRUD methods with separate subreducers, linked to the Redux-Thunk middleware calling your API endpoints.

Choose from the three file structures outlined in the Redux FAQs:
https://redux.js.org/faq/code-structure

```
File Structure: Rails || Ducks
```

Thunks can optionally be generated in a separate file for each model:

```
Thunks: separate
```

### Rails-Style

> Rails-style: separate folders for “actions”, “constants”, “reducers”, “containers”, and “components” 

Define the models for the store. In Rails-style, each model will each receive its own sub-reducer, and the genie will assign your defined types to each sub-reducer.

Full Rails-style lamp.config.yml file: 

```
Structure: Rails 

Thunks: separated // omit this line to generate thunks inside the action files

Models:
  - Dux: 
    - Name : string // defaults ''
    - Quacking : Boolean (false) // defaults false
    - Ducklings: Object // defaults { }
    - Fly2Gether: Boolean (true)
    - Thunks // configures thunk endpoints
    	- all: '/api/Dux' // ":" declares the variable location
    	- single: '/api/Dux/:dux' 
  - Terminator: 
    - WillBeBack: Boolean (true)
    - OneLiners: Array // defaults [ ]
    - Sequels: Number // defaults 0
    - Thunks:
    	- all: 'api/terminator'
    	- single: 'api/terminator/:terminator'
```

In the root directory that contains the lamp.config.yml, run:

```
genie generate store
```

Output file structure:
```

└─┬ store
  ├─store.js
  ├─┬ actions
  │ ├── action_types_for_Terminator.js
  │ └── action_types_for_Dux.js
  ├─┬ constants
  │ └── action_constants.js
  └─┬ reducers
    ├── combine_reducers.js
    ├── Dux_reducer.js
    └── Terminator_reducer.js
```

** Note, if "Thunks" are excluded in the model definition, they will be omitted from the generate call. These can be added later via "genie update" (see below).

### Domain-Style and Ducks-Style


## CLI interface

#### genie generate ( genie gen )

Add to the store from the command line without defining the model within yaml configuration (via the genie update)

```
genie generate model <model name> // generates a model with crud methods 

	eg: genie generate model Terminator // one model
	eg: genie generate model Terminator Dux // two models

	Note: will prompt if the root combiner isn't defined in the yaml file.

	options: 

	--crudless // creates all the connection code without defining any crud methods

	eg: genie generate model Dux --crudless

genie generate model <model name> action <action name> 

	eg: genie generate model Terminator action getIsBack

genie generate thunk <thunk name> <thunk endpoints> (generates additional named thunk) 

	eg: genie generate model Lolz

genie generate domain <feature name>

	eg: genie geneate domain 

genie generate thunk <thunk name> <thunk endpoint>

genie generate action <action name> <model assignment> 

```

#### genie list ( genie ls )

Returns the total file structure of the store:

```
e.g. (Rails-Style)

├─┬ store
│ ├─┬ actions
│ │ ├── action_types_for_Terminator.js
│ │ └── action_types_for_Dux.js
│ ├─┬ constants
│ │ └── action_constants.js
│ └─┬ reducers
│   ├── combine_reducers.js
│   ├── Dux_reducer.js
│   └── Terminator_reducer.js
└── store.js
```

#### genie locate ( genie loc )

Returns the file path of a store sub-directory to the command line.

```bash
genie locate <model name> <file type>

	eg: genie locate Dux action types // $ ./store/actions

genie locate <domain name> <file type>

	eg: genie locate navbar reducer // $ ./store/navbar/reducers

```

#### genie update

Add models and actions to lamp.config.yml, then run genie update. The genie will diff to the previous config file and generate any required updates.

#### genie delete 

Yes, it will do this...but it will also prompt you.

```bash
genie delete model <Model>
genie delete domain <domain>

	eg: genie delete model terminator

```

#### genie lamp

Writes a sample lamp.config.yml file. 

## Advanced 

### Connected components 

```bash
genie generate connected NavBar slice User Consumer 
```

### Linking the genie to an Existing Store

To link an exisitng store, declare the store's file structure and additional models. Afterwards, you can generate new models by adding to the lamp.config.yml and calling "genie update." 

```
File Structure: Linked

store: 
	- actions : './store/actions'
	- constants : './store/constants'
	- reducer : './store/reducers'
	- combiner : './store/reducers/combine_reducers.js' 
```

In the root directory that contains the lamp.config.yml, run:

```bash
genie link store
```