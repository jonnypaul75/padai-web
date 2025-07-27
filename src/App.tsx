import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './pages/index';
import Media from './pages/media';
import Reels from './pages/edu-reel';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          } />
          <Route path="/dashboard" element={
            <Dashboard />
          } />
          <Route path="/media" element={
            <Media />
          } />
          <Route path="/edu-reel" element={
            <Reels />
          } />
        </Routes>
      </Router>
    </>
  );
}

export default App;
