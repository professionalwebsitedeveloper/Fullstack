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
      country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(results);
  }, [searchTerm, countries]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const CountryDetails = ({ country }) => {
    const capital = country.capital ? country.capital[0] : "";
    const area = country.area ?? "";
    const languages = Object.values(country.languages || {});

    return (
      <div style={{ fontFamily: "serif" }}>
        {/* In your screenshot there is no surrounding card; just content blocks */}
        <h1 style={{ fontSize: "2.2rem", margin: "0.67em 0" }}>
          {country.name.common}
        </h1>

        <div style={{ fontSize: "1.05rem" }}>
          <div>Capital {capital}</div>
          <div>Area {area ? area.toString() : ""}</div>
        </div>

        <h2 style={{ fontSize: "1.65rem", marginTop: "1.2rem" }}>
          Languages
        </h2>

        <ul style={{ marginTop: "0.6rem" }}>
          {languages.map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>

        {/* Big flag like the screenshot */}
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          style={{
            width: "280px",      // tweak these two numbers to match your screenshot exactly
            height: "280px",
            objectFit: "cover",
            display: "block",
            marginTop: "1.2rem",
          }}
        />
      </div>
    );
  };

  const CountryList = ({ countries }) => {
    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {countries.map((country) => (
          <li key={country.cca3} style={{ marginBottom: "0.5rem" }}>
            {country.name.common}
          </li>
        ))}
      </ul>
    );
  };

  const renderContent = () => {
    if (filteredCountries.length > 10) {
      return (
        <div>
          <p>Too many matches, specify another filter</p>
          <p>({filteredCountries.length} countries match)</p>
        </div>
      );
    }

    if (filteredCountries.length === 1) {
      return <CountryDetails country={filteredCountries[0]} />;
    }

    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return <CountryList countries={filteredCountries} />;
    }

    if (searchTerm && filteredCountries.length === 0) {
      return <p>No countries match your search. Try a different name.</p>;
    }

    return <p>Start typing a country name to search</p>;
  };

  if (loading) return <div>Loading countries data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "0.75rem", fontFamily: "serif" }}>
      <div style={{ marginBottom: "0.75rem" }}>
        <label htmlFor="country-search" style={{ fontWeight: "normal" }}>
          find countries{" "}
        </label>
        <input
          id="country-search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder=""
          style={{ marginLeft: "0.25rem", padding: "0.15rem 0.3rem" }}
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default App;