import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/landing/Landing'
import Onboarding from './pages/onboarding/Onboarding'
import UserPreferences from './pages/preferences/Preferences'
import Profiles from './pages/profiles/Profiles'

// TODO: add auth to make it so that landing alternates 
const routes = [
  <Route
    key="/"
    path="/"
    element={<Landing />}
  />,
  <Route key="onboarding" path="/onboarding" element={<Onboarding />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route key="profiles" path="/profiles" element={<Profiles />} />,
  <Route key="preferences" path="/preferences" element={<UserPreferences />} />,
]

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>{routes}</Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
