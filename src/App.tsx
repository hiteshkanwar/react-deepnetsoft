import React from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from "react-router-dom";
import Weather from './components/weather';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router> 
         <Routes>
         <Route index   element={<Weather />} />
         </Routes>
     </Router>
    </div>
  );
}

export default App;
