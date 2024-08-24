import './App.css';
import Navbar from "./Navbar";
import Tabular from "./Tabular";
import Textual from "./Textual";
import Images from "./Images";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App(props) {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Tabular />} />
                <Route path="/textual" element={<Textual  />} />
                <Route path="/images" element={<Images  />} />
            </Routes>
        </BrowserRouter>
    </div>

  );
}

export default App;
