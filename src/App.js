import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateACustomerAndMakeAnApplicationForm from "./components/Application/CreateACustomerAndMakeAnApplicationForm";
import MakeAnApplicationForm from "./components/Application/MakeAnApplicationForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            exact
            path="/api/v1/applications/create-customer-and-make-application"
            element={<CreateACustomerAndMakeAnApplicationForm />}
          ></Route>
          <Route
            exact
            path="/api/v1/applications/make-application"
            element={<MakeAnApplicationForm />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
