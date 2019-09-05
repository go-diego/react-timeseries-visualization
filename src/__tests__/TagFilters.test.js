import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";
import TagFilters from "../components/TagFilters";

const onFilterSelect = jest.fn();
const onFilterDeselect = jest.fn();
const label = "Feature1";

test("tag should display appropriate label", async () => {
  const { getByTestId } = render(<TagFilters label={label} />);
  const tag = getByTestId("filter-tag");
  fireEvent.click(tag);
  expect(tag).toHaveTextContent(label);
});

test("filter should be selected", async () => {
  const { getByTestId } = render(
    <TagFilters
      label={label}
      onFilterDeselect={onFilterDeselect}
      onFilterSelect={onFilterSelect}
    />
  );

  const tag = getByTestId("filter-tag");
  fireEvent.click(tag);

  expect(onFilterSelect).toHaveBeenCalledTimes(1);
  expect(onFilterSelect).toHaveBeenCalledWith(label);
});

test("filter should be deselected", async () => {
  const { getByTestId } = render(
    <TagFilters
      label={label}
      onFilterDeselect={onFilterDeselect}
      onFilterSelect={onFilterSelect}
    />
  );

  const tag = getByTestId("filter-tag");
  fireEvent.click(tag);

  const deselectButton = await waitForElement(() =>
    getByTestId("filter-deselect")
  );
  fireEvent.click(deselectButton);

  expect(onFilterDeselect).toHaveBeenCalledTimes(1);
  expect(onFilterDeselect).toHaveBeenCalledWith(label);
});
