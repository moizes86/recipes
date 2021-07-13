import React from "react";
import "./styles/styles.scss";

// Components
import Gallery from "./components/Gallery";
import Jumbotron from "./components/Jumbotron";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <div className="full-height">
        <Search />
        <Jumbotron />
      </div>
      <Gallery />
    </div>
  );
}

export default App;
