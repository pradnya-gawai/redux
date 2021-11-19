import MainNav from "../components/MainNav";
import { render, screen } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { act } from "react-test-renderer";
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

// describe("MainNav", () => {
//   test("should render  main nagivation correctly", () => {
//     const wrapper = shallow(<MainNav />);
//     expect(wrapper).toMatchSnapshot();
//   });
// });
it("renders correctly again", () => {
    const wrapper = render(
      <MockMainNav />
    );
  
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
// test("should disply whatshot icon", () => {
//   render(<MockMainNav />);
//   const whatshotElement = screen.getByTestId("whatshot");
//   expect(whatshotElement).toBeInTheDocument();
// });

// test("should disply movie icon", () => {
//   render(<MockMainNav />);
//   const whatshotElement = screen.getByTestId("movie-icon");
//   expect(whatshotElement).toBeInTheDocument();
// });

// test("should disply tv-icon", () => {
//   render(<MockMainNav />);
//   const whatshotElement = screen.getByTestId("tv");
//   expect(whatshotElement).toBeInTheDocument();
// });
// test("should display search icon", () => {
//   render(<MockMainNav />);
//   const whatshotElement = screen.getByTestId("search-icon");
//   expect(whatshotElement).toBeInTheDocument();
// // });
// test("test state", () => {
//     const wrapper =shallow(<MainNav />);
//     wrapper.find('#movie-icon').simulate('change')
//     expect(wrapper.find)
// })   