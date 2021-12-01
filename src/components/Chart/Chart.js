import useD3 from "../../hooks/useD3";
import React from "react";
import * as d3 from "d3";
import "./Chart.css";

const Chart = ({ data, previousData }) => {
  const ref = useD3(
    svg => {
      const chartWidth = 1000;
      const chartHeight = 500;
      const padding = 50;
      const radius = 5;

      const max = 20;
      const min = 0;
      const step = 5;
      const yAxisTickAmount = (max - min) / step;
      const backgroundRectHeight =
        (chartHeight - 2 * padding) / ((max - min) / step);

      const x = d3
        .scaleBand()
        .domain(data.map(d => d.month))
        .range([0, chartWidth - 2 * padding]);

      const y = d3
        .scaleLinear()
        .domain([max, min])
        .range([0, chartHeight - 2 * padding]);

      svg // Add the x axis to the chart.
        .select(".x-axis")
        .attr("transform", `translate(${padding}, ${chartHeight - padding})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      svg // Add the y axis to the chart.
        .select(".y-axis")
        .attr("transform", `translate(${padding}, ${padding})`)
        .call(
          d3
            .axisLeft(y)
            .tickFormat(d => `${d}°`)
            .ticks(yAxisTickAmount)
        );

      console.log(
        y
          .ticks(min + step, max, step)
          .filter((d, i) => i % 2 === 0)
          .pop()
      );

      svg // Draw the background rectangles of the chart.
        .select(".plot-area-background")
        .selectAll("rect")
        .data(
          y
            .ticks(min + step, max, step)
            .filter((d, i) => i % 2 === 0 && i !== yAxisTickAmount) // Only draw the rectangles when the index of the tick is even. Also do not draw a rectangle for the last tick element.
        )
        .enter()
        .append("rect")
        .attr("class", "background-rect")
        .attr("width", chartWidth - 2 * padding)
        .attr("height", backgroundRectHeight)
        .attr("x", padding)
        .attr("y", d => y(d));

      svg
        .select(".plot-area-background")
        .attr("transform", `translate(1, ${padding})`)
        .selectAll("line")
        .data(y.ticks(min + step, max, step))
        .enter()
        .append("line")
        .attr("class", "background-line")
        .attr("x1", padding)
        .attr("x2", chartWidth - padding)
        .attr("y1", d => 0.5 + y(d))
        .attr("y2", d => 0.5 + y(d));

      svg // Add the dots to the chart.
        .select(".plot-area")
        .attr("transform", `translate(${padding}, ${padding})`)
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "temp-dot")
        .attr("cx", d => x.bandwidth() / 2 + x(d.month))
        .attr("cy", d => y(d.temperature))
        .attr("r", radius);

      svg // Add the line to the chart.
        .select(".plot-area")
        .append("path")
        .datum(data)
        .attr("class", "temp-path")
        .attr("transform", `translate(${x.bandwidth() / 2}, 0)`) // Transform the line to match the dots in the chart.
        .attr(
          "d",
          d3
            .line()
            .x(d => x(d.month))
            .y(d => y(d.temperature))
        );

      if (previousData) {
        svg // Add the dots of the previous data to the chart.
          .select(".previous-plot-area")
          .attr("transform", `translate(${padding}, ${padding})`)
          .selectAll("circle")
          .data(previousData)
          .enter()
          .append("circle")
          .attr("class", "previous-temp-dot")
          .attr("cx", d => x.bandwidth() / 2 + x(d.month))
          .attr("cy", d => y(d.temperature))
          .attr("r", radius);

        svg // Add the line of the previous data to the chart.
          .select(".previous-plot-area")
          .append("path")
          .datum(previousData)
          .attr("class", "previous-temp-path")
          .attr("transform", `translate(${x.bandwidth() / 2}, 0)`) // Transform the line to match the dots in the chart.
          .attr(
            "d",
            d3
              .line()
              .x(d => x(d.month))
              .y(d => y(d.temperature))
          );
      }
    },
    [data.length]
  );

  return (
    <svg ref={ref} className="Chart">
      <g className="plot-area-background"></g>
      <g className="previous-plot-area"></g>
      <g className="plot-area"></g>
      <g className="x-axis"></g>
      <g className="y-axis"></g>
    </svg>
  );
};

export default Chart;
