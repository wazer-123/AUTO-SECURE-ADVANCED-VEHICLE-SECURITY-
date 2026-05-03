import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PoliceNavbar from "../../Component/PoliceNavbar";

function ApproveLLR() {
  const [pendingLLRs, setPendingLLRs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLLR, setSelectedLLR] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [dlNumber, setDlNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  
  const navigate = useNavigate();

  const variants = [
    { id: 1, name: "Two Wheeler", code: "TW", fee: 1000 },
    { id: 2, name: "Four Wheeler", code: "FW", fee: 1800 },
    { id: 3, name: "Three Wheeler", code: "THW", fee: 1250 },
    { id: 4, name: "Heavy Vehicle", code: "HV", fee: 2500 }
  ];

  useEffect(() => {
    fetchPendingLLRs();
  }, []);

  useEffect(() => {
    if (selectedLLR) {
      // Generate a DL number - KA followed by 13 digits
      const randomDigits = Math.floor(Math.random() * 10000000000000).toString().padStart(13, '0');
      setDlNumber(`KA${randomDigits}`);
    }
  }, [selectedLLR]);

  useEffect(() => {
    calculateAmount();
  }, [selectedVariants]);

  const fetchPendingLLRs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/llr/status/pending");
      setPendingLLRs(response.data);
    } catch (error) {
      console.error("Error fetching pending LLRs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLLRSelect = (llr) => {
    setSelectedLLR(llr);
    setSelectedVariants([]);
    setAmount(0);
    setPaymentStatus("pending");
  };

  const handleVariantToggle = (variantId) => {
    if (selectedVariants.includes(variantId)) {
      setSelectedVariants(selectedVariants.filter(id => id !== variantId));
    } else {
      setSelectedVariants([...selectedVariants, variantId]);
    }
  };

  const selectAllVariants = () => {
    const allVariantIds = variants.map(variant => variant.id);
    setSelectedVariants(allVariantIds);
  };

  const calculateAmount = () => {
    if (selectedVariants.length === 0) {
      setAmount(0);
      return;
    }

    // If all variants are selected, charge the "all variants" price
    if (selectedVariants.length === variants.length) {
      setAmount(4000);
      return;
    }

    // Otherwise calculate based on selected variants
    const total = selectedVariants.reduce((sum, variantId) => {
      const variant = variants.find(v => v.id === variantId);
      return sum + (variant ? variant.fee : 0);
    }, 0);

    setAmount(total);
  };

  const handleApprove = async () => {
    if (!selectedLLR || selectedVariants.length === 0) {
      alert("Please select an LLR application and at least one vehicle variant");
      return;
    }

    try {
      // 1. Update LLR status to approved
      await axios.put(`http://localhost:5000/api/llr/${selectedLLR.LLR_id}`, {
        ...selectedLLR,
        status: "approved"
      });

      // 2. Create new DL record
      const dlData = {
        dl_no: dlNumber,
        user_id: selectedLLR.user_id,
        llr_id: selectedLLR.LLR_id,
        issue_date: new Date().toISOString().split('T')[0],
        expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 20)).toISOString().split('T')[0],
        variants: selectedVariants.map(id => variants.find(v => v.id === id).code).join(','),
        amount: amount,
        payment_status: paymentStatus
      };

      await axios.post("http://localhost:5000/api/dl", dlData);
      
      alert("LLR approved and DL generated successfully!");
      setSelectedLLR(null);
      setSelectedVariants([]);
      setAmount(0);
      fetchPendingLLRs();
    } catch (error) {
      console.error("Error approving LLR:", error);
      alert("Error approving LLR. Please try again.");
    }
  };

  const handleReject = async () => {
    if (!selectedLLR) {
      alert("Please select an LLR application");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/llr/${selectedLLR.LLR_id}`, {
        ...selectedLLR,
        status: "rejected"
      });
      
      alert("LLR application rejected!");
      setSelectedLLR(null);
      fetchPendingLLRs();
    } catch (error) {
      console.error("Error rejecting LLR:", error);
      alert("Error rejecting LLR. Please try again.");
    }
  };

  const filteredLLRs = pendingLLRs.filter(llr => {
    return llr.llr_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (llr.user_name && llr.user_name.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  return (
    <>
    <PoliceNavbar/>
    <div style={{  marginLeft: '280px',}}>
    <div className="container ">
      <h1 className="mb-4">LLR Approval and DL Generation</h1>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Pending LLR Applications</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by LLR No or Name" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : filteredLLRs.length === 0 ? (
                <div className="alert alert-info">No pending LLR applications found</div>
              ) : (
                <div className="list-group">
                  {filteredLLRs.map(llr => (
                    <button
                      key={llr.LLR_id}
                      className={`list-group-item list-group-item-action ${selectedLLR?.LLR_id === llr.LLR_id ? 'active' : ''}`}
                      onClick={() => handleLLRSelect(llr)}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{llr.llr_no}</h5>
                        <small>{new Date(llr.LLR_issue_date).toLocaleDateString()}</small>
                      </div>
                      <p className="mb-1">Applicant: {llr.user_name || 'Unknown'}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          {selectedLLR ? (
            <div className="card">
              <div className="card-header bg-success text-white">
                <h5 className="card-title mb-0">Generate Driving License</h5>
              </div>
              <div className="card-body">
                <h5>Applicant Details</h5>
                <dl className="row">
                  <dt className="col-sm-4">Name:</dt>
                  <dd className="col-sm-8">{selectedLLR.user_name || 'Unknown'}</dd>
                  
                  <dt className="col-sm-4">LLR Number:</dt>
                  <dd className="col-sm-8">{selectedLLR.llr_no}</dd>
                  
                  <dt className="col-sm-4">Issue Date:</dt>
                  <dd className="col-sm-8">{new Date(selectedLLR.LLR_issue_date).toLocaleDateString()}</dd>
                </dl>
                
                <hr />
                
                <h5>DL Details</h5>
                <div className="mb-3">
                  <label className="form-label">DL Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={dlNumber} 
                    readOnly 
                  />
                </div>
                
                <h5>Select Vehicle Variants</h5>
                <div className="mb-3">
                  {variants.map(variant => (
                    <div className="form-check" key={variant.id}>
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id={`variant-${variant.id}`}
                        checked={selectedVariants.includes(variant.id)}
                        onChange={() => handleVariantToggle(variant.id)}
                      />
                      <label className="form-check-label" htmlFor={`variant-${variant.id}`}>
                        {variant.name} - ₹{variant.fee}
                      </label>
                    </div>
                  ))}
                  
                  <button 
                    className="btn btn-outline-secondary mt-2" 
                    onClick={selectAllVariants}
                  >
                    Select All Variants (₹4000)
                  </button>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Amount</label>
                  <div className="input-group">
                    <span className="input-group-text">₹</span>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={amount} 
                      readOnly 
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">Payment Status</label>
                  <select 
                    className="form-select"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                
                <div className="d-flex justify-content-between mt-4">
                  <button 
                    className="btn btn-danger" 
                    onClick={handleReject}
                  >
                    Reject LLR
                  </button>
                  <button 
                    className="btn btn-success" 
                    onClick={handleApprove}
                    disabled={selectedVariants.length === 0}
                  >
                    Approve & Generate DL
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-secondary h-100 d-flex align-items-center justify-content-center">
              <div className="text-center">
                <i className="bi bi-arrow-left-circle-fill" style={{ fontSize: "3rem" }}></i>
                <h5 className="mt-3">Select an LLR application from the list</h5>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          <h5 className="card-title mb-0">Fee Structure</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Vehicle Type</th>
                  <th>Fee (₹)</th>
                </tr>
              </thead>
              <tbody>
                {variants.map(variant => (
                  <tr key={variant.id}>
                    <td>{variant.name}</td>
                    <td>₹{variant.fee}</td>
                  </tr>
                ))}
                <tr className="table-primary">
                  <td><strong>All Variants</strong></td>
                  <td><strong>₹4000</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default ApproveLLR;