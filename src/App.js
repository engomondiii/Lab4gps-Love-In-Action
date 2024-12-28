// src/App.js

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LangProvider } from './components/Context/LangContext';
import { ModalProvider } from './components/Context/ModalContext'; // Import ModalProvider
import { AuthProvider } from './components/Context/AuthContext'; // Import AuthProvider
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Chatbot from './components/Chatbot/Chatbot'; // Import the Chatbot component

// Import Auth Components
import Login from './components/Auths/Login';
import Signup from './components/Auths/Signup';
import ForgotPassword from './components/Auths/ForgotPassword';
import AdvancedUserProfile from './components/Auths/AdvancedUserProfile';
import SubmitProblem from './components/ProblemAlert/SubmitProblem';

// Import ProtectedRoute
import ProtectedRoute from './protect/ProtectedRoute';

// Lazy-loaded components
const About = lazy(() => import('./pages/About/About'));
const Purpose = lazy(() => import('./pages/About/Purpose'));
const Mission = lazy(() => import('./pages/About/Mission'));
const Vision = lazy(() => import('./pages/About/Vision'));
const CoreValues = lazy(() => import('./pages/About/CoreValues'));
const WhoWeAre = lazy(() => import('./pages/About/WhoWeAre'));
// const NotFound = lazy(() => import('./pages/NotFound')); // Optional

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider */}
      <LangProvider>
        <ModalProvider> {/* Wrap the application with ModalProvider */}
          <Router>
            <div className="App">
              {/* Navigation Bar */}
              <Navbar />

              {/* Main Content with Suspense for Lazy-Loaded Components */}
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {/* Home Route */}
                  <Route path="/" element={<Home />} />

                  {/* Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/profile" element={<AdvancedUserProfile />} />

                  {/* Submit Problem Route (Protected) */}
                  <Route
                    path="/submit-problem"
                    element={
                      <ProtectedRoute>
                        <SubmitProblem />
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect "/about-us" to "/about" for consistency */}
                  <Route path="/about-us" element={<Navigate to="/about" replace />} />

                  {/* About Routes with Nested Sub-Routes */}
                  <Route path="/about" element={<About />}>
                    {/* Default Sub-Route: Redirect "/about" to "/about/purpose" */}
                    <Route index element={<Navigate to="purpose" replace />} />

                    {/* Sub-Pages */}
                    <Route path="purpose" element={<Purpose />} />
                    <Route path="mission" element={<Mission />} />
                    <Route path="vision" element={<Vision />} />
                    <Route path="corevalues" element={<CoreValues />} />
                    <Route path="whoweare" element={<WhoWeAre />} />

                    {/* Optional: Handle Undefined Sub-Routes */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                  </Route>

                  {/* Optional: Handle Undefined Routes */}
                  {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
              </Suspense>

              {/* Footer */}
              <Footer />

              {/* Floating Chatbot */}
              <Chatbot />
            </div>
          </Router>
        </ModalProvider>
      </LangProvider>
    </AuthProvider>
  );
}

export default App;
