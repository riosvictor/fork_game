import React from 'react';
import classNames from 'classnames';

interface IProps { 
  isActive: boolean
  setValue(value: boolean): void
}

const Toggle: React.FC<IProps> = ({isActive, setValue}) => {
  return (
    <label className="m-2 relative inline-block w-[60px] h-[34px]">
      <input 
        type="checkbox" 
        className="opacity-0 w-0 h-0 
                    "
        checked={isActive}
        onChange={() => setValue(!isActive)} 
      />
      <span className={classNames(
        `absolute cursor-pointer inset-0 duration-[.4s] rounded-[34px]
        before:absolute before:content-[''] before:h-[26px] before:w-[26px] before:left-[4px]
        before:bottom-[4px] before:duration-[.4s] before:bg-white before:rounded-[50%]
        hover:shadow-lg`,
        {
          "before:translate-x-[26px]": isActive
        },
        {
          "bg-indigo-500 hover:shadow-indigo-500/50": isActive
        },
        {
          "bg-slate-400 hover:shadow-slate-400/50": !isActive
        }
      )}
      >
      </span>
    </label>
  );
}

export default Toggle;