// NFCDataGrid.js
/*
import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { DataGrid } from '@mui/x-data-grid';

const NFCDataGrid = ({ data, totalValue, numPeople, peopleNames, onNameChange }) => {
  
  // Função para marcar todas as checkboxes de devedores
  const handleAllDebtorsChange = (event) => {
    const isChecked = event.target.checked;
    const updatedPeopleNames = peopleNames.map((person) => ({
      ...person,
      isChecked,
    }));
    onNameChange(updatedPeopleNames);
  };

  // Função para marcar uma checkbox de devedor individual
  const handleDebtorChange = (index) => (event) => {
    const isChecked = event.target.checked;
    const updatedPeopleNames = [...peopleNames];
    updatedPeopleNames[index].isChecked = isChecked;
    onNameChange(updatedPeopleNames);
  };

  const columns = [
    { field: 'name', headerName: 'Descrição do Item', width: 200 },
    { field: 'total_value', headerName: 'Valor Total Item', type: 'number', width: 150 },
  ];

  // Adicionando a coluna de devedores dinamicamente
  for (let i = 1; i <= numPeople; i++) {
    columns.push({
      field: `person_${i}`,
      headerName: `Devedor ${i}`,
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={peopleNames[params.rowIndex]?.isChecked || false}
          onChange={handleDebtorChange(params.rowIndex)}
        />
      ),
    });
  }

  // Adicionando a coluna "Todos"
  columns.push({
    field: 'all',
    headerName: 'Todos',
    width: 120,
    renderCell: () => (
      <FormControlLabel
        control={<Checkbox onChange={handleAllDebtorsChange} />}
        label="Todos"
      />
    ),
  });

  // Linha com o valor total da compra
  const rows = data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    total_value: item.total_value,
  }));

  // Linha com os valores devido por pessoa
  const debtRow = {
    id: rows.length + 1,
    name: 'Total a pagar por pessoa',
    total_value: totalValue / numPeople,
  };

  rows.push(debtRow);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default NFCDataGrid;
*/