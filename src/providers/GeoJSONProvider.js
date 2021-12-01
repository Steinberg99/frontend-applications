import { useState, useEffect, createContext } from "react";
import fetchData from "../utils/fetchData";

const GeoJSONContext = createContext(null);

const url = ["https://cartomap.github.io/nl/wgs84/provincie_2021.geojson"];

export const GeoJSONProvider = ({ children }) => {
  const [provinceGeoJSONData, setProviceGeoJSONData] = useState(null);

  useEffect(() => {
    fetchData(url).then(d => setProviceGeoJSONData(d));
  }, []);

  return (
    <GeoJSONContext.Provider value={provinceGeoJSONData}>
      {children}
    </GeoJSONContext.Provider>
  );
};

export default GeoJSONContext;
