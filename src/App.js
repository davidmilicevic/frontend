import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages $ components
import Naslovna from './pages/Naslovna'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navigacija from './components/Navigacija'



function App() {
  const { user } = useAuthContext()


  return (
    <div className="App">
      <BrowserRouter>
        <Navigacija />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element = {user ? <Naslovna /> : <Navigate to = "/login" />}
            />
            <Route 
              path="/login"
              element = {!user ? <Login/> : <Navigate to = "/" />}
            />
            <Route 
              path="/signup"
              element = {!user ? <Signup/> : <Navigate to = "/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
