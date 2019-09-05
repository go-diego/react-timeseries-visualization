import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render } from "@testing-library/react";
import TagCard from "../components/TagCard";

const id = "Tag99";
test("should get correct href", () => {
  const { getByTestId } = render(<TagCard id={id} />);
  const anchor = getByTestId("tag-anchor");
  expect(anchor).toHaveAttribute("href", `/timeseries/${id}`);
});
