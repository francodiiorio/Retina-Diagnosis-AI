import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Bienvenido from '../src/Bienvenida/Bienvenido';
import LoginScreen from '../src/Login/LoginScreen';
import NavBarSelectiva from './NavBar/NavBarSelectiva';
import Perfil from './Usuario/Perfil';

function App() {

  return (
    <Router>
      <NavBarSelectiva>
        <NavBar />
      </NavBarSelectiva>
      <Routes>
        <Route path="/" element={<Bienvenido />} />
        <Route path="/Login" element={<LoginScreen />} />
        <Route path="/Perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;
