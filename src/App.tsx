import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import HomePage from './components/HomePage';
import Playground from './components/Playground';
import { AppBar, Toolbar, Button, CssBaseline, Container } from '@mui/material';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MuiApp />
      </Router>
    </ThemeProvider>
  );
}

const MuiApp: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const muiTheme = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline /> {/* Normalize CSS across browsers */}
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/playground">Playground</Button>
          <Button color="inherit" onClick={toggleTheme}>Toggle Theme</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </Container>
    </MuiThemeProvider>
  );
}

export default App;
