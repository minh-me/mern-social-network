export interface FormInputProps {
  control: any;
  name: `${string}.${string}` | `${string}.${number}` | `${string}`;
  autoFocus?: boolean;
  type?: string;
  [key: string]: any;
}
