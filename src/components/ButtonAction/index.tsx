import React from 'react';

interface IProps {
  labelButton: string;
  onClick: () => void;
  disabled?: boolean;
}

const ButtonAction: React.FC<IProps> = ({labelButton, onClick, disabled}) => {
  return (
    <button 
      className="px-4 py-2 font-semibold text-2xl rounded-full bg-indigo-500
                text-white shadow-sm ring-1 ring-slate-900/5
                border-2 border-solid disabled:opacity-50 hover:opacity-90"
      onClick={onClick}
      disabled={disabled}
    >
      {labelButton}
    </button>
  );
}

export default ButtonAction;