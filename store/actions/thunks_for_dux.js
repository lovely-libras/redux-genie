import actions from "../constants/action_constants"

export const getAll = () => dispatch => {
  fetch('/api/dux')
      .then((resp) => resp.json()) 
      .then(function(data) {
          dispatch(data)
  });
};

export const getOne = () => dispatch => {
  fetch('/api/Dux/:dux')
      .then((resp) => resp.json()) 
      .then(function(data) {
          dispatch(data)
  });
};

export default {
	getAll,
	getOne,
}