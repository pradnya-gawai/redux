import Header from "../components/Header/Header";
import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-test-renderer";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Header", () => {
  test("should render  header correctly", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
  });
  
  test("Renders's the header and required inputs", () => {
    const { getByText, getByTestId } = render(<Header />);
    expect(getByTestId("header")).toBeTruthy();
    expect(getByText("Movies Hub")).toBeTruthy();
    // matching textContent
    expect(getByTestId("header").textContent).toMatch("Movies Hub");
  });
});
