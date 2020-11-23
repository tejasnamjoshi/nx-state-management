import React from 'react';

export interface IInput {
  inputText: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: IInput) => {
  const { placeholder } = props;

  return (
    <div className="Input">
      <div className="input-group flex-nowrap">
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          aria-label={placeholder}
          value={props.inputText}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

export default Input;
