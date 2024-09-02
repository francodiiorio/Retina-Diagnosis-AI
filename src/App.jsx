import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bienvenido from '../screens/Bienvenido';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bienvenido />} />

      </Routes>
    </Router>
  );
}

export default App;
