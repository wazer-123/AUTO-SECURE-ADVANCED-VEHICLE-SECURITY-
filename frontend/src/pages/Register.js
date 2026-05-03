import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('Staff');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
      navigate('/');
      alert('Registration successful');
    } catch (error) {
      alert(`Registration failed: ${error.response ? error.response.data.message : error.message}`);
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
      
      {/* Register Section */}
      <div className="container-xxl py-6 bg-light">
        <div className="container">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="bg-white rounded shadow p-5">
                <div className="text-center mb-4">
                  <h1 className="display-6 mb-2">Create Account</h1>
                  <h6 className="text-primary text-uppercase mb-3">Join Auto Secure Today</h6>
                </div>
                <form onSubmit={handleRegister}>
                  <div className="mb-4">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      placeholder="Enter your full name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
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
                      placeholder="Create a password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-3 mb-4">Register</button>
                  <p className="text-center mb-0">Already have an account? <a href="/" className="text-primary">Login Here</a></p>
                </form>
              </div>
            </div>
            <div className="col-lg-6 wow fadeInUp d-none d-lg-block" data-wow-delay="0.5s">
              <div className="position-relative overflow-hidden h-100" style={{minHeight: "400px"}}>
                <img 
                  className="position-absolute w-100 h-100" 
                  src="img/about-1.jpg" 
                  alt="Auto Shield Security" 
                  style={{objectFit: "cover"}} 
                />
                <div className="position-absolute top-0 start-0 bg-white p-4 mt-3 ms-3">
                  <h5 className="text-primary">Vehicle Security</h5>
                  <p className="mb-0">Register today to protect your vehicle with our advanced security features.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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

export default Register;