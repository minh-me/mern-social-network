export interface FormInputProps {
  control: any;
  name: `${string}.${string}` | `${string}.${number}` | `${string}`;
  autoFocus?: boolean;
  label?: string;
  type?: string;
  [key: string]: any;
}
