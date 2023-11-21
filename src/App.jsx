import React, {
    useState,
    useEffect
} from 'react';

const App = () => {
    const [questionId, setQuestionId] = useState('');
    const [query2, setQuery2] = useState('');
    const [result, setResult] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [countdown, setCountdown] = useState(10);

    const submitForm = () => {
        if (isSubmitting) {
          return;
        }
        setIsSubmitting(true);

        fetch(`compare?questionId=${questionId}&query2=${encodeURIComponent(query2)}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`${response.status}: ${response.statusText}`);
            }
            return response.json(); // Assuming the server sends JSON for success
          })
          .then((data) => {
            setResult(data);
            setTimeout(() => {
              setIsSubmitting(false);
              setCountdown(10);
            }, 10000);
          })
          .catch((error) => {
            setResult(`Error: ${error.message}`);
            setTimeout(() => {
              setIsSubmitting(false);
              setCountdown(5);
            }, 10000);
          });
  };

  useEffect(() => {
    let timer;

    // Update countdown every second
    if (isSubmitting) {
      timer = setInterval(() => {
        setCountdown((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
      }, 1000);
    }

    // Clear the interval when the component unmounts or the countdown reaches 0
    return () => clearInterval(timer);
  }, [isSubmitting]);

    const renderTable = (queryResult) => {
      const tableRows = queryResult.data.map((row, index) => (
        <tr key={index}>
          {Object.values(row).map((value, idx) => (
            <td key={idx}>{value}</td>
          ))}
        </tr>
      ));

      return (
        <table>
          <thead>
            <tr>
              {queryResult.columns.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>{tableRows}</tbody>
        </table>
      );
    };


    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
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

    return ( <
        div style = {
            styles.container
        } >
        <
        h1 > Query Checker < /h1> <
        form style = {
            styles.form
        } >
        <
        label style = {
            styles.label
        }
        htmlFor = "questionId" >
        Question ID:
        <
        /label> <
        input style = {
            styles.input
        }
        type = "text"
        id = "questionId"
        name = "questionId"
        value = {
            questionId
        }
        onChange = {
            (e) => setQuestionId(e.target.value)
        }
        required /
        >
        <
        br / >
        <
        label style = {
            styles.label
        }
        htmlFor = "query2" >
        Query 2:
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
        <
        button style = {
            styles.button
        }
        type = "button"
        onClick = {
            submitForm
        } >
        Submit </button> 
        {isSubmitting && <span style={styles.countdown}>{`Countdown: ${countdown}s`}</span>}
        </form>

        <div style={styles.resultContainer} id="resultContainer">
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : result.query1 && result.query2 ? (
            <>
              <p>
                Query 1: {result.query1.rows} rows x {result.query1.columns} columns
              </p>
              <p>
                Query 2: {result.query2.rows} rows x {result.query2.columns} columns
              </p>
              <p>Status: {result.status}</p>
              <p>
                {result.query1.data[0].customerName}
              </p>

            </>
          ) : (
            <p>Waiting for result...</p>
          )}
        </div>

        </div>
    );
};

export default App;