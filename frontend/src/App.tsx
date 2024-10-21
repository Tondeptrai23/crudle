import React from 'react';
import { WeatherPage } from './pages/WeatherPage.tsx';
import Nav from './components/common/Nav.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursePage from './pages/CoursePage.tsx';
import { Separator } from './components/common/ui/separator.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Nav className='max-w-full max-h-18' />
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
