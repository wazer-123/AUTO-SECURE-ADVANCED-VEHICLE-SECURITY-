import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { user_id, role, name } = response.data;
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('name', name);
      localStorage.setItem('userToken', response.data.token);
      
      console.log(user_id, name);
      
      // Redirect based on role
      if (role === 'Admin') {
        navigate('/AdminDash');
      } else if (role === 'Police') {
        navigate('/PoliceDash');
      } else if (role === 'Staff') {
        navigate('/Home');
      } else {
        alert('Role not recognized');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container-fluid p-0">
        <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
          <a href="index.html" className="navbar-brand d-flex align-items-center border-end px-4 px-lg-5 mx-auto">
            <h2 className="m-0"><i className="fa fa-car text-primary me-2"></i>Auto Secure</h2>
          </a>
          <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        
        {/* Login Section */}
      <div className="container-xxl py-6 bg-light">
        <div className="container">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="bg-white rounded shadow p-5">
                <div className="text-center mb-4">
                  <h1 className="display-6 mb-2">Welcome Back</h1>
                  <h6 className="text-primary text-uppercase mb-3">Login to Your Account</h6>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Enter your email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      placeholder="Enter your password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                   
                    <a href="/forgot-password" className="text-primary">Forgot Password?</a>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-3 mb-4">Login</button>
                  <p className="text-center mb-0">Don't have an account? <a href="/register" className="text-primary">Register Here</a></p>
                </form>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp d-none d-lg-block" data-wow-delay="0.5s">
              <div className="position-relative overflow-hidden h-100" style={{minHeight: "400px"}}>
                <img 
                  className="position-absolute w-100 h-100" 
                  src="img/about-1.jpg" 
                  alt="Auto Secure Security" 
                  style={{objectFit: "cover"}} 
                />
                <div className="position-absolute top-0 start-0 bg-white p-4 mt-3 ms-3">
                  <h5 className="text-primary">Vehicle Security</h5>
                  <p className="mb-0">Secure your vehicle from theft with our advanced protection system.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
   
      
      {/* Copyright */}
      <div className="container-fluid copyright text-light py-4 wow fadeIn" data-wow-delay="0.1s">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              © <a href="#">Auto Secure</a>, All Right Reserved.
            </div>
            <div className="col-md-6 text-center text-md-end">
              Designed By <a href="#">Team VGI</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>
  );
}

export default Login;