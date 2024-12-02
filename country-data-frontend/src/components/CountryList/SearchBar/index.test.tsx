import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import SearchBar from "./index";

describe("SearchBar Component", () => {
  it("renders the component with a default value", () => {
    const setSearchType = vi.fn();
    const setSearchQuery = vi.fn();

    render(
      <SearchBar
        searchType="name"
        setSearchType={setSearchType}
        searchQuery=""
        setSearchQuery={setSearchQuery}
      />
    );

    expect(screen.getByPlaceholderText(/search by name/i)).toBeInTheDocument();
  });

  it("calls setSearchType when the type is changed", () => {
    const setSearchType = vi.fn();
    const setSearchQuery = vi.fn();

    render(
      <SearchBar
        searchType="name"
        setSearchType={setSearchType}
        searchQuery=""
        setSearchQuery={setSearchQuery}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "capital" },
    });
    expect(setSearchType).toHaveBeenCalledWith("capital");
  });

  it("calls setSearchQuery when the input value changes", () => {
    const setSearchType = vi.fn();
    const setSearchQuery = vi.fn();

    render(
      <SearchBar
        searchType="name"
        setSearchType={setSearchType}
        searchQuery=""
        setSearchQuery={setSearchQuery}
      />
    );

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "India" },
    });
    expect(setSearchQuery).toHaveBeenCalledWith("India");
  });
});
