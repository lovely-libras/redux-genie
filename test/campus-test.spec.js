import { expect } from "chai";
import store from "../store";
import {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne
} from "./thunks_for_Campus";
import fetchMock from "fetch-mock";

const campuses = [
  { name: "campus1", address: "not here yet" },
  { name: "campus2" }
];
const newCampus = { name: "campusNew" };
const oneCampus = { name: "campus1" };
const oneUpdatedCampus = { name: "campus1", address: "something" };

const URL = "/api/Dux";
fetchMock.mock(URL, { data: campuses, status: 200 });

const getOneURL = `/api/Dux/${oneCampus}`;
fetchMock.mock(getOneURL, { data: campuses, status: 201 });

const updateOneURL = `/api/Dux/${oneUpdatedCampus}`;
fetchMock.mock(
  updateOneURL,
  { data: campuses, status: 203 },
  { overwriteRoutes: false }
);

describe("campuses", () => {
  
  it("should get all campus in the store", async () => {
    await store.dispatch(getAll());

    const campusList = store.getState().Campus_state.CampusList;
    expect(campusList).to.deep.equal(campuses);
  });

  it("add a campus", async () => {
    await store.dispatch(createOne(newCampus));

    const campusAdded = store.getState().Campus_state.CampusList;

    expect(campusAdded).to.deep.equal(campuses.concat(newCampus));
  });

  it("get a single campus", async () => {

    await store.dispatch(getOne(oneCampus));

    const singleCampus = store.getState().Campus_state.CampusList;

    expect(singleCampus).to.deep.equal(singleCampus);

  });

  it("update campus", async () => {
    await store.dispatch(updateOne(oneUpdatedCampus));

    const singleCampus = store.getState().Campus_state.CampusList;

    expect(singleCampus).to.deep.equal([
      { name: "campus1", address: "something" },
      { name: "campus2" },
      { name: "campusNew" }
    ]);

  });

  it("delete newCampus campus", async () => {
    await store.dispatch(deleteOne(oneUpdatedCampus));

    const deleteOneCampus = store.getState().Campus_state.CampusList;

    expect(deleteOneCampus).to.deep.equal([
      { name: "campus2" },
      { name: "campusNew" }
    ]);
    
  });
});
