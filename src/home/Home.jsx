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
import QuestionList from '../components/QuestionList'

function Home() {
	const [questions, setQuestions] = useState([]);

    useEffect(() => {
    	const fetchQuestions = async () => {
	      try {
	        const response = await fetch('/questions');
	        const data = await response.json();
	        setQuestions(data.questions);
	      } catch (error) {
	        console.error('Error fetching questions:', error);
	      }
	  };

	  fetchQuestions();
    }, []);

    return (
    	<h1>Question List</h1>
    	<QuestionList questions={questions}>
    );
};

export default Home;