import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Routes, 
  Route
} from "react-router-dom";
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';

function App() {
  
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoute><Home/></PrivateRoute>} /> 
          <Route path="/login" element={<UnPrivateRoute><Login /></UnPrivateRoute>} />
          <Route path="/register" element={<UnPrivateRoute><Register /></UnPrivateRoute>} />
          <Route path="/profile/:username" element={<PrivateRoute><Profile/></PrivateRoute>} />
        </Routes>
      </Router>
  );
}

export default App;
