import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertCorrect({message}) {
  return (
    <Alert severity="success">
      <AlertTitle><strong>Jawaban Benar.</strong></AlertTitle>
      {message} <br/>
      Jawaban anda telah tersimpan otomatis. Silahkan mengerjakan soal yang lain.
    </Alert>    
  );
}