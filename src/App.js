import "./App.scss";

// Components
import Gallery from "./components/gallery/gallery";
import Search from "./components/search/search";

function App() {
  return (
    <div className="App">
      <Search />
      <Gallery />
    </div>
  );
}

export default App;
