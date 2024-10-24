import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Nav from './components/common/Nav.tsx';
import { Separator } from './components/common/ui/separator.tsx';
import CoursePage from './pages/CoursePage.tsx';
import { WeatherPage } from './pages/WeatherPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Nav
        className='max-h-18 max-w-full'
        items={[
          { label: 'Weather', path: '/' },
          { label: 'Course', path: '/course' },
        ]}
        handleNotification={() => {
          console.log('Notification clicked');
        }}
        profileActions={{
          handleLogout: () => {
            console.log('Logout clicked');
          },

          handleProfile: () => {
            console.log('Profile clicked');
          },

          handleSettings: () => {
            console.log('Settings clicked');
          },
        }}
      />

      <Separator />

      <main className='flex-grow'>
        <Routes>
          <Route path='/' element={<WeatherPage />} />
          <Route path='/course' element={<CoursePage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
