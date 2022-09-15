import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Conversation from '../../pages/Conversation';
import Navbar from '../Navbar';

function Index() {
    return (
      <Router>
        <Navbar />
          <Routes>
              <Route path="/" exact element={<Home/>} />
              <Route path="/profil" exact element={<Profil/>} />
              <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
      </Router>
    );
  }
  
  export default Index;
  