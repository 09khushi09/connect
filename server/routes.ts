import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  jobSeekerRegistrationSchema, 
  recruiterRegistrationSchema, 
  loginSchema 
} from "@shared/schema";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Job seeker registration
  app.post("/api/auth/register/jobseeker", async (req, res) => {
    try {
      const validatedData = jobSeekerRegistrationSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      const { user, jobSeeker } = await storage.registerJobSeeker(validatedData);
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, userType: user.userType }, 
        JWT_SECRET, 
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: "Job seeker registered successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        },
        jobSeeker,
        token
      });
    } catch (error: any) {
      console.error("Job seeker registration error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Recruiter registration
  app.post("/api/auth/register/recruiter", async (req, res) => {
    try {
      const validatedData = recruiterRegistrationSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }

      const { user, recruiter } = await storage.registerRecruiter(validatedData);
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, userType: user.userType }, 
        JWT_SECRET, 
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: "Recruiter registered successfully",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        },
        recruiter,
        token
      });
    } catch (error: any) {
      console.error("Recruiter registration error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const validatedData = loginSchema.parse(req.body);
      
      const user = await storage.validatePassword(validatedData.email, validatedData.password);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, userType: user.userType }, 
        JWT_SECRET, 
        { expiresIn: '7d' }
      );

      // Get additional user data based on type
      let additionalData: any = null;
      if (user.userType === 'jobseeker') {
        additionalData = await storage.getJobSeeker(user.id) || null;
      } else if (user.userType === 'recruiter') {
        additionalData = await storage.getRecruiter(user.id) || null;
      }

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        },
        additionalData,
        token
      });
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get current user
  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      
      const user = await storage.getUser(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Get additional user data based on type
      let additionalData: any = null;
      if (user.userType === 'jobseeker') {
        additionalData = await storage.getJobSeeker(user.id) || null;
      } else if (user.userType === 'recruiter') {
        additionalData = await storage.getRecruiter(user.id) || null;
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userType: user.userType
        },
        additionalData
      });
    } catch (error: any) {
      console.error("Get user error:", error);
      res.status(401).json({ message: "Invalid token" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
