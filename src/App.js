import './App.css';
import React, { Suspense, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserContext } from './context/UserContext';

const WelcomePage = React.lazy(() => import('./pages/WelcomePage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login'));
const LoginPertamina = React.lazy(() => import('./pages/LoginMyPertamina'));
const Register = React.lazy(() => import('./pages/Register'));


function App() {
  const [user, setUser] = useLocalStorage("user");
  const userProvider = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );

  return (
    <UserContext.Provider value={userProvider}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route element={<WelcomePage/>} exact path={'/'}/>
            <Route element={<ProtectedRoute user={user}><Dashboard/></ProtectedRoute>} exact path={'/dashboard'}/>
            <Route element={<Login/>} exact path={'/login'}/>
            <Route element={<LoginPertamina/>} exact path={'/loginpertamina'}/>
            <Route element={<Register/>} exact path={'/register'}/>
          </Routes>
        </Router>
      </Suspense>
    </UserContext.Provider>
  );
}

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to={'/login'} replace />;
  }

  return children ? children : <Outlet />;
};

export default App;
