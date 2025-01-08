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
import ArticleCreatePage from './pages/articles/ArticleCreatePage.tsx';
import ArticleDetailPage from './pages/articles/ArticleDetailPage.tsx';
import ArticleUpdatePage from './pages/articles/ArticleUpdatePage.tsx';
import AddAssignmentPage from './pages/assignments/AddAssignmentPage.tsx';
import AssignmentDetailPage from './pages/assignments/AssignmentDetailPage.tsx';
import AssignmentSessionPage from './pages/assignments/AssignmentSessionPage.tsx';
import EditAssignmentPage from './pages/assignments/EditAssignmentPage.tsx';
import { DashboardPage } from './pages/DashboardPage.tsx';
import { LoginPage } from './pages/common/LoginPage.tsx';
import ProfilePage from './pages/common/ProfilePage.tsx';
import CourseDetailPage from './pages/course/CourseDetailPage.tsx';
import CoursePage from './pages/course/CoursePage.tsx';
import { Role } from './types/enums.ts';
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
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
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
                        <Route path='/dashboard' element={<AdminHomePage />} />
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
                  <MainLayout>
                    <Routes>
                      <Route
                        path='/course/:courseId/assignment/:assignmentId/edit'
                        element={
                          <RequireAuth allowedRoles={[Role.Teacher]}>
                            <EditAssignmentPage />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path='/course/:courseId/add-assignment'
                        element={
                          <RequireAuth allowedRoles={[Role.Teacher]}>
                            <AddAssignmentPage />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path='/course/:courseId/article/:articleId/edit'
                        element={
                          <RequireAuth allowedRoles={[Role.Teacher]}>
                            <ArticleUpdatePage />
                          </RequireAuth>
                        }
                      />
                      <Route
                        path='/course/:courseId/add-article'
                        element={
                          <RequireAuth allowedRoles={[Role.Teacher]}>
                            <ArticleCreatePage />
                          </RequireAuth>
                        }
                      />
                    </Routes>

                    <RequireAuth allowedRoles={[Role.User]}>
                      <Routes>
                        <Route path='/dashboard' element={<DashboardPage />} />
                        <Route path='/course' element={<CoursePage />} />
                        <Route
                          path='/course/:courseId'
                          element={<CourseDetailPage />}
                        />
                        <Route
                          path='/course/:courseId/article/:articleId'
                          element={<ArticleDetailPage />}
                        />
                        <Route
                          path='student/:studentId'
                          element={<ProfilePage />}
                        />
                        <Route
                          path='teacher/:teacherId'
                          element={<ProfilePage />}
                        />
                        <Route
                          path='/course/:courseId/assignment/:assignmentId'
                          element={<AssignmentDetailPage />}
                        />
                        <Route
                          path='/course/:courseId/assignment/:assignmentId/session/:submissionId'
                          element={<AssignmentSessionPage />}
                        />
                        <Route path='/profile' element={<ProfilePage />} />
                        <Route path='/settings' element={<div>Settings</div>} />
                      </Routes>
                    </RequireAuth>
                  </MainLayout>
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
