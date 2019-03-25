import { logger } from "../../store/store";
import chai from "chai";
import { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import store from "../../store/store";
import { getAll } from "../../store/Campus/thunks_for_Campus"; //ducks
chai.use(sinonChai);

const spy = sinon.spy(logger);

describe("logger testing", () => {
  it("should call the logger", () => {
    store.dispatch(getAll());
    expect(spy).to.have.been.called;
  });
});
