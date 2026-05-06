import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleOtpChange = (value, index) => {
    const otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);
    
    // Auto focus to next input after typing
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const sendOTP = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/otp/forgot-password`,
      { email }
    );

    alert('OTP sent to your email');
    setStep(2);

  } catch (error) {
    alert('Error sending OTP');
  }
};

const resetPassword = async (e) => {
  e.preventDefault();

  try {
    const otpCode = otp.join('');

    await axios.post(
      `${process.env.REACT_APP_API_URL}/api/otp/reset-password`,
      {
        email,
        otp: otpCode,
        newPassword
      }
    );

    navigate('/');
    alert('Password reset successful');

  } catch (error) {
    alert('Invalid OTP');
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
      
      {/* Forgot Password Section */}
      <div className="container-xxl py-6 bg-light">
        <div className="container">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="bg-white rounded shadow p-5">
                <div className="text-center mb-4">
                  <h1 className="display-6 mb-2">Password Recovery</h1>
                  <h6 className="text-primary text-uppercase mb-3">Reset Your Password</h6>
                </div>
                
                {step === 1 && (
                  <form onSubmit={sendOTP}>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Enter your registered email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3 mb-4">Send OTP</button>
                    <p className="text-center mb-0">Remember your password? <a href="/" className="text-primary">Login Here</a></p>
                  </form>
                )}
                
                {step === 2 && (
                  <form onSubmit={resetPassword}>
                    <div className="mb-4">
                      <label className="form-label">Enter 6-Digit OTP</label>
                      <div className="d-flex justify-content-between mb-3">
                        {otp.map((value, index) => (
                          <input
                            key={index}
                            type="text"
                            className="form-control text-center fw-bold"
                            style={{ width: "45px", height: "45px", fontSize: "18px" }}
                            maxLength="1"
                            value={value}
                            onChange={(e) => handleOtpChange(e.target.value, index)}
                            id={`otp-${index}`}
                            required
                          />
                        ))}
                      </div>
                      <p className="text-center text-muted small mb-4">Enter the OTP sent to your email</p>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        id="newPassword" 
                        placeholder="Create new password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-3 mb-4">Reset Password</button>
                    <p className="text-center mb-0">
                      <a href="#" onClick={() => setStep(1)} className="text-primary">Change Email</a>
                    </p>
                  </form>
                )}
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
                  <h5 className="text-primary">Secure Access</h5>
                  <p className="mb-0">Recover your account access with our secure password reset process.</p>
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

export default ForgotPassword;