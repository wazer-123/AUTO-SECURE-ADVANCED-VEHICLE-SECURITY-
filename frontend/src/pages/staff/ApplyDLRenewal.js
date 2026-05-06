


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ApplyDLRenewal() {
    const [formData, setFormData] = useState({
        dl_no: "",
        name: "",
        phone_no: "",
        dob: "",
        address: "",
        valid_from: "",
        valid_to: "",
        amount: "500", // Default renewal amount
    });
    const [existingDL, setExistingDL] = useState(null);
    const [hasExistingRenewal, setHasExistingRenewal] = useState(false);
    const [renewalStatus, setRenewalStatus] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isExpired, setIsExpired] = useState(false);
    
    const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            // Fetch user's existing DL information
            fetchExistingDL();
            // Check if user already has a renewal application
            checkExistingRenewal();
        }
    }, [userId]);

   const fetchExistingDL = () => {

    setLoading(true);

    axios
        .get(
            `${process.env.REACT_APP_API_URL}/api/dl/user/${userId}`
        )

        .then((response) => {

            if (
                response.data &&
                response.data.length > 0
            ) {

                const dl = response.data[0];

                // Fix expiry field
                const validToField =
                    dl.valid_to || dl.expiry_date;

                const dlWithCorrectDates = {
                    ...dl,
                    valid_to: validToField
                };

                setExistingDL(dlWithCorrectDates);

                // Check expiry
                const today = new Date();

                const expiryDate = new Date(
                    validToField
                );

                setIsExpired(today > expiryDate);

                // Prefill form
                setFormData({
                    dl_no: dl.dl_no || "",
                    name: dl.user_name || "",
                    phone_no: dl.phone_no || "",
                    dob:
                        dl.dob?.split('T')[0] || "",
                    address: dl.address || "",

                    valid_from: new Date()
                        .toISOString()
                        .split('T')[0],

                    valid_to: calculateValidTo(
                        new Date()
                    ),

                    amount: "500"
                });

            } else {

                setError(
                    "No existing driving license found. You need a valid DL before applying for renewal."
                );
            }

            setLoading(false);

        })

        .catch((error) => {

            console.error(
                "Error fetching DL information!",
                error
            );

            setError(
                "Failed to fetch your driving license information."
            );

            setLoading(false);
        });
};

const checkExistingRenewal = () => {

    axios
        .get(
            `${process.env.REACT_APP_API_URL}/api/renewal/check/${userId}`
        )

        .then((response) => {

            if (
                response.data &&
                response.data.hasRenewal
            ) {

                const status =
                    response.data.renewal.status ||
                    "pending";

                if (
                    status.toLowerCase() ===
                        "pending" ||
                    status.toLowerCase() ===
                        "in process"
                ) {

                    setHasExistingRenewal(true);

                    setRenewalStatus(status);

                } else {

                    setHasExistingRenewal(false);
                }
            }
        })

        .catch((error) => {

            console.error(
                "Error checking existing renewal!",
                error
            );
        });
};

// Calculate valid_to date
const calculateValidTo = (fromDate) => {

    const toDate = new Date(fromDate);

    toDate.setFullYear(
        toDate.getFullYear() + 5
    );

    return toDate
        .toISOString()
        .split('T')[0];
};

const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
        ...formData,
        [name]: value
    });

    // Update valid_to automatically
    if (name === "valid_from") {

        const toDate =
            calculateValidTo(
                new Date(value)
            );

        setFormData(prevData => ({
            ...prevData,
            valid_to: toDate
        }));
    }
};

