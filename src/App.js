import Map from "./components/Map/Map.js";
import Chart from "./components/Chart/Chart.js";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Map
        id="provices"
        geoJSONUrl="https://cartomap.github.io/nl/wgs84/provincie_2021.geojson"
      ></Map>
      <Map
        id="townships"
        geoJSONUrl="https://cartomap.github.io/nl/wgs84/gemeente_2021.geojson"
      ></Map>
      <Map
        id="tourism-areas"
        geoJSONUrl="https://cartomap.github.io/nl/wgs84/toeristengebied_2021.geojson"
      ></Map>
      <Map
        id="ggd-regions"
        geoJSONUrl="https://cartomap.github.io/nl/wgs84/ggdregio_2021.geojson"
      ></Map>
      <Map
        id="france"
        geoJSONUrl="https://france-geojson.gregoiredavid.fr/repo/departements.geojson"
      ></Map>
    </div>
  );
}

export default App;
