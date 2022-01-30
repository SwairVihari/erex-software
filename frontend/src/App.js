
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Admin from './components/Admin';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/admin" element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
