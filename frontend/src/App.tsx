import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout.tsx';
import CoursePage from './pages/CoursePage.tsx';
import { WeatherPage } from './pages/WeatherPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path='/' element={<WeatherPage />} />
          <Route path='/course' element={<CoursePage />} />

          <Route path='*' element={<div>404</div>} />
          <Route path='/logout' element={<div>Logout</div>} />
          <Route path='/profile' element={<div>Profile</div>} />
          <Route path='/settings' element={<div>Settings</div>} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
