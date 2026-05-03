-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2025 at 07:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `autoshield`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `complaint_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Pending','In Progress','Resolved') DEFAULT 'Pending',
  `date_filed` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dl_renewal`
--

CREATE TABLE `dl_renewal` (
  `renewal_id` int(9) NOT NULL,
  `dl_no` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone_no` varchar(200) NOT NULL,
  `dob` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `valid_from` date NOT NULL,
  `valid_to` date NOT NULL,
  `amount` varchar(200) NOT NULL,
  `status` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `document_verification`
--

CREATE TABLE `document_verification` (
  `document_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `document_name` varchar(100) NOT NULL,
  `status` enum('Verified','Pending') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `driving_license`
--

CREATE TABLE `driving_license` (
  `dl_id` int(11) NOT NULL,
  `dl_no` varchar(50) NOT NULL,
  `user_id` int(11) NOT NULL,
  `llr_id` int(11) NOT NULL,
  `issue_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `variants` varchar(100) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_status` varchar(20) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `emission_test`
--

CREATE TABLE `emission_test` (
  `Test_id` int(11) NOT NULL,
  `Vehicle_no` varchar(20) NOT NULL,
  `Date_of_Emission_test` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fir_details`
--

CREATE TABLE `fir_details` (
  `fir_id` int(9) NOT NULL,
  `fir_no` varchar(20) NOT NULL,
  `vehicle_number` varchar(100) DEFAULT NULL,
  `chase_no` varchar(200) NOT NULL,
  `model` varchar(200) NOT NULL,
  `brand` varchar(200) NOT NULL,
  `color` varchar(200) NOT NULL,
  `varient` varchar(200) NOT NULL,
  `fuel_type` varchar(200) NOT NULL,
  `owner_name` varchar(200) NOT NULL,
  `phone_no` varchar(200) NOT NULL,
  `lost_place` varchar(200) NOT NULL,
  `lost_date` datetime(6) NOT NULL,
  `status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `llr`
--

CREATE TABLE `llr` (
  `LLR_id` int(11) NOT NULL,
  `llr_no` varchar(200) NOT NULL,
  `LLR_issue_date` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `number_plate_detection`
--

CREATE TABLE `number_plate_detection` (
  `detection_id` int(11) NOT NULL,
  `vehicle_number` varchar(20) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `police_assignment`
--

CREATE TABLE `police_assignment` (
  `assignment_id` int(11) NOT NULL,
  `complaint_id` int(11) NOT NULL,
  `police_id` int(11) NOT NULL,
  `status` enum('Assigned','Investigating','Closed') DEFAULT 'Assigned'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('Admin','Police','Staff') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `otp` int(11) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `vehicle_number` varchar(20) NOT NULL,
  `model` varchar(100) NOT NULL,
  `color` varchar(50) NOT NULL,
  `rfid_tag` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_tax`
--

CREATE TABLE `vehicle_tax` (
  `tax_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `amount_due` decimal(10,2) NOT NULL,
  `due_date` date NOT NULL,
  `status` enum('Paid','Pending') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`complaint_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `dl_renewal`
--
ALTER TABLE `dl_renewal`
  ADD PRIMARY KEY (`renewal_id`),
  ADD KEY `dl_no` (`dl_no`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `document_verification`
--
ALTER TABLE `document_verification`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `driving_license`
--
ALTER TABLE `driving_license`
  ADD PRIMARY KEY (`dl_id`),
  ADD UNIQUE KEY `dl_no` (`dl_no`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `llr_id` (`llr_id`);

--
-- Indexes for table `emission_test`
--
ALTER TABLE `emission_test`
  ADD PRIMARY KEY (`Test_id`);

--
-- Indexes for table `fir_details`
--
ALTER TABLE `fir_details`
  ADD PRIMARY KEY (`fir_id`),
  ADD KEY `vehicle_number` (`vehicle_number`);

--
-- Indexes for table `llr`
--
ALTER TABLE `llr`
  ADD PRIMARY KEY (`LLR_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `number_plate_detection`
--
ALTER TABLE `number_plate_detection`
  ADD PRIMARY KEY (`detection_id`);

--
-- Indexes for table `police_assignment`
--
ALTER TABLE `police_assignment`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `complaint_id` (`complaint_id`),
  ADD KEY `police_id` (`police_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`),
  ADD UNIQUE KEY `vehicle_number` (`vehicle_number`),
  ADD UNIQUE KEY `rfid_tag` (`rfid_tag`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `vehicle_tax`
--
ALTER TABLE `vehicle_tax`
  ADD PRIMARY KEY (`tax_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `complaint_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dl_renewal`
--
ALTER TABLE `dl_renewal`
  MODIFY `renewal_id` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `document_verification`
--
ALTER TABLE `document_verification`
  MODIFY `document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driving_license`
--
ALTER TABLE `driving_license`
  MODIFY `dl_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `emission_test`
--
ALTER TABLE `emission_test`
  MODIFY `Test_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fir_details`
--
ALTER TABLE `fir_details`
  MODIFY `fir_id` int(9) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `llr`
--
ALTER TABLE `llr`
  MODIFY `LLR_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `number_plate_detection`
--
ALTER TABLE `number_plate_detection`
  MODIFY `detection_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `police_assignment`
--
ALTER TABLE `police_assignment`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicle_tax`
--
ALTER TABLE `vehicle_tax`
  MODIFY `tax_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `complaints_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE;

--
-- Constraints for table `dl_renewal`
--
ALTER TABLE `dl_renewal`
  ADD CONSTRAINT `dl_renewal_ibfk_1` FOREIGN KEY (`dl_no`) REFERENCES `driving_license` (`dl_no`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `document_verification`
--
ALTER TABLE `document_verification`
  ADD CONSTRAINT `document_verification_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE;

--
-- Constraints for table `driving_license`
--
ALTER TABLE `driving_license`
  ADD CONSTRAINT `dl_llr_id_fk` FOREIGN KEY (`llr_id`) REFERENCES `llr` (`LLR_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `dl_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `fir_details`
--
ALTER TABLE `fir_details`
  ADD CONSTRAINT `fir_details_ibfk_1` FOREIGN KEY (`vehicle_number`) REFERENCES `vehicles` (`vehicle_number`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `llr`
--
ALTER TABLE `llr`
  ADD CONSTRAINT `llr_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `police_assignment`
--
ALTER TABLE `police_assignment`
  ADD CONSTRAINT `police_assignment_ibfk_1` FOREIGN KEY (`complaint_id`) REFERENCES `complaints` (`complaint_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `police_assignment_ibfk_2` FOREIGN KEY (`police_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicle_tax`
--
ALTER TABLE `vehicle_tax`
  ADD CONSTRAINT `vehicle_tax_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
