to call the program, run:

`node boiler_index.js <model arguments>`

eg:

"node boiler.index.js Monkey Giraffe Parakeet"

this will output Redux files with "Monkey Giraffe Parakeet" models

the total file structure of the output store:

Roadmap for POC:

- = folder
> = file

- POC_boiler
	> index.js - compiles the store with all child files
	- store 
		- actions
			> (file for each model)
		- constants
			> (this should really just be one file- set it and forget it)
		- reducers
			> separate file for each reducer
		- containers (this means connected React components- let skip this for now)
		- components (this means presentational or stateless React Components- let skip this for now as well)

The Redux FAQs suggest three different models for organizing the file structure:

	Rails-style: separate folders for “actions”, “constants”, “reducers”, “containers”, and “components”

	Domain-style: separate folders per feature or domain, possibly with sub-folders per file type

	“Ducks”: similar to domain style, but explicitly tying together actions and reducers, often by defining them in the same file
