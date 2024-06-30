import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const NFCDataGrid = ({ data, totalValue, numPeople, peopleNames, onNameChange }) => {
  
  // Colunas para exibir os itens da lista
  const columns = [
    { field: 'name', headerName: 'Item', flex: 1 },
    { field: 'total_value', headerName: 'Valor Total', flex: 1 },
  ];

  // Linha para exibir o total_value final da compra
  const totalRow = {
    id: 'total',
    name: 'Total da Compra',
    total_value: totalValue,
  };

  // Dados para o DataGrid
  let rows = [];
  if (data.length > 0) {
    rows = data.map((item, index) => ({
      id: index + 1,
      name: item.name,
      total_value: item.total_value,
    }));
    // Adicionar a linha do total_value final da compra ao final das outras linhas
    rows.push(totalRow);
  }

  // Colunas adicionais para as pessoas que irão dividir a compra
  const debtorColumns = peopleNames.map((name, index) => ({
    field: `debtor_${index}`,
    headerName: name,
    flex: 1,
    type: 'boolean',
    renderCell: (params) => (
      <input
        type="checkbox"
        checked={params.value}
        onChange={(e) => onNameChange(index, e.target.checked)}
      />
    ),
  }));

  // Coluna para marcar todos os devedores
  const allDebtorsColumn = {
    field: 'all',
    headerName: 'Todos',
    flex: 1,
    type: 'boolean',
    renderCell: (params) => (
      <input
        type="checkbox"
        checked={params.value}
        onChange={(e) => {
          const newValues = {};
          for (let i = 0; i < numPeople; i++) {
            newValues[`debtor_${i}`] = e.target.checked;
          }
          params.api.setAllCellValues(params.id, newValues);
        }}
      />
    ),
  };

  // Todas as colunas do DataGrid
  const allColumns = [...columns, ...debtorColumns, allDebtorsColumn];

  return (
    <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
      <DataGrid
        rows={rows}
        columns={allColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default NFCDataGrid;
