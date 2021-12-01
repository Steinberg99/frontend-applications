import Chart from "./components/Chart/Chart";
import Map from "./components/Map/Map";
import MapLegend from "./components/MapLegend/MapLegend";
import { monthlyTemp, minProvinceTemp, maxProvinceTemp } from "./data";
import { GeoJSONProvider } from "./providers/GeoJSONProvider";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Introductie. */}
      <section>
        <h1>Temperatuur in De Bilt</h1>
        <p>
          Op 22 november 2021 ben ik samen met mijn klas begonnen aan het vak {}
          <span>Frontend Applications</span>. We kregen de opdracht om met
          behulp van <span>React</span> en <span>D3.js</span>
          een applicatie te maken die in staat is om dynamisch data te
          visualiseren. Ik heb er voor gekozen om gemiddelde maandtemperaturen
          per eeuw in De Bilt te visualiseren. Met behulp van deze visualisatie
          wilde ik de volgende vraag beantwoorden.
        </p>
        <ul>
          <li>
            Is de opwarming van de aarde te zien in de maandelijkse gemiddelde
            temperaturen per eeuw van Nederland?
          </li>
        </ul>
      </section>
      {/* 21e eeuw. */}
      <section className="chart-container">
        <h2>De 21e eeuw</h2>
        <p>
          In de onderstaande grafiek representeert de oranje lijn de gemiddelde
          maandtemperatuur van de 21e eeuw en de grijze lijn de gemiddelde
          maandtemperatuur van de 20e eeuw. Zoals in de grafiek te zien is ligt
          de oranje lijn significant hoger dan de grijze lijn.
        </p>
        <Chart data={monthlyTemp[0]} previousData={monthlyTemp[1]} />
      </section>

      {/* 20e eeuw. */}
      <section className="chart-container">
        <h2>De 20e eeuw</h2>
        <p>
          In de onderstaande grafiek representeert de oranje lijn de gemiddelde
          maandtemperatuur van de 20e eeuw en de grijze lijn de gemiddelde
          maandtemperatuur van de 19e eeuw. Zoals in de grafiek te zien is ligt
          de gemiddelde maandtemperatuur in de wintermaanden al iets hoger.
        </p>
        <Chart data={monthlyTemp[1]} previousData={monthlyTemp[2]} />
      </section>

      {/* 19e eeuw. */}
      <section className="chart-container">
        <h2>De 19e eeuw</h2>
        <p>
          In de onderstaande grafiek representeert de oranje lijn de gemiddelde
          maandtemperatuur van de 19e eeuw en de grijze lijn de gemiddelde
          maandtemperatuur van de 18e eeuw. Tussen deze twee lijnen zijn geen
          significante verschillen te zien.
        </p>
        <Chart data={monthlyTemp[2]} previousData={monthlyTemp[3]} />
      </section>

      {/* 18e eeuw. */}
      <section className="chart-container">
        <h2>De 18e eeuw</h2>
        <p>
          In de onderstaande grafiek representeert de oranje lijn de gemiddelde
          maandtemperatuur van de 18e eeuw.{" "}
        </p>
        <Chart data={monthlyTemp[3]} previousData={null} />
      </section>

      {/* Hoogste en laagste temperaturen per provincie. */}
      <section className="map-container">
        <h2>Hoogste en laagste temperaturen per provincie</h2>
        <GeoJSONProvider>
          <h3>De laagst gemeten temperatuur per provincie</h3>
          <p>
            In de onderstaande kaart wordt de laagst gemeten temperatuur per
            provincie weergegeven.
          </p>
          <Map
            colorScale={{ color: "blue", minScaleValue: 0, maxScaleValue: -30 }}
            subject="min"
            data={minProvinceTemp}
          />
          <MapLegend min={0} max={-30} color="blue" gradientId="min-temp" />
          <h3>De hoogst gemeten temperatuur per provincie</h3>
          <p>
            In de onderstaande kaart wordt de hoogst gemeten temperatuur per
            provincie weergegeven.
          </p>
          <Map
            colorScale={{ color: "red", minScaleValue: 15, maxScaleValue: 45 }}
            subject="max"
            data={maxProvinceTemp}
          />
          <MapLegend min={15} max={45} color="red" gradientId="maxTemp" />
        </GeoJSONProvider>
      </section>
      <footer>
        <p>
          Deze website is volledig geproduceerd in het tijdsspanne van twee
          weken door <a href="www.steinbergervoet.nl">Stein Bergervoet</a>. De
          code van deze website is te vinden op {}
          <a href="https://github.com/Steinberg99/frontend-applications">
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default App;
