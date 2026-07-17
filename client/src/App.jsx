import MainLayout from './layout/MainLayout';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return user ? <MainLayout /> : <Login />;
}

export default App;
