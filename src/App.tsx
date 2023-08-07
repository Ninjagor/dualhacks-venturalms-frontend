import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Assignment from './pages/Assignment/Assignment';


function App() {
  const [theme, setTheme] = useState(localStorage.getItem('venturaTheme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.removeItem('venturaTheme');
    localStorage.setItem('venturaTheme', theme);
  }, [theme]);

  const handleThemeSwitchFromApp = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home themeChange={handleThemeSwitchFromApp} theme={theme} />}></Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/*' element={<Dashboard  themeChange={handleThemeSwitchFromApp} theme={theme}/>} />
        <Route path='/assignment/*' element={<Assignment />} />
      </Routes>
    </BrowserRouter>
   </>

  );
}

export default App;
