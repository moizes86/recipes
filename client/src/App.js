import React from "react";
import "./App.scss";

// Components
import Gallery from "./components/Gallery";
import Jumbotron from "./components/Jumbotron";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <Search />
      <Jumbotron />
      <Gallery />
    </div>
  );
}

export default App;
