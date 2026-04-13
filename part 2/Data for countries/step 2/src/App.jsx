import React, { useState, useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://studies.cs.helsinki.fi/restcountries/api/all"
        );
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCountries([]);
      return;
    }

    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(results);
  }, [searchTerm, countries]);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const CountryDetails = ({ country }) => {
    const languages = Object.values(country.languages || {});

    return (
      <div>
        <h1 style={{ margin: "0.5rem 0 1rem 0", fontSize: "2.5rem" }}>
          {country.name.common}
        </h1>

        <p style={{ margin: "0.25rem 0", fontSize: "1.25rem" }}>
          <strong>Capital</strong> {country.capital ? country.capital[0] : "N/A"}
        </p>

        <p style={{ margin: "0.25rem 0", fontSize: "1.25rem" }}>
          <strong>Area</strong> {country.area.toLocaleString()}
        </p>

        <h2 style={{ marginTop: "1.5rem", fontSize: "1.7rem" }}>Languages</h2>

        <ul style={{ marginTop: "0.5rem", fontSize: "1.25rem" }}>
          {languages.map((language) => (
            <li key={language} style={{ margin: "0.2rem 0" }}>
              {language}
            </li>
          ))}
        </ul>

        {/* Flag: make it look like the square red block area from the screenshot */}
        <div style={{ marginTop: "1.5rem" }}>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover", // keeps it block-like
              border: "none",     // screenshot has no border
              display: "block",
            }}
          />
        </div>
      </div>
    );
  };

  const CountryList = ({ countries, onShowDetails }) => {
    return (
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {countries.map((country) => (
          <li key={country.cca3} style={{ marginBottom: "0.5rem", fontSize: "1.2rem" }}>
            {country.name.common}
            <button
              onClick={() => onShowDetails(country)}
              style={{ marginLeft: "1rem", fontSize: "1rem" }}
            >
              Show
            </button>
          </li>
        ))}
      </ul>
    );
  };

  const renderContent = () => {
    if (filteredCountries.length > 10) {
      return (
        <div style={{ fontSize: "1.2rem" }}>
          <p>Too many matches, specify another filter</p>
          <p>({filteredCountries.length} countries match)</p>
        </div>
      );
    }

    if (filteredCountries.length === 1) {
      return <CountryDetails country={filteredCountries[0]} />;
    }

    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return (
        <CountryList
          countries={filteredCountries}
          onShowDetails={(country) => setFilteredCountries([country])}
        />
      );
    }

    if (searchTerm && filteredCountries.length === 0) {
      return <p style={{ fontSize: "1.2rem" }}>No countries match your search. Try a different name.</p>;
    }
    return null; // no search term, or initial state
  };

  if (loading) return <div style={{ padding: "0.5rem 0" }}>Loading countries data...</div>;
  if (error) return <div style={{ padding: "0.5rem 0" }}>Error: {error}</div>;

  return (
    <div
      style={{
        fontFamily: "Times New Roman, serif", // screenshot looks like a serif page
        padding: "1rem 2rem",
        color: "black",
      }}
    >
      <div style={{ marginBottom: "1.2rem", fontSize: "1.2rem" }}>
        <label htmlFor="country-search" style={{ marginRight: "0.6rem" }}>
          find countries
        </label>

        <input
          id="country-search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: "0.25rem 0.5rem",
            width: "170px",
            fontSize: "1rem",
          }}
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default App;