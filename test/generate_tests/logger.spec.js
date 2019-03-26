import { logger } from "../../store/store";
import chai from "chai";
import { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import store from "../../store/store";

////DUCKS///////////////////////////////////////////////////////////////////
// import { getAll } from "../../store/Campus/thunks_for_Campus"; //ducks
/////RAILS/////////////////////////////////////////////////////////////////
import { getAll } from "../../store/actions/thunks_for_Campus"; //rails
/////RAILS/////////////////////////////////////////////////////////////////

chai.use(sinonChai);

const spy = sinon.spy();
spy(logger);

describe("logger testing", () => {
  it("should call the logger", async () => {
    await store.dispatch(getAll());
    expect(spy).to.have.been.called;
  });
});
