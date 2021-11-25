import React from "react";
import * as d3 from "d3";
import "./Chart.css";

const Chart = ({ subject, data }) => {
  drawChart(subject, data);

  return (
    <div>
      <h1>{subject}</h1>
      <svg id={subject} className="Chart">
        <g id={`${subject}-plot-area`}></g>
        <g id={`${subject}-x-axis`}></g>
        <g id={`${subject}-y-axis`}></g>
      </svg>
    </div>
  );
};

function drawChart(subject, data) {
  const chartWidth = 500;
  const chartHeight = 250;
  const padding = 50;

  const maxTemp = 30;
  const minTemp = -15;
  const step = 5;
  const yAxisTicks = (maxTemp - minTemp) / step;

  const months = [
    "Jan",
    "Feb",
    "Mrt",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec"
  ];

  const x = d3
    .scaleBand()
    .domain(d3.range(months.length))
    .range([0, chartWidth - 2 * padding]);

  const y = d3
    .scaleLinear()
    .domain([maxTemp, minTemp])
    .range([0, chartHeight - 2 * padding]);

  d3.select(`#${subject}-x-axis`)
    .attr("transform", `translate(${padding}, ${chartHeight - padding})`)
    .call(
      d3
        .axisBottom(x)
        .tickFormat(i => `${months[i]}`)
        .tickSizeOuter(0)
    );

  d3.select(`#${subject}-y-axis`)
    .attr("transform", `translate(${padding}, ${padding})`)
    .call(
      d3
        .axisLeft(y)
        .tickFormat(d => `${d}°`)
        .ticks(yAxisTicks)
    );

  d3.select(`#${subject}-plot-area`)
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d))
    .attr("width", x.bandwidth())
    .attr("y", d => y(d))
    .attr("height", d => y(d));
}

export default Chart;
