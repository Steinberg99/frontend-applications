import React from "react";
import useD3 from "../../hooks/useD3";
import * as d3 from "d3";
import "./MapLegend.css";

const MapLegend = ({ min, max, color, gradientId }) => {
  const ref = useD3(svg => {
    const legendWidth = 350;
    const legendHeight = 75;
    const padding = 25;
    const step = 5;

    let ticks;
    if (max < 0) {
      ticks = (-max - min) / step;
    } else {
      ticks = (max - min) / step;
    }

    let defs = svg.append("defs");
    let gradient = defs.append("linearGradient").attr("id", gradientId);

    gradient.append("stop").attr("offset", "0").style("stop-color", "white");
    gradient.append("stop").attr("offset", "1").style("stop-color", color);

    svg
      .append("rect")
      .attr("transform", `translate(${padding}, ${padding})`)
      .attr("fill", `url(#${gradientId})`)
      .attr("width", legendWidth - 2 * padding + 1)
      .attr("height", legendHeight - 2 * padding);

    const x = d3
      .scaleLinear()
      .domain([min, max])
      .range([0, legendWidth - 2 * padding]);

    svg
      .select(".x-axis")
      .attr("transform", `translate(${padding}, ${legendHeight - padding})`)
      .call(
        d3
          .axisBottom(x)
          .tickFormat(d => `${d}°`)
          .ticks(ticks)
          .tickSizeOuter(0)
      );
  }, []);

  return (
    <svg ref={ref} className="MapLegend">
      <g className="x-axis"></g>
    </svg>
  );
};

export default MapLegend;
