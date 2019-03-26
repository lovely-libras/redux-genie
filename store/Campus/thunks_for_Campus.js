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
  return fetch(`/api/Dux/${payload}`)
    .then(resp => resp.json())
    .then(function({ data }) {
      dispatch(actions.getCampus(payload));
    });
};

export const createOne = payload => dispatch => {
  console.log("add new campus is called");
  return fetch("/api/Dux", { method: "POST", body: payload })
    .then(resp => resp.json())
    .then(function({ data }) {
      dispatch(actions.createCampus(payload));
    });
};

export const updateOne = payload => dispatch => {
  console.log("add new campus is called");
  return fetch(`/api/Dux/${payload}`, { method: "PUT", body: payload })
    .then(resp => resp.json())
    .then(function({ data }) {
      dispatch(actions.updateCampus(payload));
    });
};

export const deleteOne = payload => dispatch => {
  console.log("delete campus");
  return fetch(`/api/Dux/${payload}`, { method: "DELETE", body: payload })
    .then(resp => resp.json())
    .then(function({ data }) {
      dispatch(actions.deleteCampus(payload));
    });
};

export default {
  getAll,
  getOne,
  createOne,
  updateOne
};
