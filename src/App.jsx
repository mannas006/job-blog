import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogFeed from './components/BlogFeed';
import BlogPost from './components/BlogPost';
import Editor from './components/Editor';
import Login from './components/Login';
import { supabase } from './supabase';
import './App.css';
import EditPost from './components/EditPost.jsx';
import Sidebar from './components/Sidebar';
import { Container, Grid } from '@mui/material';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode === 'true' || false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App">
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Routes>
              <Route path="/" element={<BlogFeed />} />
              <Route path="/post/:id" element={<BlogPost />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/login" element={<Login />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Grid>
          <Grid item xs={12} md={4}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
