import React, {
    useState,
    useEffect,
} from 'react';
import '../App.css';
import TopBar from '../components/TopBar';
import ClipLoader from "react-spinners/ClipLoader";
import Button from '@mui/material/Button';
import AlertWrong from '../components/AlertWrong';
import AlertCorrect from '../components/AlertCorrect';
import AlertError from '../components/AlertError';

function Home() {
	const [questions, setQuestions] = useState([]);

    useEffect(() => {
    	fetch('/questions')
    		.then((response) => {
    			if (!response.ok) {
              	throw new Error(`${response.status}: ${response.statusText}`);
            }
            return response.json();
    		})
    		.then((data) => setQuestions(data.questions))
    		.catch((error) => {
    			console.log(error.message);
    		})
    }, []);

    return (
    	<div>
	      <h1>Question List</h1>
	      <ul>
	        {questions.map(question => (
	          <li key={question.id}>
	            {question.id}
	          </li>
	        ))}
	      </ul>
	    </div>
    )
};

export default Home;