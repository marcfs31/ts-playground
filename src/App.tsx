import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Playground from './components/Playground';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Main />
      </Router>
    </ThemeProvider>
  );
}

const Main: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ background: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/playground">Playground</Link>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </div>
  );
}

export default App;
