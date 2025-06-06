import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, UserPlus, LogIn, GraduationCap, Briefcase } from "lucide-react";
import AuthModal from "@/components/auth-modal";
import FormCard from "@/components/form-card";

export default function JobSeekerLanding() {
  const [, setLocation] = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'signup' | 'signin'>('signup');

  const handleGoBack = () => {
    setLocation("/");
  };

  const handleShowSignUp = () => {
    setModalType('signup');
    setShowModal(true);
  };

  const handleShowSignIn = () => {
    setModalType('signin');
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={handleGoBack}
                className="dark-blue hover:text-blue-800 mr-4 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold dark-blue">CareerConnect</h1>
            </div>
            <div className="text-sm text-gray-600">
              Job Seeker Portal
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-[hsl(var(--pastel-green))] to-[hsl(var(--pastel-blue))] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, Job Seeker!</h1>
            <p className="text-xl text-gray-700">Choose how you'd like to get started on your career journey</p>
          </div>

          {/* Auth Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <FormCard
              icon={<UserPlus size={24} />}
              title="Create Account"
              description="Join thousands of professionals finding their dream jobs"
              buttonText="Get Started - It's Free"
              buttonVariant="default"
              buttonClassName="w-full bg-gradient-to-r from-[hsl(var(--dark-green))] to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200"
              footerText="No credit card required"
              onClick={handleShowSignUp}
              bgColor="pastel-green"
            />

            <FormCard
              icon={<LogIn size={24} />}
              title="Welcome Back"
              description="Sign in to continue your job search journey"
              buttonText="Sign In"
              buttonVariant="default"
              buttonClassName="w-full bg-gradient-to-r from-[hsl(var(--dark-blue))] to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
              footerLink={{ text: "Forgot password?", href: "#" }}
              onClick={handleShowSignIn}
              bgColor="pastel-blue"
            />
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        userRole="jobseeker"
      />
    </div>
  );
}
