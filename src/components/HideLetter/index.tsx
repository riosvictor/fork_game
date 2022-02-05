import React from 'react';
import classNames from 'classnames';

interface IProps { 
  isDark?: boolean;
}

const HideLetter: React.FC<IProps> = ({isDark, children}) => {
  return (
    <div 
      className={
        classNames(
          "md:text-6xl text-2xl font-medium leading-4 font-sans",
          {
            "text-white": isDark
          },
          {
            "text-slate-700": !isDark
          }
        )}                
    >
      {children}
    </div>
  );
}

export default HideLetter;