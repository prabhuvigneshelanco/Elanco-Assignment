import { render, screen } from "@testing-library/react";
import Home from "./index";

describe("Home Page", () => {
  it("renders the Home page with loading state", () => {
    render(<Home />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
