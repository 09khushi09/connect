import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { X, GraduationCap, Briefcase } from "lucide-react";
import { 
  jobSeekerRegistrationSchema, 
  recruiterRegistrationSchema, 
  loginSchema,
  type JobSeekerRegistration,
  type RecruiterRegistration,
  type LoginCredentials 
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'signup' | 'signin';
  userRole: 'jobseeker' | 'recruiter';
}

export default function AuthModal({ isOpen, onClose, type, userRole }: AuthModalProps) {
  const [selectedUserType, setSelectedUserType] = useState<'student' | 'professional' | null>(null);
  const { toast } = useToast();

  // Job Seeker Registration Form
  const jobSeekerForm = useForm<JobSeekerRegistration>({
    resolver: zodResolver(jobSeekerRegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      seekerType: "student",
      skills: "",
    },
  });

  // Recruiter Registration Form
  const recruiterForm = useForm<RecruiterRegistration>({
    resolver: zodResolver(recruiterRegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      companyName: "",
    },
  });

  // Login Form
  const loginForm = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Mutations
  const jobSeekerRegisterMutation = useMutation({
    mutationFn: async (data: JobSeekerRegistration) => {
      const response = await apiRequest("POST", "/api/auth/register/jobseeker", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Account Created!",
        description: "Welcome to CareerConnect. Your job seeker account has been created successfully.",
      });
      localStorage.setItem("token", data.token);
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    },
  });

  const recruiterRegisterMutation = useMutation({
    mutationFn: async (data: RecruiterRegistration) => {
      const response = await apiRequest("POST", "/api/auth/register/recruiter", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Account Created!",
        description: "Welcome to CareerConnect. Your recruiter account has been created successfully.",
      });
      localStorage.setItem("token", data.token);
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        variant: "destructive",
      });
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginCredentials) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome Back!",
        description: "You have been successfully signed in.",
      });
      localStorage.setItem("token", data.token);
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
    },
  });

  const handleUserTypeSelect = (userType: 'student' | 'professional') => {
    setSelectedUserType(userType);
    jobSeekerForm.setValue('seekerType', userType);
  };

  const onJobSeekerSubmit = (data: JobSeekerRegistration) => {
    jobSeekerRegisterMutation.mutate(data);
  };

  const onRecruiterSubmit = (data: RecruiterRegistration) => {
    recruiterRegisterMutation.mutate(data);
  };

  const onLoginSubmit = (data: LoginCredentials) => {
    loginMutation.mutate(data);
  };

  const getModalTitle = () => {
    if (type === 'signin') return 'Sign In';
    if (userRole === 'jobseeker') return 'Create Job Seeker Account';
    return 'Create Recruiter Account';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
        </DialogHeader>
        <div className="sr-only" id="dialog-description">
          {type === 'signin' ? 'Sign in to your account' : `Create a new ${userRole} account`}
        </div>

        {/* Job Seeker Sign Up Form */}
        {type === 'signup' && userRole === 'jobseeker' && (
          <Form {...jobSeekerForm}>
            <form onSubmit={jobSeekerForm.handleSubmit(onJobSeekerSubmit)} className="space-y-6">
              {/* User Type Selection */}
              <div>
                <FormLabel className="text-sm font-medium text-gray-700 mb-3 block">I am a:</FormLabel>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleUserTypeSelect('student')}
                    className={`border-2 rounded-lg p-3 text-center transition-all duration-200 ${
                      selectedUserType === 'student'
                        ? 'border-[hsl(var(--dark-green))] pastel-green'
                        : 'border-gray-200 hover:border-[hsl(var(--dark-green))] hover:pastel-green'
                    }`}
                  >
                    <GraduationCap className="text-[hsl(var(--dark-green))] mb-2 mx-auto" size={20} />
                    <span className="text-sm font-medium">Student</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUserTypeSelect('professional')}
                    className={`border-2 rounded-lg p-3 text-center transition-all duration-200 ${
                      selectedUserType === 'professional'
                        ? 'border-[hsl(var(--dark-blue))] pastel-blue'
                        : 'border-gray-200 hover:border-[hsl(var(--dark-blue))] hover:pastel-blue'
                    }`}
                  >
                    <Briefcase className="text-[hsl(var(--dark-blue))] mb-2 mx-auto" size={20} />
                    <span className="text-sm font-medium">Professional</span>
                  </button>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={jobSeekerForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={jobSeekerForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={jobSeekerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={jobSeekerForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Dynamic Fields Based on User Type */}
              {selectedUserType === 'student' && (
                <div className="space-y-4">
                  <FormField
                    control={jobSeekerForm.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University/School</FormLabel>
                        <FormControl>
                          <Input placeholder="Harvard University" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={jobSeekerForm.control}
                      name="degree"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select degree" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bachelors">Bachelor's</SelectItem>
                              <SelectItem value="masters">Master's</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={jobSeekerForm.control}
                      name="graduationYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Graduation Year</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2025">2025</SelectItem>
                              <SelectItem value="2026">2026</SelectItem>
                              <SelectItem value="2027">2027</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={jobSeekerForm.control}
                    name="fieldOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input placeholder="Computer Science" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {selectedUserType === 'professional' && (
                <div className="space-y-4">
                  <FormField
                    control={jobSeekerForm.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Job Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Software Engineer" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={jobSeekerForm.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Google" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={jobSeekerForm.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Years of Experience</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0-1">0-1 years</SelectItem>
                            <SelectItem value="2-5">2-5 years</SelectItem>
                            <SelectItem value="6-10">6-10 years</SelectItem>
                            <SelectItem value="10+">10+ years</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={jobSeekerForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Skills Section */}
              <FormField
                control={jobSeekerForm.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="JavaScript, React, Node.js (separate with commas)" {...field} />
                    </FormControl>
                    <p className="text-xs text-gray-500">Add your key skills separated by commas</p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[hsl(var(--dark-green))] to-green-600 hover:from-green-700 hover:to-green-800"
                disabled={jobSeekerRegisterMutation.isPending}
              >
                {jobSeekerRegisterMutation.isPending ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </Form>
        )}

        {/* Recruiter Sign Up Form */}
        {type === 'signup' && userRole === 'recruiter' && (
          <Form {...recruiterForm}>
            <form onSubmit={recruiterForm.handleSubmit(onRecruiterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={recruiterForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={recruiterForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={recruiterForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={recruiterForm.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Acme Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={recruiterForm.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">201-1000 employees</SelectItem>
                        <SelectItem value="1000+">1000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={recruiterForm.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="HR Manager" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={recruiterForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[hsl(var(--dark-pink))] to-pink-600 hover:from-pink-700 hover:to-pink-800"
                disabled={recruiterRegisterMutation.isPending}
              >
                {recruiterRegisterMutation.isPending ? "Creating Account..." : "Create Recruiter Account"}
              </Button>
            </form>
          </Form>
        )}

        {/* Sign In Form */}
        {type === 'signin' && (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[hsl(var(--dark-blue))] hover:text-blue-800">
                  Forgot password?
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[hsl(var(--dark-blue))] to-blue-600 hover:from-blue-700 hover:to-blue-800"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
