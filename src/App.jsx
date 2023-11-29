import React, {
    useState,
    useEffect,
} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Question from './question/Question';
import Home from './home/Home'


function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/question/:question_id" element={<Question/>} />
      </Routes>
    </Router>
  );
};

export default App;