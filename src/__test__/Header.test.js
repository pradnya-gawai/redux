import { render, screen } from "@testing-library/react";
import Header from "../components/Header/Header";
import renderer from 'react-test-renderer';

describe("Header", () => {
  it("should render property", () => {
    render(<Header />);
    const headerElement = screen.getByText(/movies hub/i);
    expect(headerElement).toBeInTheDocument();
  });
});
it('"snapshot" of header component', () => {
  const tree = renderer.create(<Header />).toJSON();
  expect(tree).toMatchSnapshot();
});
