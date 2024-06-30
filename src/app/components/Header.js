import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, Button, Box, Skeleton } from '@mui/material';

const Header = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', alignItems: 'center', width: '100%' }}  // Ajuste aqui
        >
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Digite a URL da NFC-e"
            variant="outlined"
            fullWidth
            sx={{ maxWidth: 400, marginRight: 2 }}  // Defina a largura máxima desejada
          />
          <Button variant="contained" color="primary" type="submit">
            Submeter
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
