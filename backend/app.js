const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const otpRoutes = require('./routes/otpRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const taxRoutes = require('./routes/taxRoutes');
const vehicleComplaintRoutes = require('./routes/vehicleComplaintRoutes');
const policeAssignmentRoutes = require('./routes/policeAssignmentRoutes');
const documentVerificationRoutes = require('./routes/documentVerificationRoutes');

const emmisionRoutes = require('./routes/emmisionRoutes');
const llrRoutes = require('./routes/llrRoutes');
const dlRoutes=require('./routes/dlRoutes');
const dlRenwalRoutes=require('./routes/dlRenewalRoutes');
const path = require('path');
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', taxRoutes);
app.use('/api', vehicleComplaintRoutes);
app.use('/api', policeAssignmentRoutes);
app.use('/api', documentVerificationRoutes);

app.use('/api', emmisionRoutes);
app.use('/api', llrRoutes);
app.use('/api',dlRoutes);
app.use('/api',dlRenwalRoutes);
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
