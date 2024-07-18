import './App.css'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import Room from './pages/Room'
import Home from './pages/Home'

function App() {
  return (
    <Router>
    	<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/room" element={<Room/>}/>
      </Routes>
    </Router>
  );
}

export default App;