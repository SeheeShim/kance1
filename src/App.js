import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';


import Home from './pages/Home';
import Challenge from "./pages/Challenge";
import Learning from "./pages/Learning";
import Community from "./pages/Community";
import Store from "./pages/Store";
import About from './pages/About';
import MyAccount from './pages/MyAccount';

import './App.scss';
import './styles/fonts.scss';

function App() {
  return (
    
      <Router>
        <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/challenge" element={<Challenge />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/community" element={<Community />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path="/my-account" element={<MyAccount />} />
            </Routes>
          </main>
  
        <Footer />
      </Router>
    
  );
}

export default App;