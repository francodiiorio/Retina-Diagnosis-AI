// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Bienvenido from '../src/Bienvenida/Bienvenido';
import LoginScreen from '../src/Login/LoginScreen';
import RegisterScreen from '../src/Login/RegisterScreen';

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
