this is the working readme that we can build on 

# redux-genie 

### cheat codes for redux

Redux Genie isn't a "starter kit" or a library of helper methods. It actually writes your Redux boilerplate code, either creating new files or injecting code into existing store files. This makes the writing process easier to start, easier to manage as you progress, and less error-prone, without abstracting over any functionality of Redux itself.

The genie can be comprehensive- generating the whole Redux store from the outset of a project- or granular- creating or operating on a specific slice of state for an existing project.

```bash
npm install -g redux-genie
```

## Store Declaration at the beginning of a project

To generate a store, Redux Genie's configuration file- lamp.config.yml - will need define the total store structure. 

Define your slices of state. We refer to them as "Models", but they can correspond to database models, domains ("landing page"), features ("checkout"), or any other way you want to slice your state. The genie automatically generates and configures all CRUD methods with separate subreducers for each Model, with Thunks linked to the Redux-Thunk middleware calling your defined API endpoints.

Choose from the two of the file structures outlined in the Redux FAQs:
https://redux.js.org/faq/code-structure

```
File Structure: Rails || Ducks
```

### Rails-Style

> Rails-style: separate folders for “actions”, “constants”, “reducers”, “containers”, and “components” 

Define the models for the store. In Rails-style, each model will each receive its own sub-reducer, and the genie will assign your defined types to each sub-reducer.

Full Rails-style lamp.config.yml file: 

```
Structure: Rails

Models:

  - Dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    CRUD: false

    Actions:
      - countDux
      - migrateDux
      - quackOne

    Thunks:
      - getAll: "/api/Dux"
      - getOne: "/api/Dux/:dux"

  - Terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

    Actions:
      - killJohnConnor
      - backInTime

    Thunks:
      - getAll: "api/terminator"
      - getOne: "api/terminator/:terminator"
```

Place the lamp.config.yml file in the project root directory, navigate there, then run:

```bash
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

### Ducks-Style

> “Ducks”: separate folders per feature or domain


### Options

Options to customize the generate call.

#### CRUD = false

Each model is automatically generated with CRUD methods. These can be excluded from the generate call as follows:

```
// lamp.config.yml 

...

Models:

  - Dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    CRUD: false

...

```
#### Thunks

Thunks can optionally be included in the same file as the actions: 

```
Thunks: included
```

If "Thunks" are excluded in the model definition, they will be omitted from the generate call. These can be added later via "genie update" (see below).

#### Logging

Redux logger is wired into the store by default, but can be excluded.

```
Logging: false  
```

#### Example of Full Configuration File:

```
Structure: Ducks # Rails || Ducks

Thunks: included # thunks will be included in the same file as the actions
Logging: false  # configures logging middleware

Models:

  - Dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    CRUD: false

    Actions:
      - countDux
      - migrateDux
      - quackOne

    Thunks:
      - getAll: "/api/Dux"
      - getOne: "/api/Dux/:dux"

  - Terminator:

    Slice:
      - WillBeBack: Boolean
      - OneLiners: Array
      - Sequels: Number

    Actions:
      - killJohnConnor
      - backInTime

    Thunks:
      - getAll: "api/terminator"
      - getOne: "api/terminator/:terminator"
```

## CLI interface

#### genie generate 

To initialize a project, write the yaml configuration file and call:

```bash
genie generate
```

#### genie update

After the store is initialized, the genie can add to the store in two ways: from the yml configuration file via "genie update," or from the command line via "genie add".

To perform a yml update, add or alter the yaml file and then call: 

```bash
genie update store
```

The genie will diff the new yml config to previous version and generate any required updates.

Note: Logging, CRUD, and thunk separation choices cannot be changed after initial generate. 

The genie update method will never result in a deletion, even if parts of the original config file are deleted.

#### genie add

Add directly from the command line, declaring the same information:

```
To add a new model

  genie add --newmodel Terminator

  can also add actions in new model call 

  genie add --newmodel Terminator -a getIsBack -a killJohnConnor 

  without CRUD ops

  genie add --newmodel Terminator -a getIsBack --noCRUD

To add an action to specific model

  genie add --action getIsBack -model Terminator 
    
    ... or abbreviated 
  genie add -a getIsBack -m Terminator

To add a thunk to a specific model

  genie add --thunk countDux --model Dux
  
    ... or
  genie add -t countDux -m Dux

To add a connected React component

  genie add --connected DuckPond --model Dux -model Ducklings

  the component will be created with connections to each model's slice of the store

```

#### genie list ( genie ls )

genie list store

Returns the total file structure of the store:

```bash
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

genie list models
genie list actions mine
genie list thunks

#### genie locate ( genie loc )

Returns the file path of a store sub-directory to the command line.

```bash
genie locate <model name> <file type>

	eg: genie locate Dux action types // $ ./store/actions

genie locate <domain name> <file type>

	eg: genie locate navbar reducer // $ ./store/navbar/reducers

```

#### genie lamp

Prints a sample lamp.config.yml file. 

#### genie edit

Edit the template files.

```bash
genie edit <File Structure> <file type>

genie edit ducks actions
```


## Advanced 

### Connected components 

```bash
genie generate connected NavBar slice User Consumer 
```

genie test

prints a test suite for your specifc lamp configuration
