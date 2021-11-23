import Map from "./components/Map/Map";
import { GeoJSONProvider } from "./components/providers/GeoJSONProvider";
import "./App.css";

function App() {
  return (
    <div className="App">
      <GeoJSONProvider>
        <Map mapType="province" subject="province1" />
        <Map mapType="province" subject="province2" />
        <Map mapType="township" subject="township1" />
        <Map mapType="township" subject="township2" />
        <Map mapType="tourism" subject="tourism1" />
        <Map mapType="tourism" subject="tourism2" />
      </GeoJSONProvider>
    </div>
  );
}

export default App;
