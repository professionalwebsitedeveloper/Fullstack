import { useEffect, useMemo, useState } from "react";
import "./App.css";

const Countries = ({ countries, onShow }) => {
  return (
    <div>
      {countries.map((c) => (
        <div key={c.cca3} style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div>{c.name.common}</div>
          <button onClick={() => onShow(c)}>Show</button>
        </div>
      ))}
    </div>
  );
};

const CountryDetails = ({ country, onBack }) => {
  const { name, capital, area, flags, languages } = country;

  const capitalName = useMemo(() => (capital && capital.length ? capital[0] : null), [capital]);

  const apiKey = import.meta.env.VITE_SOME_KEY;

  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  useEffect(() => {
    setWeather(null);
    setWeatherError(null);

    if (!apiKey || !capitalName) return;

    const controller = new AbortController();

    const loadWeather = async () => {
      try {
        setLoadingWeather(true);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          capitalName
        )}&appid=${apiKey}&units=metric`;

        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to fetch weather");
        }

        setWeather(data);
      } catch (e) {
        if (e.name !== "AbortError") setWeatherError(e.message || "Weather request failed");
      } finally {
        setLoadingWeather(false);
      }
    };

    loadWeather();
    return () => controller.abort();
  }, [apiKey, capitalName]);

  const weatherIconUrl = useMemo(() => {
    const iconCode = weather?.weather?.[0]?.icon;
    return iconCode ? `https://openweathermap.org/img/wn/${iconCode}@2x.png` : null;
  }, [weather]);

  return (
    <div>
      <h1>{name.common}</h1>

      <p>
        <strong>Capital</strong> {capital?.[0] ?? "—"}
      </p>

      <p>
        <strong>Area</strong> {area ?? "—"}
      </p>

      <h2>Languages</h2>
      <ul>
        {languages
          ? Object.values(languages).map((lang) => <li key={lang}>{lang}</li>)
          : null}
      </ul>

      <img src={flags?.png} alt={`Flag of ${name.common}`} style={{ width: 300, height: "auto" }} />

      <h2>Weather in {capital?.[0] ?? "—"}</h2>

      {loadingWeather ? (
        <p>Loading weather...</p>
      ) : weatherError ? (
        <p style={{ color: "crimson" }}>Weather unavailable: {weatherError}</p>
      ) : weather ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Order: Temperature first, then icon, then wind */}
          <p>
            Temperature {weather?.main?.temp} Celsius
          </p>

          {weatherIconUrl ? (
            <img
              src={weatherIconUrl}
              alt={weather?.weather?.[0]?.description ?? "Weather icon"}
              style={{ width: 80, height: "auto" }}
            />
          ) : null}

          <p>
            Wind {weather?.wind?.speed} m/s
          </p>
        </div>
      ) : (
        <p>Weather unavailable</p>
      )}

      {onBack ? <button onClick={onBack}>Back</button> : null}
    </div>
  );
};

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed === "") {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }

    fetch("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => res.json())
      .then((allCountries) => {
        const matches = allCountries.filter((country) =>
          country.name.common.toLowerCase().includes(trimmed.toLowerCase())
        );

        setCountries(matches);

        if (matches.length === 1) setSelectedCountry(matches[0]);
        else setSelectedCountry(null);
      })
      .catch(() => {
        setCountries([]);
        setSelectedCountry(null);
      });
  }, [query]);

  let content = null;

  if (query.trim() === "") {
    content = null;
  } else if (selectedCountry) {
    content = <CountryDetails country={selectedCountry} onBack={() => setSelectedCountry(null)} />;
  } else if (countries.length > 10) {
    content = <p>Too many matches, specify another filter</p>;
  } else if (countries.length >= 2) {
    content = <Countries countries={countries} onShow={setSelectedCountry} />;
  } else if (countries.length === 1) {
    content = <CountryDetails country={countries[0]} />;
  } else {
    content = <p>No countries found</p>;
  }

  return (
    <div style={{ padding: 16, maxWidth: 640, margin: "0 auto", display: "grid", gap: 16 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        <label htmlFor="country-search">find countries</label>
        <input
          id="country-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ flex: "1 1 300px", minWidth: 220 }}
        />
      </div>

      {content}
    </div>
  );
}

export default App;