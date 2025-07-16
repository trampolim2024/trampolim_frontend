import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/landing-page/LandingPage.tsx';
import ReviewerPage from './components/pages/reviewer/Reviewer.tsx';
import EntrepreneurPage from './components/pages/entrepreneur/Entrepreneur.tsx';
import About from './components/pages/about-trampolim/About.tsx';
import SignUpPage from './components/pages/sign-up/SignupPage.tsx';
import LoginPage from './components/pages/login/LoginPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/avaliador" element={<ReviewerPage />} />
        <Route path="/empreendedor" element={<EntrepreneurPage />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/cadastro" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;