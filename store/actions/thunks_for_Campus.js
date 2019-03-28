import actions from "../actions/actions_for_Campus"

export const getAll = () => dispatch => {
 
  return fetch('/api/Dux')
      .then((resp) => resp.json()) 
      .then(function( {data} ) {
 
          dispatch(actions.countDux(data))
  });
};

export const getOne = () => dispatch => {
 
  return fetch('/api/Dux/:dux')
      .then((resp) => resp.json()) 
      .then(function( {data} ) {
 
          dispatch(actions.migrateDux(data))
  });
};

export default {
	getAll,
	getOne,
}