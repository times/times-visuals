import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

import PostcodeSearch from "../index";

describe("<PostcodeSearch />", () => {
  beforeEach(() => {
    cleanup();
    fetch.resetMocks();
  });

  it("should render correctly", () => {
    const { asFragment } = render(<PostcodeSearch />);

    expect(asFragment()).toMatchSnapshot();
  });

  describe("postcodes.io", () => {
    it("should return the result from postcodes.io", async () => {
      fetch.mockResponses([
        JSON.stringify({
          result: {
            mock: "postcodes.io response"
          }
        }),
        { status: 200 }
      ]);

      const mockOnLoad = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <PostcodeSearch onLoad={mockOnLoad} />
      );

      fireEvent.change(getByPlaceholderText("Search for a postcode"), {
        currentTarget: {
          value: "SE19GF"
        }
      });
      fireEvent.click(getByText("Search"));

      await wait();

      expect(mockOnLoad).toHaveBeenCalledWith({
        mock: "postcodes.io response"
      });
    });

    it("should show an error if postcodes.io returns a non-200 response", async () => {
      fetch.mockResponses([
        JSON.stringify({
          error: "Foo bar"
        }),
        { status: 500 }
      ]);

      const mockOnError = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <PostcodeSearch onError={mockOnError} />
      );

      fireEvent.change(getByPlaceholderText("Search for a postcode"), {
        currentTarget: {
          value: "SE19GF"
        }
      });
      fireEvent.click(getByText("Search"));

      await wait();

      expect(mockOnError).toHaveBeenCalledWith(
        new Error("Internal Server Error")
      );
    });
  });

  describe("custom provider", () => {
    it("should return the result from the custom provider function", async () => {
      const mockOnLoad = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <PostcodeSearch
          provider="custom"
          onLoad={mockOnLoad}
          onRequest={() =>
            Promise.resolve({
              mock: "custom provider response"
            })
          }
        />
      );

      fireEvent.change(getByPlaceholderText("Search for a postcode"), {
        currentTarget: {
          value: "SE19GF"
        }
      });
      fireEvent.click(getByText("Search"));

      await wait();

      expect(mockOnLoad).toHaveBeenCalledWith({
        mock: "custom provider response"
      });
    });

    it("should show an error if the custom provider function rejects", async () => {
      const mockOnError = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <PostcodeSearch
          provider="custom"
          onError={mockOnError}
          onRequest={() => Promise.reject(new Error("Some error"))}
        />
      );

      fireEvent.change(getByPlaceholderText("Search for a postcode"), {
        currentTarget: {
          value: "SE19GF"
        }
      });
      fireEvent.click(getByText("Search"));

      await wait();

      expect(mockOnError).toHaveBeenCalledWith(new Error("Some error"));
    });

    it("should show an error if no custom provider request function is provided", async () => {
      const mockOnError = jest.fn();
      const { getByPlaceholderText, getByText } = render(
        <PostcodeSearch provider="custom" onError={mockOnError} />
      );

      fireEvent.change(getByPlaceholderText("Search for a postcode"), {
        currentTarget: {
          value: "SE19GF"
        }
      });
      fireEvent.click(getByText("Search"));

      await wait();

      expect(mockOnError).toHaveBeenCalledWith(
        new Error(
          "Please provide the `onRequest` prop when using a custom provider"
        )
      );
    });
  });
});
