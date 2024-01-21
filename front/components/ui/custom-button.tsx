import React from 'react';

interface CustomButtonProps {
  colorClass: string;
  children: React.ReactNode;
  onClick?: () => void; // onClick ハンドラーを追加
  variant?: 'outline'; // 'outline' などの特定のバリアントを受け取る
}

const CustomButton: React.FC<CustomButtonProps> = ({ colorClass, children, onClick, variant }) => {
  const additionalClasses = variant === 'outline' ? 'border border-[#E0DBD2]' : '';
  const roundedClass = 'rounded-md';
  const flexClass = 'flex items-center justify-center'; // Flexboxを適用
  const shadowClass = 'shadow-md'; // 影を追加

  return (
    <button className={`py-2 px-4 ${roundedClass} ${colorClass} ${additionalClasses} ${flexClass} ${shadowClass} transition duration-300 ease-in-out`} onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;