import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertError({message}) {
  return (
    <Alert severity="warning">
      <AlertTitle><strong>Cek Inputan Anda!</strong></AlertTitle>
      {message}
    </Alert>    
  );
}