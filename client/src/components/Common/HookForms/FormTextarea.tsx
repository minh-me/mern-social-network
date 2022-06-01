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

export const FormTextarea = ({
  control,
  name,
  disabled = false,
  autoFocus = true,
  style,
  placeholder,
  onSubmit,
  required = false,
}: FormProps) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (!(event.key === 'Enter' && event.shiftKey) && event.key === 'Enter' && onSubmit) {
      onSubmit();
      return;
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextareaAutosize
          placeholder={placeholder}
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
            ...style,
          }}
          disabled={disabled}
        />
      )}
    />
  );
};
