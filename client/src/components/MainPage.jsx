import React from "react";
// Components
import Gallery from "./Gallery";
import Jumbotron from "./Jumbotron";
import Search from "./Search";

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="full-height">
        <Search />
        <Jumbotron />
      </div>
      <Gallery />
    </div>
  );
};

export default MainPage;
