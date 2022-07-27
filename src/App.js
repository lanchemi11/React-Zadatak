import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddEmployee from "./pages/AddEmplyee";
import SingleEmployeeId from "./pages/SingleEmployeeId";
import SingleEmployeeName from "./pages/SingleEmployeeName";
import UpdateEmployee from "./pages/UpdateEmployee";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/employees" element={<Home />} />
        <Route exact path="/addEmployees" element={<AddEmployee />} />
        <Route exact path="/employees/id/:id" element={<SingleEmployeeId />} />
        <Route
          exact
          path="/employees/name/:name"
          element={<SingleEmployeeName />}
        />
        <Route exact path="/employees/:id" element={<UpdateEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
