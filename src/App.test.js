/* eslint-disable jest/prefer-expect-assertions */
/* eslint-disable jest/no-hooks */
/* eslint-disable jest/expect-expect */
import ReactDOM from "react-dom";
import App from "./pages/App";

describe("aaa", () => {
  beforeEach(() => jest.resetModules());

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
