# Redux Genie

Made for developers creating JavaScript applications with [Redux](https://redux.js.org/).

---

Redux Genie isn't a "starter kit" or a library of helper methods. It actually writes your Redux boilerplate code, either creating new files or injecting code into an existing store files. This makes the writing process easier to start, easier to manage as you progress, and less error-prone, without abstracting over the functionality of Redux itself.

The genie can be comprehensive- generating the whole Redux store from the onset of a project- or granular- creating or operating on a specific slice of state for an existing project.

```bash
npm install -g redux-genie
```

Check out our [documentation](https://redux-genie.herokuapp.com/), which includes a web app to build the initial _lamp.config.yml_ file.

---

# Store Declaration at the beginning of a project

To generate a store, Redux Genie's configuration file- lamp.config.yml - will need define the total store structure. 

Choose from the two of the file structures outlined in the Redux FAQs:
https://redux.js.org/faq/code-structure

```
Structure: Rails || Ducks
```

Define the slices of state. We refer to them as "Models", but they could also be called "Domains" (in the sense of "domain driven design"). Essentially, they are the specific way you want to organize the entities in state. 

The genie automatically generates and configures all CRUD methods with separate subreducers for each Model, with Thunks linked to the Redux-Thunk middleware calling your defined API endpoints.

```
Structure: Rails

Models:

  - Dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean

    Actions:
      - countDux
      - migrateDux
      - quackOne

    Thunks:
      - getAll: "/api/Dux"
      - getOne: "/api/Dux/:dux"
```

Place the lamp.config.yml file in the project root directory, then run:

```bash
genie generate store
```

---

### Rails-Style

> Rails-style: separate folders for “actions”, “constants”, and “reducers.”

Generated file structure:
```
actions
├── actions_for_Ducks.js
├── actions_for_Terminator.js
├── selectors_for_Ducks.js
└── selectors_for_Terminator.js

constants
└── action_constants.js

reducers
├── combine_reducers.js
├── reducer_for_Ducks.js
└── reducer_for_Terminator.js

store.js
```

---

### Ducks-Style

> “Ducks”: separate folders per Model/Domain

Generated file structure:
```
Ducks
├── action_constants_for_Ducks.js
├── actions_for_Ducks.js
├── reducer_for_Ducks.js
└── selectors_for_Ducks.js

Terminator
├── action_constants_for_Terminator.js
├── actions_for_Terminator.js
├── reducer_for_Terminator.js
└── selectors_for_Terminator.js

combine_reducers.js

store.js
```

---

# _lamp.config.yml_ options

Options to customize the generate call.

---

#### CRUD: false

Each model is automatically generated with CRUD methods. These can be excluded as follows:

```
Models:

  - Dux:

    Slice:
      - Name: string
      - Quacking: Boolean
      - Ducklings: Object
      - Fly2Gether: Boolean
    CRUD: false
```

---

#### Thunks: included

Thunks can be included in the same file as the actions: 

```
Structure: Rails

Thunks: included
```

If "Thunks" are excluded in the model definition, they will be omitted from the generate call. These can be added later via "genie update" (see below).

---

#### Logging: false

Redux logger is wired into the store by default, but can be excluded:

```
Structure: Rails

Logging: false  
```

---

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

---

# CLI 

#### genie generate

```bash
genie generate
```

---

#### genie connect

```bash
genie connect
```

Connects  a  React  component  to  the  store via the React-Redux library.

Must define the path to the component to be converted, the  name of the component, and the models/domains to connect:

```bash
genie   connect  app/components/ExampleThree.js  ExampleThree  -m DucklingTerminator
```

Can connect multiple models at one time:

```bash
genie  connect  app/components/ExampleThree.js  ExampleThree   -m
DucklingTerminator -m Velociraptor -m Replicant
```

The genie will insert the code for the connect method into the current file, and generate an unconnected copy of the source file in the same directory.

##### Example:

Source file

```js
import React from 'react';

export default function ExampleThree (props){

  const { stuff } = props;

  return (
    <div>

    </div>
  );
};
```

Connect call:

```bash
genie connect app/components/ExampleThree.js ExampleThree -m DucklingTerminator
```

Output:

```js
import { connect } from "react-redux";

import {
  getDucklingTerminator,
  getAllDucklingTerminator,
  createDucklingTerminator,
  updateDucklingTerminator,
  deleteDucklingTerminator
} from "../../store/DucklingTerminator/actions_for_DucklingTerminator.js";

import React from "react";

function ExampleThree(props) {
  const { stuff } = props;
  return (
    <div>

    </div>
  );
}

const mapStateToProps = ({ DucklingTerminator_state }) => {
  return {
    isQuacking: DucklingTerminator_state.isQuacking,
    DucklingTerminatorList: DucklingTerminator_state.DucklingTerminatorList,
    isLoading: DucklingTerminator_state.isLoading,
    SingleDucklingTerminator: DucklingTerminator_state.SingleDucklingTerminator
  };
};

const mapDispatchToProps = dispatch => ({
  getDucklingTerminator: () => dispatch(getDucklingTerminator()),
  getAllDucklingTerminator: () => dispatch(getAllDucklingTerminator()),
  createDucklingTerminator: () => dispatch(createDucklingTerminator()),
  updateDucklingTerminator: () => dispatch(updateDucklingTerminator()),
  deleteDucklingTerminator: () => dispatch(deleteDucklingTerminator())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleThree);
```

---

#### genie update

```bash
genie update
```
The genie will diff the new yml config to previous version and generate any required updates.

Notes: You cannot change the file structure that was created when the store was generated.

---

#### genie add

Add directly from the command line:

```bash
genie add [-m]/[-M] <model_name> [-a] <action_name> [-t] <thunk_name>
```
The add command allows you to add specific properties or thunks to an existing model, or add an entirely new model with defined properties to an existing store directly from the CLI.

Examples:

Add a new model

```bash

  genie add --newmodel Terminator

  genie add -M Terminator
```

Add actions in new model call 

```bash
  genie add --newmodel Terminator -a getIsBack -a killJohnConnor 

  without CRUD ops

  genie add --newmodel Terminator -a getIsBack --noCRUD
```

Add an action to specific model

```bash
  genie add --action getIsBack -model Terminator 
    
    ... or abbreviated 
  genie add -a getIsBack -m Terminator
```

Add a thunk to a specific model

```bash
  genie add --thunk countDux --model Dux
  
    ... or
  genie add -t countDux -m Dux

```

---

#### genie sample

```bash
genie sample
```

Outputs a sample _lamp.config.yml_ file to the current working directory.

---

#### genie list  

```bash
genie list
```

Prints the store file structure: 

```bash
actions
├── actions_for_Ducks.js
├── actions_for_Terminator.js
├── selectors_for_Ducks.js
└── selectors_for_Terminator.js

constants
└── action_constants.js

reducers
├── combine_reducers.js
├── reducer_for_Ducks.js
└── reducer_for_Terminator.js

store.js
```

---

### Team Redux Genie:

- [Gregory Ardison-Gardner](https://www.linkedin.com/in/ardison-gardner/)
- [Jon Cannon](https://www.linkedin.com/in/jonathan-cannon-62675683/)
- [Amy Kim](https://www.linkedin.com/in/amyarimkim/)
- [Nick Peresguloff](https://www.linkedin.com/in/nicholas-pereslugoff/)

---

### Contributing

Redux Genie is an open-source project.

Please make sure to update tests as appropriate.

---

### License

[MIT](https://choosealicense.com/licenses/mit/)
