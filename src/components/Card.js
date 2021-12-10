import React from "react";

const Card = (props) => {
  const { country } = props;
  console.log(country);
  return (
    <li className="card">
      <img src={country.flags.png} alt="flag" />
      <div className="data-container">
        <ul>
          <li>{country.name.official}</li>
          <li>{country.capital}</li>
          <li>Pop: {country.population}</li>
        </ul>
      </div>
    </li>
  );
};

export default Card;
