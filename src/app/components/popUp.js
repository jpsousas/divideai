// components/DividiPopup.js
import React, { useState, useEffect } from 'react';

const DividiPopup = ({ isOpen, onClose, onConfirm }) => {
  const [numPeople, setNumPeople] = useState(1);
  const [peopleNames, setPeopleNames] = useState(['']);

  useEffect(() => {
    setPeopleNames(Array(numPeople).fill(''));
  }, [numPeople]);

  const handleNameChange = (index, name) => {
    const newPeopleNames = [...peopleNames];
    newPeopleNames[index] = name;
    setPeopleNames(newPeopleNames);
  };

  const handleSubmit = () => {
    onConfirm(numPeople, peopleNames);
    console.log('Quantidade Pessoas ', {numPeople});
    console.log('Nome pessoas: ', {peopleNames});
    onClose();
  };
  //pop le qtd de pessoas devedoras e para cada uma delas, exige um nome, quando clica em confirmar envia para a NFCDataGrid
  return (
    isOpen && (
      <div className="popup">
        <div className="popup-inner">
          <h2>Quantas pessoas irão rachar?</h2>
          <label>
            Número de Pessoas:
            <input 
              type="number" 
              value={numPeople} 
              onChange={(e) => setNumPeople(e.target.value)} 
              min="1" 
            />
          </label>
          {Array.from({ length: numPeople }).map((_, index) => (
            <div key={index}>
              <label>
                Nome da Pessoa {index + 1}:
                <input 
                  type="text" 
                  value={peopleNames[index]} 
                  onChange={(e) => handleNameChange(index, e.target.value)} 
                />
              </label>
            </div>
          ))}
          <button onClick={handleSubmit}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    )
  );
};

export default DividiPopup;
