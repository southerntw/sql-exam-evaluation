import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Question from './question/Question';
import Home from './home/Home'
import Register from './register/Register';
import Login from './login/Login';

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/question/:question_id" element={<Question/>} />
      </Routes>
    </Router>
  );
};

export default App;