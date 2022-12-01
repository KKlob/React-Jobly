import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Routes/Homepage';
import CompaniesPage from './Routes/CompaniesPage';
import CompanyDetailsPage from './Routes/CompanyDetailsPage';
import JobsPage from './Routes/JobsPage';
import JobDetailsPage from './Routes/JobDetailsPage';
import ProfilePage from './Routes/ProfilePage';
import UserFormPage from './Routes/UserFormPage';
import NoMatchPage from './Routes/NoMatchPage';
import NavBar from './NavBar.js';
import JoblyApi from './api';

function App() {

  const [token, setToken] = useState(null);

  const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      JoblyApi.token = token.userToken;
      try {
        const user = await JoblyApi.getUser(token.username);
        user.token = token.userToken;
        setCurrUser(user);

      } catch (error) {
        console.log(error);
      }
    }

    if (token) getUser();

  }, [token, setCurrUser]);

  function loggout() {
    setToken(null);
  }

  if (currUser) console.log("user: ", currUser);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar loggout={loggout} />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/companies" element={<CompaniesPage />} />
          <Route path="/companies/:handle" element={<CompanyDetailsPage />} />
          <Route exact path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/login" element={<UserFormPage type="login" login={setToken} />} />
          <Route exact path="/signup" element={<UserFormPage type="signup" signup={setToken} />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
