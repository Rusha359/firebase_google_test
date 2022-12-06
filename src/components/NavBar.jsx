import * as React from 'react';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/const';
import { Context } from '../index';

export const NavBar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Grid container justify={'flex-end'}>
            {user ? (
              <Button onClick={() => auth.signOut()} variant={'outlined'}>
                Выйти
              </Button>
            ) : (
              <NavLink to={LOGIN_ROUTE}>
                <Button variant={'outlined'}>Войти</Button>
              </NavLink>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
