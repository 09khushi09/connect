import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  userType: text("user_type").notNull(), // 'jobseeker' or 'recruiter'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jobSeekers = pgTable("job_seekers", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  seekerType: text("seeker_type").notNull(), // 'student' or 'professional'
  
  // Student fields
  university: text("university"),
  degree: text("degree"),
  graduationYear: text("graduation_year"),
  fieldOfStudy: text("field_of_study"),
  
  // Professional fields
  jobTitle: text("job_title"),
  company: text("company"),
  experience: text("experience"),
  industry: text("industry"),
  
  // Common fields
  skills: text("skills"), // comma-separated string
});

export const recruiters = pgTable("recruiters", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  companyName: text("company_name").notNull(),
  companySize: text("company_size"),
  jobTitle: text("job_title"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertJobSeekerSchema = createInsertSchema(jobSeekers).omit({
  id: true,
});

export const insertRecruiterSchema = createInsertSchema(recruiters).omit({
  id: true,
});

// Combined registration schemas
export const jobSeekerRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  seekerType: z.enum(['student', 'professional']),
  university: z.string().optional(),
  degree: z.string().optional(),
  graduationYear: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  jobTitle: z.string().optional(),
  company: z.string().optional(),
  experience: z.string().optional(),
  industry: z.string().optional(),
  skills: z.string().optional(),
});

export const recruiterRegistrationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  companyName: z.string().min(1),
  companySize: z.string().optional(),
  jobTitle: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Types
export type User = typeof users.$inferSelect;
export type JobSeeker = typeof jobSeekers.$inferSelect;
export type Recruiter = typeof recruiters.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertJobSeeker = z.infer<typeof insertJobSeekerSchema>;
export type InsertRecruiter = z.infer<typeof insertRecruiterSchema>;
export type JobSeekerRegistration = z.infer<typeof jobSeekerRegistrationSchema>;
export type RecruiterRegistration = z.infer<typeof recruiterRegistrationSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;
