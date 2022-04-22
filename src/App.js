import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

function App() {
  const [searchVal, setSearchVal] = useState('');
  const [usersCopy, setUsersCopy] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users').then(response => setUsersCopy(response.data))
  }, []);

  useEffect(() => {
    if (usersCopy) {
      const filterFn = user => {
        const { name, address } = user;
        const { street, suite, city, zipcode } = address;
        return [name, street, suite, city, zipcode].some(userDetail => userDetail.includes(searchVal));
      }
      setUsers(usersCopy.filter(filterFn));
    }
  }, [searchVal, usersCopy]);

  return (
    <div className="App">
      <Typography variant='h4'> ADP Users </Typography>
      <TextField id="filled-basic" className={'searchField'} label="Filter Users..." variant="filled" value={searchVal} onChange={e => setSearchVal(e.target.value)} />
      {!usersCopy && <LinearProgress className='loader' />}
      {users && users.length === 0 && <div> No users found! </div>}
      {usersCopy && <React.Fragment>
        {
          users?.map((user) => {
            return (<Accordion key={user.id} style={{ width: '100%' }}>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='accoridion-summary'
              >
                <Typography>{user.name}</Typography>
              </AccordionSummary>
              <AccordionDetails className='content'>
                <div>
                  <p className='contact'>Street: {user.address.street}</p>
                  <p className='contact'>Suite: {user.address.suite}</p>
                  <p className='contact'>City: {user.address.city}</p>
                  <p className='contact'>ZipCode: {user.address.zipcode}</p>
                </div>
              </AccordionDetails>
            </Accordion>)
          })
        }
      </React.Fragment>
      }
    </div>
  );
}

export default App;
