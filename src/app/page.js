// page.js
"use client"; // Adicione esta linha no topo

import React, { useState } from 'react';
import NFCDataGrid from './components/NFCDataGrid';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numPeople, setNumPeople] = useState(0);

  const handleData = (data) => {
    setData(data);
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onSubmit={(url) => handleSubmit(url)} />
      <main style={{ flex: '1', padding: '20px' }}>
        {loading && <div>Loading...</div>}
        {data && (
          <div>
            <NFCDataGrid data={data} numPeople={numPeople} setNumPeople={setNumPeople} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );

  async function handleSubmit(url) {
    setLoading(true);
    try {
      const response = await fetch('/api/extract-nfce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error('Erro ao extrair dados da NFC-e');
      }
      const jsonData = await response.json();
      handleData(jsonData);
    } catch (error) {
      console.error('Erro ao processar NFC-e:', error);
    }
  }
};

export default HomePage;
