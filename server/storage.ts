import { 
  users, 
  jobSeekers, 
  recruiters,
  type User, 
  type JobSeeker,
  type Recruiter,
  type InsertUser,
  type InsertJobSeeker,
  type InsertRecruiter,
  type JobSeekerRegistration,
  type RecruiterRegistration
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Job seeker management
  getJobSeeker(userId: number): Promise<JobSeeker | undefined>;
  createJobSeeker(jobSeeker: InsertJobSeeker): Promise<JobSeeker>;
  
  // Recruiter management
  getRecruiter(userId: number): Promise<Recruiter | undefined>;
  createRecruiter(recruiter: InsertRecruiter): Promise<Recruiter>;
  
  // Registration
  registerJobSeeker(data: JobSeekerRegistration): Promise<{ user: User; jobSeeker: JobSeeker }>;
  registerRecruiter(data: RecruiterRegistration): Promise<{ user: User; recruiter: Recruiter }>;
  
  // Authentication
  validatePassword(email: string, password: string): Promise<User | null>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, password: hashedPassword })
      .returning();
    return user;
  }

  async getJobSeeker(userId: number): Promise<JobSeeker | undefined> {
    const [jobSeeker] = await db.select().from(jobSeekers).where(eq(jobSeekers.userId, userId));
    return jobSeeker || undefined;
  }

  async createJobSeeker(insertJobSeeker: InsertJobSeeker): Promise<JobSeeker> {
    const [jobSeeker] = await db
      .insert(jobSeekers)
      .values([insertJobSeeker])
      .returning();
    return jobSeeker;
  }

  async getRecruiter(userId: number): Promise<Recruiter | undefined> {
    const [recruiter] = await db.select().from(recruiters).where(eq(recruiters.userId, userId));
    return recruiter || undefined;
  }

  async createRecruiter(insertRecruiter: InsertRecruiter): Promise<Recruiter> {
    const [recruiter] = await db
      .insert(recruiters)
      .values([insertRecruiter])
      .returning();
    return recruiter;
  }

  async registerJobSeeker(data: JobSeekerRegistration): Promise<{ user: User; jobSeeker: JobSeeker }> {
    const user = await this.createUser({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      userType: 'jobseeker'
    });

    const jobSeekerData: InsertJobSeeker = {
      userId: user.id,
      seekerType: data.seekerType,
      university: data.university,
      degree: data.degree,
      graduationYear: data.graduationYear,
      fieldOfStudy: data.fieldOfStudy,
      jobTitle: data.jobTitle,
      company: data.company,
      experience: data.experience,
      industry: data.industry,
      skills: data.skills
    };

    const jobSeeker = await this.createJobSeeker(jobSeekerData);

    return { user, jobSeeker };
  }

  async registerRecruiter(data: RecruiterRegistration): Promise<{ user: User; recruiter: Recruiter }> {
    const user = await this.createUser({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      userType: 'recruiter'
    });

    const recruiterData: InsertRecruiter = {
      userId: user.id,
      companyName: data.companyName,
      companySize: data.companySize,
      jobTitle: data.jobTitle
    };

    const recruiter = await this.createRecruiter(recruiterData);

    return { user, recruiter };
  }

  async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}

export const storage = new DatabaseStorage();
