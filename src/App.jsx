import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./components/pages/Dashboard";
import Investment from "./components/pages/Investment";
import Card from "./components/pages/Card";
import SendPage from "./components/pages/Send";
import HistoryPage from "./components/pages/History";
import Transfer from "./components/pages/Transfer";
import SettingsPage from "./components/pages/Settings";
import Login from "./components/pages/Login";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import Navbar from './components/pages/Navbar';
import Footer from './components/pages/Footer';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Contact from './components/pages/Contact';
import Services from './components/pages/Services';
import Profile from './components/pages/Profile';

function App() {
  return (
    <Router>
      {/* <Home/> */}
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Dashboard />} />
        <Route path="/investment" element={<Investment />} />
       
        <Route path="/card" element={<Card />} />
        <Route path="/send" element={<SendPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/profile" element={<Profile />} />

        {/* New Pages */}
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      {/* <Footer/> */}
    </Router>
  );
}

export default App;
