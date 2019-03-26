import nock from "nock";

nock.disableNetConnect();

// Configure the base url to your endpoint here
export default nock("http://localhost:3000/api/");
