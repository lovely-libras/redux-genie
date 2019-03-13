import actions from "./actions"

const getGit = ( data ) => {

	return {
		type: actions.GET_GIT,
		data
	}
}

const getAllGit = ( data ) => {

	return {
		type: actions.GET_ALL_GIT,
		data
	}
}

const createGit = ( data ) => {

	return {

		type: actions.ADD_GIT,
		data
	}
}

const updateGit = ( data ) => {

	return {

		type: actions.UPDATE_GIT,
		data
	}
}

const deleteGit = ( data ) => {

	return {

		type: actions.DELETE_GIT,
		data
	}
}

const getBranch = ( data ) => {

	return {
		type: actions.GET_BRANCH,
		data
	}
}

const getAllBranch = ( data ) => {

	return {
		type: actions.GET_ALL_BRANCH,
		data
	}
}

const createBranch = ( data ) => {

	return {

		type: actions.ADD_BRANCH,
		data
	}
}

const updateBranch = ( data ) => {

	return {

		type: actions.UPDATE_BRANCH,
		data
	}
}

const deleteBranch = ( data ) => {

	return {

		type: actions.DELETE_BRANCH,
		data
	}
}

export default {

	getGit,
	getAllGit,
	createGit,
	updateGit,
	deleteGit
	getBranch,
	getAllBranch,
	createBranch,
	updateBranch,
	deleteBranch
}