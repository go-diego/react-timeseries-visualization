import "@testing-library/react/cleanup-after-each";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DateTimePicker from "../components/DateTimePicker";

const onChange = jest.fn();

test("tag should display apropriate label", async () => {
  const { getByTestId } = render(<DateTimePicker onChange={onChange} />);
  const input = getByTestId("date-time-picker");
  fireEvent.change(input, { target: { value: "2019-09-01T01:00" } });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith("2019-09-01T01:00");
});
