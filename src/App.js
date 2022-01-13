import Home from './Home';
import Rover from './Rover';
import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/rover/:roverId" element={<Rover/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
