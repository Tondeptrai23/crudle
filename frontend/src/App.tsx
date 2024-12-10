import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ErrorBoundary from './components/auth/ErrorBoundary.tsx';
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
import CourseDetailPage from './pages/CourseDetailPage.tsx';
import { Role } from './types/enums.ts';
import ProfilePage from './pages/ProfilePage.tsx';
import { ForbiddenError, RefreshTokenExpiredError } from './types/error.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof RefreshTokenExpiredError) {
          return false;
        }
        if (error instanceof ForbiddenError) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='/admin/*'
              element={
                <ErrorBoundary>
                  <RequireAuth allowedRoles={[Role.Admin]}>
                    <MainLayout>
                      <Routes>
                        <Route path='/' element={<AdminHomePage />} />
                        <Route path='/course' element={<AdminCoursePage />} />
                        <Route path='/student' element={<AdminStudentPage />} />
                        <Route path='/teacher' element={<AdminTeacherPage />} />
                        <Route path='*' element={<div>Not Found</div>} />
                      </Routes>
                    </MainLayout>
                  </RequireAuth>
                </ErrorBoundary>
              }
            />

            <Route
              path='/*'
              element={
                <ErrorBoundary>
                  <RequireAuth allowedRoles={[Role.User]}>
                    <MainLayout>
                      <Routes>
                        <Route path='/' element={<WeatherPage />} />
                        <Route path='/course' element={<CoursePage />} />
                        <Route
                          path='/course/:courseId'
                          element={<CourseDetailPage />}
                        />
                        <Route
                          path='student/:studentId'
                          element={<ProfilePage />}
                        />
                        <Route
                          path='teacher/:teacherId'
                          element={<ProfilePage />}
                        />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/settings' element={<div>Settings</div>} />
                        <Route path='*' element={<div>Not Found</div>} />
                      </Routes>
                    </MainLayout>
                  </RequireAuth>
                </ErrorBoundary>
              }
            />
            <Route path='/logout' element={<Logout />} />
            <Route path='*' element={<div>Not Found</div>} />
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
