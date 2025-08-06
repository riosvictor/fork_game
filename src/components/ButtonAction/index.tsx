import React from 'react';

interface IProps {
  labelButton: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonAction: React.FC<IProps> = ({labelButton, onClick, disabled}) => {
  return (
    <button 
      className="px-6 md:px-8 py-3 md:py-4 font-bold text-lg md:text-xl rounded-2xl 
                bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700
                text-white shadow-xl ring-1 ring-slate-900/10
                transform transition-all duration-200 hover:scale-105 hover:shadow-2xl
                active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
      onClick={onClick}
      disabled={disabled}
    >
      {labelButton}
    </button>
  );
}

export default ButtonAction;