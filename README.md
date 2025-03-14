# Crudle - Learning Management System

Crudle is a comprehensive Learning Management System (LMS) designed to facilitate educational interactions between teachers and students. With a feature-rich interface and robust architecture, Crudle supports course management, assignments, exams, and educational content delivery.

## 🌟 Features

### User Management
- **Multiple Roles**: Admin, Teacher, and Student roles with different permissions
- **Profile Management**: View and update user information
- **Authentication**: Secure JWT-based authentication

### Course Management
- **Course Creation and Enrollment**: Create courses and manage student enrollments
- **Instructor Assignment**: Assign teachers to courses
- **Course Details**: View comprehensive information about courses

### Assignments
- **Assignment Creation**: Teachers can create assignments with multiple questions
- **Question Types**: Support for multiple choice and fill-in-blank questions
- **Submission Management**: Students can submit assignments and view their scores
- **Grading**: Automatic grading based on correct answers

### Exams
- **Exam Creation**: Create time-limited exams with custom durations
- **Scheduled Exams**: Set specific start times for exams
- **Auto-submit**: Exams are automatically submitted when time runs out
- **Result Viewing**: Review exam results after completion

### Articles
- **Educational Content**: Teachers can publish articles for their courses
- **Reading Tracking**: System tracks which articles students have read

### Dashboard
- **Upcoming Events**: View upcoming assignments and exams
- **Notifications**: See unread articles and pending assignments
- **Calendar View**: Visual calendar of all course events

## 🔧 Technology Stack

### Backend
- ASP.NET Core 8.0
- Entity Framework Core
- Microsoft Identity
- JWT Authentication
- MySQL Database

### Frontend
- React 18
- TypeScript
- TanStack Query (React Query)
- React Router
- Tailwind CSS
- Lucide React icons
- Shadcn UI components

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js (v16+)
- MySQL Server
- Git

### Backend Setup
1. Clone the repository
   ```
   git clone https://github.com/Tondeptrai23/crudle.git
   cd crudle/backend
   ```

2. Setup environment variables
   - Copy `.env.sample` to `.env`
   - Configure your database connection string and JWT settings

3. Run the backend
   ```
   dotnet run
   ```

4. The API will be available at `http://localhost:5262`

### Frontend Setup
1. Navigate to the frontend directory
   ```
   cd ../frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:5173`

## 📝 API Documentation

API documentation is available through Swagger. When running the backend in development mode, visit:
```
http://localhost:5262/swagger
```



## 🌐 System Architecture

Crudle follows a modern client-server architecture with a clear separation of concerns:

### Backend Architecture
- **API Layer**: RESTful API endpoints organized by domain and user roles (Admin, Teacher, Student)
- **Service Layer**: Business logic encapsulated in service interfaces and implementations
- **Repository Pattern**: Data access through Entity Framework Core
- **Dependency Injection**: Services registered in the IoC container for loose coupling
- **Middleware Pipeline**: Custom exception handling middleware for consistent error responses
- **Specification Pattern**: Query specifications to encapsulate and reuse data access logic

### Frontend Architecture
- **Component-Based Design**: Reusable UI components built with React and TypeScript
- **Custom Hooks**: Business logic and API interactions encapsulated in hooks
- **React Query**: State management and data fetching with automatic caching
- **React Router**: Client-side routing with role-based access control
- **Context API**: Global state management for authentication and user preferences
- **Error Boundaries**: Graceful error handling at component level

### Authentication Flow
- **JWT Authentication**: Short-lived access tokens for API authorization
- **Refresh Token Mechanism**: Long-lived refresh tokens stored securely
- **Token Rotation**: New refresh token issued with each refresh operation
- **Role-Based Authorization**: Endpoint protection based on user roles

### Database Design
- **Entity Framework Core**: ORM for database operations
- **Code-First Approach**: Model-driven database schema generation
- **Navigation Properties**: Relationships between entities
- **Soft Delete**: Logical deletion preserving data integrity
- **Optimistic Concurrency**: Preventing data conflicts with timestamps

## 👥 User Roles and Permissions

- **Admin**: Manage all aspects of the system, including users, courses, and enrollments
- **Teacher**: Create and manage course content, assignments, exams, and view student submissions
- **Student**: Enroll in courses, view content, submit assignments, take exams, and track progress

## 🔍 Technical Implementation Details

### Backend Implementation
- **Controller Structure**: Controllers are organized by domain and user role
  - Admin controllers for system management
  - Teacher controllers for course and content management
  - Student controllers for learning activities
- **DTO Pattern**: Data Transfer Objects for clean API contracts
- **AutoMapper**: Object-to-object mapping between entities and DTOs
- **Middleware Pipeline**: Custom exception handling middleware that converts domain exceptions to appropriate HTTP responses
- **Extension Methods**: Configuration organized in extension methods for clean startup
- **Environment Variables**: Configuration via environment variables for secure deployment

### Frontend Implementation
- **Component Hierarchy**:
  - Layout components (layouts, navigation)
  - Feature components (assignments, exams, courses)
  - Common UI components (buttons, cards, modals)
- **Custom Hooks**:
  - API hooks (useAssignmentApi, useExamApi, etc.)
  - Utility hooks (useDebounce, useToast, etc.)
  - Authentication hook (useAuth)
- **State Management**:
  - React Query for server state
  - React Context for global application state
  - Local component state for UI-specific state
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **CSS Strategy**: Utility-first approach with Tailwind CSS and component abstractions

### Security Considerations
- **CORS Policy**: Configured for controlled cross-origin requests
- **Input Validation**: Server and client-side validation of user inputs
- **Token Security**: HTTP-only cookies for sensitive tokens
- **Authorization Checks**: Multiple levels of authorization checks
- **Error Handling**: Sanitized error messages to prevent information disclosure

### Performance Optimizations
- **Query Caching**: Efficient data fetching with React Query's caching
- **Lazy Loading**: Dynamic imports for code splitting
- **Pagination**: Server-side pagination for large data sets
- **Debouncing**: Prevent excessive API calls with debounced inputs
- **Memoization**: React.memo and useMemo for expensive renders


## 🙏 Acknowledgements

- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
