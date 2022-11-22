import React from "react";

const Header = ({ advice }) => {
  return (
    <header className="header">
      <h1>ADVICE #{advice.id}</h1>
    </header>
  );
};

export default Header;
