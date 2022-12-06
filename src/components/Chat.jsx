import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import Loader from './Loader';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const Chat = () => {
  const { auth, db } = useContext(Context);
  const [user] = useAuthState(auth);
  const [valueInput, setValue] = useState('');
  const [values, loading] = useCollectionData(collection(getFirestore(), 'messages'), {
    snapshotListenOptions: { includeMetadataChanges: true },
    orderBy: 'createdAt',
  });
  console.log(values, 'Ya tut');
  const sendMessage = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const docRef = await addDoc(collection(db, 'messages'), {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: valueInput,
        createdAt: serverTimestamp(),
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
        <div style={{ width: '80%', height: '60vh', border: '1px solid gray', overflowY: 'auto' }}>
          {values.map((doc) => (
            <div
              key={doc.createdAt}
              style={{
                margin: 10,
                border: user.uid === doc.uid ? '2px solid green' : '2px dashed red',
                marginLeft: user.uid === doc.uid ? 'auto' : '10px',
                width: 'fit-content',
                padding: 5,
              }}
            >
              <Grid container>
                <Avatar src={doc.photoURL} />
                <div>{doc.displayName}</div>
              </Grid>
              <div>{doc.text}</div>
            </div>
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
