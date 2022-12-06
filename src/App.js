import './App.css';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const WelcomePage = React.lazy(() => import('./pages/WelcomePage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route element={<WelcomePage/>} exact path={'/'}/>
          <Route element={<Dashboard/>} exact path={'/dashboard'}/>
          <Route element={<Login/>} exact path={'/login'}/>
          <Route element={<Register/>} exact path={'/register'}/>
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
