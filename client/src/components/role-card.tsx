import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface RoleCardProps {
  role: string;
  title: string;
  description: string;
  icon: ReactNode;
  bgColor: string;
  textColor: string;
  buttonGradient: string;
  buttonText: string;
  features: string[];
  onSelect: (role: string) => void;
}

export default function RoleCard({
  role,
  title,
  description,
  icon,
  bgColor,
  textColor,
  buttonGradient,
  buttonText,
  features,
  onSelect
}: RoleCardProps) {
  return (
    <Card 
      className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[hsl(var(--dark-blue))]"
      onClick={() => onSelect(role)}
    >
      <CardContent className="p-8">
        <div className="text-center">
          <div className={`w-20 h-20 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <div className={textColor}>
              {icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
          <p className="text-gray-600 mb-6">{description}</p>
          <ul className="text-left space-y-3 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <Check size={16} className={`${textColor} mr-3`} />
                {feature}
              </li>
            ))}
          </ul>
          <button className={`w-full bg-gradient-to-r ${buttonGradient} text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105`}>
            {buttonText}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
