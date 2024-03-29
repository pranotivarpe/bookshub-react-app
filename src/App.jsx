import React from "react";
import NavBar from "./NavBar";
import "./App.css";
import SearchButton from "./SearchButton";
import ExploreBooks from "./ExploreBooks";

function App() {
  return (
    <>
      <NavBar /> {/* Rendering NavBar component */}
      <SearchButton /> {/* Rendering SearchButton component */}
      <ExploreBooks /> {/* Rendering ExploreBooks component */}
    </>
  );
}

export default App;
