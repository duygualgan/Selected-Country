import React, { useState, useEffect } from "react";
import { apiURL } from "../api/api";
import SearchInput from "../Search/SearchInput";
import FilterCountry from "../FilterCountry/FilterCountry";
import { useNavigate } from "react-router-dom";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null); 
  

  const navigate = useNavigate(); 

  const getAllCountries = async () => {
    try {
      const res = await fetch(`${apiURL}/all`);

      if (!res.ok) throw new Error("something went wrong");
      const data = await res.json();
      console.log(data);

      const sortedCountries = data.sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      });

      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByName = async (countryName) => {
    try {
      const res = await fetch(`${apiURL}/name/${countryName}`);
      if (!res.ok) throw new Error("not found any country!!");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const res = await fetch(`${apiURL}/region/${regionName}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setCountries(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(false);
    }
  };


  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
  };

  const toggleCountrySelection = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry(null);
      country.cardColor = '';
    } else {
      if (selectedCountry) {
        selectedCountry.cardColor = '';
      }
      setSelectedCountry(country);
      country.cardColor = generateRandomColor();
    }
  };
  const autoSelectItem = () => {
    if (countries.length >= 10) {
      toggleCountrySelection(countries[9]);
    } else if (countries.length > 0) {
      toggleCountrySelection(countries[countries.length - 1]);
    }
  };
  
  const goToDetailPage = (countryName) => {
    navigate(`/country/${countryName}`);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    autoSelectItem();
  }, [countries]);
  


  return (
    <div className="all_country_wrapper">
      <div className="country_top">
        <div className="search">
          <SearchInput onSearch={getCountryByName} />
        </div>
        <div className="filter">
          <FilterCountry onSelect={getCountryByRegion} />
        </div>
      </div>
      <div className="country_bottom">
        {isLoading && !error && <h4>Loading...</h4>}
        {error && !isLoading && <h4>{error} </h4>}
        {countries?.map((country) => (
          <div
          className={`country_card ${country === selectedCountry ? 'selected' : ''}`}
          key={country.name.common}
          onClick={() => toggleCountrySelection(country)}
          style={{ backgroundColor: country.cardColor }}
          >
            <div  key={country.name.common}>
              <div className="country_img">
                <img src={country.flags.png} alt="" />
              </div>
              <div className="country_data">
                <h3>{country.name.common}</h3>
                <h6>Population: {country.population}</h6>
                <h6>Region: {country.region}</h6>
                <h6>Capital: {country.capital}</h6>
                <button
                  className="detail-button"
                  onClick={() => goToDetailPage(country.name.common)}
                >
                  Detay
                </button>{" "}
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCountries;
