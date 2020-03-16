import React from 'react';

export type InputProperties = {
  type: string;
  name: string;
  placeholder: string;
  ref: React.Ref<HTMLInputElement>;
  onChange: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
  onKeyPress: ( event: React.KeyboardEvent ) => void;
};

interface InputForm {
  input: InputProperties;
}

const Input = (props: InputForm) => {
  
  return (
      <input
          type={props.input.type}
          name={props.input.name}
          ref={props.input.ref}
          placeholder={props.input.placeholder}
          onChange={props.input.onChange}
          onKeyPress={props.input.onKeyPress}
      />
  )
};

export default Input;