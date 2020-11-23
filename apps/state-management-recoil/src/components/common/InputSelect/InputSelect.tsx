import React from 'react';

interface IOption {
  label: string;
  value: string;
}

export interface IInputSelect {
  options: IOption[];
  onSelect: (value: string) => void;
}

const InputSelect = (props: IInputSelect) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.onSelect(event.target.value);
  };

  return (
    <div className="InputSelect">
      <select className="form-control" onChange={handleSelect}>
        {props.options.map((option: IOption, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
