import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { searchURL } from "../config/config";
import { server } from "../mocks";
import { movieData, tvData } from "../mocks/fixtures";
import Search from "../Pages/Search/Search";

test("if movies are being rendered correctly based on search input", async () => {
  render(<Search />);

  userEvent.click(screen.getByTestId("movie-tab"));
  let input = screen.getByLabelText("Search");
  userEvent.type(input, "game of thrones");
  expect(input.value).toBe("game of thrones");

  userEvent.click(screen.getByTestId("search-btn"));

  expect((await screen.findAllByTestId("single"))[0]).toBeInTheDocument();
  expect((await screen.findByTestId("search-content")).children.length).toEqual(
    7
  );

  let title = movieData.results[0].title || movieData.results[0].name;
  let date =
    movieData.results[0].first_air_date || movieData.results[0].release_date;
  expect(screen.getAllByTestId("title")[0]).toHaveTextContent(title);
  expect(screen.getAllByTestId("subTitle")[0]).toHaveTextContent(date);
});

test("if TV shows are being rendered correctly based on search input", async () => {
  render(<Search />);

  userEvent.click(screen.getByTestId("tv-tab"));

  let input = screen.getByLabelText("Search");
  userEvent.type(input, "game of thrones");
  expect(input.value).toBe("game of thrones");

  userEvent.click(screen.getByTestId("search-btn"));

  expect((await screen.findAllByTestId("single"))[0]).toBeInTheDocument();
  expect((await screen.findByTestId("search-content")).children.length).toEqual(
    2
  );

  let title = tvData.results[0].title || tvData.results[0].name;
  let date = tvData.results[0].first_air_date || tvData.results[0].release_date;
  expect(screen.getAllByTestId("title")[0]).toHaveTextContent(title);
  expect(screen.getAllByTestId("subTitle")[0]).toHaveTextContent(date);
});

test("message shown if movies not found", async () => {
  server.use(
    rest.get(`${searchURL}movie`, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json([]))
    )
  );
  render(<Search />);

  userEvent.click(screen.getByTestId("movie-tab"));

  let input = screen.getByLabelText("Search");
  userEvent.type(input, "unknown");
  expect(input.value).toBe("unknown");

  userEvent.click(screen.getByTestId("search-btn"));

  expect(await screen.findByTestId("not-found")).toHaveTextContent(
    "No Movies Found"
  );
});

test("message shown if tv shows not found", async () => {
  server.use(
    rest.get(`${searchURL}tv`, (_req, res, ctx) =>
      res(ctx.status(200), ctx.json([]))
    )
  );
  render(<Search />);

  userEvent.click(screen.getByTestId("tv-tab"));

  let input = screen.getByLabelText("Search");
  userEvent.type(input, "unknown");
  expect(input.value).toBe("unknown");

  userEvent.click(screen.getByTestId("search-btn"));

  expect(await screen.findByTestId("not-found")).toHaveTextContent(
    "No Series Found"
  );
});
