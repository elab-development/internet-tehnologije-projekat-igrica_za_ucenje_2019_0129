import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';  
import FlexboxGame from './FlexboxGame';  
import Pocetna from './Pocetna';
import RegisterForm from './RegisterForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pocetna />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/flexboxfroggygame" element={<FlexboxGame />} />
      </Routes>
    </Router>
  );
}

export default App;
