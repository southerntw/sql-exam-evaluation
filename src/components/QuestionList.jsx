import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const QuestionCard = ({ question }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            Question ID: {question.id}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const QuestionList = ({ questions }) => {
  return (
    <Grid container spacing={2}>
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </Grid>
  );
};

export default QuestionList;