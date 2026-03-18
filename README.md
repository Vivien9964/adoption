# Pet shelter website

A full-stack web application that helps connect dogs in shelters with potential adopters. The platform allows users to browse available dogs, schedule meetings, make donations to urgent cases and shelter projects, and apply for volunteer positions.

## What this project does

This is a pet shelter website where people can:
- Browse through dogs available for adoption with detailed profiles
- Filter dogs by age, size, gender, and breed
- Schedule meetings to meet dogs in person
- Make one-time or monthly donations to help dogs in urgent need
- Support shelter projects through donations
- Apply for volunteer opportunities at the shelter
- Learn about the shelter's mission

## Tech Stack

**Frontend:**
- React 19
- React Router - handles navigation between pages
- Vite
- Tailwind CSS
- Lucide React - icon library
- Swiper - carousel/slider component
- React DatePicker - date selection for meeting scheduling
- React CountUp - number counters for stats

**Backend:**
- Node.js with Express - server and API
- MySQL - database for storing dogs, meetings, donations, and applications
- Helmet - security middleware
- CORS
- Express Rate Limit
- UUID

## Project Structure

```
PetAdoption-FullStack/
├── backend/
│   ├── server.js          # Main server file with API endpoints
│   ├── db.js              # Database connection setup
│   ├── schema.sql         # Database schema (table definitions)
│   ├── populateDB.js      # Script to populate database with initial data
│   └── package.json       # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/    # UI components
    │   │   ├── about/     # About page components
    │   │   ├── common/    # Shared components (buttons, cards, etc.)
    │   │   ├── home/      # Homepage sections
    │   │   ├── layout/    # Navigation, footer, filters
    │   │   ├── pets/      # Dog card components
    │   │   ├── scheduleMeeting/  # Meeting booking flow
    │   │   └── virtualAdoption/  # Donation and volunteer components
    │   ├── context/       # React Context for state management
    │   ├── data/          # Static data files
    │   ├── hooks/         # Custom React hooks
    │   ├── pages/         # Main page components
    │   ├── services/      # API call functions
    │   ├── utils/         # Helper functions
    │   └── App.jsx        # Main app component with routes
    └── package.json       # Frontend dependencies
```

## Getting Started

### Prerequisites

Make sure you have these installed on your computer:
- Node.js (version 14 or higher)
- MySQL (version 8 or higher)
- npm (comes with Node.js)

### Database Setup

1. Open MySQL and create a new database:
```sql
CREATE DATABASE pet_adoption;
```

2. Import the database schema to create all tables:
```bash
mysql -u your_mysql_username -p pet_adoption < backend/schema.sql
```

Or if you prefer using MySQL Workbench or another GUI tool, open and run the `backend/schema.sql` file.

3. Create a `.env` file in the `backend` folder with your database credentials:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=pet_adoption
DB_PORT=3306
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### Installation

1. Clone this repository to your computer:
```bash
git clone https://github.com/Vivien9964/adoption.git
cd adoption
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Make sure your MySQL server is running.

5. Populate the database with sample data:
```bash
cd backend
node populateDB.js
```

This will add dogs, urgent cases, and shelter projects to the database.

6. Start the backend server:
```bash
node server.js
```

The server will run on `http://localhost:3000`

7. In a new terminal, start the frontend development server:
```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

8. Open your browser and go to `http://localhost:5173`

## Features Breakdown

### Dog Browsing and Adoption
- View all available dogs with photos and basic info
- Filter dogs by multiple criteria (age, size, gender, breed)
- Click on any dog to see their full profile with personality traits, ideal home environment, and adoption story
- Schedule a meeting directly from the dog's profile

### Meeting Scheduling
- Multi-step form to book a meeting with a dog
- Select your preferred date and time
- Check availability in real-time (prevents double-booking)
- Provide contact information and additional notes
- Get a confirmation with meeting details

### Virtual Adoption (Donations)
- View dogs with urgent medical needs
- See shelter improvement projects
- Make one-time or monthly donations
- Choose donation amounts with quick-select buttons
- Track donation progress with visual progress bars
- View donation statistics and impact

### Volunteer Program
- Browse available volunteer opportunities
- Apply for one-time events or ongoing positions
- Specify your availability
- Share your motivation and experience
- System prevents duplicate applications

### About Page
- Learn about the shelter's mission
- See annual impact statistics
- Read success stories from adopters
- View upcoming events
- Contact information and get involved section

## API Endpoints

### Dogs
- `GET /api/dogs` - Get all dogs
- `GET /api/dogs/:uuid` - Get a specific dog by UUID

### Meetings
- `GET /api/meetings/availability/:dogUuid` - Get booked time slots for a dog
- `POST /api/meetings` - Create a new meeting (rate limited)

### Donations
- `GET /api/urgent-cases` - Get all active urgent cases
- `GET /api/shelter-projects` - Get all active shelter projects
- `GET /api/donations/stats` - Get donation statistics
- `POST /api/donations` - Submit a donation (rate limited)

### Volunteers
- `POST /api/volunteers` - Submit volunteer application (rate limited)

## Security Features

The backend includes several security measures:
- **Helmet** - sets security-related HTTP headers
- **Rate limiting** - prevents API abuse by limiting requests per IP
- **CORS** - restricts API access to the frontend URL only
- **Input validation** - validates all user input on both frontend and backend
- **SQL injection prevention** - uses parameterized queries
- **Data sanitization** - trims whitespace and normalizes data before storing

## Database Schema

The application uses 6 main tables:

- **dogs** - stores all dog information including name, breed, age, personality traits, images, ideal home requirements, and health status
- **meetings** - stores scheduled meetings between potential adopters and dogs with date, time, and user contact info
- **urgent_cases** - dogs with urgent medical needs requiring donations, tracks donation progress
- **shelter_projects** - shelter improvement projects accepting donations with goals and current amounts
- **volunteers** - volunteer applications with availability, motivation, and experience
- **donations** - records all donations made through the platform with donor information


## Future Improvements

- Add user authentication and login system
- Create an admin dashboard to manage dogs and applications
- Implement email notifications for meeting confirmations
- Add payment processing integration (Stripe/PayPal)
- Add image upload functionality for user profiles
- Implement a messaging system between adopters and shelter staff


