import Chart from "./components/Chart/Chart";
import Map from "./components/Map/Map";
import { GeoJSONProvider } from "./components/providers/GeoJSONProvider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div id="maps-container">
        <GeoJSONProvider>
          <Map mapType="province" subject="province1" />
          <Map mapType="province" subject="province2" />
          <Map mapType="township" subject="township1" />
          <Map mapType="township" subject="township2" />
        </GeoJSONProvider>
      </div>
      <div id="chart-container">
        <Chart
          subject="temperatuur"
          data={[
            6.2, 7.2, 6.8, 11.1, 13.1, 17.5, 17.0, 20.4, 15.2, 11.3, 8.9, 5.5
          ]}
        />
      </div>
    </div>
  );
}

export default App;
