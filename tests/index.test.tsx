import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index.jsx";

describe("Home", () => {
  it("renders Battle of Dragons heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("Battle of Dragons");
  });
});
