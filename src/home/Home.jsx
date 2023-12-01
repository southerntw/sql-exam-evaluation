import React, {
    useState,
    useEffect,
} from 'react';
import '../App.css';
import TopBar from '../components/TopBar';
import QuestionList from '../components/QuestionList';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InvalidTokenError, jwtDecode } from "jwt-decode";

function Home() {
    // auth
	const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    
    const navigate = useNavigate();
	const [questions, setQuestions] = useState([]);

    useEffect(() => {
    	refreshToken();
        getUsers();

    	const fetchQuestions = async () => {
	      try {
	        const response = await axios.get('/questions');
	        setQuestions(response.data.questions);
	      } catch (error) {
	        console.error('Error fetching questions:', error);
	      }
	  };

	  fetchQuestions();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/login");
            }
        }
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getUsers = async () => {
        const response = await axiosJWT.get('/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }

    return (
        <>
        	<TopBar userName={name}/>
            <div style={{ paddingTop: '20px' }}>
        	   <QuestionList questions={questions}/>
            </div>
        </>
    );
};

export default Home;