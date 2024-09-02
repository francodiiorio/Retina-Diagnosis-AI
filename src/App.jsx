// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Bienvenido from '../screens/Bienvenido';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Bienvenido />} />
        <Route path="/Login" element={<LoginScreen />} />
        <Route path="/Register" element={RegisterScreen} />
      </Routes>
    </Router>
  );
}

export default App;
