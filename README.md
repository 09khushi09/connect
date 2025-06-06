# CareerConnect - Job Matching Platform

A modern, full-stack job matching platform built with React, Express.js, and PostgreSQL. CareerConnect connects job seekers with top employers through AI-powered matching and streamlined authentication.

## Features

### 🎯 Core Functionality
- **Dual User System**: Separate authentication flows for job seekers and recruiters
- **Smart Job Seeker Types**: Differentiated experience for students vs professionals
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Professional UI**: LinkedIn-inspired design with pastel color scheme
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### 👨‍🎓 Job Seekers
- **Student Profile**: University, degree, graduation year, field of study
- **Professional Profile**: Current job title, company, experience level, industry
- **Skills Management**: Comma-separated skills tracking
- **Secure Registration**: Email validation and password requirements

### 🏢 Recruiters
- **Company Profiles**: Company name, size, and recruiter job title
- **Talent Access**: View and connect with job seekers
- **Streamlined Signup**: Quick onboarding process
- **Professional Dashboard**: Ready for job posting features

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for client-side routing
- **Tailwind CSS** for styling with custom pastel theme
- **Shadcn/ui** for consistent UI components
- **React Hook Form** with Zod validation
- **TanStack Query** for server state management
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Neon serverless
- **Drizzle ORM** for database operations
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Zod** for request validation

### Development
- **Vite** for fast development and building
- **ESBuild** for compilation
- **Drizzle Kit** for database migrations

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database (or use the provided Neon setup)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd careerconnect
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
# Database connection (already configured in Replit)
DATABASE_URL=postgresql://...
PGHOST=...
PGUSER=...
PGPASSWORD=...
PGDATABASE=...
PGPORT=...

# JWT Secret (optional, defaults to development key)
JWT_SECRET=your-super-secure-jwt-secret
```

4. **Initialize the database**
```bash
npm run db:push
```

5. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register/jobseeker` - Register a new job seeker
- `POST /api/auth/register/recruiter` - Register a new recruiter
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### Request Examples

**Job Seeker Registration (Student)**
```json
{
  "email": "student@university.edu",
  "password": "securepassword123",
  "firstName": "John",
  "lastName": "Doe",
  "seekerType": "student",
  "university": "Harvard University",
  "degree": "bachelors",
  "graduationYear": "2025",
  "fieldOfStudy": "Computer Science",
  "skills": "JavaScript, React, Node.js"
}
```

**Job Seeker Registration (Professional)**
```json
{
  "email": "professional@company.com",
  "password": "securepassword123",
  "firstName": "Jane",
  "lastName": "Smith",
  "seekerType": "professional",
  "jobTitle": "Software Engineer",
  "company": "Google",
  "experience": "2-5",
  "industry": "technology",
  "skills": "Python, AWS, Docker"
}
```

**Recruiter Registration**
```json
{
  "email": "recruiter@company.com",
  "password": "securepassword123",
  "firstName": "Sarah",
  "lastName": "Wilson",
  "companyName": "Tech Innovations Inc",
  "companySize": "100-500",
  "jobTitle": "Senior Recruiter"
}
```

## Database Schema

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `password` (Hashed)
- `firstName`
- `lastName`
- `userType` (jobseeker/recruiter)
- `createdAt`

### Job Seekers Table
- `id` (Primary Key)
- `userId` (Foreign Key)
- `seekerType` (student/professional)
- `university`, `degree`, `graduationYear`, `fieldOfStudy` (Student fields)
- `jobTitle`, `company`, `experience`, `industry` (Professional fields)
- `skills`

### Recruiters Table
- `id` (Primary Key)
- `userId` (Foreign Key)
- `companyName`
- `companySize`
- `jobTitle`

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utilities and configurations
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Data access layer
│   ├── routes.ts          # API routes
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Drizzle schemas and Zod validation
└── components.json        # Shadcn/ui configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: 7-day expiration with secure signing
- **Input Validation**: Zod schemas for all API requests
- **SQL Injection Protection**: Drizzle ORM with parameterized queries
- **CORS Configuration**: Secure cross-origin requests

## Deployment

The application is ready for deployment on Replit or any Node.js hosting platform.

### Replit Deployment
1. Ensure all environment variables are set
2. The application will automatically deploy with the configured workflow

### Manual Deployment
1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Run: `npm start`

## Future Enhancements

This authentication system provides the foundation for:
- Job posting and application management
- Advanced search and filtering
- Real-time messaging between recruiters and job seekers
- AI-powered job matching algorithms
- Resume parsing and skill extraction
- Interview scheduling system
- Analytics dashboard for recruiters

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team or create an issue in the repository.