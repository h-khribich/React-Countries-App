import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink to="/" exact activeClassName="nav-active">
        Accueil
      </NavLink>
      <NavLink to="a-propos" exact activeClassName="nav-active">
        À propos
      </NavLink>
    </div>
  );
};

export default Navigation;
