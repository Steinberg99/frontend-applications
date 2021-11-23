import React, { useContext, useEffect } from "react";
import * as d3 from "d3";
import GeoJSONContext from "../providers/GeoJSONProvider";
import "./Map.css";

const Map = ({ mapType, subject }) => {
  const geoJSONData = useContext(GeoJSONContext);

  console.log(geoJSONData, mapType, subject);

  useEffect(() => {
    if (geoJSONData[mapType]) {
      drawMap(subject, geoJSONData[mapType]);
    }
  }, [geoJSONData]);

  return (
    <div>
      <h1>{subject}</h1>
      <svg id={subject} className="Map"></svg>
    </div>
  );
};

function drawMap(subject, geoJSONData) {
  const width = 500;
  const height = 500;

  const projection = d3.geoMercator().fitSize([width, height], geoJSONData);
  const path = d3.geoPath(projection);

  d3.select(`#${subject}`)
    .append("g")
    .selectAll("path")
    .data(geoJSONData.features)
    .enter()
    .append("path")
    .attr("d", path);
}

export default Map;
