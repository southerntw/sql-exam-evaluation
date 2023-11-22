import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertWrong({ message }) {
  return (
    <Alert severity="error">
      <AlertTitle><strong>Jawaban Salah!</strong></AlertTitle>
      { message }
    </Alert>    
  );
}