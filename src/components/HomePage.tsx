import React from 'react';
import { Typography, Paper, Container } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          TypeScript Playground
        </Typography>
        <Typography variant="body1">
          Welcome to the TypeScript playground. Navigate to the playground to start coding!
        </Typography>
      </Paper>
    </Container>
  );
}

export default HomePage;