const handleSubmit = (e) => {

    e.preventDefault();

    // Ensure DL number exists
    if (!formData.dl_no) {

        setError(
            "A valid driving license number is required for renewal."
        );

        return;
    }

    // Prepare renewal data
    const renewalData = {

        dl_no: formData.dl_no,
        name: formData.name,
        phone_no: formData.phone_no,
        dob: formData.dob,
        address: formData.address,
        valid_from: formData.valid_from,
        valid_to: formData.valid_to,
        amount: formData.amount,
        user_id: userId
    };

    // Submit renewal
    axios
        .post(
            `${process.env.REACT_APP_API_URL}/api/renewal`,
            renewalData
        )

        .then((response) => {

            alert(
                "DL Renewal application submitted successfully!"
            );

            setHasExistingRenewal(true);

            setRenewalStatus("pending");

            fetchExistingDL();

        })

        .catch((error) => {

            console.error(
                "Error submitting renewal application!",
                error
            );

            setError(
                error.response?.data?.error ||
                "Error applying for DL renewal. Please try again."
            );
        });
};
    const getStatusBadge = () => {
        switch(renewalStatus.toLowerCase()) {
            case 'approved':
                return <span className="badge bg-success">Approved</span>;
            case 'rejected':
                return <span className="badge bg-danger">Rejected</span>;
            case 'pending':
            default:
                return <span className="badge bg-warning text-dark">Pending</span>;
        }
    };

    const getRemainingDays = () => {
        if (!existingDL) return 0;
        
        // Fix: Check for valid_to or expiry_date
        const expiryDateStr = existingDL.valid_to || existingDL.expiry_date;
        if (!expiryDateStr) return 0;
        
        const expiryDate = new Date(expiryDateStr);
        const today = new Date();
        
        // Check if date is valid
        if (isNaN(expiryDate.getTime())) return 0;
        
        // If already expired, return 0
        if (today > expiryDate) return 0;
        
        // Calculate days difference
        const diffTime = Math.abs(expiryDate - today);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    // Fix: Function to safely format a date
    const formatDate = (dateString) => {
        if (!dateString) return "Not available";
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Invalid date";
        
        return date.toLocaleDateString();
    };

    if (loading) {
        return <div className="container mt-5"><h3>Loading...</h3></div>;
    }
    
    const handleLogout = () => {
        // Clear any session-related data
        localStorage.removeItem('userToken'); // Remove stored tokens if any
        navigate('/'); // Redirect to login page
    };
    
    return (
        <div>
            {/* Header, navbar and other UI components remain the same */}
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
                
                <div className="container-fluid page-header py-6 my-6 mt-0 wow fadeIn" data-wow-delay="0.1s">
                    <div className="container text-center">
                        <h1 className="display-4 text-white animated slideInDown mb-4">DL Renewal Application</h1>
                        <nav aria-label="breadcrumb animated slideInDown">
                            <ol className="breadcrumb justify-content-center mb-0">
                                <li className="breadcrumb-item"><a className="text-white" href="#">Home</a></li>
                                <li className="breadcrumb-item text-primary active" aria-current="page">DL Renewal</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                
                <div className="container mt-5 mb-5">
                    <h2>Apply for Driving License Renewal</h2>
                    
                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}
                    
                    {!existingDL && !error && (
                        <div className="alert alert-warning">
                            You need to have a valid driving license before applying for renewal.
                        </div>
                    )}
                    
                    {hasExistingRenewal && (
                        <div className="alert alert-info">
                            <h4>You have already applied for DL renewal</h4>
                            <p>Current status: {getStatusBadge()}</p>
                            <p>Your application is being processed. You will be notified once there's an update.</p>
                        </div>
                    )}
                    
                    {existingDL && !hasExistingRenewal && (
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-4">
                                    <div className="card-header bg-primary text-white">
                                        <h4>Your Current DL Information</h4>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>DL Number:</strong> {existingDL.dl_no}</p>
                                        <p><strong>Name:</strong> {existingDL.user_name}</p>
                                        <p><strong>Valid Until:</strong> {formatDate(existingDL.valid_to)}</p>
                                        
                                        {isExpired ? (
                                            <div className="alert alert-danger mt-3">
                                                <strong>Your license has expired!</strong> Please apply for renewal as soon as possible.
                                            </div>
                                        ) : (
                                            <div className="alert alert-info mt-3">
                                                <strong>Days until expiry:</strong> {getRemainingDays()} days
                                                {getRemainingDays() <= 30 && (
                                                    <p className="mb-0 mt-2">
                                                        <strong>Note:</strong> Your license will expire soon. Consider renewing now.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="dl_no" className="form-label">DL Number</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="dl_no" 
                                                name="dl_no"
                                                value={formData.dl_no} 
                                                readOnly 
                                            />
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="name" 
                                                name="name"
                                                value={formData.name} 
                                                onChange={handleChange}
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="phone_no" className="form-label">Phone Number</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="phone_no" 
                                                name="phone_no"
                                                value={formData.phone_no} 
                                                onChange={handleChange}
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                id="dob" 
                                                name="dob"
                                                value={formData.dob} 
                                                onChange={handleChange}
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="address" className="form-label">Address</label>
                                            <textarea 
                                                className="form-control" 
                                                id="address" 
                                                name="address"
                                                value={formData.address} 
                                                onChange={handleChange}
                                                required
                                                rows="3"
                                            ></textarea>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="valid_from" className="form-label">Valid From</label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                id="valid_from" 
                                                name="valid_from"
                                                value={formData.valid_from} 
                                                onChange={handleChange}
                                                required 
                                            />
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="valid_to" className="form-label">Valid To</label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                id="valid_to" 
                                                name="valid_to"
                                                value={formData.valid_to} 
                                                readOnly 
                                            />
                                            <small className="text-muted">DL is valid for 5 years from the start date</small>
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="amount" className="form-label">Renewal Fee (Rs.)</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="amount" 
                                                name="amount"
                                                value={formData.amount} 
                                                readOnly 
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary">
                                            Submit Renewal Application
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Footer components remain the same */}
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
            {/*/*** This template is free as long as you keep the footer author's credit link/attribution link/backlink. If you'd like to use the template without the footer author's credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
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

export default ApplyDLRenewal;