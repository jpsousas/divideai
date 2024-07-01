import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, Button, Box, Skeleton } from '@mui/material';

const Header = ({ onSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(url);
  };

  return (
    <AppBar position="static" sx={{
      backgroundImage: 'url(/header-footer-image.png)',
      backgroundSize: 'cover',
    }}>
      <Toolbar sx={{ // centralizar a box contendo o input e botao
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex',
                alignItems: 'center',
                width: '80%' ,backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: 2,
                borderRadius: 1,
                maxWidth: 800,}}  // ajustado os atributo da box mera estilização
        >
          <TextField
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Digite a URL da NFC-e"
            variant="outlined"
            fullWidth
            sx={{ maxWidth: 600, marginRight: 2 }}  // Defina a largura máxima desejada
          />
          <Button variant="contained" color="primary" type="submit">
            Submeter URL
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
