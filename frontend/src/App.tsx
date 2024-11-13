import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout.tsx';
import AdminCoursePage from './pages/admin/AdminCoursePage.tsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.tsx';
import AdminStudentPage from './pages/admin/AdminStudentPage.tsx';
import AdminTeacherPage from './pages/admin/AdminTeacherPage.tsx';
import CoursePage from './pages/CoursePage.tsx';
import { WeatherPage } from './pages/WeatherPage.tsx';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path='/' element={<WeatherPage />} />
            <Route path='/course' element={<CoursePage />} />

            <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
            <Route path='/admin/course' element={<AdminCoursePage />} />
            <Route path='/admin/student' element={<AdminStudentPage />} />

            <Route path='/admin/teacher' element={<AdminTeacherPage />} />

            <Route path='*' element={<div>404</div>} />
            <Route path='/logout' element={<div>Logout</div>} />
            <Route path='/profile' element={<div>Profile</div>} />
            <Route path='/settings' element={<div>Settings</div>} />
          </Routes>
        </MainLayout>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
