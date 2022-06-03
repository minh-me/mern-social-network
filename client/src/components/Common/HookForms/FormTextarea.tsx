import React from 'react';
import { TextareaAutosize } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type FormProps = {
  control: Control<any, any>;
  name: string;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  placeholder?: string;
  required?: boolean;
  onSubmit?: () => void;
};

export const FormTextarea = (props: FormProps) => {
  const { disabled = false, autoFocus = true, required = false } = props;

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (!(event.key === 'Enter' && event.shiftKey) && event.key === 'Enter' && props.onSubmit) {
      props.onSubmit();
      return;
    }
  };

  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <TextareaAutosize
          placeholder={props.placeholder}
          autoFocus={autoFocus}
          {...field}
          onKeyDown={handleKeyDown}
          required={required}
          style={{
            flex: 1,
            outline: 'none',
            backgroundColor: 'transparent',
            border: '0',
            color: '#c4c2c5',
            padding: '8px 12px',
            ...props.style,
          }}
          disabled={disabled}
        />
      )}
    />
  );
};
