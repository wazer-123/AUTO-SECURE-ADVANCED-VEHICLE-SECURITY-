import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';

import AdminDash from './pages/admin/AdminDash';
import Settings from './pages/admin/Settings';
import ProtectedRoute from './Component/ProtectedRoute';

import ManageUsers from './pages/admin/ManageUser';
import ManageVehicles from './pages/admin/ManageVehicle';
import ViewComplaints from './pages/admin/ViewComplaints';

import Home from './pages/staff/Home';

import PoliceDash from './pages/Police/PoliceDash';
import AddFIR from './pages/Police/AddFIR';
import ApplyEmissionTest from './pages/Police/ApplyEmmissionTest';

import ViewEmmissionTest from './pages/staff/ViewEmmissionTest';
import ApplyLLR from './pages/staff/ApplyLLR';
import ApplyDLRenewal from './pages/staff/ApplyDLRenewal';

import ApproveLLR from './pages/Police/ApproveLLR';
import ApproveDLRenewal from './pages/Police/ApproveDLRenewal';
import SettingsUser from './pages/staff/SettingsUser';
import SettingsPolice from './pages/Police/SettingsPolice';
import About from './pages/staff/About';
import UploadImage from "./pages/UploadImage";
function App() {
    const userRole = 'admin';
    const isAuthenticated = true; 

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/upload" element={<UploadImage />} />
                <Route path="/Forgot-Password" element={<ForgotPassword />} />

                <Route path="/admin/manage-user" element={<ManageUsers />} />
                <Route path="/admin/manage-vehicle" element={<ManageVehicles />} />
                <Route path="/admin/view-complaints" element={<ViewComplaints />} />
               
               <Route path="/Home" element={<Home/>}/>
               <Route path='/About' element={<About/>}/>
                <Route path="/view-emission-test" element={<ViewEmmissionTest/>}/>
                <Route path="/apply-llr" element={<ApplyLLR/>}/>
                <Route path='/ApplyDLRenewal' element={<ApplyDLRenewal/>}/>
                <Route path="/SettingsUser" element={<SettingsUser/>}/>
               <Route path="/PoliceDash" element={<PoliceDash/>}/>
               <Route path="/police/add-fir" element={<AddFIR/>}/>
                <Route path="/police/apply-emission-test" element={<ApplyEmissionTest/>}/>
                <Route path="/police/approve-llr" element={<ApproveLLR/>}/>
                <Route path="/police/approve-dl-renewal" element={<ApproveDLRenewal/>}/>
                <Route path="/police/settings" element={<SettingsPolice/>}/>
                <Route
                    path="/AdminDash"
                    element={
                        <ProtectedRoute allowedRoles={['admin']} userRole={userRole} isAuthenticated={isAuthenticated}>
                            <AdminDash />
                        </ProtectedRoute>
                    }
                />
    
                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute allowedRoles={['admin']} userRole={userRole} isAuthenticated={isAuthenticated}>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
