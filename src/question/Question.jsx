import React, {
    useState,
    useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import TopBar from '../components/TopBar';
import ClipLoader from "react-spinners/ClipLoader";
import Button from '@mui/material/Button';
import AlertWrong from '../components/AlertWrong';
import AlertCorrect from '../components/AlertCorrect';
import AlertError from '../components/AlertError';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InvalidTokenError, jwtDecode } from "jwt-decode";

function Question() {
    const { question_id } = useParams();

    // auth
    const [name, setName] = useState('');
    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [questionId, setQuestionId] = useState('');
    const [query2, setQuery2] = useState('');
    const [result, setResult] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        refreshToken();
        setQuestionId(question_id)
    }, [question_id])

    const refreshToken = async () => {
        try {
            const response = await axios.get('/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setUid(decoded.userId);
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
            setUid(decoded.userId);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    console.log(`[D] ${name}`)
            console.log(`[D] ${uid}`);
    
    const submitForm = () => {
        console.log("[D]: ", questionId);
        console.log("[D]: ", query2);
        console.log("[D]: ", uid);

        if (isLoading) {
            return;
        }
        setIsLoading(true);
        setResult({})

        axios.post('/compare', {
            answer: query2,
            userId: uid,
            questionId: questionId,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            setIsLoading(false);
            if (!response.status === 200) {
              throw new Error(`${response.status}: ${response.statusText}`);
            }
            return response.data;
          })
          .then((data) => {
            setResult(data);
            setTimeout(() => {
              setIsSubmitting(false);
            }, 10000);
          })
          .catch((error) => {
            setResult(`Error: ${error.message}`);
            setTimeout(() => {
              setIsSubmitting(false);
            }, 10000);
          });
  };

  const render = (data, key) => {
      const columns = Object.keys(data[0] || {});

      return (
        <div key={key} className="scrollable-table">
          <table border="2">
            <tbody>
              <tr>
                {columns.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>

              {data.map((rowData, key) => (
                <tr key={key}>
                  {columns?.map((col, colIndex) => (
                    <td key={colIndex}>{rowData[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const override: CSSProperties = {
        display: 'block',
        margin: '0 auto'
    };

    const styles = {
        container: {
            fontFamily: 'Oxygen',
            maxWidth: '900px',
            margin: '0 auto',
            padding: '20px',
            marginTop: '20px',
            backgroundColor: '#f4f4f4',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        form: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '8px',
            marginBottom: '16px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
        },
        textarea: {
            width: '100%',
            padding: '8px',
            marginBottom: '16px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box',
        },
        button: {
            background: isSubmitting ? '#666' : '#3498db',
            color: '#fff',
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
        },
         countdown: {
          display: 'inline-block',
          marginLeft: '10px',
          fontSize: '14px',
        },
        resultContainer: {
            marginTop: '20px',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
    };

    return ( 
        <div>
        <TopBar />
        <div style = {styles.container}>
        <
        form style = {
            styles.form
        } >
        <h2 htmlFor = "questionId" >
            Question {questionId}
        </h2>
        <
        br / >
        <
        label style = {
            styles.label
        }
        htmlFor = "query2" >
        Jawaban Anda:
        <
        /label> <
        textarea style = {
            styles.textarea
        }
        id = "query2"
        name = "query2"
        rows = "4"
        cols = "50"
        value = {
            query2
        }
        onChange = {
            (e) => setQuery2(e.target.value)
        }
        required >
        < /textarea> <
        br / >
        <Button variant="contained" onClick ={submitForm}>
            {isLoading ? (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : 'Submit'}
        </Button>
        
        </form>

        <div style={styles.resultContainer} id="resultContainer">
        <ClipLoader
                        color="#ADC5FD"
                        size={25}
                        loading={isLoading}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                />

          {result.error ? (
            <>
             <AlertError message = {result.error}/>
            </>
          ) : result.query1 && result.query2 ? (
            <>               
            {
                result.status === 'Correct' ? (
                    <AlertCorrect message = {result.message}/>
                ) : (
                    <AlertWrong message = {result.message}/>
                    
                )
            }
               <div className="table-container">
                  <p>Jawaban Benar:</p>
                  <p>{result.query1.rows}r x {result.query1.columns}c</p>
                  {render(result.query1.data, 'query1')}
                </div>
                <div className="table-container">
                  <p>Jawaban Praktikan:</p>
                  <p>{result.query2.rows}r x {result.query2.columns}c</p>
                  {render(result.query2.data, 'query2')}
                </div>
            </>
          ) : (
            <p></p>
          )}
        </div>

        </div>
        </div>
    );
};

export default Question;