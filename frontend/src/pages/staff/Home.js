import { useNavigate } from "react-router-dom";
function Home() {
  const navigate=useNavigate();
  const handleLogout = () => {
    // Clear any session-related data
    localStorage.removeItem('userToken'); // Remove stored tokens if any
    navigate('/'); // Redirect to login page
  };

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
          <small></small>
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
          <a href="SettingsUser" className="nav-item nav-link">Settings</a>
        </div>
        <a onClick={handleLogout} className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">Logout<i className="fa fa-arrow-right ms-3" /></a>
      </div>
    </nav>
            
  {/* Navbar End */}
  {/* Carousel Start */}
  <div className="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
    <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
          <div className="carousel-caption">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <h1 className="display-4 text-light mb-5 animated slideInDown">"Secure Security System For Every Drive"</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
          <div className="carousel-caption">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <h1 className="display-2 text-light mb-5 animated slideInDown">Safe Driving Is Our Top Priority</h1>
                  <a href className="btn btn-primary py-sm-3 px-sm-5">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#header-carousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  {/* Carousel End */}
  {/* Facts Start */}
  <div className="container-fluid facts py-5 pt-lg-0">
    <div className="container py-5 pt-lg-0">
      <div className="row gx-0">
        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
          <div className="bg-white shadow d-flex align-items-center h-100 p-4" style={{minHeight: 150}}>
            <div className="d-flex">
              <div className="flex-shrink-0 btn-lg-square bg-primary">
                <i className="fa fa-car text-white" />
              </div>
              <div className="ps-4">
                <h5>Vehicle Robbery Prevention </h5>
                <span>Protect your vehicle from theft.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
          <div className="bg-white shadow d-flex align-items-center h-100 p-4" style={{minHeight: 150}}>
            <div className="d-flex">
              <div className="flex-shrink-0 btn-lg-square bg-primary">
                <i className="fa fa-users text-white" />
              </div>
              <div className="ps-4">
                <h5>National Security Instructor</h5>
                <span>Trained experts to secure your vehicle.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
          <div className="bg-white shadow d-flex align-items-center h-100 p-4" style={{minHeight: 150}}>
            <div className="d-flex">
              <div className="flex-shrink-0 btn-lg-square bg-primary">
                <i className="fa fa-file-alt text-white" />
              </div>
              <div className="ps-4">
                <h5>Get Protection</h5>
                <span>Ensure your vehicle's safety today.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Facts End */}
  {/* About Start */}
  <div className="container-xxl py-6">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="position-relative overflow-hidden ps-5 pt-5 h-100" style={{minHeight: 400}}>
            <img className="position-absolute w-100 h-100" src="img/about-1.jpg" alt style={{objectFit: 'cover'}} />
            <img className="position-absolute top-0 start-0 bg-white pe-3 pb-3" src="img/about-2.jpg" alt style={{width: 200, height: 200}} />
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="h-100">
            <h6 className="text-primary text-uppercase mb-2">About Us</h6>
            <h1 className="display-6 mb-4">Secure Security System: Unmatched Protection for Every Drive</h1>
            <p>The Secure Security System offers advanced, reliable protection for your vehicle, ensuring that every journey—whether long or short—is secure from potential threats, accidents, and theft. Drive with confidence knowing your car is always safeguarded.</p>
            <p className="mb-4">Experience the peace of mind that comes with the Shield Security System—designed to protect your vehicle from all angles. Whether you're commuting through busy streets, embarking on long road trips, or simply parked at home, our system provides 24/7 surveillance and real-time alerts, safeguarding your car from accidents, theft, and damage. Drive with confidence, knowing that every mile is secured by cutting-edge technology. Protect what matters most with the Shield Security System, your trusted companion on every journey.</p>
            <div className="row g-2 mb-4 pb-2">
              <div className="col-sm-6">
                <i className="fa fa-check text-primary me-2" />Fully Licensed
              </div>
              <div className="col-sm-6">
                <i className="fa fa-check text-primary me-2" />Online Tracking
              </div>
              <div className="col-sm-6">
                <i className="fa fa-check text-primary me-2" />Afordable Fee 
              </div>
              <div className="col-sm-6">
                <i className="fa fa-check text-primary me-2" />Best Trainers
              </div>
            </div>
            <div className="row g-4">
              <div className="col-sm-6">
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}

  {/* Features Start */}
  <div className="container-xxl py-6">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="text-primary text-uppercase mb-2">Why Choose Us!</h6>
          <h1 className="display-6 mb-4">Vehicle Robbery Protection System</h1>
          <p className="mb-5">Our Vehicle Robbery Protection System is designed to safeguard your vehicle from theft and unauthorized access, offering advanced security features to ensure your car remains protected at all times.</p>
          <div className="row gy-5 gx-4">
            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 btn-square bg-primary me-3">
                  <i className="fa fa-check text-white" />
                </div>
                <h5 className="mb-0">Fully Integrated</h5>
              </div>
              <span>Comprehensive system integration for total vehicle security.</span>
            </div>
            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.2s">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 btn-square bg-primary me-3">
                  <i className="fa fa-check text-white" />
                </div>
                <h5 className="mb-0">Real-Time Alerts</h5>
              </div>
              <span>Receive instant notifications for any suspicious activity or theft attempts.</span>
            </div>
            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 btn-square bg-primary me-3">
                  <i className="fa fa-check text-white" />
                </div>
                <h5 className="mb-0">Affordable Protection</h5>
              </div>
              <span>Get high-level security at a cost that suits your budget.</span>
            </div>
            <div className="col-sm-6 wow fadeIn" data-wow-delay="0.4s">
              <div className="d-flex align-items-center mb-3">
                <div className="flex-shrink-0 btn-square bg-primary me-3">
                  <i className="fa fa-check text-white" />
                </div>
                <h5 className="mb-0">Advanced Technology</h5>
              </div>
              <span>Utilizing cutting-edge technology to prevent vehicle robbery and ensure peace of mind.</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="position-relative overflow-hidden pe-5 pt-5 h-100" style={{minHeight: 400}}>
            <img className="position-absolute w-100 h-100" src="img/about-1.jpg" alt style={{objectFit: 'cover'}} />
            <img className="position-absolute top-0 end-0 bg-white ps-3 pb-3" src="img/about-2.jpg" alt style={{width: 200, height: 200}} />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Features End */}

  {/* Footer Start */}
  <div className="container-fluid bg-dark text-light footer my-6 mb-0 py-6 wow fadeIn" data-wow-delay="0.1s">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <h4 className="text-white mb-4">Get In Touch</h4>
          <h2 className="text-primary mb-4"><i className="fa fa-car text-white me-2" />Auto Secure</h2>
          <p className="mb-2"><i className="fa fa-map-marker-alt me-3" />123 Street,Brahmavar </p>
          <p className="mb-2"><i className="fa fa-phone-alt me-3" />+91 9901962952</p>
          <p className="mb-2"><i className="fa fa-envelope me-3" />AUTOSECURE@example.com</p>
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

export default Home;