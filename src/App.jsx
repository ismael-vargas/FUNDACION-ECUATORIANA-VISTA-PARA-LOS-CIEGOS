import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import { SessionProvider } from './context/SessionContext';
import { Dashboard } from './pages/Dashboard';
import { Header } from './components/Header';
import { Roles } from './common/roles'
import { ProtectedRoute } from './auth/ProtectedRoute';
import { Approvals } from './pages/Approvals';
import Register from './pages/Register';

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </SessionProvider>
  );
}
function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/approving" element={
          <ProtectedRoute
            element={<Approvals />}
            requiredRole={Roles.APPROVING}
          />
        }
        />
        {/* <Route path="/approving" element={<Approvals />} /> */}
      </Routes>
    </>
  );
}

export default App;
