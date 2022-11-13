import { Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage'
import LoginPage from './views/LoginPage';
import NotFound from './views/NotFound';
import RegisterPage from './views/RegisterPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage/>} />
    </Routes>
  );
};
export default AppRouter
