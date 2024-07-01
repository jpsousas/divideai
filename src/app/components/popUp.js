//pop.js
import React, { useState } from 'react';

const DividiPopup = ({ isOpen, onClose, onConfirm }) => {
  const [numPeople, setNumPeople] = useState(1);

  const handleSubmit = () => {
    onConfirm(numPeople);
    onClose();
  }

  return (
    isOpen && (
      <div className="popup">
        <div className="popup-inner">
          <h2>Dividir Conta</h2>
          <label>
            Número de Pessoas:
            <input 
              type="number" 
              value={numPeople} 
              onChange={(e) => setNumPeople(e.target.value)} 
              min="1" 
            />
          </label>
          <button onClick={handleSubmit}>Confirmar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    )
  );
};

export default DividiPopup;
