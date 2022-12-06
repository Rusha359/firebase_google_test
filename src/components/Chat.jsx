import { Avatar, Button, Container, Grid, TextField, Box } from '@mui/material';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import Loader from './Loader';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const Chat = () => {
  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);
  const [valueInput, setValue] = useState('');
  const [values, loading] = useCollectionData(collection(getFirestore(), 'messages'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  // console.log(values, 'Ya tut');
  const sendMessage = async () => {
    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: valueInput,
        createdAt: new Date(),
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setValue('');
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <Grid container style={{ height: window.innerHeight - 50, marginTop: 20 }} justify={'center'}>
        <div style={{ width: '80%', height: '60hv', border: '1px solid green', overflowY: 'auto' }}>
          {values.map((doc) => (
            <Grid container key={doc.createdAt}>
              <Avatar src={doc.photoURL} />
              <Box component="div" sx={{ display: 'inline' }}>
                автор {doc.displayName} сообщение {doc.text}
              </Box>
            </Grid>
          ))}
        </div>

        <Grid
          container
          direction={'column'}
          alignItems={'flex-end'}
          style={{ width: '80%', marginTop: 10 }}
        >
          <TextField
            fullWidth
            maxRows={2}
            variant={'outlined'}
            value={valueInput}
            onChange={(e) => setValue(e.target.value)}
          ></TextField>
          <Button variant={'outlined'} onClick={sendMessage} style={{ marginTop: 5 }}>
            Отправить
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
