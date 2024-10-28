import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Nav from './components/nav/Nav.tsx';
import { Separator } from './components/common/ui/separator.tsx';
import CoursePage from './pages/CoursePage.tsx';
import { WeatherPage } from './pages/WeatherPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { AuthProvider } from './hooks/useAuth.tsx';
import RequireAuth from './components/auth/RequireAuth.tsx';

const App: React.FC = () => {

  return (
    <AuthProvider>
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
          <Route path='/login' element={<LoginPage />} />
          <Route 
            path='/' 
            element={
              <RequireAuth>
                <WeatherPage />
              </RequireAuth>
            } 
          />
          <Route 
            path='/course' 
            element={
              <RequireAuth>
                <CoursePage />
              </RequireAuth>
            } 
          />
        </Routes>
      </main>
    </Router>
    </AuthProvider>
  );
};

export default App;
