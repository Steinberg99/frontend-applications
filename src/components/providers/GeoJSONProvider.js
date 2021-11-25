import { useState, useEffect, createContext } from "react";
import fetchData from "../../utils/fetchData";

const GeoJSONContext = createContext({
  province: null,
  township: null,
  tourism: null
});

const urls = [
  "https://cartomap.github.io/nl/wgs84/provincie_2021.geojson",
  "https://cartomap.github.io/nl/wgs84/gemeente_2021.geojson"
];

export const GeoJSONProvider = ({ children }) => {
  const [provinceGeoJSONData, setProviceGeoJSONData] = useState(null);
  const [townshipGeoJSONData, setTownshipGeoJSONData] = useState(null);

  useEffect(() => {
    fetchData(urls[0]).then(d => setProviceGeoJSONData(d));
    fetchData(urls[1]).then(d => setTownshipGeoJSONData(d));
  }, []);

  return (
    <GeoJSONContext.Provider
      value={{
        province: provinceGeoJSONData,
        township: townshipGeoJSONData
      }}
    >
      {children}
    </GeoJSONContext.Provider>
  );
};

export default GeoJSONContext;
