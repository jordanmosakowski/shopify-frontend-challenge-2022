import Home from './Home';
import Rover from './Rover';
import React, {useState, useEffect} from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function App() {

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header>
          <Link to='/'>
            <h1>Mars Rover Photo Gallery</h1>
          </Link>
        </header>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/rover/:roverId" element={<Rover/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
