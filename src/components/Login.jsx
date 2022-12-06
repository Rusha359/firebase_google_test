import { Box, Button, Container, Grid } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { Context } from '../index';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const Login = () => {
  const { auth } = useContext(Context);
  const login = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 30 }}
        alignItems={'center'}
        justify={'center'}
      >
        <Grid
          style={{ width: 400, background: 'lighthgray' }}
          container
          alignItems={'center'}
          direction={'column'}
        >
          <Box p={5}>
            <Button variant={'outlined'} onClick={login}>
              Войти с помощью Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
