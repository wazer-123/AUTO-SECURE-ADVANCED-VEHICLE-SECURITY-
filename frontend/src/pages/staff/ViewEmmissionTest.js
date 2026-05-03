import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ViewEmmissionTest() {
    const [tests, setTests] = useState([]);
    const userId = localStorage.getItem('user_id');
    const navigate=useNavigate();
    const handleLogout = () => {
      // Clear any session-related data
      localStorage.removeItem('userToken'); // Remove stored tokens if any
      navigate('/'); // Redirect to login page
    };
  
    useEffect(() => {
       
        console.log(userId);
        if (userId) {
            axios.get(`http://localhost:5000/api/emission_test/user/${userId}`)
                .then(response => {
                    setTests(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the emission tests!', error);
                });
        }
    }, []);

    return (
  <div>
    <div className="container-fluid bg-dark text-light p-0">
      <div className="row gx-0 d-none d-lg-flex">
        <div className="col-lg-7 px-5 text-start">
          <div className="h-100 d-inline-flex align-items-center me-4">
            <small className="fa fa-map-marker-alt text-primary me-2" />
            <small>123 Street,Brahmavar</small>
          </div>
          <div className="h-100 d-inline-flex align-items-center">
            <small className="far fa-clock text-primary me-2" />
            <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
          </div>
        </div>
        <div className="col-lg-5 px-5 text-end">
          <div className="h-100 d-inline-flex align-items-center me-4">
            <small className="fa fa-phone-alt text-primary me-2" />
            <small>+012 345 6789</small>
          </div>
          <div className="h-100 d-inline-flex align-items-center mx-n2">
            <a className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary" href><i className="fab fa-facebook-f" /></a>
            <a className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary" href><i className="fab fa-twitter" /></a>
            <a className="btn btn-square btn-link rounded-0 border-0 border-end border-secondary" href><i className="fab fa-linkedin-in" /></a>
            <a className="btn btn-square btn-link rounded-0" href><i className="fab fa-instagram" /></a>
          </div>
        </div>
      </div>
    </div>
    {/* Topbar End */}
    {/* Navbar Start */}
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
      <a href="index.html" className="navbar-brand d-flex align-items-center border-end px-4 px-lg-5">
        <h2 className="m-0"><i className="fa fa-car text-primary me-2" />Auto Secure</h2>
      </a>
      <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <a href="Home" className="nav-item nav-link active">Home</a>
          <a href="About" className="nav-item nav-link">About</a>
          <a href="view-emission-test" className="nav-item nav-link">View Emmission Test</a>
          <a href="apply-llr" className="nav-item nav-link">Apply LLR</a>
          <a href="ApplyDLRenewal" className="nav-item nav-link">Apply DL Renewal</a>
        </div>
        <a onClick={handleLogout} className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Logout<i className="fa fa-arrow-right ms-3" /></a>
      </div>
    </nav>
            
    {/* Navbar End */}
    {/* Page Header Start */}
    <div className="container-fluid page-header py-6 my-6 mt-0 wow fadeIn" data-wow-delay="0.1s">
      <div className="container text-center">
        <h1 className="display-4 text-white animated slideInDown mb-4">Emission Tests</h1>
        <nav aria-label="breadcrumb animated slideInDown">
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
            <li className="breadcrumb-item text-primary active" aria-current="page">Emission Test</li>
          </ol>
        </nav>
      </div>
    </div>
 
     

     
        <div className="container">
            <h2 className="my-4">Emission Tests</h2>
            <table className="table table-bordered">
            <thead>
                <tr>
                <th>Test ID</th>
                <th>Vehicle No</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {tests.map(test => (
                <tr key={test.Test_id}>
                    <td>{test.Test_id}</td>
                    <td>{test.Vehicle_no}</td>
                    <td>{new Date(test.Date_of_Emission_test).toLocaleDateString('en-GB')}</td>
                
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        


        {/* Footer Start */}
    <div className="container-fluid bg-dark text-light footer my-6 mb-0 py-6 wow fadeIn" data-wow-delay="0.1s">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <h4 className="text-white mb-4">Get In Touch</h4>
            <h2 className="text-primary mb-4"><i className="fa fa-car text-white me-2" />Auto Secure</h2>
            <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />123 Street,Brahmavar</p>
            <p className="mb-2"><i className="fa fa-phone-alt me-3" />+012 345 67890</p>
            <p className="mb-2"><i className="fa fa-envelope me-3" />info@example.com</p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Quick Links</h4>
            <a className="btn btn-link" href>About Us</a>
            <a className="btn btn-link" href>Contact Us</a>
            <a className="btn btn-link" href>Our Services</a>
            <a className="btn btn-link" href>Terms &amp; Condition</a>
            <a className="btn btn-link" href>Support</a>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Popular Links</h4>
            <a className="btn btn-link" href>About Us</a>
            <a className="btn btn-link" href>Contact Us</a>
            <a className="btn btn-link" href>Our Services</a>
            <a className="btn btn-link" href>Terms &amp; Condition</a>
            <a className="btn btn-link" href>Support</a>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="text-light mb-4">Newsletter</h4>
            <form action>
              <div className="input-group">
                <input type="text" className="form-control p-3 border-0" placeholder="Your Email Address" />
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            <h6 className="text-white mt-4 mb-3">Follow Us</h6>
            <div className="d-flex pt-2">
              <a className="btn btn-square btn-outline-light me-1" href><i className="fab fa-twitter" /></a>
              <a className="btn btn-square btn-outline-light me-1" href><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-square btn-outline-light me-1" href><i className="fab fa-youtube" /></a>
              <a className="btn btn-square btn-outline-light me-0" href><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End */}
    {/* Copyright Start */}
    <div className="container-fluid copyright text-light py-4 wow fadeIn" data-wow-delay="0.1s">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            © <a href="#">Auto Secure</a>, All Right Reserved.
          </div>
          <div className="col-md-6 text-center text-md-end">
            {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
            Designed By <a href="https://htmlcodex.com">Team VGI</a>
            
          </div>
        </div>
      </div>
    </div>
    {/* Copyright End */}
    {/* Back to Top */}
    <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></a>
  </div>
  
    );
  }
  
  export default ViewEmmissionTest;