import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Building, LogIn } from "lucide-react";
import AuthModal from "@/components/auth-modal";
import FormCard from "@/components/form-card";

export default function RecruiterLanding() {
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
                className="dark-pink hover:text-pink-800 mr-4 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold dark-blue">CareerConnect</h1>
            </div>
            <div className="text-sm text-gray-600">
              Recruiter Portal
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-[hsl(var(--pastel-pink))] to-[hsl(var(--pastel-purple))] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, Recruiter!</h1>
            <p className="text-xl text-gray-700">Start building exceptional teams today</p>
          </div>

          {/* Auth Options */}
          <div className="grid md:grid-cols-2 gap-8">
            <FormCard
              icon={<Building size={24} />}
              title="Join as Recruiter"
              description="Access our talent pool and powerful recruiting tools"
              buttonText="Start Recruiting"
              buttonVariant="default"
              buttonClassName="w-full bg-gradient-to-r from-[hsl(var(--dark-pink))] to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-200"
              footerText="14-day free trial"
              onClick={handleShowSignUp}
              bgColor="pastel-pink"
            />

            <FormCard
              icon={<LogIn size={24} />}
              title="Welcome Back"
              description="Continue managing your recruitment pipeline"
              buttonText="Sign In"
              buttonVariant="default"
              buttonClassName="w-full bg-gradient-to-r from-[hsl(var(--dark-purple))] to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
              footerLink={{ text: "Forgot password?", href: "#" }}
              onClick={handleShowSignIn}
              bgColor="pastel-purple"
            />
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        userRole="recruiter"
      />
    </div>
  );
}
