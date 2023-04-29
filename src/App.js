
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./Components/navigation/Nav";
import Home from "./Components/home/Home";
import { RegisteredData } from "./Components/registeredData/RegisteredData";


function App() {
  
  return (
    <>
    <Router>
    <NavigationBar></NavigationBar>
          <Routes>
           <Route path="/" element={<Home/>} /> 
           <Route path="/home" element={<Home />} />
           <Route path="/Registered" element={<RegisteredData />} />
           
          </Routes>
      </Router>
    
        </>
    
  );
}

export default App;
