import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./Map.css";

function Map(props) {
  const [geoJSONData, setGeoJSONData] = useState({});

  useEffect(() => {
    fetchGeoJSONData(props.geoJSONUrl);
  }, []);

  const fetchGeoJSONData = async () => {
    try {
      const response = await fetch(props.geoJSONUrl);
      const data = await response.json();
      setGeoJSONData(data);
    } catch (error) {
      console.log(error);
    }
  };

  drawMap(props.id, geoJSONData);

  return (
    <div>
      <h1>{props.id}</h1>
      <svg id={props.id} className="Map"></svg>
    </div>
  );
}

function drawMap(id, geoJSONData) {
  const width = 500;
  const height = 500;

  const projection = d3.geoMercator().fitSize([width, height], geoJSONData);
  const path = d3.geoPath(projection);

  d3.select(`#${id}`)
    .append("g")
    .selectAll("path")
    .data(geoJSONData.features)
    .enter()
    .append("path")
    .attr("d", path);
}

export default Map;
