import { useLocation } from "wouter";
import RoleCard from "@/components/role-card";
import { UserRoundCheck, Building, Bot, Shield, Users } from "lucide-react";

export default function IntroPage() {
  const [, setLocation] = useLocation();

  const handleRoleSelect = (role: string) => {
    setLocation(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold dark-blue">CareerConnect</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-[hsl(var(--dark-blue))] transition-colors duration-200">
                <i className="fas fa-question-circle"></i> Help
              </button>
              <button className="bg-dark-blue text-white px-4 py-2 rounded-lg hover:bg-dark-blue-hover transition-colors duration-200">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[hsl(var(--pastel-blue))] to-[hsl(var(--pastel-purple))] min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect Your <span className="dark-blue">Career</span> Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Whether you're seeking opportunities or looking for talent, we connect the right people at the right time.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <RoleCard
              role="jobseeker"
              title="I'm a Job Seeker"
              description="Find your dream job, showcase your skills, and connect with top employers in your field."
              icon={<UserRoundCheck size={32} />}
              bgColor="pastel-green"
              textColor="dark-green"
              buttonGradient="from-[hsl(var(--dark-green))] to-green-600 hover:from-green-700 hover:to-green-800"
              buttonText="Start Job Search"
              features={[
                "Create professional profile",
                "Get personalized job recommendations",
                "Connect with industry professionals",
                "Track application progress"
              ]}
              onSelect={handleRoleSelect}
            />

            <RoleCard
              role="recruiter"
              title="I'm a Recruiter"
              description="Find top talent, streamline your hiring process, and build exceptional teams."
              icon={<Building size={32} />}
              bgColor="pastel-pink"
              textColor="dark-pink"
              buttonGradient="from-[hsl(var(--dark-pink))] to-pink-600 hover:from-pink-700 hover:to-pink-800"
              buttonText="Start Recruiting"
              features={[
                "Post job opportunities",
                "Access talent pool",
                "Advanced candidate filtering",
                "Streamlined interview process"
              ]}
              onSelect={handleRoleSelect}
            />
          </div>

          {/* Features Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose CareerConnect?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 pastel-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot size={24} className="dark-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
                <p className="text-gray-600">Smart algorithms connect the right candidates with the right opportunities.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 pastel-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield size={24} className="dark-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
                <p className="text-gray-600">Your data is protected with enterprise-grade security measures.</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 pastel-purple rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="dark-purple" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Network</h3>
                <p className="text-gray-600">Connect with professionals and opportunities worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
