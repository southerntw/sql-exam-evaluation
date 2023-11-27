import React, {
    useState,
    useEffect,
} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Question from './question/Question';


function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Question />} />
        <Route path="/question/:question_id" />
      </Routes>
    </Router>
  );
};

export default App;