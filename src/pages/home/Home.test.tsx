import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "./Home";

const queryClient = new QueryClient();
const QueryClientWithHome = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

let todos: any = [];

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json(todos);
  }

  if (req.method === "POST") {
    const newTodo = { id: Date.now(), text: req.body.text };
    todos.unshift(newTodo);
    return res.status(201).json(newTodo);
  }

  return res.status(405).end();
}

test("renders input and button", () => {
  render(<QueryClientWithHome />);
  expect(screen.getByTestId("input-text")).toBeInTheDocument();
  expect(screen.getByTestId("add-button")).toBeInTheDocument();
});

test("search users on button click", async () => {
  render(<QueryClientWithHome />);
  const input = screen.getByTestId("input-text");
  const button = screen.getByTestId("add-button");

  fireEvent.change(input, { target: { value: "satriayudhia" } });
  fireEvent.click(button);

  await waitFor(() =>
    expect(screen.getByText("satriayudhia")).toBeInTheDocument()
  );
});

const server = setupServer(
  rest.get("/search/users", (req, res, ctx) => {
    const url = new URL(req.url);
    const q = url.searchParams.get("q");
    const per_page = url.searchParams.get("per_page");

    if (q === "q:satriayudhia" && per_page === "per_page:5") {
      return res(
        ctx.json([
          {
            id: 123,
            login: "satriayudhia",
            repos_url: "https://github.com/repos/satriayudhia",
          },
        ])
      );
    }
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
