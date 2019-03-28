import actions from "./actions_for_CobraChicken"

export const migrateNorthThunk = () => dispatch => {
 
  return fetch('/api/geese')
      .then((resp) => resp.json()) 
      .then(function( {data} ) {
 
          dispatch(actions.goNorth(data))
  });
};

export default {
	migrateNorthThunk,
}