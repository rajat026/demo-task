import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ReactHookForm } from "./components/form";
import { DataGridUi } from "./components/grid";
import { Home } from "./components";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Header/> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/react-hook-form" element={<ReactHookForm />} />
          <Route path="/data-grid" element={<DataGridUi />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
