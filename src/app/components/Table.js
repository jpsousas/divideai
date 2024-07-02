import React, { useState, useEffect, useMemo } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Checkbox from '@mui/material/Checkbox';

export function NFCDataGrid({ data, totalValue, numPeople, peopleNames, onNameChange }) {
  console.log('Data:', data);
  console.log('Total Value:', totalValue);
  console.log('Numero Pessoas:', numPeople);
  console.log('People Names:', peopleNames);

  const [selected, setSelected] = useState(() =>
    data.map(() => Array(numPeople).fill(false))
  );
  const [allChecked, setAllChecked] = useState(data.map(() => false));

  useEffect(() => {
    console.log('Data:', data);
    console.log('Total Value:', totalValue);
    console.log('Numero Pessoas:', numPeople);
    console.log('People Names:', peopleNames);
    setSelected(data.map(() => Array(numPeople).fill(false)));
    setAllChecked(data.map(() => false));
  }, [data, totalValue, numPeople, peopleNames]);

  const handleCheckboxChange = (rowIndex, personIndex) => {
    const newSelected = [...selected];
    newSelected[rowIndex][personIndex] = !newSelected[rowIndex][personIndex];
    setSelected(newSelected);
  };

  const handleAllChange = (rowIndex) => {
    const newAllChecked = [...allChecked];
    newAllChecked[rowIndex] = !newAllChecked[rowIndex];
    setAllChecked(newAllChecked);

    const newSelected = [...selected];
    newSelected[rowIndex] = Array(numPeople).fill(newAllChecked[rowIndex]);
    setSelected(newSelected);
  };
  
  const columns = useMemo(() => [
    { field: 'index', headerName: 'Index', width: 100 },
    { field: 'name', headerName: 'Descrição Item', width: 400 },
    { field: 'total_value', headerName: 'Preço total', width: 200 },
    { field: 'all', headerName: 'Todos', width: 100, renderCell: (params) => (
        <Checkbox
          checked={allChecked[params.row.id]}
          onChange={() => handleAllChange(params.row.id)}
        />
      )
    },
    ...peopleNames.map((name, index) => ({
      field: `person_${index}`,
      headerName: name,
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={selected[params.row.id][index]}
          onChange={() => handleCheckboxChange(params.row.id, index)}
        />
      ),
    })),
  ], [allChecked, peopleNames, selected]);

  const rows = useMemo(() => data.map((item, index) => ({
    id: index,
    index: index + 1,
    name: item.name,
    total_value: item.total_value,
    selected: selected[index],
    allChecked: allChecked[index],
  })), [data, selected, allChecked]);

  useEffect(() => {
    console.log('Columns:', columns);
    console.log('Rows:', rows);
  }, [columns, rows]);

  const calculateTotals = () => {
    const totals = Array(numPeople).fill(0);

    rows.forEach((row, rowIndex) => {
      const itemTotal = row.total_value;
      const checkedPeople = row.allChecked
        ? peopleNames.map((_, i) => i)
        : row.selected.map((isChecked, i) => (isChecked ? i : -1)).filter(i => i !== -1);

      const share = itemTotal / checkedPeople.length;

      checkedPeople.forEach(personIndex => {
        totals[personIndex] += share;
      });
    });

    return totals;
  };

  const totals = calculateTotals();

  useEffect(() => {
    console.log('Totals:', totals);
  }, [totals]);

  return (
    <div>
      <DataGrid columns={columns} rows={rows} pageSize={5} />
      <div>
        <p>Valor total: {totalValue}</p>
        <p>Número de Pessoas: {numPeople}</p>
        {totals.map((total, index) => (
          <p key={index}>{peopleNames[index]} deve: R$ {total.toFixed(2)}</p>
        ))}
      </div>
    </div>
  );
}
