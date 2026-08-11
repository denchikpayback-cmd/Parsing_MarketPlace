import Card from ".//components/Card.jsx";
import Header from ".//components/Header.jsx"
import "./App.css"
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx"
import {Routes, Route, Navigate} from "react-router-dom"
function App() {
  
  return (
    <div className="root">
      

      <Routes>
        <Route path="/" element={<Header/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        {/* <Route path="/" element={<Card/>}></Route> */}
        {/* <Route path="/" element={<Navigate to={"/authorization"}/>}></Route> */}
        <Route path="/authorization" element={<Register/>}></Route>
      </Routes>
    </div>
  );
}

export default App;