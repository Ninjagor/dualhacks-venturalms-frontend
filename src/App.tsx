import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/common/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signup from './pages/Auth/Signup/Signup';
import Login from './pages/Auth/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Assignment from './pages/Assignment/Assignment';
import Class from './pages/Classes/Class';
import ParentDashboard from './pages/ParentDashboard/ParentDashboard';
import About from './pages/Product/About';
import Developers from './pages/Developers/Developers';
import Pricing from './pages/Pricing/Pricing';


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
        <Route path='/parentdashboard/*' element={<ParentDashboard  themeChange={handleThemeSwitchFromApp} theme={theme}/>} />
        <Route path='/assignment/*' element={<Assignment />} />
        <Route path='/class/:classId/*' element={<Class themeChange={handleThemeSwitchFromApp} theme={theme}/>} />
        <Route
            path='/about'
            element={<About themeChange={handleThemeSwitchFromApp} theme={theme} />}
          />
          <Route
            path='/pricing'
            element={<Pricing themeChange={handleThemeSwitchFromApp} theme={theme} />}
          />
          <Route
            path='/meethedevs'
            element={<Developers themeChange={handleThemeSwitchFromApp} theme={theme} />}
          />
          <Route path='*' element={<h1 className="w-full h-screen text-center flex justify-center items-center text-[40px] flex-col">404 not found<Link to={"/"} className="text-blue-600">Back Home</Link></h1>}/>
      </Routes>
    </BrowserRouter>
   </>

  );
}

export default App;
