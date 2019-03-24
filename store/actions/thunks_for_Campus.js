// import actions from "../constants/action_constants_for_Campus";
import actions from "./actions_for_Campus";

export const getAll = () => dispatch => {
  console.log("thunk getting called");
  return fetch("/api/Dux")
    .then(resp => resp.json())
    .then(function({ data }) {
      dispatch(actions.getAllCampus(data));
    });
};

export const getOne = payload => dispatch => {
  return fetch(`/api/Dux/${payload}`, {method:'POST', body:payload})
    .then(resp => resp.json())
    .then(function({ data }) {
      dispatch(actions.createCampus(payload));
    });
};

export default {
  getAll,
  getOne
};
