import actions from "../constants/action_constants"

  export const getAll = () => dispatch => {
      fetch('api/terminator')
          .then((resp) => resp.json()) 
          .then(function(data) {
              dispatch(data)
    });
  };

  export const getOne = () => dispatch => {
      fetch('api/terminator/:terminator')
          .then((resp) => resp.json()) 
          .then(function(data) {
              dispatch(data)
    });
  };

export default {
}