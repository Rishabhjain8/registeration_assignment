import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/Signup';

function App() {
  return (
    <Router>
      <Routes>
      {localStorage.getItem('token') ? <Route exact path = "/" element={<Home/>} />:<Route exact path = "/login" element={<Login/>} />}
        <Route exact path = "/login" element={<Login/>} />
      <Route exact path = "/signup" element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
