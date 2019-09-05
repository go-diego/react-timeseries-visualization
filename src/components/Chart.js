import React from "react";
import { ResponsiveLine } from "@nivo/line";

export default function Chart({ data, xAxis, yAxis }) {
  return (
    <ResponsiveLine
      animate={true}
      data={data}
      margin={{ top: 50, right: 100, bottom: 50, left: 75 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d %H:%M",
        min: "auto",
        max: "auto"
      }}
      xFormat="time:%b %d %H:%M"
      yScale={{ type: "linear", min: "auto", max: "auto" }}
      axisBottom={{
        format: "%b %d %H:%M",
        legend: xAxis,
        legendOffset: 36,
        legendPosition: "middle"
      }}
      axisLeft={{
        legend: yAxis,
        legendOffset: -60,
        legendPosition: "middle"
      }}
      curve="monotoneX"
      pointSize={1}
      pointBorderWidth={1}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
}
