
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registration from './components/Registration';
import Verify from './components/verify';
import Home from './components/Home'
import { RecoilRoot } from 'recoil';


function App() {
  return (
    
    <Router>
      <Navbar />
      <RecoilRoot>
      <Routes> 
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/verify" element={<Verify/>} />
      </Routes>
        </RecoilRoot>
    </Router>
  );
}

export default App;
