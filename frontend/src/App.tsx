import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './components/MainLayout.tsx';
import CoursePage from './pages/CoursePage.tsx';
import { WeatherPage } from './pages/WeatherPage.tsx';
import { LoginPage } from './pages/LoginPage.tsx';
import { AuthProvider } from './hooks/useAuth.tsx';
import RequireAuth from './components/auth/RequireAuth.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from './components/common/ui/toaster.tsx';
import Logout from './components/auth/Logout.tsx';
import CourseDetailPage from './pages/CourseDetailPage.tsx';

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
                    <Route
                      path='/course/:courseId'
                      element={
                        <RequireAuth>
                          <CourseDetailPage />
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
