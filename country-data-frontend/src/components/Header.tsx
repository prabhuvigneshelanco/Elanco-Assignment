import React from "react";
import { Labels } from "../services/labels";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white py-4 text-center">
      <h1 className="text-3xl font-semibold">{Labels.countrySearch}</h1>
    </header>
  );
};

export default Header;
