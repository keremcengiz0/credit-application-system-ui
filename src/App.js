import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MakeApplicationForm from "./components/Application/MakeApplicationForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            exact
            path="/api/v1/applications/make-application"
            element={<MakeApplicationForm />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
