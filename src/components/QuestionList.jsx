import React from 'react';
import { Card, CardContent, Typography, Grid, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const QuestionCard = ({ question }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Link component={RouterLink} to={`/question/${question.questionId}`} style={{ textDecoration: 'none' }}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Question ID: {question.questionId}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

const QuestionList = ({ questions }) => {
  return (
    <Grid container spacing={2}>
      {questions.map((question) => (
        <QuestionCard key={question.questionId} question={question}/>
      ))}
    </Grid>
  );
};

export default QuestionList;