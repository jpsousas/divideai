// HomePage.js
import React, { useState } from 'react';
import axios from 'axios';
import NFCDataGrid from './components/NFCDataGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import { Skeleton, Box } from '@mui/material';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [totalValue, setTotalValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numPeople, setNumPeople] = useState(0);
  const [peopleNames, setPeopleNames] = useState([]);

  const handleSubmit = async (url) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/process_nfc', { url });
      console.log('Response data:', response.data);  // Log para verificar a resposta da API
      setItems(response.data.items);
      setTotalValue(response.data.total_value);
    } catch (error) {
      console.error('Error fetching NFC data', error);  // Log para erros
    } finally {
      setLoading(false);
    }
  };

  const handleNumPeopleChange = (event) => {
    const count = parseInt(event.target.value, 10);
    setNumPeople(count);
    setPeopleNames(Array(count).fill('').map((_, index) => `Pessoa ${index + 1}`));
  };

  const handleNameChange = (index, newName) => {
    const updatedNames = [...peopleNames];
    updatedNames[index] = newName;
    setPeopleNames(updatedNames);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onSubmit={handleSubmit} />
      <main style={{ flex: '1', padding: '20px' }}>
        {loading ? (
          <Box>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={50} sx={{ marginBottom: 2 }} />
            ))}
          </Box>
        ) : (
          <NFCDataGrid
            data={items}
            totalValue={totalValue}
            numPeople={numPeople}
            peopleNames={peopleNames}
            onNameChange={handleNameChange}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
