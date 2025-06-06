import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FormCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: 'default' | 'outline';
  buttonClassName?: string;
  footerText?: string;
  footerLink?: { text: string; href: string };
  onClick: () => void;
  bgColor: string;
}

export default function FormCard({
  icon,
  title,
  description,
  buttonText,
  buttonVariant = 'default',
  buttonClassName,
  footerText,
  footerLink,
  onClick,
  bgColor
}: FormCardProps) {
  return (
    <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <button 
          onClick={onClick}
          className={buttonClassName || `w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 mb-4`}
        >
          {buttonText}
        </button>
        <div className="text-center">
          {footerText && (
            <p className="text-sm text-gray-500">{footerText}</p>
          )}
          {footerLink && (
            <a href={footerLink.href} className="text-sm text-[hsl(var(--dark-blue))] hover:text-blue-800">
              {footerLink.text}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
