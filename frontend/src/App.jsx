import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ClientList from './pages/ClientList';
import ClientNew from './pages/ClientNew';
import ClientEdit from './pages/ClientEdit';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rotas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Rota padrão redireciona para login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Rotas protegidas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Rotas de clientes */}
            <Route
              path="/clients"
              element={
                <PrivateRoute>
                  <ClientList />
                </PrivateRoute>
              }
            />
            <Route
              path="/clients/new"
              element={
                <PrivateRoute>
                  <ClientNew />
                </PrivateRoute>
              }
            />
            <Route
              path="/clients/:id/edit"
              element={
                <PrivateRoute>
                  <ClientEdit />
                </PrivateRoute>
              }
            />

            {/* Rota catch-all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
