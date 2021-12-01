import React, { useContext, useEffect } from "react";
import * as d3 from "d3";
import GeoJSONContext from "../../providers/GeoJSONProvider";
import "./Map.css";

const Map = ({ subject, colorScale, data }) => {
  const geoJSONData = useContext(GeoJSONContext);

  useEffect(() => {
    if (geoJSONData) {
      drawMap(geoJSONData, colorScale, subject, data);
    }
  }, [geoJSONData]);

  return <svg id={subject} className="Map"></svg>;
};

function drawMap(geoJSONData, colorScale, subject, data) {
  const width = 500;
  const height = 500;

  const projection = d3.geoMercator().fitSize([width, height], geoJSONData);
  const path = d3.geoPath(projection);

  const color = d3
    .scaleLinear()
    .domain([colorScale.minScaleValue, colorScale.maxScaleValue])
    .range(["white", colorScale.color]);

  d3.select(`#${subject}`)
    .append("g")
    .selectAll("path")
    .data(geoJSONData.features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("fill", d => color(data[d.properties.statnaam]));
}

export default Map;
