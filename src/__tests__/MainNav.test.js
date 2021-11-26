import MainNav from "../components/MainNav";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from "react-router-dom";
const MockMainNav = () => {
  return (
    <BrowserRouter>
      <MainNav />
    </BrowserRouter>
  );
};

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  // render(<MockMainNav/>)
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders correctly again", () => {
  const wrapper = render(<MockMainNav />);

  expect(wrapper).toMatchSnapshot();
});

describe("check icon", () => {
  test("check icon correctly", () => {
    const { getByTestId } = render(<MockMainNav />);
    expect(getByTestId("whatshot").textContent).toMatch("Trending");

    expect(getByTestId("movie-icon").textContent).toMatch("Movies");

    expect(getByTestId("tv-icon").textContent).toMatch("TV Series");

    expect(getByTestId("search-icon").textContent).toMatch("Search");
  });
});
