import logo from './logo.svg';
import './App.css';

// Router
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

// Pages
import Photos from './photos/photos';
import About from './about/about';

function App() {
  return (
    <Router>
      <div className='nav-wrapper'>
        <nav className='grey'>
          <ul className='right'>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/photos">Photos</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route exact path="/"></Route>
        <Route path="/photos" element={<Photos/>}></Route>
        <Route path="/about" element={<About/>}></Route>
      </Routes>

    </Router>
  );
}

export default App;
