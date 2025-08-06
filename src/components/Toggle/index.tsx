import React from 'react';
import classNames from 'classnames';

interface IProps { 
  isActive: boolean
  setValue(value: boolean): void
}

const Toggle: React.FC<IProps> = ({isActive, setValue}) => {
  return (
    <label className="relative inline-block w-[60px] h-[34px] cursor-pointer">
      <input 
        type="checkbox" 
        className="opacity-0 w-0 h-0"
        checked={isActive}
        onChange={() => setValue(!isActive)} 
      />
      <span className={classNames(
        `absolute inset-0 rounded-full transition-all duration-300 ease-in-out
        before:absolute before:content-[''] before:h-[26px] before:w-[26px] before:left-[4px]
        before:bottom-[4px] before:transition-all before:duration-300 before:bg-white before:rounded-full
        before:shadow-md hover:shadow-lg transform hover:scale-105`,
        {
          "before:translate-x-[26px]": isActive
        },
        {
          "bg-gradient-to-r from-purple-500 to-indigo-600 shadow-purple-500/30": isActive
        },
        {
          "bg-gray-300 shadow-gray-300/30": !isActive
        }
      )}
      >
      </span>
    </label>
  );
}

export default Toggle;