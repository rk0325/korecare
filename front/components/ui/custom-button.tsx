import React from 'react';

interface CustomButtonProps {
  colorClass: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'outline';
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ colorClass, children, onClick, variant, disabled = false }) => {
  const additionalClasses = variant === 'outline' ? 'border border-[#E0DBD2]' : '';
  const roundedClass = 'rounded-lg';
  const flexClass = 'flex items-center justify-center';
  const shadowClass = 'shadow-lg';
  const hoverActiveClass = 'active:scale-95 transition duration-300 ease-in-out';

  return (
    <button className={`py-2 px-4 ${roundedClass} ${colorClass} ${additionalClasses} ${flexClass} ${shadowClass} ${hoverActiveClass}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default CustomButton;