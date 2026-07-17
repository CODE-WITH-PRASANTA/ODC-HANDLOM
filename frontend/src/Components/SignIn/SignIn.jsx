import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  // Modal visibility state
  const [isOpen, setIsOpen] = useState(true);
  
  // Views can be: 'login', 'register', 'forgot'
  const [view, setView] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted ${view} form with data:`, formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // If the close button was clicked, don't render the modal
  if (!isOpen) return null;

  return (
    <div className="auth-wrapper">
      {/* Container class changes dynamically depending on the current view */}
      <div className={`auth-container ${view}-view`}>
        {/* Click handler added to close button */}
        <button className="close-btn" aria-label="Close" onClick={handleClose}>
          &times;
        </button>
        
        <div className="auth-scroll-content">

          {/* --- LOGIN VIEW --- */}
          {view === 'login' && (
            <div className="auth-card">
              <p className="auth-subtitle">Login with your email & password</p>
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      <svg viewBox="0 0 24 24" className="eye-icon">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <div className="remember-me-wrapper">
                    <button
                      type="button"
                      className={`toggle-switch ${rememberMe ? 'active' : ''}`}
                      onClick={() => setRememberMe(!rememberMe)}
                    >
                      <span className="toggle-slider"></span>
                    </button>
                    <span className="remember-label">Remember me</span>
                  </div>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => setView('forgot')}
                  >
                    Forgot password?
                  </button>
                </div>

                <button type="submit" className="primary-btn">Login</button>
              </form>

              <div className="divider">
                <span>Or</span>
              </div>

              <button type="button" className="social-btn google-btn">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.95-3.18 3.5v2.88h5.13c3.01-2.76 4.76-6.84 4.76-11.66 0-.58-.05-1.13-.15-1.45z" />
                  <path fill="currentColor" d="M12.18 21.43c2.75 0 5.06-.92 6.75-2.5l-5.13-2.88c-.79.53-1.8.85-2.9.85-2.23 0-4.13-1.5-4.8-3.53H.84v2.98c1.74 3.46 5.3 5.73 9.4 5.73z" />
                  <path fill="currentColor" d="M7.38 13.37c-.17-.52-.27-1.08-.27-1.66s.1-1.14.27-1.66V7.07H.84a11.94 11.94 0 0 0 0 9.28l4.86-2.98z" />
                  <path fill="currentColor" d="M12.18 6.77c1.49 0 2.84.51 3.9 1.5l2.92-2.92C17.23 3.65 14.91 2.7 12.18 2.7c-4.1 0-7.66 2.27-9.4 5.73l4.86 2.98c.67-2.03 2.57-3.53 4.8-3.53z" />
                </svg>
                Login With Google
              </button>

              <p className="footer-text">
                Don't have any account?{' '}
                <button className="link-btn bold" onClick={() => setView('register')}>
                  Register
                </button>
              </p>
            </div>
          )}

          {/* --- REGISTER VIEW --- */}
          {view === 'register' && (
            <div className="auth-card">
              <p className="auth-subtitle top-terms">
                By signing up, you agree to our <a href="#terms">terms</a> & <a href="#policy">policy</a>
              </p>
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={togglePasswordVisibility}
                    >
                      <svg viewBox="0 0 24 24" className="eye-icon">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <button type="submit" className="primary-btn space-top">Register</button>
              </form>

              <div className="divider">
                <span>Or</span>
              </div>

              <button type="button" className="social-btn google-btn">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 1.56-1.56 2.95-3.18 3.5v2.88h5.13c3.01-2.76 4.76-6.84 4.76-11.66 0-.58-.05-1.13-.15-1.45z" />
                  <path fill="currentColor" d="M12.18 21.43c2.75 0 5.06-.92 6.75-2.5l-5.13-2.88c-.79.53-1.8.85-2.9.85-2.23 0-4.13-1.5-4.8-3.53H.84v2.98c1.74 3.46 5.3 5.73 9.4 5.73z" />
                  <path fill="currentColor" d="M7.38 13.37c-.17-.52-.27-1.08-.27-1.66s.1-1.14.27-1.66V7.07H.84a11.94 11.94 0 0 0 0 9.28l4.86-2.98z" />
                  <path fill="currentColor" d="M12.18 6.77c1.49 0 2.84.51 3.9 1.5l2.92-2.92C17.23 3.65 14.91 2.7 12.18 2.7c-4.1 0-7.66 2.27-9.4 5.73l4.86 2.98c.67-2.03 2.57-3.53 4.8-3.53z" />
                </svg>
                Login With Google
              </button>

              <p className="footer-text">
                Already have an account?{' '}
                <button className="link-btn bold" onClick={() => setView('login')}>
                  Login
                </button>
              </p>
            </div>
          )}

          {/* --- FORGOT PASSWORD VIEW --- */}
          {view === 'forgot' && (
            <div className="auth-card">
              <p className="auth-subtitle dark-subtitle">We'll send you a link to reset your password</p>
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <button type="submit" className="primary-btn space-top">Reset Password</button>
              </form>

              <div className="divider">
                <span>Or</span>
              </div>

              <p className="footer-text">
                Back to{' '}
                <button className="link-btn bold" onClick={() => setView('login')}>
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;