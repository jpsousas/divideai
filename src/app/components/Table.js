import { DataGrid } from "@mui/x-data-grid";

export function NFCDataGrid({ data, totalValue, numeroPessoas }) {  
  const columns = [
    { field: 'name', headerName: 'Nome', width: 200 }, 
    { field: 'descricao', headerName: 'Descrição', width: 200 }, 
    { field: 'quantity', headerName: 'Quantidade', width: 200 },
    { field: 'unit_price', headerName: 'Preço unitário', width: 200 },
    { field: 'total_price', headerName: 'Preço total', width: 200 },
  ];

  const rows = data.map((item, index) => ({
    id: index,
    name: item.name,
    descricao: item.descricao,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total_price: item.total_price,
  }));

  return (
    <div>
      <DataGrid columns={columns} rows={rows} pageSize={5} />
      <div>
        <p>Valor total: {totalValue}</p>
        <p>Número de Pessoas: {numeroPessoas}</p>
        <p>Valor por Pessoa: {totalValue / numeroPessoas}</p>
      </div>
    </div>
  );
}
