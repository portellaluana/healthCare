import React from "react";
import { FaSearch } from "react-icons/fa";
import { InputGroup, FormControl } from "react-bootstrap";
import "./style.css";

const SearchBar: React.FC = () => (
  <InputGroup className="search-bar mb-4 position-relative">
    <FormControl
      type="text"
      placeholder="Buscar"
      aria-label="Buscar"
      className="form-control"
    />
    <InputGroup.Text className="icon-search">
      <FaSearch />
    </InputGroup.Text>
  </InputGroup>
);

export default SearchBar;
