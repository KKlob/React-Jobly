import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Routes/Homepage';
import CompaniesPage from './Routes/CompaniesPage';
import CompanyDetailsPage from './Routes/CompanyDetailsPage';
import JobsPage from './Routes/JobsPage';
import JobDetailsPage from './Routes/JobDetailsPage';
import ProfilePage from './Routes/ProfilePage';
import LoginPage from './Routes/LoginPage';
import SignUpPage from './Routes/SignUpPage';
import NoMatchPage from './Routes/NoMatchPage';
import NavBar from './NavBar.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:handle" element={<CompanyDetailsPage />} />
          <Route exact path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
