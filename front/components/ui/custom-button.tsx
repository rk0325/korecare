import React from 'react';

interface CustomButtonProps {
  colorClass: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'outline';
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ colorClass, children, onClick, variant, disabled = false }) => {
  const additionalClasses = variant === 'outline' ? 'border border-[#E0DBD2]' : '';
  const roundedClass = 'rounded-lg';
  const flexClass = 'flex items-center justify-center'; // Flexboxを適用
  const shadowClass = 'shadow-lg'; // 影を追加

  return (
    <button className={`py-2 px-4 ${roundedClass} ${colorClass} ${additionalClasses} ${flexClass} ${shadowClass} transition duration-300 ease-in-out`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default CustomButton;