import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/landing-page/LandingPage.tsx';
import ReviewerPage from './components/pages/reviewer/Reviewer.tsx';
import EntrepreneurPage from './components/pages/entrepreneur/Entrepreneur.tsx';
import About from './components/pages/about-trampolim/About.tsx';
import SignUpPage from './components/pages/sign-up/SignupPage.tsx';
import LoginPage from './components/pages/login/LoginPage.tsx';
import PlatformAdmPage from './components/pages/platform-adm/PlatformAdmPage.tsx';
import PlatformEntrepreneurPage from './components/pages/platform-entrepreneur/PlatformEntrepreneurPage.tsx';
import PlatformReviewerPage from './components/pages/platform-reviewer/PlatformReviewerPage.tsx';

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
        <Route path="/logado-adm" element={<PlatformAdmPage />} />
        <Route path="/logado-empreendedor" element={<PlatformEntrepreneurPage />} />
        <Route path="/logado-avaliador" element={<PlatformReviewerPage />} />
      </Routes>
    </Router>
  );
}

export default App;