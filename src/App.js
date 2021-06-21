import "./App.scss";

// Components
import Gallery from "./components/gallery/gallery";
import Search from "./components/search/search";
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div className="App pb-5">
      <Col>
        <Search />
        <Gallery />
      </Col>
    </div>
  );
}

export default App;
