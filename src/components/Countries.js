import react, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(20);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name;fields=population;fields=region;fields=capital;fields=flags"
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        <ul>
          {radios.map((radio) => (
            <li key={radio}>
              <input
                type="radio"
                value={radio}
                id={radio}
                checked={radio === selectedRadio}
                onChange={(e) => setSelectedRadio(e.target.value)}
              />
              <label htmlFor={radio}>{radio}</label>
            </li>
          ))}
        </ul>
      </div>
      <div className="cancel">
        {selectedRadio && (
          <h5 onClick={() => setSelectedRadio("")}>Annuler la recherche</h5>
        )}
      </div>
      <ul className="countries-list">
        {data
          .filter((country) => country.region.includes(selectedRadio))
          .sort((a, b) => b.population - a.population)
          .filter((country, index) => index < rangeValue)
          .map((country) => (
            <Card country={country} key={country.name.common} />
          ))}
      </ul>
    </div>
  );
};

export default Countries;
