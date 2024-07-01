"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@mui/material';
import NFCDataGrid from './components/NFCDataGrid';
import Header from './components/Header';
import Footer from './components/Footer';
import DividiPopup from './components/popUp';

const Page = () => {
  const [data, setData] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [numPeople, setNumPeople] = useState(0);
  const [peopleNames, setPeopleNames] = useState([]);

  const handleSubmit = async (url) => {
    if (!url) return;

    setLoading(true);
    setIsPopupOpen(true);
    //obtem o json com os dados da lista de compras
    try {
      const response = await axios.post('http://localhost:5000/process_nfc', { url });
      console.log('Response data:', response.data);
      setData(response.data.items);
      setTotalValue(response.data.total_value);
      setError(null);
    } catch (error) {
      console.error('Erro ao processar NFC-e:', error);
      setError('Erro ao processar NFC-e. Tente novamente mais tarde.');
    } finally {
      console.log("Sucesso no scrapping")
    }
  };

  const handleConfirmPopup = (numPeople) => {
    setNumPeople(numPeople);
    setPeopleNames(Array(numPeople).fill(''));
    setIsPopupOpen(false); // Fecha o popup após confirmar o número de pessoas
    setLoading(false);
  };

  const handleNameChange = (index, name) => {
    const newPeopleNames = [...peopleNames];
    newPeopleNames[index] = name;
    setPeopleNames(newPeopleNames);
  };

  const skeletonStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  };
  //gera os skeleton muito foda..
  const generateSkeletonRows = (count) => {
    const skeletonRows = [];
    for (let i = 0; i < count; i++) {
      skeletonRows.push(
        <Skeleton key={i} animation="wave" height={65} style={{ marginBottom: 2 }} />
      );
    }
    return skeletonRows;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onSubmit={handleSubmit} /> 
      <main style={{ flex: '1', padding: '20px' }}>
        {loading && (
          <div style={skeletonStyles}>
            {generateSkeletonRows(11)} {/* Ajuste o número de barras conforme necessário */}
          </div>
        )}
        {error && <div>{error}</div>}
        {data && !isPopupOpen && (
          <NFCDataGrid
            data={data}
            totalValue={totalValue}
            numPeople={numPeople}
            peopleNames={peopleNames}
            onNameChange={handleNameChange}
          />
        )}
      </main>
      <Footer />
      <DividiPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleConfirmPopup}
      />
    </div>
  );
};

export default Page;
