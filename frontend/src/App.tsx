import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Logout from './components/auth/Logout.tsx';
import RequireAuth from './components/auth/RequireAuth.tsx';
import { Toaster } from './components/common/ui/toaster.tsx';
import MainLayout from './components/MainLayout.tsx';
import { AuthProvider } from './hooks/useAuth.tsx';
import AdminCoursePage from './pages/admin/AdminCoursePage.tsx';
import AdminHomePage from './pages/admin/AdminHomePage.tsx';
import AdminStudentPage from './pages/admin/AdminStudentPage.tsx';
import AdminTeacherPage from './pages/admin/AdminTeacherPage.tsx';
import CoursePage from './pages/CoursePage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { WeatherPage } from './pages/WeatherPage.tsx';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/*'
              element={
                <MainLayout>
                  <Routes>
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

                    <Route
                      path='/admin'
                      element={
                        <RequireAuth>
                          <AdminHomePage />
                        </RequireAuth>
                      }
                    />

                    <Route
                      path='/admin/course'
                      element={
                        <RequireAuth>
                          <AdminCoursePage />
                        </RequireAuth>
                      }
                    />

                    <Route
                      path='/admin/student'
                      element={
                        <RequireAuth>
                          <AdminStudentPage />
                        </RequireAuth>
                      }
                    />

                    <Route
                      path='/admin/teacher'
                      element={
                        <RequireAuth>
                          <AdminTeacherPage />
                        </RequireAuth>
                      }
                    />

                    <Route path='*' element={<div>404</div>} />
                    <Route path='/logout' element={<Logout />} />
                    <Route path='/profile' element={<div>Profile</div>} />
                    <Route path='/settings' element={<div>Settings</div>} />
                  </Routes>
                </MainLayout>
              }
            />
          </Routes>
        </Router>
        <Toaster />

        {/* Debugging */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
