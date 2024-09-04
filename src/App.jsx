import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Bienvenido from '../src/Bienvenida/Bienvenido';
import LoginScreen from '../src/Login/LoginScreen';
import RegisterScreen from '../src/Login/RegisterScreen';
import NavBarSelectiva from './NavBar/NavBarSelectiva';
function App() {
  return (
    <Router>
      <NavBarSelectiva>
        <NavBar />
      </NavBarSelectiva>
      <Routes>
        <Route path="/" element={<Bienvenido />} />
        <Route path="/Login" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
