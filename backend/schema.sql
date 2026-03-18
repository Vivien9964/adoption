-- Pet adoption database schema

-- Run this file to create all tables

-- Create dogs table
CREATE TABLE IF NOT EXISTS dogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    age INT,
    ageInMonths INT,
    gender ENUM('Male', 'Female'),
    size ENUM('Small', 'Medium', 'Large'),
    weight DECIMAL(5,2),
    location VARCHAR(100),
    status ENUM('Available', 'Pending', 'Adopted') DEFAULT 'Available',
    featured BOOLEAN DEFAULT FALSE,
    dateAdded DATE,
    description TEXT,
    mainImage VARCHAR(500),
    personality JSON,
    story TEXT,
    idealHome JSON,
    goodWith JSON,
    whyAdopt JSON,
    energyLevel VARCHAR(50),
    trainingLevel VARCHAR(100),
    healthStatus TEXT,
    lastVetCheck DATE,
    groomingNeeds VARCHAR(50),
    houseTrained VARCHAR(20),
    images JSON,
    specialNeeds TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dogId INT NOT NULL,
    dogName VARCHAR(100) NOT NULL,
    dogBreed VARCHAR(100),
    dogImage VARCHAR(500),
    dogLocation VARCHAR(100),
    meetingDate DATE NOT NULL,
    meetingTime INT NOT NULL,
    userName VARCHAR(200) NOT NULL,
    userEmail VARCHAR(254) NOT NULL,
    userPhone VARCHAR(20) NOT NULL,
    notes TEXT,
    status ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (dogId) REFERENCES dogs(id) ON DELETE CASCADE
);

-- Create urgent_cases table
CREATE TABLE IF NOT EXISTS urgent_cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    age INT,
    location VARCHAR(100),
    urgencyLevel ENUM('Low', 'Medium', 'High', 'Critical') NOT NULL,
    conditionName VARCHAR(200) NOT NULL,
    daysInShelter INT DEFAULT 0,
    image VARCHAR(500),
    description TEXT,
    donationsReceived DECIMAL(10,2) DEFAULT 0,
    donationsGoal DECIMAL(10,2) NOT NULL,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create shelter_projects table
CREATE TABLE IF NOT EXISTS shelter_projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(36) UNIQUE NOT NULL DEFAULT (UUID()),
    title VARCHAR(200) NOT NULL,
    category VARCHAR(100),
    location VARCHAR(100),
    description TEXT,
    urgency ENUM('Low', 'Medium', 'High', 'Critical'),
    goalAmount DECIMAL(10,2) NOT NULL,
    currentAmount DECIMAL(10,2) DEFAULT 0,
    donorsCount INT DEFAULT 0,
    startDate DATE,
    estimatedCompletion DATE,
    image VARCHAR(500),
    benefits JSON,
    status VARCHAR(50),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create volunteers table
CREATE TABLE IF NOT EXISTS volunteers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    opportunityId VARCHAR(50) NOT NULL,
    opportunityTitle VARCHAR(200) NOT NULL,
    isOneTimeEvent BOOLEAN DEFAULT FALSE,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(254) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    availability JSON,
    motivation TEXT,
    experience TEXT,
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    targetName VARCHAR(500) NOT NULL,
    targetType ENUM('urgent_case', 'shelter_project', 'general') DEFAULT 'general',
    targetUuid VARCHAR(36),
    amount DECIMAL(10,2) NOT NULL,
    isMonthly BOOLEAN DEFAULT FALSE,
    donorName VARCHAR(200) NOT NULL,
    donorEmail VARCHAR(254) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX idx_dogs_status ON dogs(status);
CREATE INDEX idx_dogs_featured ON dogs(featured);
CREATE INDEX idx_dogs_uuid ON dogs(uuid);
CREATE INDEX idx_meetings_dog ON meetings(dogId, meetingDate, meetingTime);
CREATE INDEX idx_urgent_cases_active ON urgent_cases(isActive);
CREATE INDEX idx_shelter_projects_active ON shelter_projects(isActive);
CREATE INDEX idx_volunteers_email ON volunteers(email, opportunityId);
CREATE INDEX idx_donations_target ON donations(targetType, targetUuid);

