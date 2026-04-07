import { useEffect, useState } from "react";
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

      <img
        src={flags?.png}
        alt={`Flag of ${name.common}`}
        style={{ width: 300, height: "auto" }}
      />
      {onBack && <button onClick={onBack}>Back</button>}
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

        // If exactly 1 match, show details automatically
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
    // 2-10 matches: show countries with "Show" button next to each
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