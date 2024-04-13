
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutDashboard from './components/layout/LayoutDasboard';
import Login from './components/layout/layoutLogin';
import Register from './components/layout/layoutLogin/Register';
import { LayoutHome } from './components/layout';
import LayoutCadProd from './components/layout/layoutCadProd';
import LayoutEstoque from './components/layout/layoutEstoque';
import LayoutClientes from './components/layout/layoutUsuario';
import LayoutRelatorio from './components/layout/layoutRelatorio';
import { AuthProvider } from './components/context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<LayoutDashboard />} />
          <Route path="/home" element={<LayoutHome />} />
          <Route path="/cadastrar-produto" element={<LayoutCadProd />} />
          <Route path="/estoque" element={<LayoutEstoque />} />
          <Route path="/relatorio" element={<LayoutRelatorio />} />
          <Route path="/usuarios" element={<LayoutClientes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


