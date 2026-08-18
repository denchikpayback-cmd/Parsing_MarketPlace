import Card from ".//components/Card.jsx";
import Search from "./components/pages/Search.jsx"
import "./App.css"
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx"
import {Routes, Route} from "react-router-dom"
function App() {
  
  return (
    <div className="root">
      

      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/search" element={<Search/>}></Route>
        {/* <Route path="/" element={<Card/>}></Route> */}
        {/* <Route path="/" element={<Navigate to={"/authorization"}/>}></Route> */}
        <Route path="/authorization" element={<Register/>}></Route>
      </Routes>
    </div>
  );
}

export default App;