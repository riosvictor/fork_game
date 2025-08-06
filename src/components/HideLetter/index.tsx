import React from 'react';
import classNames from 'classnames';

interface IProps { 
  isDark: boolean;
}

const HideLetter: React.FC<IProps> = ({isDark, children}) => {
  return (
    <div 
      className={
        classNames(
          "relative min-w-[30px] sm:min-w-[40px] md:min-w-[60px] h-[40px] sm:h-[50px] md:h-[80px] flex items-center justify-center text-lg sm:text-2xl md:text-5xl font-bold font-mono border-b-4 transition-all duration-300 transform hover:scale-105",
          {
            "text-purple-300 border-purple-400": isDark && children !== '_',
            "text-gray-400 border-gray-600": isDark && children === '_',
            "text-indigo-700 border-indigo-500": !isDark && children !== '_',
            "text-gray-400 border-gray-300": !isDark && children === '_',
          }
        )}                
    >
      {children === '_' ? '' : children}
      {children === '_' && (
        <div className={classNames(
          "absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1 rounded-full",
          {
            "bg-gray-600": isDark,
            "bg-gray-300": !isDark
          }
        )} />
      )}
    </div>
  );
}

export default HideLetter;