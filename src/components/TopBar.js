import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function TopBar({ userName }) {
  const navigate = useNavigate();
 
    const logout = async () => {
        try {
            await axios.delete('/logout');
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" color="inherit" component="div">
              SQLExam
            </Typography>
          </Link>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ marginLeft: 'auto' }}
          >
            {userName}
          </Typography>

          <Button variant="outlined" color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}