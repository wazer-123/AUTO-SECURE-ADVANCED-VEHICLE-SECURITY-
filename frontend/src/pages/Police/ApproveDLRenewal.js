import React, { useEffect, useState } from "react";
import axios from "axios";
import PoliceNavbar from "../../Component/PoliceNavbar";

function ApproveDLRenewal() {
    const [renewals, setRenewals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedRenewal, setSelectedRenewal] = useState(null);
    
    useEffect(() => {
        fetchRenewals();
    }, []);
    
    const fetchRenewals = () => {
        setLoading(true);
        axios
            .get("http://localhost:5000/api/renewal")
            .then((response) => {
                setRenewals(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching renewal applications!", error);
                setError("Failed to load renewal applications");
                setLoading(false);
            });
    };
    
    const handleStatusUpdate = (renewalId, newStatus) => {
        axios
            .put(`http://localhost:5000/api/renewal/${renewalId}`, { status: newStatus })
            .then(() => {
                alert(`Renewal application ${newStatus.toLowerCase()}`);
                fetchRenewals(); // Refresh the list
            })
            .catch((error) => {
                console.error("Error updating renewal status!", error);
                alert("Failed to update renewal status");
            });
    };
    
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString();
    };
    
    const viewDetails = (renewal) => {
        setSelectedRenewal(renewal);
    };
    
    const closeDetails = () => {
        setSelectedRenewal(null);
    };
    
    const getStatusBadge = (status) => {
        switch(status.toLowerCase()) {
            case 'approved':
                return <span className="badge bg-success">Approved</span>;
            case 'rejected':
                return <span className="badge bg-danger">Rejected</span>;
            case 'pending':
            default:
                return <span className="badge bg-warning text-dark">Pending</span>;
        }
    };
    
    if (loading) {
        return <div className="container mt-5"><h3>Loading...</h3></div>;
    }
    
    return (
        <>
        <PoliceNavbar/>
        <div style={{
            marginLeft: '280px',}}>
        <div className="container  mt-4">
            <h2>Driving License Renewal Applications</h2>
            
            {error && <div className="alert alert-danger">{error}</div>}
            
            {!loading && renewals.length === 0 && (
                <div className="alert alert-info">No renewal applications found</div>
            )}
            
            {/* Renewal Applications Table */}
            <div className="table-responsive mt-4">
                <table className="table table-striped table-hover">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>DL Number</th>
                            <th>Valid From</th>
                            <th>Valid To</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renewals.map((renewal) => (
                            <tr key={renewal.renewal_id}>
                                <td>{renewal.renewal_id}</td>
                                <td>{renewal.name}</td>
                                <td>{renewal.dl_no}</td>
                                <td>{formatDate(renewal.valid_from)}</td>
                                <td>{formatDate(renewal.valid_to)}</td>
                                <td>₹{renewal.amount}</td>
                                <td>{getStatusBadge(renewal.status)}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-info me-2" 
                                        onClick={() => viewDetails(renewal)}
                                    >
                                        View
                                    </button>
                                    
                                    {renewal.status.toLowerCase() === 'pending' && (
                                        <>
                                            <button 
                                                className="btn btn-sm btn-success me-2" 
                                                onClick={() => handleStatusUpdate(renewal.renewal_id, 'approved')}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                className="btn btn-sm btn-danger" 
                                                onClick={() => handleStatusUpdate(renewal.renewal_id, 'rejected')}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Renewal Details Modal */}
            {selectedRenewal && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Renewal Application Details</h5>
                                <button type="button" className="btn-close" onClick={closeDetails}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Renewal ID:</strong> {selectedRenewal.renewal_id}</p>
                                        <p><strong>DL Number:</strong> {selectedRenewal.dl_no}</p>
                                        <p><strong>Name:</strong> {selectedRenewal.name}</p>
                                        <p><strong>Phone:</strong> {selectedRenewal.phone_no}</p>
                                        <p><strong>Date of Birth:</strong> {formatDate(selectedRenewal.dob)}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Valid From:</strong> {formatDate(selectedRenewal.valid_from)}</p>
                                        <p><strong>Valid To:</strong> {formatDate(selectedRenewal.valid_to)}</p>
                                        <p><strong>Amount:</strong> ₹{selectedRenewal.amount}</p>
                                        <p><strong>Status:</strong> {getStatusBadge(selectedRenewal.status)}</p>
                                    </div>
                                    <div className="col-md-12">
                                        <p><strong>Address:</strong> {selectedRenewal.address}</p>
                                    </div>
                                </div>
                                
                                {selectedRenewal.status.toLowerCase() === 'pending' && (
                                    <div className="d-flex justify-content-end mt-3">
                                        <button 
                                            className="btn btn-success me-2" 
                                            onClick={() => {
                                                handleStatusUpdate(selectedRenewal.renewal_id, 'approved');
                                                closeDetails();
                                            }}
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            className="btn btn-danger" 
                                            onClick={() => {
                                                handleStatusUpdate(selectedRenewal.renewal_id, 'rejected');
                                                closeDetails();
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeDetails}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
        </>
    );
}

export default ApproveDLRenewal;